#!/usr/bin/env node
const fs = require('fs');
const cp = require('child_process');

const sheetId = '1g5JVNuS5-kqCLUpY1leD-MgB3Yo_kGRWBrfy9dk4X1Q';
const account = 'sylvain@sylvgira.com';
const rowsPath = '/tmp/leads_email_range.json';

function sh(cmd, opts={}) {
  return cp.execFileSync('/bin/zsh', ['-lc', cmd], {encoding:'utf8', maxBuffer: 20*1024*1024, ...opts});
}
function curl(url) {
  try {
    return sh(`curl -A ${JSON.stringify('Mozilla/5.0 (Macintosh; Intel Mac OS X) AppleWebKit/537.36 Chrome/125 Safari/537.36')} -Ls --max-time 18 --connect-timeout 8 ${JSON.stringify(url)}`);
  } catch { return ''; }
}
function cfDecode(hex) {
  try {
    const key = parseInt(hex.slice(0,2),16);
    let out = '';
    for (let i=2;i<hex.length;i+=2) out += String.fromCharCode(parseInt(hex.slice(i,i+2),16)^key);
    return out;
  } catch { return ''; }
}
function cleanEmail(e) {
  return String(e||'')
    .replace(/^mailto:/i,'')
    .split('?')[0]
    .replace(/%40/gi,'@')
    .replace(/&[#a-z0-9]+;?/gi,'')
    .replace(/^[^a-z0-9._%+-]+|[^a-z0-9.-]+$/gi,'')
    .toLowerCase();
}
function validEmail(e, domain) {
  if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(e)) return false;
  if (/\.(png|jpe?g|gif|webp|svg|css|js|pdf)$/i.test(e)) return false;
  if (/(example|domain|email|yourname|name@|you@|test@|sentry|wixpress|wordpress|schema|cloudflare)/i.test(e)) return false;
  return true;
}
function extractEmails(html, domain) {
  const found = new Set();
  const add = e => { e = cleanEmail(e); if (validEmail(e, domain)) found.add(e); };
  for (const m of html.matchAll(/data-cfemail=["']([a-f0-9]+)["']/gi)) add(cfDecode(m[1]));
  for (const m of html.matchAll(/href=["']mailto:([^"']+)/gi)) add(m[1]);
  for (const m of html.matchAll(/[a-z0-9._%+-]+\s*@\s*[a-z0-9.-]+\s*\.\s*[a-z]{2,}/gi)) add(m[0].replace(/\s+/g,''));
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi,' ')
    .replace(/<style[\s\S]*?<\/style>/gi,' ')
    .replace(/<[^>]+>/g,' ')
    .replace(/&commat;|&#64;/gi,'@')
    .replace(/\s+/g,' ');
  const deob = text
    .replace(/\s*(\[|\(|\{)?\s*at\s*(\]|\)|\})?\s*/gi,'@')
    .replace(/\s*(\[|\(|\{)?\s*dot\s*(\]|\)|\})?\s*/gi,'.');
  for (const m of deob.matchAll(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/gi)) add(m[0]);
  return [...found];
}
function absUrl(base, href) {
  try { return new URL(href, base).toString(); } catch { return null; }
}
function sameHost(url, rootDomain) {
  try { return new URL(url).hostname.replace(/^www\./,'').endsWith(rootDomain.replace(/^www\./,'')); } catch { return false; }
}
function candidatePages(startUrl, rootDomain, html) {
  const out = new Set([startUrl]);
  const origin = (()=>{try{return new URL(startUrl).origin}catch{return 'https://'+rootDomain}})();
  for (const p of ['/', '/contact/', '/contact-us/', '/contacts/', '/about/', '/about-us/', '/get-a-quote/', '/quote/', '/free-quote/', '/enquiry/', '/contact.html']) out.add(origin+p);
  for (const m of html.matchAll(/href=["']([^"'#]+)["']/gi)) {
    const h = m[1];
    if (!/(contact|quote|enquir|about|get-in-touch|reach-us)/i.test(h)) continue;
    const u = absUrl(startUrl, h);
    if (u && sameHost(u, rootDomain)) out.add(u);
  }
  return [...out].slice(0,12);
}
function prefer(emails, rootDomain) {
  if (!emails.length) return '';
  const domain = rootDomain.replace(/^www\./,'');
  const ranked = emails.map(e => {
    let s = 0;
    const ed = e.split('@')[1];
    if (ed === domain || ed.endsWith('.'+domain)) s += 20;
    if (/^(info|hello|admin|office|sales|contact|enquiries|enquiry|quotes|projects)@/i.test(e)) s += 10;
    if (/gmail\.com$|outlook\.com$|hotmail\.com$/i.test(e)) s += 2;
    if (/^(noreply|no-reply|privacy|support)@/i.test(e)) s -= 5;
    return [s,e];
  }).sort((a,b)=>b[0]-a[0] || a[1].localeCompare(b[1]));
  return ranked[0][1];
}

const values = JSON.parse(fs.readFileSync(rowsPath,'utf8')).values;
const targets = [];
for (let i=1; i<values.length; i++) {
  const row = values[i] || [];
  if (row[10] && !row[13]) targets.push({rowNum:i+1, name:row[1]||'', url:row[10], root:row[11]||new URL(row[10]).hostname.replace(/^www\./,'')});
}
console.error(`Targets: ${targets.length}`);
const updates = [];
for (const t of targets) {
  const first = curl(t.url);
  const pages = candidatePages(t.url, t.root, first);
  const all = new Set(extractEmails(first, t.root));
  for (const p of pages) {
    if (p === t.url) continue;
    const html = curl(p);
    for (const e of extractEmails(html, t.root)) all.add(e);
  }
  const chosen = prefer([...all], t.root);
  console.log(`${t.rowNum}\t${t.name}\t${chosen || '-'}\t${[...all].join(', ')}`);
  if (chosen) updates.push({rowNum:t.rowNum, email:chosen});
}
fs.writeFileSync('/tmp/deep-email-updates.json', JSON.stringify(updates, null, 2));
console.error(`Updates: ${updates.length}`);

if (updates.length) {
  // Group contiguous rows for fewer API calls where possible; update one row each to avoid touching other data.
  for (const u of updates) {
    const range = `Leads!N${u.rowNum}:N${u.rowNum}`;
    const valuesJson = JSON.stringify([[u.email]]);
    sh(`export GOG_KEYRING_PASSWORD=$(cat ~/.config/openclaw/gog-keyring-password); gog sheets update ${sheetId} ${JSON.stringify(range)} --values-json ${JSON.stringify(valuesJson)} --input USER_ENTERED --account ${account}`);
  }
}

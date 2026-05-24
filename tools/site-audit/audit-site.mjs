#!/usr/bin/env node

import { chromium } from 'playwright';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const lighthouseCli = require.resolve('lighthouse/cli/index.js');
const axeSourcePath = require.resolve('axe-core/axe.min.js');
const here = dirname(fileURLToPath(import.meta.url));

function slugify(input) {
  return input
    .toLowerCase()
    .replace(/https?:\/\//g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function runNodeScript(scriptPath, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [scriptPath, ...args], {
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    let stdout = '';
    let stderr = '';
    child.stdout.on('data', (chunk) => (stdout += chunk));
    child.stderr.on('data', (chunk) => (stderr += chunk));
    child.on('error', reject);
    child.on('close', (code) => {
      if (code === 0) {
        resolve({ stdout, stderr });
      } else {
        reject(new Error(`exit ${code}\n${stderr || stdout}`));
      }
    });
  });
}

async function main() {
  const url = process.argv[2];
  if (!url) {
    console.error('Usage: node audit-site.mjs <url> [outdir]');
    process.exit(1);
  }

  const outDir = process.argv[3] || join(here, 'runs', slugify(url));
  await mkdir(outDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1800 } });
    await page.goto(url, { waitUntil: 'networkidle', timeout: 120000 });
    await page.screenshot({ path: join(outDir, 'homepage.png'), fullPage: true });

    const pageData = await page.evaluate(() => {
      const textFrom = (nodes) => nodes.map((n) => (n.textContent || '').trim()).filter(Boolean);
      const meta = (name) => document.querySelector(`meta[name="${name}"]`)?.content || '';
      const links = [...document.querySelectorAll('a')].map((a) => ({
        text: (a.textContent || '').trim(),
        href: a.href || '',
      }));
      return {
        url: location.href,
        title: document.title,
        description: meta('description'),
        h1: textFrom([...document.querySelectorAll('h1')]),
        h2: textFrom([...document.querySelectorAll('h2')]),
        h3: textFrom([...document.querySelectorAll('h3')]),
        forms: document.querySelectorAll('form').length,
        images: document.querySelectorAll('img').length,
        links: links.slice(0, 200),
        phoneLinks: links.filter((l) => l.href.startsWith('tel:')),
        emailLinks: links.filter((l) => l.href.startsWith('mailto:')),
        jsonLd: [...document.querySelectorAll('script[type="application/ld+json"]')].map((n) => n.textContent || ''),
      };
    });

    const axeSource = await readFile(axeSourcePath, 'utf8');
    await page.addScriptTag({ content: axeSource });
    const axeResults = await page.evaluate(async () => {
      // @ts-ignore
      return await axe.run(document, {
        resultTypes: ['violations'],
      });
    });

    const lighthouseJson = join(outDir, 'lighthouse.json');
    const lh = await runNodeScript(lighthouseCli, [
      url,
      '--quiet',
      '--output=json',
      `--output-path=${lighthouseJson}`,
      `--chrome-path=${chromium.executablePath()}`,
      '--emulated-form-factor=mobile',
    ]);

    const lighthouseData = JSON.parse(await readFile(lighthouseJson, 'utf8'));
    const summary = {
      page: pageData,
      axe: {
        violations: axeResults.violations.map((v) => ({
          id: v.id,
          impact: v.impact,
          help: v.help,
          nodes: v.nodes.length,
        })),
      },
      lighthouse: {
        categories: lighthouseData.categories,
        audits: {
          'first-contentful-paint': lighthouseData.audits['first-contentful-paint']?.displayValue,
          'largest-contentful-paint': lighthouseData.audits['largest-contentful-paint']?.displayValue,
          speedIndex: lighthouseData.audits['speed-index']?.displayValue,
          accessibility: lighthouseData.categories.accessibility?.score,
          performance: lighthouseData.categories.performance?.score,
          seo: lighthouseData.categories.seo?.score,
        },
      },
      notes: {
        lighthouseStderr: lh.stderr.trim(),
      },
    };

    await writeFile(join(outDir, 'summary.json'), JSON.stringify(summary, null, 2));

    console.log(JSON.stringify({
      outDir,
      title: pageData.title,
      h1: pageData.h1[0] || '',
      axeViolations: summary.axe.violations.length,
      performanceScore: summary.lighthouse.audits.performance,
      accessibilityScore: summary.lighthouse.audits.accessibility,
      seoScore: summary.lighthouse.audits.seo,
    }, null, 2));
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error?.stack || String(error));
  process.exit(1);
});

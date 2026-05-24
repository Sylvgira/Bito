# TOOLS.md - Local Notes

Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to your setup.

## What Goes Here

Things like:

- Camera names and locations
- SSH hosts and aliases
- Preferred voices for TTS
- Speaker/room names
- Device nicknames
- Anything environment-specific

## Examples

```markdown
### Cameras

- living-room → Main area, 180° wide angle
- front-door → Entrance, motion-triggered

### SSH

- home-server → 192.168.1.100, user: admin

### TTS

- Preferred voice: "Nova" (warm, slightly British)
- Default speaker: Kitchen HomePod
```

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

---

Add whatever helps you do your job. This is your cheat sheet.

## File Removal

- `trash` is installed via Homebrew at `/usr/local/opt/trash/bin/trash`.
- `~/.zshrc` prepends `/usr/local/opt/trash/bin` to `PATH`, so new zsh shells should resolve `trash`.
- Prefer `trash <path>` over `rm <path>` for recoverable local file removal.

## Model Routing

- `tiny` -> `openai/gpt-4.1-mini`
- `coordinator` -> `openai/gpt-5.4-mini`
- `explorer` -> `openai/gpt-5.4-nano`
- `heavy` -> `openai/gpt-5.5`
- `gpt-mini` remains the built-in worker fallback for routine implementation work.

## Operational Basics

- OpenClaw config path: `~/.openclaw/openclaw.json`
- Workspace path: `~/.openclaw/workspace`
- Heartbeat file: `~/.openclaw/workspace/HEARTBEAT.md`
- Site audit helper: `~/.openclaw/workspace/scripts/site-audit <url> [outdir]`
- Site audit output: screenshot, extracted page signals, axe violations, Lighthouse JSON
- Site audit toolchain lives under `~/.openclaw/workspace/tools/site-audit/` and uses Playwright, Lighthouse, and axe-core

## Usage Commands

- `openclaw status --usage`
- `openclaw status --json`
- `openclaw models status --json`
- `openclaw plugins list --json`

## Config Verification

- `openclaw gateway call health --json`
- `openclaw gateway restart --safe`

## Bitwarden

- Current account: `sylvaingirard.bito@gmail.com`
- Use `bw status` to check whether the vault is available.
- Interactive shells auto-run `/Users/sylvaingirard/.openclaw/workspace/scripts/bw-session` from `~/.zshrc`.
- The first time only, run `/Users/sylvaingirard/.openclaw/workspace/scripts/bw-password-store` once in a terminal.
- After that, the helper reads the password from `~/.config/openclaw/bw-master-password`, unlocks Bitwarden, and exports `BW_SESSION` automatically.
- The Keychain-based helpers remain in place, but the file-backed path is the reliable one.

## Related

- [Agent workspace](/concepts/agent-workspace)

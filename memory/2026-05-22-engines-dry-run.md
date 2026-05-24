# 2026-05-22 - Engines dry run notes

## Original context from Sylvain

- Start with a dry run for the lead engine.
- Set up anything needed as we go.
- Use sub-agents where they help.
- Use Gemini for anything costly.
- We have access to Google account, Slack, and email.
- Email approach can stay loose for now.
- For CRM, keep it light and use a Google Sheet.
- If asked to save something for later, save it locally in a clear `.md` file.
- When saving for later, include the original context plus thoughts on the engines.
- Also make a plan for the rest of the engines so we can continue another time.

## Working interpretation

- The lead engine should be treated as the first concrete vertical slice.
- The goal is not to finish every system at once, but to prove the core loop.
- The other engines can be planned now and implemented later without blocking the dry run.

## Plan for the remaining engines

1. Discovery engine
   - Find candidate businesses / leads.
   - Score and prioritise them.
2. Audit engine
   - Inspect sites.
   - Turn issues into a concise critique.
3. Concept engine
   - Generate the revamp concept.
   - Produce before/after framing.
4. Outreach engine
   - Draft personalised follow-up email.
   - Keep the tone human and specific.
5. Tracking engine
   - Keep status, dedupe, and handoff history in the Sheet.

## Suggested order

1. Discovery
2. Audit
3. Outreach
4. Concept
5. Tracking / glue

## Lead engine dry run

- Define the Google Sheet schema first.
- Create the Sheet as the v1 CRM.
- Add one test lead row end-to-end.
- Confirm the engine can write and update the row cleanly.
- Add logging and failure handling after the thin slice works.

## Notes from the auth/setup work

- `gog` is authenticated on `sylvain@sylvgira.com`.
- File-backed keyring storage is configured.
- Drive and Sheets scopes are live.
- The local loopback callback is normal for the OAuth desktop app flow.


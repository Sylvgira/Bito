# 2026-05-22 - Lead engine process

## Intent

Build the lead engine as a thin, reliable vertical slice first.
The initial CRM is a Google Sheet.
The goal is to get one lead all the way through discovery, audit, concept, outreach, and tracking without overbuilding the system.

## Inputs

- A target business / lead candidate
- Basic contact details if known
- Website URL
- Source of the lead
- Notes about why the lead is interesting

## Outputs

- One canonical lead row in a Google Sheet
- A short audit summary
- A concept summary for the revamp direction
- A draft outreach message
- Tracking/status updates for each stage

## Lead engine stages

1. Discovery
   - Find a candidate business.
   - Decide whether it is worth spending time on.
2. Audit
   - Inspect the existing site.
   - Capture obvious issues and opportunities.
3. Concept
   - Write a concise revamp direction.
   - Frame the before/after story.
4. Outreach
   - Draft a personalised email.
   - Keep it specific, human, and brief.
5. Tracking
   - Record status, dedupe, and the handoff trail in the Sheet.

## Sheet schema v1

Suggested columns:

- `lead_id`
- `company_name`
- `website`
- `contact_name`
- `contact_email`
- `source`
- `location`
- `category`
- `status`
- `score`
- `audit_summary`
- `concept_summary`
- `outreach_status`
- `last_updated`
- `owner`
- `notes`

Suggested status values:

- `new`
- `discovered`
- `audited`
- `concepted`
- `contacted`
- `replied`
- `qualified`
- `won`
- `lost`

## Practical process

1. Create a shared Google Sheet for the CRM.
2. Add the schema above as the first tab.
3. Put one test lead through the full flow.
4. Verify the engine can update the same row more than once.
5. Add logging so failures are traceable.
6. Only then widen to multiple leads or more automation.

## Guardrails

- Keep the CRM light.
- Do not introduce extra tools unless the Sheet becomes a bottleneck.
- Prefer clarity over cleverness.
- If something is not set up, surface the missing dependency immediately rather than hiding it.

## Companion engines to park for later

- Discovery engine
- Audit engine
- Concept engine
- Outreach engine
- Tracking / glue engine

## Notes

- `gog` is now authenticated on `sylvain@sylvgira.com`.
- Drive and Sheets scopes are live.
- File-backed keyring storage is configured, so the auth does not depend on macOS Keychain prompts.


# OpenClaw Video Reference

## Goal

Capture the useful ideas from the OpenClaw setup video as a living reference we can check back on occasionally, then turn into implementation work when it becomes useful.

## Source

- <https://www.youtube.com/watch?v=oOCN30ulVyo&pp=ygUOb3BlbmNsYXcgc2V0dXA%3D|My FULL OpenClaw Setup (steal my prompts!)>

## Near-Term Shape

- Keep the stack simple first
- Preserve aliases and routing boundaries
- Implement the highest-value workflow pieces before the fancy ones

## Role Map

- `coordinator`: routing, planning, synthesis, queueing work
- `worker`: routine implementation and narrow fixes
- `explorer`: repo lookup, quick codebase questions, low-risk searches
- `writer`: summaries, docs, clean prose
- `heavy`: difficult reasoning, complex debugging, design judgement

## Implementation Steps

1. Hardware / environment basics
   - Keep any onboarding and setup friction low
   - Document the minimal required local environment
2. Onboarding wizard
   - Make initial setup explicit and repeatable
   - Avoid hidden assumptions in config
3. Custom mission control
   - Centralise the main operational commands
   - Keep it fast to inspect, route, and resume work
4. Discord / group setup
   - Keep channel and notification rules simple
   - Make sure the assistant knows when to speak and when to stay quiet
5. Build projects
   - Create a repeatable path from request to concrete output
   - Keep output formats predictable
6. GitHub integration
   - Make repo checks, issues, and PR work part of the workflow
   - Prefer explicit handoffs over ad hoc memory
7. Multi-agent framework
   - Split work into coordinator + bounded workers
   - Keep the routing alias-based so models can change later
8. Security check
   - Add a review step for anything risky or externally visible
   - Keep destructive actions gated
9. Memory fixes
   - Write decisions down immediately
   - Keep long-term notes lean and curated
10. Advanced workflows
   - Add parallel workers only where they genuinely reduce latency
   - Escalate to stronger models only when the task demands it

## Longer-Term Follow-Up

- If the OpenAI-only stack becomes limiting, swap the provider behind the aliases rather than rewriting the framework.
- If the coordinator becomes overloaded, split planning from final synthesis.
- If design work needs more taste, isolate that role separately from implementation.
- Revisit the plan after a few real tasks and trim anything that never gets used.

## Review Rhythm

- Check back after a few real projects.
- Promote only the pieces that actually proved useful.
- Remove ideas that never got exercised.

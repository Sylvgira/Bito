# Memory

## Sylvain

- Sylvain Girard is a Melbourne-based digital designer and occasional developer working at a digital agency that specialises exclusively in Webflow development.
- He operates where design, systems thinking, frontend implementation, and emerging interactive technologies overlap.
- He values elegant systems, clarity, maintainability, depth of understanding, and strong long-term approaches over quick fixes or trend-led decisions.
- He appreciates direct, well-reasoned feedback, including recommendations that challenge assumptions when a cleaner or more scalable approach exists.
- Communication preferences: concise, thoughtful, quality-focused, British English, precise wording, natural structure, minimal filler, no vague corporate tone or performative positivity.
- Strong interests: technically sophisticated visual systems, creative engineering, computational design, interactive technologies, deeper control over tools and workflows, and understanding how systems work beneath the surface.
- Working style: structured, analytical, optimisation-oriented, with attention to scalable systems, reusable patterns, coherent workflows, implementation constraints, and long-term maintainability.
- Strengths to keep in mind: systems thinking, high attention to detail, strong design taste, technical literacy, pragmatic problem-solving, bridging design and development, and curiosity-driven learning.
- Friction points: shallow thinking, bloated process, unclear communication, unnecessary complexity, and solutions that ignore implementation realities.
- For summarising YouTube transcripts or large docs, prefer `deepseek/deepseek-v4-flash` (DeepSeek Flash) for speed and cost unless a task clearly needs deeper reasoning.
- For heavy summarisation, use `deepseek/deepseek-v4-pro` (DeepSeek Pro) — cheap enough for wider use.
- Current OpenClaw routing aliases: `DeepSeek` = `deepseek/deepseek-v4-flash`, `DeepSeek Pro` = `deepseek/deepseek-v4-pro`, `Embedding` = `google/gemini-embedding-001`.
- For local issues and troubleshooting, treat the official OpenClaw documentation (<https://docs.openclaw.ai/>) as the primary reference.

## Sub-Agent Discipline

- For any non-trivial task, spawn sub-agents by role (Probe/Spark/Grid/Lens). Do the classification ledger before starting.
- Bito must not do specialist work directly when a matching sub-agent exists. If a sub-agent fails, re-spawn it rather than falling back to direct execution.
- Sylvain expects all four roles to be used when the task calls for it (investigation, building, records, analysis).

<!--
- Previous OpenAI aliases (unavailable): `tiny` = `openai/gpt-4.1-mini`, `coordinator` = `openai/gpt-5.4-mini`, `explorer` = `openai/gpt-5.4-nano`, `heavy` = `openai/gpt-5.5`
- Previous Google Gemini aliases: `Main` = `google/gemini-2.5-flash`, `Flash Latest` = `google/gemini-flash-latest`, `Heavy` = `google/gemini-2.5-pro`, `Heavy Latest` = `google/gemini-3.1-pro-preview`, `Flash Lite` = `google/gemini-3.1-flash-lite`
-->

## Promoted From Short-Term Memory (2026-06-06)

<!-- openclaw-memory-promotion:memory:memory/2026-05-31.md:18:21 -->
- Visual Design Threshold + Process: Sylvain corrected the approach: evaluation isn't just about design quality but whether the business is likely to be satisfied with their current site.; A site built last year with a modern framework = satisfied owner = not a candidate regardless of design score.; Jeffersons Flooring (bare contact card) and Pro Pest Control (dated WP/Divi template) are real candidates.; Acron Joinery, Ruve Fencing, Legacy Pools are NOT candidates — they have decent designs and modern builds. [score=0.842 recalls=0 avg=0.620 source=memory/2026-05-31.md:18-21]
<!-- openclaw-memory-promotion:memory:memory/2026-05-31.md:22:24 -->
- Visual Design Threshold + Process: Created `/processes/lead-visual-assessment.md` with formalised 3-factor process.; Image analysis (visual assessments) must use heavy model (DeepSeek Pro), not Flash.; Updated AGENTS.md with heavy-model requirement for image analysis. [score=0.842 recalls=0 avg=0.620 source=memory/2026-05-31.md:22-24]
<!-- openclaw-memory-promotion:memory:memory/2026-05-31.md:5:8 -->
- Sub-Agent Usage Correction: Sylvain called out that I didn't use sub-agents properly for the visual assessment workflow. I did investigation (Probe) and analysis (Lens) work directly instead of delegating.; Grid sub-agent aborted and I fell back to doing Drive/sheet updates manually instead of re-spawning.; Updated AGENTS.md to require re-spawn on failure rather than silent fallback.; Updated MEMORY.md with sub-agent discipline rule. [score=0.842 recalls=0 avg=0.620 source=memory/2026-05-31.md:5-8]
<!-- openclaw-memory-promotion:memory:memory/2026-05-31.md:9:9 -->
- Sub-Agent Usage Correction: Key lesson: classify every task into RESEARCH/BUILD/RECORDS/ANALYSIS/MIXED before starting, spawn the right agents, re-spawn on failure. [score=0.842 recalls=0 avg=0.620 source=memory/2026-05-31.md:9-9]
<!-- openclaw-memory-promotion:memory:memory/2026-05-30-1943.md:23:23 -->
- Conversation Summary: However, the previous `npm run dev` command was successful, indicating there's *some* Astro project here. The output from `curl -v http://127.0.0.1:3000/` showed: [score=0.823 recalls=0 avg=0.620 source=memory/2026-05-30-1943.md:23-23]
<!-- openclaw-memory-promotion:memory:memory/2026-05-30-1943.md:26:26 -->
- Conversation Summary: <script type=\"module\" src=\"/src/pages/index.astro?astro&type=script&index=0&lang.ts\"></script> [score=0.823 recalls=0 avg=0.620 source=memory/2026-05-30-1943.md:26-26]

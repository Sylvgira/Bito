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

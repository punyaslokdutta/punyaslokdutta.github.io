# Workflow research notes

These notes explain the decisions behind the portfolio narrative and the proposed operating system.

## The positioning

The strongest claim is not “I use many AI tools.” It is:

> I turn customer evidence into shipped product by running bounded agent sessions through one legible decision system.

That positioning keeps the portfolio centered on product judgment, engineering quality, and management—not model novelty.

## What the saved repositories reveal

I reviewed 284 public repositories starred by `punyaslokdutta` on August 28, 2026. The sequence suggests three chapters:

1. **Interfaces and interaction:** React Native, audio, media, and search.
2. **Intelligence:** computer vision, ML, and generative systems.
3. **Leverage:** agent skills, harnesses, observability, memory, and parallel-session control.

The most relevant recent signals were Screenpipe, OpenInference, qm, Orca, Tessera, Routa, gstack, SkillSpector, code-review-graph, Video-shotcraft, Hyperframes, Agent-Reach, and Scout. The portfolio labels these as a “bench” unless the current workflow explicitly named them. A star shows curiosity, not adoption.

## YC signals applied

- YC’s enduring operating advice is to **talk to users and build product**. That supports keeping 90–95% of attention on product/development and using GTM to close the learning loop, not to create busywork. [YC: What to Expect as an International Founder](https://www.ycombinator.com/blog/what-to-expect-as-an-international-founder-at-y-combinator)
- YC’s Kat Manalac argues for an embarrassingly basic release that creates real feedback instead of waiting for perfection. That becomes “ship the smallest strong version, then watch.” [YC: Office Hours with Kat Manalac](https://www.ycombinator.com/blog/office-hours-with-kat-manalac)
- Scott AI’s YC profile frames planning as the missing layer when multiple coding agents can move quickly but disagree about what to build. That supports divergence before implementation and a single decision contract. [YC: Scott AI](https://www.ycombinator.com/companies/scott-ai)
- YC’s own software team says it uses deployed agents for support, events, and interpreting internal data while remaining a small full-stack product team. That supports agents as leverage inside a product organization, not a replacement for product ownership. [Software at YC](https://www.ycombinator.com/software)

## a16z signals applied

- a16z describes agent work as increasingly asynchronous and closer to task orchestration than pair programming. That is the rationale for bounded sessions, isolated worktrees, structured returns, and a control-room view. [Emerging Developer Patterns for the AI Era](https://a16z.com/nine-emerging-developer-patterns-for-the-ai-era/)
- Their AI software-development stack separates quick editor work, longer background-agent work, and independent AI QA. It also stresses automated tests when a human is not continuously present. That maps directly to the portfolio’s “build → prove → human gate” pipeline. [The Trillion Dollar AI Software Development Stack](https://a16z.com/the-trillion-dollar-ai-software-development-stack/)
- a16z’s ICP framework starts with the customers who receive the most value and warns that GTM cannot force durable growth where the product is not needed. That supports a small, qualified Clay/AgentMail loop rooted in customer evidence. [A Framework for Defining and Refining Your ICP](https://a16z.com/framework-define-refine-icp/)

## Recommended working system

### Control plane

- One outcome and one owner per session.
- One shared brief with user, problem, constraints, non-goals, and acceptance criteria.
- Parallelism for research, architecture alternatives, isolated implementation, and adversarial review.
- Serialized product decisions: select an approach, approve scope changes, and make the final release call.
- A structured return from every session: outcome, evidence, risks, files changed, and next decision.

### Core artifacts

1. `evidence.md` — exact customer signal, observed behavior, supporting data, open questions.
2. `brief.md` — problem, user, constraints, non-goals, acceptance criteria.
3. `options.md` — independent approaches with tradeoffs and failure modes.
4. `handoff.md` — what changed, where, what passed, what remains uncertain.
5. `review.md` — ranked findings against the brief.
6. `decision.md` — ship, revise, or kill; owner and follow-up signal.

### Skills to build first

Customer-call synthesis, repository mapping, architecture divergence, implementation contracts, adversarial code review, release proof, learning capture, and product-story distillation.

## Content and GTM loop

Use Granola twice: first as product evidence, then as the source for content. One strong call can produce an internal insight note, a concise X post, a more reflective LinkedIn post, and the opening line for a product demo. The public content should teach what the product work revealed; it should not become a separate content factory.

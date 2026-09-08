const workflowData = {
  listen: {
    number: "01",
    kicker: "CUSTOMER SIGNAL → EVIDENCE",
    title: "Start with what happened, not what was requested.",
    copy: "I review the call, pull the exact friction, and separate the user’s proposed solution from the job they need done.",
    human: "Curiosity, follow-ups, product judgment",
    agent: "Transcription synthesis, pattern scan, open questions",
    artifact: "evidence.md",
  },
  frame: {
    number: "02",
    kicker: "EVIDENCE → DECISION CONTRACT",
    title: "Make the requirement testable before making it large.",
    copy: "The brief names the user, the observed pain, constraints, non-goals and the proof that will count as done.",
    human: "Priority, scope and the tradeoff worth making",
    agent: "Codebase context, ambiguity scan, acceptance-criteria draft",
    artifact: "brief.md",
  },
  diverge: {
    number: "03",
    kicker: "ONE BRIEF → COMPETING OPTIONS",
    title: "Spend parallelism on disagreement before implementation.",
    copy: "Independent agents explore the smallest path, the robust path and the failure modes. They return comparable plans—not a group chat.",
    human: "Choose the decision frame and select a path",
    agent: "Repository mapping, options, risks and estimates",
    artifact: "options.md",
  },
  build: {
    number: "04",
    kicker: "SELECTED PLAN → ISOLATED CHANGES",
    title: "Give each builder a boundary and its own working state.",
    copy: "Each implementation session gets one outcome, a scoped file surface and an isolated worktree. Shared branches stay quiet.",
    human: "Resolve product questions and protect the boundary",
    agent: "Implementation, local tests and concise handoff",
    artifact: "diff + handoff.md",
  },
  prove: {
    number: "05",
    kicker: "DIFF → INDEPENDENT PROOF",
    title: "The builder never gets the final word on its own work.",
    copy: "A fresh reviewer checks the diff against the brief. QA runs the real interaction and ranks defects by user impact.",
    human: "Risk tolerance and quality bar",
    agent: "Adversarial review, tests, browser flow and trace scan",
    artifact: "review.md + test.log",
  },
  ship: {
    number: "06",
    kicker: "PROOF → RELEASE → STRONGER SYSTEM",
    title: "Ship the smallest strong version, then capture the learning.",
    copy: "I make the release call, watch what users actually do and turn recurring lessons into a better skill, test or product rule.",
    human: "Final merge, customer communication and interpretation",
    agent: "Release checklist, monitoring summary and learning draft",
    artifact: "decision.md + skill update",
  },
};

const agentData = {
  scout: ["CONTEXT SCOUT", "Turns call notes, support threads and product telemetry into a one-page evidence brief.", "evidence.md"],
  architect: ["ARCHITECT ×2", "Develops independent options against the same constraints so tradeoffs show up before code.", "options.md"],
  builder: ["BUILDER A / B", "Implements bounded options in isolated worktrees and returns a diff, tests and handoff.", "feature/*"],
  reviewer: ["REVIEW + QA", "Checks the change against the brief, runs real flows and reports ranked evidence—not vibes.", "review.md"],
};

const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-button]");
const mobileNav = document.querySelector("[data-mobile-nav]");

window.addEventListener("scroll", () => header?.classList.toggle("scrolled", window.scrollY > 24), { passive: true });

menuButton?.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!open));
  menuButton.setAttribute("aria-label", open ? "Open menu" : "Close menu");
  mobileNav?.classList.toggle("open", !open);
});

mobileNav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  mobileNav.classList.remove("open");
  menuButton?.setAttribute("aria-expanded", "false");
}));

document.querySelectorAll("[data-agent]").forEach((button) => {
  button.addEventListener("click", () => {
    const data = agentData[button.dataset.agent];
    if (!data) return;
    document.querySelectorAll("[data-agent]").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    document.querySelector("[data-agent-label]").textContent = data[0];
    document.querySelector("[data-agent-copy]").textContent = data[1];
    document.querySelector("[data-agent-artifact]").textContent = data[2];
  });
});

document.querySelectorAll("[data-step]").forEach((button) => {
  button.addEventListener("click", () => {
    const data = workflowData[button.dataset.step];
    if (!data) return;
    document.querySelectorAll(".workflow-step").forEach((item) => {
      item.classList.remove("active");
      item.setAttribute("aria-selected", "false");
    });
    button.classList.add("active");
    button.setAttribute("aria-selected", "true");
    const bindings = {
      "[data-step-number]": data.number,
      "[data-step-kicker]": data.kicker,
      "[data-step-title]": data.title,
      "[data-step-copy]": data.copy,
      "[data-step-human]": data.human,
      "[data-step-agent]": data.agent,
      "[data-step-artifact]": data.artifact,
    };
    Object.entries(bindings).forEach(([selector, value]) => {
      const element = document.querySelector(selector);
      if (element) element.textContent = value;
    });
  });
});

document.querySelectorAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    document.querySelectorAll("[data-filter]").forEach((item) => item.classList.toggle("active", item === button));
    document.querySelectorAll("[data-category]").forEach((card) => {
      card.hidden = filter !== "all" && card.dataset.category !== filter;
    });
  });
});

const copyButton = document.querySelector("[data-copy-script]");
copyButton?.addEventListener("click", async () => {
  const script = document.querySelector("[data-script-source]")?.value || "";
  try {
    await navigator.clipboard.writeText(script);
    document.querySelector("[data-copy-label]").textContent = "Copied";
    window.setTimeout(() => { document.querySelector("[data-copy-label]").textContent = "↗"; }, 1800);
  } catch {
    const source = document.querySelector("[data-script-source]");
    source?.classList.remove("visually-hidden");
    source?.select();
  }
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: "0px 0px -30px" });

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

const clock = document.querySelector("[data-ist-clock]");
const updateClock = () => {
  const time = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date());
  if (clock) clock.textContent = `${time} IST`;
};
updateClock();
window.setInterval(updateClock, 30000);
document.querySelector("[data-year]").textContent = new Date().getFullYear();

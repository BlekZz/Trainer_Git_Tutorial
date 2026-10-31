---
name: taste
description: >
  Design-taste protocol family for generating, critiquing, or upgrading UI and visual design. Covers applying a premium/anti-generic frontend design-taste baseline, brutalist/minimalist/soft/high-end aesthetic directives, brand-kit image generation, redesigning an existing site/app from a design audit, image-to-code website workflows, AI image generation for frontend mockups (web and mobile), Google Stitch DESIGN.md generation, and GPT/GSAP-specific motion-and-layout taste rules. Use when the user asks to design, critique, restyle, or "make this look premium/less AI-generated" for any UI, web page, or app screen, or references a specific aesthetic (brutalist, minimalist, soft/editorial, brand kit, redesign, image-to-code, mobile app mockup, Stitch, GSAP/taste). Does NOT cover: dashboard / data-dense product UI visual quality (use the dashboard-taste skill instead), searchable style / palette / font-pairing data lookups (use the ui-ux-pro-max skill instead), data charts/graphs (use the dataviz skill instead), editable diagrams/flowcharts/architecture sketches (use the drawio skill instead; the former excalidraw skill retired 2026-09-28), or output-completeness/anti-truncation enforcement (use the full-output-enforcement skill instead — unrelated topic, not a design concern).
audience: agent
role: domain
---

# Taste — Design Taste & Visual Style Protocol Family

## Overview

This skill is an entry point over a family of 11 detailed design-taste protocols originally
written as standalone "override the LLM's generic design instincts" skills. They share one
purpose — pushing UI/visual output away from generic "AI slop" toward premium, intentional,
anti-generic design — but differ in scope: one is a general-purpose baseline, four are named
aesthetic variants, and six are scenario-specific workflows (redesigning existing code,
image-first website/mobile generation, brand kits, Google Stitch, and GSAP-heavy motion work).

Do not try to hold all 11 files in context at once. Read only the ones relevant to the current
request, per the routing table below.

## Routing Table

| If the user's need is... | Read |
|---|---|
| A general premium frontend design baseline for **landing pages, portfolios, redesigns** (upstream v2 rewrite 2026-10: brief-inference first, design-system matching) | `references/taste-skill.md` |
| A brand-kit / logo system / brand-guidelines board / identity deck image | `references/brandkit.md` |
| A raw, mechanical, Swiss-print or military-terminal/CRT aesthetic ("brutalist", "industrial", "tactical") | `references/brutalist-skill.md` |
| A clean, editorial, warm-monochrome, bento-grid minimalist interface | `references/minimalist-skill.md` |
| A general high-end/"Awwwards-tier" agency look with haptic double-bezel cards, magnetic buttons, fluid nav (name notwithstanding, this file is a second general premium-design directive, not literally "soft") | `references/soft-skill.md` |
| Auditing and upgrading an **existing** website/app's design without breaking functionality or migrating frameworks | `references/redesign-skill.md` |
| An image-first design-to-code workflow: generate reference image(s) of a website first, deeply analyze them, then implement the frontend to match | `references/image-to-code-skill.md` ⚠ 本機 Claude Code 不直接適用(此檔寫給 Codex)→ 建議轉派 Codex/Gemini lane(§10 routing) |
| Generating premium AI reference **images** (not code) of a website/landing page for art direction | `references/imagegen-frontend-web.md` ⚠ 本機 Claude Code 不直接適用(需圖像生成)→ 建議轉派 Codex/Gemini lane(§10 routing) |
| Generating premium AI reference **images** (not code) of mobile app screens/flows, inside a phone mockup | `references/imagegen-frontend-mobile.md` ⚠ 本機 Claude Code 不直接適用(需圖像生成)→ 建議轉派 Codex/Gemini lane(§10 routing) |
| Producing a `DESIGN.md` semantic design-system file for Google Stitch | `references/stitch-skill.md` |
| A GSAP/motion-heavy, Python-randomized layout-variance, AIDA-structured page build ("gpt-taste" style) | `references/gpt-tasteskill.md` |

Multiple rows can apply to one request (e.g. "redesign my existing marketing site to look
brutalist" → read both `redesign-skill.md` and `brutalist-skill.md`). When no specific aesthetic
is named, default to `taste-skill.md` as the general baseline.

## What this skill does NOT cover

- **Dashboard / admin / data-dense product UI visual quality** — use the `dashboard-taste` skill
  (the dashboard knowledge of the former v1 baseline moved there 2026-10-07; v1 file removed, see git history).
- **Charts, graphs, data visualizations** — use the `dataviz` skill.
- **Editable diagrams, flowcharts, architecture sketches** — use the `drawio` skill (former `excalidraw` skill retired 2026-09-28).
- **Output completeness / anti-truncation / "don't use placeholders"** — use the
  `full-output-enforcement` skill. (The source material for this family originally included a
  file named `output-skill.md` covering that topic; it was split out as its own skill because it
  has nothing to do with visual design taste.)
</content>

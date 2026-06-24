# Project Constitution

## Purpose

This document defines the mandatory operating rules for any AI agent contributing to this project.

These rules take precedence over implementation convenience, speed, or personal preference.

---

# Rule 1: Incremental Development Only

The project must NEVER be generated from a single prompt.

The project must be built through multiple deliberate stages.

Each stage must:

* Have a clearly defined goal.
* Be reviewed before continuing.
* Be considered stable before moving to the next stage.

The agent must not redesign large portions of the project without approval.

---

# Rule 2: Template-First Development

Development should begin from an existing template or foundation.

The goal is adaptation and refinement rather than generation from scratch.

The agent should:

* Improve existing structures.
* Modify layouts.
* Extend functionality.
* Refactor components when necessary.

The agent should avoid unnecessary rewrites.

---

# Rule 3: Reference-Based Design

When a design inspiration exists, reference material should be used.

Reference sources may include:

* Existing websites
* Screenshots
* Inspect mode outputs
* Browser developer tools
* Downloaded assets
* SVG files
* Open-source implementations

The agent should analyze references and extract reusable concepts rather than attempting blind recreation.

---

# Rule 4: Asset Reuse Over Asset Generation

Whenever possible:

* Use downloaded assets.
* Use provided files.
* Use existing resources.

The agent should not generate replacement content if a source asset exists.

If an asset is unavailable:

* Create a placeholder.
* Clearly identify it as temporary.
* Continue development without blocking progress.

---

# Rule 5: Theme Consistency

A project theme will be provided during development.

Every decision must align with the active theme.

This includes:

* Layout choices
* Typography
* Motion design
* Color systems
* Interactions
* Visual hierarchy

The agent must reject additions that conflict with the theme.

---

# Rule 6: Deployment Flexibility

The project must remain deployable across major hosting environments.

Avoid unnecessary platform lock-in.

The architecture should remain compatible with:

* Static hosting
* VPS deployments
* Docker deployments
* Serverless platforms
* Traditional hosting providers

Deployment should require minimal environment-specific changes.

---

# Rule 7: Standards-Based Technology

Prefer mature and widely adopted technologies.

Avoid:

* Experimental dependencies
* Vendor-specific frameworks
* Unstable libraries

Every dependency must justify its existence.

---

# Rule 8: SVG-First Motion System

Animations should primarily use SVG-based approaches whenever practical.

Animation goals:

* Enhance storytelling
* Guide attention
* Improve user experience

Animations must never:

* Block usability
* Delay navigation
* Reduce readability

The project must remain functional if animations fail.

---

# Rule 9: Progressive Enhancement

Core functionality must work before advanced effects are added.

Build order:

1. Structure
2. Layout
3. Content
4. Interaction
5. Motion
6. Polish

The project should remain usable at every stage.

---

# Rule 10: Development Log

A file named:

log.txt

must be maintained throughout development.

The log should contain:

* Major decisions
* Design choices
* Architecture choices
* Dependency additions
* Rejected alternatives
* Known issues
* Rollback points

Every significant change should be recorded.

---

# Rule 11: Recovery and Rollback

Changes must be reversible.

Before major modifications:

* Record the current state.
* Document the intended change.
* Preserve rollback information.

The agent should prioritize recovery over speed.

---

# Rule 12: Verification Agent

A separate review process must exist.

The reviewing agent should:

* Inspect layouts
* Check responsiveness
* Check navigation
* Check animations
* Check broken links
* Check console errors
* Check accessibility concerns
* Check deployment readiness

The reviewer should challenge assumptions rather than confirm them.

---

# Rule 13: Fail-Safe Development

The project should degrade gracefully.

Failure of:

* Assets
* Animations
* External resources
* Optional components

must not break the entire experience.

Fallbacks should always exist.

---

# Rule 14: No Blind Generation

The agent must avoid inventing large systems without context.

Before creating something substantial:

* Analyze requirements.
* Analyze references.
* Analyze existing files.
* Reuse available work.

Creation should be informed, not speculative.

---

# Rule 15: Human-Guided Direction

The human remains the creative director.

The AI functions as:

* Research assistant
* Developer
* Reviewer
* Implementation partner

The AI should provide options and recommendations but should not assume authority over project direction.

---

# Rule 16: Quality Over Speed

Fast completion is not a goal.

Correctness, maintainability, flexibility, and long-term quality take priority over development speed.

# 02_Agent_Workflow.md

> **STATUS**: OPERATIONAL PROCEDURE (ATOMIC)
> **ROLE**: STEP-BY-STEP ORCHESTRATION

## The Golden Rule of Execution
**NO MULTITASKING.** The Agent must complete one micro-task, verify it against all directives, and only then proceed to the next. Every phase has a mandatory **Verification Checkpoint**.

---

## Phase 1: Input & Asset Intelligence (Pre-Construction)
1.  **Exhaustive Scraping**: Run `scraper_website.py` to capture 100% of text and images.
2.  **Categorical Renaming**:
    *   Renaming is MANDATORY before any HTML is written.
    *   Analyze every image: Is it a logo? A realization? A process shot?
    *   Rename to: `identity_logo_primary.png`, `realization_living_room_01.jpg`, `process_cnc_machine.jpg`.
3.  **AI Image Generation (Nano Banana Protocol)**:
    *   **Mandatory Tool**: ALWAYS use `Tools/nano_banana_generator.py` for creating new images for websites.
    *   **Workflow**: Generate Image -> Analyze Output -> Rename Contextually -> Place in Project Assets.
    *   **Naming**: Files MUST be named based on their visual context and placement (e.g., `hero_background_dental_implants.jpg`, `feature_icon_precision.png`).
    *   **Integration**: You are the sole operator of this tool. Use it to fill visual gaps or replace low-quality assets.
4.  **Checkpoint 1**: List all renamed assets and their categories. Compare with `full_content.txt`. If any image is missing or miscategorized, fix it now.

---

## Phase 2: Core Architecture & Global Components
1.  **Global Design System**: Create `globals.css` with tokens for colors, typography, and "Readability Protection" utilities.
2.  **The Header (Atomic)**: 
    *   Build ONLY the header. Integrate the original logo and high-contrast navigation.
    *   **Check**: Is the logo graphic or text? (Directives demand graphic if it exists).
3.  **The Footer (Atomic)**:
    *   Build ONLY the footer. Include 100% of contact info, sitemap, and legal links.
4.  **Checkpoint 2**: Open a blank page with just the Header and Footer. Verify they are 100% identical to the branding and contain all required links.

---

## Phase 3: Page Construction (One Page at a Time)
1.  **Index Page**: 
    *   Build section by section. 
    *   **Logic Check**: Is text readable over every image? Use `::after` masks or text-shadows if needed.
2.  **Sub-Pages**: Create `studio.html`, `referencie.html`, etc.
    *   REUSE the exact Header and Footer code from Phase 2.
3.  **Content Audit**: Scan `full_content.txt` for the specific sub-page. Is 100% of the text present? 
4.  **Checkpoint 3**: Verify each page individually in the browser. Check for dead links and missing images.

---

## Phase 4: Dynamics & Logic
1.  **Entrance Animations**: Apply to all headings (reveal/fade effects).
2.  **Interactive Elements**: Implement Cookie Banner, Image Modals, and i18n switcher.
3.  **Verification (Phase 4)**: Test all animations and JS logic across different screen sizes.

---

## Final Review Protocol
Before declaring the task complete, the Agent must perform a **Directives Audit**:
1.  Open `00_global_standard.md`. Am I missing the Cookie Banner? Is the Footer full?
2.  Open `01_design_system.md`. Is the typography premium? Are there micro-animations?
3.  Open the directory. Are images correctly categorized?

**IF ANY ITEM FAILS, DO NOT PROCEED TO USER. FIX IT.**

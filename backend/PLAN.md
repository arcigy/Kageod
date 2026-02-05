# Project Plan: KaGeOd (The Kinetic Geodesy)

## Vision
To transform a traditional geodetic service website into a **dynamic, living digital experience**. The site will move away from the "static Word document" feel and embrace **kinetic interactions, parallax depth, and cohesive, high-end visuals**.

## Phase 1: Visual Language & Asset Renovation (Nano Banana)
**Goal:** Create a unified visual style that screams "Precision & Modernity".
1.  **Asset Audit**: Review scraped images. Identify key categories (Fieldwork, Equipment, Office, Maps).
2.  **Nano Banana Campaign**:
    *   *Prompt Engineering*: Develop a prompt style for "Cinematic Geodesy" (e.g., "Photorealistic surveyor in golden hour, sharp focus, 8k, depth of field, futuristic interface overlay").
    *   *Generation*: Replace low-res/inconsistent images with AI-generated high-fidelity assets.
    *   *Contextual Renaming*: Ensure all assets are named for their specific slot (e.g., `hero_bg_topography.jpg`, `service_card_drone.jpg`).
3.  **Design System Setup**:
    *   **Palette**: Deep Earth tones (Slate, Granite) mixed with High-Vis Accents (Neon Orange/Green from surveyor vests/lasers).
    *   **Typography**: Technical yet bold sans-serif.
    *   **Motion**: subtle topographic line animations in background.

## Phase 2: Core Architecture & "Skeleton"
**Goal:** Build the robust, responsive frame.
1.  **Global CSS (`globals.css`)**:
    *   Define CSS variables for colors, spacing, and *animation curves*.
    *   Implement "Smooth Scroll" behavior.
2.  **Header & Navigation**:
    *   Sticky, glass-morphism effect.
    *   Hover effects on links (underline reveals).
3.  **Footer**:
    *   Massive, structured footer with map integration.

## Phase 3: The "Living" Pages (Construction)
**Goal:** Build content that reacts to the user.

### A. Homepage (The Hook)
*   **Hero Section**: Full-screen video or parallax image of a landscape being "scanned" (visual effect).
*   **Services Preview**: Hover-sensitive cards that expand or glow.
*   **Parallax Dividers**: Sections separated by moving layers of terrain.

### B. Sub-Pages (Services, About, Contact)
*   **Consistent Header/Footer**.
*   **Dynamic text loading**: Text shouldn't just appear; it should slide/fade in as the user reads.
*   **Interactive Elements**:
    *   "Request Quote" button that pulses or follows the mouse slightly.
    *   Contact form with live validation and smooth transitions.

## Phase 4: Content Integration & Polishing
**Goal:** Ensure 100% content usage and perfect fit.
1.  **Text Mapping**: Place every paragraph from `full_content.txt` into the new layout.
2.  **Bilingual Switcher**: Ensure SK/EN toggles work instantly.
3.  **Mobile Adaptation**:
    *   simplify animations for mobile (performance).
    *   Ensure touch targets are large.

## Phase 5: Final Review & Launch
1.  **Lighthouse Audit**: Performance check.
2.  **Cross-Device Test**: Verify "Kinetic" feel on Tablet and Mobile.
3.  **Deploy**: Prepare for upload.

---
**Next Step**: Approve Plan -> Switch to Code Mode -> Begin Phase 1 (Nano Banana Generation).

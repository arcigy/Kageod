# 01_Design_System.md

> **STATUS**: MANDATORY
> **VIBE**: PREMIUM, KINETIC, ANTI-TEMPLATE

## 1. Anti-Plain-Text Policy
*   **Rule**: No text can appear as "default browser text". Every single word must be part of a styled CSS/JS orchestration.
*   **Typography**: Use multiple weights, custom line-heights, and variable fonts.
*   **Animations**: All H1, H2, and Hero text must have specific **Reveal Animations** (e.g., sliding up from hidden container).

## 2. Core Visual Trends (2025 Standard)

### A. Bento Grids
Organize content into bento-box style modular grids (inspired by Apple/Linear).
*   Use `grid-template-rows` and `grid-template-columns` to create interesting, varied tile sizes.
*   Each "tile" should have a subtle background, border, or glass effect.

### B. Scrollytelling
Do not just dump text on the page. Reveal the story as the user scrolls.
*   Use `framer-motion` to animate elements into view.
*   Parallax effects on images.
*   Funny/Smart reveals of key value propositions.

### C. Kinetic Typography
Text is the hero.
*   Use Large, Bold typography (Display fonts).
*   Animate words (slide up, fade in char-by-char) to grab attention.

### D. Glassmorphism 2.0 ("Liquid Glass")
*   Use high-quality background blurs (`backdrop-filter: blur(20px)`).
*   Multi-layered gradients behind glass cards to create depth.
*   Subtle 1px white/transparent borders to define edges.

## 3. Interaction Design (Micro-Interactions)
A static site is a dead site.
*   **Buttons**: Must have hover states (scale, glow, color shift).
*   **Links**: Underlying animations or color changes.
*   **Cards**: Slight lift or glow on hover.
*   **Cursor**: Custom cursor or follower if appropriate for the brand (optional but premium).

## 3. Implementation Rules (EXTREME DYNAMICS & LOGIC)
*   **Atomic Visual Build**: Build one section, verify its animations, contrast, and layout. Perfect it. Then move to the next.
*   **Asset Categorization & Context**: Images must be strictly separated. Final results (portfolio) vs Process/Background assets.
*   **Logo Preservation & Redesign**: Graphics are sacred. However, if the source logo is of low quality or outdated, the Agent MUST redesign it (SVG/CSS) or generate a modern, premium version that honors the original name but fits the 2025 aesthetic.
*   **Header Integrity**: The header must have a fixed position, high z-index, and perfect visibility on all backgrounds. Use advanced glassmorphism + dynamic text-color shifting or high-contrast masks.
*   **Visual High-Contrast Rule**: Every text block over an image must have a verification check: "Can I read this clearly while scrolling?" If not, add a dark mask, gradient, or shadow.

## 4. Asset Guidelines
*   **Images**: Must be high resolution. Use `next/image` for optimization.
*   **Naming**: See `02_agent_workflow.md`. All assets must be strictly renamed.

# 00_Global_Standard.md

> **STATUS**: MANDATORY
> **APPLIES TO**: ALL PROJECTS (Frontend & Backend)

## 1. Core Tech Stack (KINETIC VANILLA)
*   **Architecture**: Multi-page.
*   **Complexity Minimum**: Every HTML page must be a rich, layered experience. Aim for 1000+ lines of code per page to ensure high detail and complex styling.
*   **Bilingual (SK/EN)**: Mandatory 100% coverage with a functional switcher.
*   **Identity**: No "dry" documents. Every element is part of a dynamic, interactive experience.

### Backend
- **Language**: Python 3.10+.
- **Framework**: FastAPI.
- **Protocol**: REST API with strict Pydantic v2 validation.
- *(See `03_backend_standard.md` for full backend details)*.

---

## 2. Debugging & Error Handling (VANILLA STANDARDS)
*   **Console Logging**: No lazy `console.log`. Use structured `debug.log()` helper that includes timestamp and file context.
*   **Error Boundaries**: Manual `try/catch` wrapper for all UI components.
*   **UI Notifications**: Custom, lightweight Toast system (Vanilla JS).

---

## 3. Legal & Integrity (Strict)
Trust is paramount. The Agent must adhere to high ethical standards.

### Mandatory Pages
Every website MUST include fully functional pages for:
1.  `/privacy-policy` (Privacy Policy)
2.  `/terms-of-service` (Terms of Service)
3.  `/contact` (Contact Us)

### Content Integrity (Zero Hallucinations)
*   **NEVER Invent Facts**: Do not fabricate founding years, employee names, awards, or specific metrics if they are not provided in the source material.
*   **Use Placeholders**: If data is missing, use clear placeholders like `[Insert Year]` or generic marketing copy ("Providing quality service for years") rather than specific lies ("Established in 2015").

---

## 4. Mandatory Features & Dynamic Identity
4.  **Kinetic Interactivity**: Web pages must react to the user. Implement mouse-aware movement, parallax effects, and smooth scrolls. 
4.  **Contextual Colors**: Transition colors and accents must be derived from the brand's industry and logo. Forbidden: Generic blue transitions if the site isn't blue.
5.  **Branded Scrollbar**: Standard scrollbars are forbidden. Must be custom-styled to match the palette.
6.  **Transition System**: Visual fades or logo reveals must occur when switching between sub-pages.
7.  **Atomic Intro**: Every initial load must have a unique entrance animation.
8.  **100% Content Exhaustion**: Every single word and image from `scrappedcontent.md` must be used.
9.  **Asset Quality (Minecraft-Free Zone)**: Blurry or low-resolution images (thumbnails) are strictly forbidden for Hero and Gallery items. Always use the highest resolution available.

---

## 5. Bilingual Support (SK/EN)
Every website must be fully bilingual from Day 1.

1.  **Language Switcher**: A visible toggle (SK | EN) must be present in the header/navigation.
2.  **Coverage**: 100% of visible text must be translatable. Hardcoded strings are forbidden.
3.  **Implementation**: Use `next-intl` or a robust i18n routing solution.

---

## 5. Feature Reporting (WIP Protocol)
If a requested feature cannot be fully implemented (e.g., missing Stripe API Key, missing Backend link):

1.  **Never Leave Dead Buttons**: A button must ALWAYS provide feedback.
2.  **Mock It**: Use a specific "Demo Mode" or Mock Data to show how the feature *would* work.
3.  **Report It**: Display a Toast message: *"Functionality not available in Demo Mode"* or *"Backend connection missing"*.
4.  **Agent Logic**: The Agent should only interrupt the user if blocked by a missing **credential** or **critical dependency**. For logic gaps, mock it.
## 6. Triple-Tier Responsiveness (Desktop, Tablet, Mobile)
Every website must be custom-tailored for three distinct device classes. It is not enough to simply scale down; the layout must be re-imagined for each tier:
1.  **Desktop (Wide)**: Focus on cinematic layouts, complex dynamics, and mouse-aware interactions.
2.  **Tablet (iPad/Tablet)**: Focus on touch-friendly targets, adjusted grids, and balanced spacing (Portrait & Landscape).
3.  **Mobile (Phone)**: A completely independent mobile experience. Menus, font sizes, and image placements must be rethinked to feel natural on a handheld device. 
*   **Verification**: Each tier must pass a dedicated usability and visual audit.

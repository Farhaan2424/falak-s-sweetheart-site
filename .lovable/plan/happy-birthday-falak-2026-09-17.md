# Happy Birthday Falak

## Goal
Build a single-page birthday experience that feels like a warm, handmade digital love letter, with all photos and video left as clearly labeled placeholders.

## Experience
- Open with “Happy Birthday Falak 💗”, a short tender message, and one ribbon-styled invitation to continue.
- Flow smoothly through six scrapbook photo placeholders, a framed video placeholder, an unfolded letter, and interactive “Reasons I love you” surprises.
- Finish with rising hearts and a restrained “Made with 💗” closing.
- Add discreet side navigation dots for jumping between sections and clear active-section feedback.

## Visual direction
- Use a soft light palette built around blush pink, rosewater, cream, and white.
- Pair Great Vibes for expressive headings with Nunito Sans for readable supporting text.
- Add a low-opacity crochet stitch texture, paper grain, soft shadows, rounded forms, and subtle ribbon/flower/heart doodles.
- Keep motion calm: slow floating decorations, section fade-and-rise reveals, button feedback, gentle photo lift, and a reduced-motion fallback.

## Interactions
- Smooth-scroll from the opening prompt and navigation dots.
- Reveal each content section as it enters view.
- Make reason cards keyboard-accessible and flip them on click to reveal placeholder messages.
- Include a small muted music control that clearly indicates no audio has been added yet.

## Technical details
- Build the page in the existing React and Tailwind setup at `/`.
- Define all colors, type, textures, shadows, and animation rules as reusable design tokens in the global stylesheet.
- Use semantic page structure, one H1, useful labels, mobile-first layouts, and page-specific social metadata.
- Verify the finished page at desktop and phone sizes, including section navigation and flip-card behavior.

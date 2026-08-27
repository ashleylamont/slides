---
name: ashl.dev
description: Personal editorial slides with warm serif type, deep aubergine, and restrained pink emphasis.
mode: dark
---

# ashl.dev

## Palette

| Role | Value | Notes |
| --- | --- | --- |
| bg | `#242432` | the single continuous background across the deck |
| text | `#d5cabd` | warm, low-glare primary copy |
| accent | `#e987e0` | a few important words, numbers, or marks |
| muted | `#9f9894` | supporting copy and page furniture |
| link | `#f3beeb` | links when the content genuinely contains one |
| line | `#625c68` | diagram edges and inactive node borders |

## Typography

- Display font: `"Rokkitt", Rockwell, Georgia, serif` — weight 700 for headlines; confident without feeling corporate.
- Body font: `"Rokkitt", Rockwell, Georgia, serif` — weight 400 for an open, conversational reading texture.
- Code font: `ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace` — weight 400; use the audience's familiar platform monospace rather than introducing another branded face.
- Webfont import: `https://fonts.googleapis.com/css2?family=Rokkitt:wght@400;700&display=swap` — real slides should load it once from module scope per `slide-authoring` webfont guidance.
- Type-scale overrides:
  - Hero title: 176 px.
  - Section heading: 112 px.
  - Page heading: 76 px.
  - Body text: 40 px.
  - Caption / label: 23 px.

### Code syntax palette

Syntax colour is a local semantic system for code, not permission to use more accent colour elsewhere on the slide.

| Token | Value | Treatment |
| --- | --- | --- |
| plain | `#d5cabd` | punctuation, operators, and ordinary identifiers |
| keyword | `#c7baf0` | language keywords such as `const`, `return`, and `async` |
| function | `#f3beeb` | the function currently being explained; use sparingly |
| type | `#9ed4c0` | types, interfaces, and class names |
| string | `#d8c58b` | string literals |
| number / boolean | `#e3a9b8` | numeric and boolean literals |
| comment | `#8f8995` | comments and deliberately de-emphasised code |

## Layout

- Content padding: 120 px from canvas edges (1920 × 1080).
- Alignment: centered for covers and closers; left-aligned for content.
- Grid notes: favor one strong statement or a quiet two-column composition. Let scale, alignment, and whitespace create structure instead of boxes, rules, labels, or decorative chrome.
- Background: keep every page on `#242432`. Do not introduce alternate panels or section backgrounds.
- Accent discipline: pink is optional, and many pages should use none. When it helps, choose one focal phrase, datum, node, or path—never all of them on the same page. Do not turn accent text into tags or badges unless the content itself is literally a tag.
- Pacing: default to short, rapid slides with one conversational beat each. A typical page carries 8–25 words; 40 is a ceiling, not a target. Split an explanation into a sequence of evolving states before compressing it into a summary slide.

### Information formats

Choose the format that matches the idea. These are defaults, not a requirement to use every format in a deck.

| Format | Default composition | Accent and density |
| --- | --- | --- |
| Cover / section break | Centered title and at most one plain sentence. A small muted note is optional, never automatic. | Accent one word at most. No kicker unless it carries real information. |
| Big statement | One statement at 112–150 px, left-aligned or centered, occupying no more than three lines. | Accent the turn in the sentence, not the whole sentence. |
| Explanation | Quiet 55/45 split: claim or heading on the left, one or two short paragraphs on the right. | Keep the supporting column under roughly 35 words. Use whitespace, not a divider. |
| List / takeaways | Page heading above 3–5 short items. Use small muted numbers only when sequence or priority matters. | No cards, pills, or a rule between every row. Accent only the current item if the list evolves on cue. |
| Comparison | Two equal text columns with parallel headings and matched baselines. | Differentiate with wording and one accent phrase; do not invent contrasting panel colours. |
| Process / timeline | Three to five steps in reading order, each with a muted number, short heading, and one sentence. | Use spacing to imply progression. Accent only the current step; add arrows only when direction would otherwise be ambiguous. |
| Metric / result | One oversized number or short result beside a concise explanation. | The number may be pink; everything around it stays quiet. One primary metric per page. |
| Quote / evidence | Quote at 64–80 px with a small muted attribution beneath it. | No giant quotation-mark decoration. Let the words be the visual. |
| Image / artefact | Image at roughly 55–65% of the canvas with a short text column or caption. | Use the image at its natural aspect ratio; no ornamental frame, shadow, or tinted panel. |
| Code | 28–34 px monospace, at most 12–16 visible lines, paired with a short heading or explanation. Apply the syntax palette with explicit token spans. | Keep the canvas background visible. Highlight only the line or token being discussed; avoid faux editor chrome unless the editor itself is the subject. |
| Architecture / system diagram | A small number of rectangular nodes on the canvas background, joined by quiet lines or arrows. | Inactive edges use `#625c68`; the current node or path uses pink. Labels use Rokkitt; literal identifiers use monospace. |
| Sequence / data flow | Arrange actors in reading order and reveal one meaningful interaction at a time. | Prefer stepped states or adjacent-page morphs over a permanently moving particle. Keep prior steps visible but muted when context matters. |
| Data / chart | Direct labels, a single visual question, and only the series needed to answer it. | Use parchment and muted tones for context, pink for the one series or datum under discussion. Avoid legends when labels fit directly. |
| Concept evolution | Two to five adjacent pages that preserve the same objects while adding, moving, or focusing one meaningful thing per beat. | Prefer this to a dense all-at-once diagram. Morph persistent objects; fade new context in on cue. |

Across formats, prefer one idea per page, 8–25 spoken words in the usual case, and a single obvious reading order. Do not add subtitles, labels, or microcopy merely to fill space.

## Fixed components

These are paste-ready. Copy them verbatim into a slide that uses this theme.

### Title

```tsx
const Title = ({ children }: { children: React.ReactNode }) => (
  <h1
    style={{
      fontFamily: '"Rokkitt", Rockwell, Georgia, serif',
      fontSize: 176,
      fontWeight: 700,
      lineHeight: 0.96,
      letterSpacing: '-0.025em',
      margin: 0,
      color: '#d5cabd',
    }}
  >
    {children}
  </h1>
);
```

### Footer

Pull the page number from `useSlidePageNumber()` — never hardcode `pageNum` / `total` props.

```tsx
import { useSlidePageNumber } from '@open-slide/core';

const Footer = () => {
  const { current, total } = useSlidePageNumber();
  return (
    <div
      style={{
        position: 'absolute',
        right: 120,
        bottom: 50,
        display: 'flex',
        justifyContent: 'flex-end',
        fontFamily: '"Rokkitt", Rockwell, Georgia, serif',
        fontSize: 23,
        color: '#9f9894',
      }}
    >
      <span>{current} / {total}</span>
    </div>
  );
};
```

### Eyebrow / accents

Use the eyebrow only for an occasional small aside or tiny cover note. It uses the body face, slightly italicised; omit it by default rather than making it a generic category label.

```tsx
const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      fontFamily: '"Rokkitt", Rockwell, Georgia, serif',
      fontSize: 26,
      fontWeight: 400,
      fontStyle: 'italic',
      color: '#9f9894',
    }}
  >
    {children}
  </div>
);
```

For inline emphasis, keep the treatment as simple as the site itself:

```tsx
const Accent = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: '#e987e0' }}>{children}</span>
);
```

For code, keep the canvas visually continuous and let syntax provide the structure:

```tsx
const CodeBlock = ({ children }: { children: React.ReactNode }) => (
  <pre
    style={{
      margin: 0,
      padding: 0,
      background: 'transparent',
      color: '#d5cabd',
      fontFamily: 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace',
      fontSize: 30,
      lineHeight: 1.55,
      tabSize: 2,
      whiteSpace: 'pre-wrap',
    }}
  >
    <code>{children}</code>
  </pre>
);
```

Use these token components inside `CodeBlock`. Wrap only the visible excerpt; do not add a runtime highlighter or dependency for a few lines of talk code.

```tsx
const Keyword = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: '#c7baf0' }}>{children}</span>
);

const FunctionName = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: '#f3beeb', fontWeight: 700 }}>{children}</span>
);

const TypeName = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: '#9ed4c0' }}>{children}</span>
);

const StringLiteral = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: '#d8c58b' }}>{children}</span>
);

const Literal = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: '#e3a9b8' }}>{children}</span>
);

const Comment = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: '#8f8995', fontStyle: 'italic' }}>{children}</span>
);
```

For progressive code explanation, preserve syntax colours and dim lines outside the current beat to 42% opacity. Do not recolour every focused line pink; the syntax and opacity change already create enough hierarchy.

## Motion

- Philosophy: rich but restrained, with a recognisable pulse — motion is frequent, brief, presenter-controlled, and attached to meaning. Objects arrive quickly, pass their resting point by a pixel or two, then settle cleanly. The result should feel alert and handmade, never elastic or bouncy.
- House transition: use a quick, slightly off-kilter settle for ordinary page changes. The whole page rises 8 px with a barely perceptible rotation, lands 1 px high, then clicks into place. This gives rapid pacing some personality without turning every cut into an event.

```tsx
import type { SlideTransition } from '@open-slide/core';

const EASE_SETTLE = 'cubic-bezier(0.16, 1, 0.3, 1)';
const EASE_IN = 'cubic-bezier(0.4, 0, 1, 1)';

export const transition: SlideTransition = {
  duration: 200,
  exit: {
    duration: 140,
    easing: EASE_IN,
    keyframes: [
      { opacity: 1, transform: 'translateY(0) rotate(0deg)' },
      { opacity: 0, transform: 'translateY(-3px) rotate(0.06deg)' },
    ],
  },
  enter: {
    duration: 240,
    delay: 60,
    easing: EASE_SETTLE,
    keyframes: [
      { opacity: 0, transform: 'translateY(8px) rotate(-0.12deg)', offset: 0 },
      { opacity: 1, transform: 'translateY(-1px) rotate(0.025deg)', offset: 0.76 },
      { opacity: 1, transform: 'translateY(0) rotate(0deg)', offset: 1 },
    ],
  },
};
```

- Internal reveals use the same small settle. Apply it to a new code line, diagram label, terminal result, or focused annotation—not to every ordinary paragraph.

```css
@keyframes ashlSettleIn {
  0%   { opacity: 0; transform: translateY(7px) scale(0.99); }
  72%  { opacity: 1; transform: translateY(-1px) scale(1.002); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}
```

- Use short 24–50 ms offsets when several related objects move together. A fan-out should ripple; a fan-in should answer it. Do not stagger ordinary prose.
- Edge drawing uses `cubic-bezier(0.55, 0.02, 0.22, 1)` so it gathers speed and lands decisively. Payload dots use `cubic-bezier(0.18, 0.86, 0.24, 1)` and may trail one another by roughly 40 ms.

- Interaction model: the presenter advances the idea. Prefer arrow-key-triggered steps and adjacent-page states over autoplay; no animation should keep moving while the presenter talks.
- Internal animation: a single statement or already-simple page appears fully composed. Technical explanations should evolve in response to presenter input.
- Stepped reveals: use whenever the audience should receive an idea, edge, example, or consequence on cue. Use the built-in 160 ms fade and keep `<Step>` as a direct child of `<Steps>`.

```tsx
import { Step, Steps } from '@open-slide/core';

<Steps>
  <Step duration={160}><div>First idea</div></Step>
  <Step duration={160}><div>Then the consequence</div></Step>
  <Step duration={160}><div>Finally, the point</div></Step>
</Steps>
```

- Data and diagrams: if progressive explanation genuinely helps, reveal whole meaningful groups rather than animating every mark. Do not animate chart bars simply because they exist.
- Diagram state changes: when the same node genuinely persists across adjacent pages, wrap it in `MorphElement` with the same unique id and use the morph transition below. Keep node geometry deterministic in pixels and do not put `transform` on the morph node.

```tsx
import { MorphElement, type Page, type SlideTransition, useIsActivePage } from '@open-slide/core';

const DIAGRAM_MORPH_MS = 560;

const diagramMorph: SlideTransition = {
  duration: 220,
  exit: {
    duration: 160,
    easing: EASE_IN,
    keyframes: [{ opacity: 1 }, { opacity: 0 }],
  },
  enter: {
    duration: 220,
    delay: 80,
    easing: EASE_SETTLE,
    keyframes: [{ opacity: 0 }, { opacity: 1 }],
  },
  morph: {
    duration: DIAGRAM_MORPH_MS,
    easing: 'cubic-bezier(0.18, 0.86, 0.24, 1)',
  },
};

const Overview: Page = () => (
  <MorphElement id="api-node">
    <div style={{ position: 'absolute', left: 760, top: 420, width: 400, height: 120 }}>
      API
    </div>
  </MorphElement>
);

const Detail: Page = () => {
  const animate = useIsActivePage();
  return (
    <>
      <style>{`@keyframes ashlSettleIn { 0% { opacity: 0; transform: translateY(7px) scale(.99); } 72% { opacity: 1; transform: translateY(-1px) scale(1.002); } 100% { opacity: 1; transform: translateY(0) scale(1); } }`}</style>
      <MorphElement id="api-node">
        <div style={{ position: 'absolute', left: 120, top: 140, width: 400, height: 120 }}>
          API
        </div>
      </MorphElement>
      <div style={{ animation: animate ? `ashlSettleIn 220ms ${EASE_SETTLE} ${DIAGRAM_MORPH_MS}ms both` : undefined }}>
        Detail revealed after the node lands
      </div>
    </>
  );
};

Overview.transition = diagramMorph;
Detail.transition = diagramMorph;
```

- Edge motion: draw or reveal a whole request, response, or dependency edge once, on cue. A brief one-shot pulse is fine when it clarifies direction. Do not loop travelling dots, pulse every node, or leave motion running while the presenter talks.
- Code motion: prefer a stepped line highlight or a morph from diagram node to implementation detail. Do not type code character-by-character or scroll a code block during the talk.
- Avoid slide pushes, zooms, rubbery bounce or repeated spring oscillation, blur, staggered entrances on ordinary text, and different transition vocabularies for different page formats. One tiny overshoot is the signature; a wobble is not.

## Aesthetic

Personal editorial: warm serif typography on one deep aubergine field, with just enough pink to reveal what matters. The voice is informal, direct, enthusiastic, and a little self-deprecating; prefer ordinary phrases such as “make stuff,” “cool projects,” and “I’m a massive nerd” over polished campaign language. The layout should feel handmade because of its judgment and phrasing, not because it imitates a retro browser. Keep decoration quieter than the content, and avoid gradients, alternate background panels, ornamental rules, pill-shaped labels, corporate polish, contrived taglines, or novelty font styling.

## Example usage

```tsx
const Cover: Page = () => (
  <div style={{ width: '100%', height: '100%', boxSizing: 'border-box', position: 'relative', background: '#242432', color: '#d5cabd', padding: 120, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
    <Title>Make cool things.</Title>
    <p style={{ maxWidth: 1040, margin: '38px 0 0', fontFamily: '"Rokkitt", Rockwell, Georgia, serif', fontSize: 40, lineHeight: 1.5, color: '#9f9894' }}>
      One interesting problem at a time.
    </p>
    <Footer />
  </div>
);
```

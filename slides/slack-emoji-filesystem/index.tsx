import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import {
  MorphElement,
  Step,
  Steps,
  useIsActivePage,
  useSlidePageNumber,
  type DesignSystem,
  type Page,
  type SlideMeta,
  type SlideTransition,
} from '@open-slide/core';
import ashleyPhoto from './assets/ashley-photo.jpg';
import atlassianLogo from './assets/Atlassian logo inverse RGB 2x.png';
import emojiCount from './assets/100k-emojis.png';
import bowserEmojis from './assets/bowser-emojis.jpg';
import bufoBowser from './assets/bufo-bowser.png';
import bufoBowserLossless from './assets/bufo-bowser-lossless.png';
import bratbucket from './assets/bratbucket.png';
import bufoCheese from './assets/bufo-cheese.png';
import chatgptLogo from './assets/chatgpt-logo-inverse.png';
import factorioFloppyDisks from './assets/factorio-floppy-disks-news-article.png';
import foreshadowing from './assets/foreshadowing.png';
import fuseWikipedia from './assets/fuse-wikipedia.png';
import googleLogo from './assets/google-logo.webp';
import imageToEmojiTool from './assets/image-to-emoji-tool.jpg';
import letMeMerge from './assets/let-me-merge-or-ill-shit-my-pants.png';
import noEmojiLimit from './assets/no-emoji-limit.png';
import shrekMovieEmojis from './assets/shrek-movie-emojis.png';
import slackApiAddEmoji from './assets/slack-api-add-emoji.png';
import slackEmojisMeme from './assets/slack-emojis-meme.png';
import emojiObjectExample from './assets/emoji-object-example.png';
import stathams from './assets/stathams.png';
import pythonFuseGithub from './assets/python-fuse-github.png';
import runningDoom from './assets/runningdoom.png';
import fuseSlackEmojiQr from './assets/fuse-slack-emoji-qr.png';
import talkSlidesQr from './assets/talk-slides-qr.png';
import pycharmLogo from './assets/pycharm.webp';
import pyreflyLogo from './assets/pyrefly-dark-lockup.png';

export const design: DesignSystem = {
  palette: { bg: '#242432', text: '#d5cabd', accent: '#e987e0' },
  fonts: {
    display: '"Rokkitt", Rockwell, Georgia, serif',
    body: '"Rokkitt", Rockwell, Georgia, serif',
  },
  typeScale: { hero: 176, body: 40 },
  radius: 0,
};

const FONT_HREF = 'https://fonts.googleapis.com/css2?family=Caveat:wght@600&family=Rokkitt:wght@400;700&display=swap';
const FONT_LINK_ID = 'osd-webfont-slack-emoji-filesystem';
if (typeof document !== 'undefined' && !document.getElementById(FONT_LINK_ID)) {
  const link = document.createElement('link');
  link.id = FONT_LINK_ID;
  link.rel = 'stylesheet';
  link.href = FONT_HREF;
  document.head.appendChild(link);
}

const muted = '#9f9894';
const line = '#625c68';
const lilac = '#c7baf0';
const green = '#9ed4c0';
const gold = '#d8c58b';
const pinkLight = '#f3beeb';
const APFS_SMALL_WRITE_MS = 1;
const SLACK_EMOJI_SMALL_WRITE_MS = 108_220;
const INITIAL_WRITE_SCALE_MS = 10;
const INITIAL_SLACK_BAR_WIDTH = 1_620;
const WRITE_PLOT_WIDTH = 1190;
const DOOM_INSTALL_CENTISECONDS = 1_358_694;
const EASE_SETTLE = 'cubic-bezier(0.16, 1, 0.3, 1)';
const EASE_IN = 'cubic-bezier(0.4, 0, 1, 1)';
const DIAGRAM_MORPH_MS = 560;

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
  morph: { duration: DIAGRAM_MORPH_MS, easing: 'cubic-bezier(0.18, 0.86, 0.24, 1)' },
};

const benchmarkZoom: SlideTransition = {
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
    keyframes: [{ opacity: 0, transform: 'scale(1.025)' }, { opacity: 1, transform: 'scale(1)' }],
  },
};

const base: CSSProperties = {
  width: '100%',
  height: '100%',
  boxSizing: 'border-box',
  position: 'relative',
  overflow: 'hidden',
  background: 'var(--osd-bg)',
  color: 'var(--osd-text)',
  fontFamily: 'var(--osd-font-body)',
};

const Title = ({ children, size = 176 }: { children: ReactNode; size?: number }) => (
  <h1
    style={{
      margin: 0,
      color: 'var(--osd-text)',
      fontFamily: 'var(--osd-font-display)',
      fontSize: size,
      fontWeight: 700,
      letterSpacing: '-0.025em',
      lineHeight: 0.96,
    }}
  >
    {children}
  </h1>
);

const Accent = ({ children }: { children: ReactNode }) => <span style={{ color: 'var(--osd-accent)' }}>{children}</span>;

const Eyebrow = ({ children }: { children: ReactNode }) => (
  <div style={{ color: muted, fontFamily: 'var(--osd-font-body)', fontSize: 26, fontStyle: 'italic' }}>
    {children}</div>
);

const Footer = () => {
  const { current, total } = useSlidePageNumber();
  return (
    <div
      style={{
        position: 'absolute',
        right: 120,
        bottom: 50,
        color: muted,
        fontSize: 23,
      }}
    >
      {current} / {total}
    </div>
  );
};

const formatCentiseconds = (centiseconds: number) => {
  const hours = Math.floor(centiseconds / 360_000);
  const minutes = Math.floor((centiseconds % 360_000) / 6_000);
  const seconds = Math.floor((centiseconds % 6_000) / 100);
  const hundredths = centiseconds % 100;
  return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(hundredths).padStart(2, '0')}`;
};

const DoomInstallClock = () => {
  const active = useIsActivePage();
  const [centiseconds, setCentiseconds] = useState(() => active ? 0 : DOOM_INSTALL_CENTISECONDS);

  useEffect(() => {
    if (!active) {
      setCentiseconds(DOOM_INSTALL_CENTISECONDS);
      return;
    }

    setCentiseconds(0);
    const startedAt = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / 2_200, 1);
      const eased = Math.sin((progress * Math.PI) / 2);
      setCentiseconds(Math.round(DOOM_INSTALL_CENTISECONDS * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active]);

  return <>{formatCentiseconds(centiseconds)}</>;
};

const TinyEmoji = ({ left, top, children, rotation = 0, size = 88 }: { left: number; top: number; children: string; rotation?: number; size?: number }) => (
  <div
    style={{
      position: 'absolute',
      left,
      top,
      width: size,
      height: size,
      display: 'grid',
      placeItems: 'center',
      fontSize: size * 0.54,
      transform: `rotate(${rotation}deg)`,
    }}
  >
    {children}
  </div>
);

const DoodleArrow = ({ left, top, width = 240, rotate = 0, reverse = false }: { left: number; top: number; width?: number; rotate?: number; reverse?: boolean }) => (
  <svg aria-hidden="true" width={width} height="110" viewBox={`0 0 ${width} 110`} style={{ position: 'absolute', left, top, transform: `rotate(${rotate}deg)`, transformOrigin: 'left center' }}>
    <defs>
      <marker id="doodle-arrowhead" viewBox="0 0 12 12" refX="10" refY="6" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M2 1 L10 6 L2 11" fill="none" stroke="var(--osd-accent)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </marker>
    </defs>
    <g transform={reverse ? `translate(${width} 0) scale(-1 1)` : undefined}>
      <path d={`M12 82 Q${width * 0.47} 24 ${width - 32} 42`} fill="none" stroke="var(--osd-accent)" strokeWidth="6" strokeLinecap="round" markerEnd="url(#doodle-arrowhead)" />
    </g>
  </svg>
);

const ForeshadowingIndicator = () => (
  <div style={{ position: 'absolute', right: 108, top: 86, width: 220, height: 220 }}>
    <img src={foreshadowing} alt="Hbomberguy explaining foreshadowing" style={{ width: 220, height: 220, objectFit: 'cover' }} />
  </div>
);

const Tick = ({ children }: { children: ReactNode }) => (
  <div style={{ display: 'flex', alignItems: 'baseline', gap: 26, fontSize: 60, lineHeight: 1.05 }}>
    <span style={{ color: 'var(--osd-accent)', fontSize: 72 }}>✓</span>
    <span>{children}</span>
  </div>
);

const SearchResult = ({ top, url, title, detail }: { top: number; url: string; title: string; detail: string }) => (
  <div style={{ position: 'absolute', left: 280, top, width: 1320, fontFamily: 'Arial, Helvetica, sans-serif' }}>
    <div style={{ color: '#b8b8b8', fontSize: 25 }}>{url}</div>
    <div style={{ marginTop: 7, color: '#8ab4f8', fontSize: 42, lineHeight: 1.08 }}>{title}</div>
    <div style={{ marginTop: 12, color: '#d5cabd', fontSize: 28, lineHeight: 1.3 }}>{detail}</div>
  </div>
);

const qrPath = (seed: number) => {
  let state = seed >>> 0;
  let path = '';
  const inFinder = (x: number, y: number) => (
    (x < 8 && y < 8) || (x > 16 && y < 8) || (x < 8 && y > 16)
  );
  for (let y = 0; y < 25; y += 1) {
    for (let x = 0; x < 25; x += 1) {
      state = (state * 1_664_525 + 1_013_904_223) >>> 0;
      if (!inFinder(x, y) && (state >>> 30) > 1) path += `M${x} ${y}h1v1h-1z`;
    }
  }
  return path;
};

const QrFinder = ({ x, y }: { x: number; y: number }) => (
  <>
    <rect x={x} y={y} width="7" height="7" fill="#242432" />
    <rect x={x + 1} y={y + 1} width="5" height="5" fill="#f7f2e8" />
    <rect x={x + 2} y={y + 2} width="3" height="3" fill="#242432" />
  </>
);

const DataQr = ({ left, top, label, seed, rotation = 0 }: { left: number; top: number; label: string; seed: number; rotation?: number }) => (
  <div style={{ position: 'absolute', left, top, width: 220, transform: `rotate(${rotation}deg)` }}>
    <svg aria-label={`QR-style data chunk: ${label}`} viewBox="0 0 25 25" style={{ display: 'block', width: 220, height: 220, background: '#f7f2e8' }}>
      <path d={qrPath(seed)} fill="#242432" />
      <QrFinder x={0} y={0} />
      <QrFinder x={18} y={0} />
      <QrFinder x={0} y={18} />
    </svg>
    <div style={{ marginTop: 18, color: muted, fontFamily: 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace', fontSize: 23, textAlign: 'center' }}>{label}</div>
  </div>
);

const QrLink = ({
  href,
  qr,
  alt,
  path,
  emojiName,
  note,
  accent,
  rotation,
  captionSide,
}: {
  href: string;
  qr: string;
  alt: string;
  path: string;
  emojiName: string;
  note: string;
  accent: string;
  rotation: number;
  captionSide: 'left' | 'right';
}) => (
  <a
    href={href}
    style={{
      display: 'block',
      width: 340,
      color: 'inherit',
      position: 'relative',
      textAlign: 'center',
      textDecoration: 'none',
      transform: `rotate(${rotation}deg)`,
    }}
  >
    <div style={{ marginBottom: 17, color: accent, fontFamily: 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace', fontSize: 29, fontWeight: 700 }}>{path}</div>
    <div style={{ position: 'relative', width: 300, height: 300, margin: '0 auto' }}>
      <img src={qr} alt={alt} style={{ position: 'relative', display: 'block', width: 300, height: 300 }} />
      <div aria-hidden="true" style={{ position: 'absolute', left: -12, top: -12, width: 48, height: 48, borderLeft: `6px solid ${accent}`, borderTop: `6px solid ${accent}` }} />
      <div aria-hidden="true" style={{ position: 'absolute', right: -12, bottom: -12, width: 48, height: 48, borderRight: `6px solid ${accent}`, borderBottom: `6px solid ${accent}` }} />
    </div>
    <div style={{ marginTop: 22, color: muted, fontFamily: 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace', fontSize: 23 }}>{emojiName}</div>
    <div
      style={{
        position: 'absolute',
        left: captionSide === 'left' ? -440 : 480,
        top: 390,
        width: 300,
        color: 'var(--osd-text)',
        fontFamily: '"Caveat", "Bradley Hand", cursive',
        fontSize: 36,
        fontWeight: 600,
        lineHeight: 1,
        textAlign: captionSide === 'left' ? 'right' : 'left',
        whiteSpace: 'nowrap',
      }}
    >
      {note}
    </div>
    <svg
      aria-hidden="true"
      width="150"
      height="170"
      viewBox="0 0 150 170"
      style={{ position: 'absolute', left: captionSide === 'left' ? -140 : 330, top: 240, overflow: 'visible' }}
    >
      <defs>
        <marker id={`qr-caption-arrow-${captionSide}`} viewBox="0 0 12 12" refX="10" refY="6" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M2 1 L10 6 L2 11" fill="none" stroke={accent} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
      </defs>
      <g transform={captionSide === 'right' ? 'translate(150 0) scale(-1 1)' : undefined}>
        <path
          d="M10 150 C20 108 42 72 78 64 C101 58 124 60 148 60"
          fill="none"
          stroke={accent}
          strokeWidth="5"
          strokeLinecap="round"
          markerEnd={`url(#qr-caption-arrow-${captionSide})`}
        />
      </g>
    </svg>
  </a>
);

const Arrow = ({ left, top, width = 116, rotate = 0, pink = false }: { left: number; top: number; width?: number; rotate?: number; pink?: boolean }) => (
  <svg aria-hidden="true" width={width} height="32" viewBox={`0 0 ${width} 32`} style={{ position: 'absolute', left, top: top - 16, transform: `rotate(${rotate}deg)`, transformOrigin: 'left center' }}>
    <defs>
      <marker id={pink ? 'arrowhead-pink' : 'arrowhead-muted'} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
        <path d="M1 1 L8 5 L1 9" fill="none" stroke={pink ? '#e987e0' : line} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </marker>
    </defs>
    <path d={`M2 16 H${width - 16}`} fill="none" stroke={pink ? '#e987e0' : line} strokeWidth="3" strokeLinecap="round" markerEnd={`url(#${pink ? 'arrowhead-pink' : 'arrowhead-muted'})`} />
  </svg>
);

const RetiringScaleTick = ({ label, left, leaving }: { label: string; left: number; leaving: boolean }) => (
  <div
    style={{
      position: 'absolute',
      left,
      bottom: -54,
      color: muted,
      fontSize: 26,
      whiteSpace: 'nowrap',
      opacity: leaving ? 0 : 1,
      transform: leaving ? `translateX(${-left * 0.9}px) scale(0.55)` : 'translateX(0) scale(1)',
      transformOrigin: 'left center',
      transition: 'transform 620ms cubic-bezier(0.65, 0, 0.35, 1), opacity 340ms ease-in 280ms',
    }}
  >
    {label}
  </div>
);

const ArrivingScaleTick = ({ label, left, right, arrived }: { label: string; left?: number; right?: number; arrived: boolean }) => (
  <div
    style={{
      position: 'absolute',
      left,
      right,
      bottom: -54,
      color: muted,
      fontSize: 26,
      whiteSpace: 'nowrap',
      opacity: arrived ? 1 : 0,
      transform: arrived ? 'translateX(0)' : 'translateX(260px)',
      transition: 'transform 620ms cubic-bezier(0.16, 1, 0.3, 1) 480ms, opacity 180ms ease-out 480ms',
    }}
  >
    {label}
  </div>
);

const ObjectNode = ({
  id,
  left,
  top,
  width,
  height = 124,
  label,
  detail,
  active = false,
  dim = false,
}: {
  id?: string;
  left: number;
  top: number;
  width: number;
  height?: number;
  label: string;
  detail: string;
  active?: boolean;
  dim?: boolean;
}) => {
  const node = (
    <div
      style={{
        position: 'absolute',
        left,
        top,
        width,
        height,
        boxSizing: 'border-box',
        padding: '20px 26px',
        background: 'var(--osd-bg)',
        border: `2px solid ${active ? '#e987e0' : line}`,
        color: active ? '#e987e0' : 'var(--osd-text)',
        opacity: dim ? 0.36 : 1,
      }}
    >
      <div style={{ fontSize: 34, fontWeight: 700, lineHeight: 1 }}>{label}</div>
      <div style={{ marginTop: 12, color: muted, fontFamily: 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace', fontSize: 19 }}>{detail}</div>
    </div>
  );
  return id ? <MorphElement id={id}>{node}</MorphElement> : node;
};

const Cover: Page = () => (
  <div style={{ ...base, padding: 120, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
    <Eyebrow>PyCon AU 2026</Eyebrow>
    <div style={{ height: 30 }} />
    <Title size={124}>Is storing files in<br />Slack emojis a bad idea?<br />Maybe. <Accent>Let’s do it anyway!</Accent></Title>
    <TinyEmoji left={250} top={182} rotation={-8}>💾</TinyEmoji>
    <TinyEmoji left={1562} top={760} rotation={6}>🫠</TinyEmoji>
    <Footer />
  </div>
);

const SetTheScene: Page = () => <div style={base} />;

const AboutMe: Page = () => (
  <div style={{ ...base, padding: 120 }}>
    <Title size={166}>G’day,<br />I’m Ashley.</Title>
    <div style={{ position: 'absolute', left: 980, top: 150, width: 620, height: 700 }}>
      <img src={ashleyPhoto} alt="Ashley speaking" style={{ width: 620, height: 700, objectFit: 'cover' }} />
    </div>
    <Footer />
  </div>
);

const Atlassian: Page = () => (
  <div style={{ ...base, padding: 120 }}>
    <div style={{ position: 'absolute', left: 190, top: 405, width: 660, height: 120 }}>
      <img src={atlassianLogo} alt="Atlassian" style={{ width: 660, height: 120, objectFit: 'contain' }} />
    </div>
    <DoodleArrow left={780} top={340} width={265} rotate={-7} reverse />
    <div style={{ position: 'absolute', left: 1070, top: 355, fontSize: 74, fontStyle: 'italic', lineHeight: 0.95, transform: 'rotate(-4deg)' }}>
      The Jira<br />people
    </div>
    <Footer />
  </div>
);

const EmojiShitposting: Page = () => (
  <div style={{ ...base, padding: 120 }}>
    <div style={{ position: 'absolute', left: 130, top: 150, width: 650, height: 780 }}>
      <img src={imageToEmojiTool} alt="An emoji-art conversion tool" style={{ width: 650, height: 780, objectFit: 'cover' }} />
    </div>
    <Steps>
      <Step duration={170}>
        <div style={{ position: 'absolute', left: 850, top: 150, width: 820, height: 350 }}>
          <img src={stathams} alt="A grid of custom Slack emoji" style={{ width: 820, height: 350, objectFit: 'contain' }} />
        </div>
      </Step>
      <Step duration={170}>
        <div style={{ position: 'absolute', left: 850, top: 570, width: 300, height: 260 }}>
          <img src={letMeMerge} alt="The let-me-merge-or-I'll-shit-my-pants emoji" style={{ width: 300, height: 260, objectFit: 'contain' }} />
        </div>
      </Step>
      <Step duration={170}>
        <div style={{ position: 'absolute', left: 1190, top: 575, width: 190, height: 245 }}>
          <img src={bratbucket} alt="The bratbucket custom emoji" style={{ width: 190, height: 245, objectFit: 'contain' }} />
        </div>
      </Step>
      <Step duration={170}>
        <div style={{ position: 'absolute', left: 1420, top: 575, width: 250, height: 245 }}>
          <img src={bufoCheese} alt="The Bufo cheese custom emoji" style={{ width: 250, height: 245, objectFit: 'contain' }} />
        </div>
      </Step>
    </Steps>
    <Footer />
  </div>
);

const AtlassianEmoji: Page = () => (
  <div style={{ ...base, padding: 120 }}>
    <div style={{ width: 620, paddingTop: 95 }}>
      <Title size={136}><Accent>100,000+</Accent><br />custom emoji.</Title>
    </div>
    <div style={{ position: 'absolute', left: 125, top: 645, width: 590, height: 270 }}>
      <img src={emojiCount} alt="116,816 custom emoji" style={{ width: 590, height: 270, objectFit: 'contain', objectPosition: 'left center' }} />
    </div>
    <div style={{ position: 'absolute', left: 930, top: 130, width: 710, height: 790 }}>
      <img src={bowserEmojis} alt="A large custom-emoji mosaic in Slack" style={{ width: 710, height: 790, objectFit: 'cover', objectPosition: 'center top' }} />
    </div>
    <Footer />
  </div>
);

const CanvaEmojis: Page = () => (
  <div style={{ ...base, padding: 120 }}>
    <div style={{ position: 'absolute', left: 160, top: 135, width: 1210, height: 800 }}>
      <img src={shrekMovieEmojis} alt="Canva Slack workflow playing Shrek in custom emoji" style={{ width: 1210, height: 800, objectFit: 'contain' }} />
    </div>
    <Footer />
  </div>
);

const Foreshadowing: Page = () => (
  <div style={{ ...base, padding: 120 }}>
    <Title size={136}>This means I’m<br /><Accent>foreshadowing.</Accent></Title>
    <ForeshadowingIndicator />
    <Footer />
  </div>
);

const CanvaForeshadowed: Page = () => (
  <div style={{ ...base, padding: 120 }}>
    <div style={{ position: 'absolute', left: 120, top: 155, width: 1120, height: 760 }}>
      <img src={shrekMovieEmojis} alt="Canva Slack workflow playing Shrek in custom emoji" style={{ width: 1120, height: 760, objectFit: 'contain' }} />
    </div>
    <div style={{ position: 'absolute', right: 105, bottom: 120, width: 520, height: 180 }}>
      <img src={slackApiAddEmoji} alt="Slack admin.emoji.add API documentation" style={{ width: 520, height: 180, objectFit: 'contain' }} />
    </div>
    <Steps>
      <Step duration={170}><ForeshadowingIndicator /></Step>
    </Steps>
    <Footer />
  </div>
);

const LeaveCanva: Page = () => <div style={base} />;

const NaturalQuestion: Page = () => (
  <div style={{ ...base, padding: 120 }}>
    <Title size={130}>Is there a limit?</Title>
    <div style={{ position: 'absolute', left: 520, top: 310, width: 1050, height: 560 }}>
      <img src={noEmojiLimit} alt="Source stating there is no limit to the number of custom emoji" style={{ width: 1050, height: 560, objectFit: 'contain' }} />
    </div>
    <Steps>
      <Step duration={170}><ForeshadowingIndicator /></Step>
    </Steps>
    <Footer />
  </div>
);

const InfiniteData: Page = () => (
  <div style={{ ...base, padding: 120 }}>
    <Title size={170}>Infinite <Accent>data?</Accent></Title>
    <DoodleArrow left={800} top={405} width={330} rotate={2} />
    <TinyEmoji left={1190} top={355} rotation={-9} size={160}>🧠</TinyEmoji>
    <TinyEmoji left={1370} top={395} rotation={8} size={150}>🪿</TinyEmoji>
    <TinyEmoji left={1285} top={545} rotation={-3} size={165}>🪩</TinyEmoji>
    <TinyEmoji left={1470} top={560} rotation={7} size={130}>🍑</TinyEmoji>
    <Footer />
  </div>
);

const DodgyStorage: Page = () => (
  <div style={{ ...base, padding: 120 }}>
    <Title size={118}>We could just use<br /><Accent>QR codes.</Accent></Title>
    <DataQr left={900} top={270} label="data-part-1" seed={17} rotation={-5} />
    <DataQr left={1165} top={225} label="data-part-2" seed={42} rotation={3} />
    <DataQr left={1430} top={340} label="data-part-3" seed={69} rotation={-2} />
    <Footer />
  </div>
);

const LosslessEmoji: Page = () => (
  <div style={{ ...base, padding: 120 }}>
    <Title size={124}>The pixels come back<br /><Accent>unchanged.</Accent></Title>
    <div style={{ position: 'absolute', left: 160, top: 445, width: 230, height: 230 }}>
      <img src={bufoBowser} alt="Bufo Bowser before lossless PNG compression" style={{ width: 230, height: 230, imageRendering: 'pixelated' }} />
    </div>
    <div style={{ position: 'absolute', left: 445, top: 514, color: 'var(--osd-accent)', fontSize: 92, fontWeight: 700 }}>=</div>
    <div style={{ position: 'absolute', left: 590, top: 445, width: 230, height: 230 }}>
      <img src={bufoBowserLossless} alt="Bufo Bowser after lossless PNG compression" style={{ width: 230, height: 230, imageRendering: 'pixelated' }} />
    </div>
    <div style={{ position: 'absolute', left: 160, top: 718, width: 660, display: 'flex', justifyContent: 'space-between', color: muted, fontFamily: 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace', fontSize: 25 }}>
      <span>bufo-bowser.png</span>
      <span>:bufo-bowser:</span>
    </div>
    <div style={{ position: 'absolute', left: 990, top: 420, color: 'var(--osd-text)', fontFamily: 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace', fontSize: 30, lineHeight: 1.5, whiteSpace: 'pre' }}>
      {'$ compare -metric AE \\\n  bufo-bowser.png \\\n  bufo-bowser-lossless.png null:\n\n0 (0)'}
    </div>
    <div style={{ position: 'absolute', left: 990, top: 690, color: 'var(--osd-accent)', fontSize: 46, fontWeight: 700 }}>
      0 differing pixels
    </div>
    <Footer />
  </div>
);

const Meanwhile: Page = () => (
  <div style={{ ...base, padding: 120 }}>
    <div style={{ width: 690, paddingTop: 130 }}>
      <Title size={132}>A FUSE filesystem running <Accent>Factorio</Accent> from floppy disks.</Title>
    </div>
    <div style={{ position: 'absolute', left: 930, top: 150, width: 720, height: 640 }}>
      <img src={factorioFloppyDisks} alt="Article screenshot about running Factorio from floppy disks" style={{ width: 720, height: 640, objectFit: 'contain' }} />
    </div>
    <Footer />
  </div>
);

const Collision: Page = () => (
  <div style={{ ...base, padding: 120 }}>
    <Title size={126}>We have all the<br /><Accent>ingredients.</Accent></Title>
    <Steps>
      <Step duration={170}><div style={{ position: 'absolute', left: 170, top: 470 }}><Tick>same data back</Tick></div></Step>
      <Step duration={170}><div style={{ position: 'absolute', left: 170, top: 600 }}><Tick>as many as we need</Tick></div></Step>
      <Step duration={170}><div style={{ position: 'absolute', left: 170, top: 730 }}><Tick>create via API</Tick></div></Step>
      <Step duration={170}><ForeshadowingIndicator /></Step>
    </Steps>
    <Footer />
  </div>
);

const FilesystemsAreHard: Page = () => (
  <div style={{ ...base, padding: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
    <Title size={174}>Filesystems are<br /><Accent>hard.</Accent></Title>
    <Footer />
  </div>
);

const GoogleFilesystem: Page = () => (
  <div style={{ ...base, padding: 120 }}>
    <img src={googleLogo} alt="Google" style={{ position: 'absolute', left: 250, top: 70, width: 360, height: 122, objectFit: 'contain', objectPosition: 'left top' }} />
    <div style={{ position: 'absolute', left: 250, top: 258, width: 1420, height: 92, boxSizing: 'border-box', padding: '20px 32px', border: '2px solid #77737d', borderRadius: 52, color: '#e8eaed', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: 42 }}>
      how to make a filesystem
    </div>
    <Steps>
      <Step duration={170}><SearchResult top={438} url="cs.university.edu / courses / fs-301" title="File Systems — lecture notes" detail="Fifty pages of scans from 1997." /></Step>
      <Step duration={170}><SearchResult top={605} url="youtube.com" title="Build a filesystem from scratch (8 hours)" detail="1,204,916 views · Part 1 of 47." /></Step>
      <Step duration={170}><SearchResult top={772} url="some-personal-blog.net" title="How to make a filesystem" detail="Step 1: make a filesystem." /></Step>
    </Steps>
    <Footer />
  </div>
);

const ChatGptFilesystem: Page = () => (
  <div style={{ ...base, padding: 120 }}>
    <img src={chatgptLogo} alt="ChatGPT" style={{ position: 'absolute', left: 84, top: 98, width: 155, height: 42, objectFit: 'contain', objectPosition: 'left center' }} />
    <div style={{ position: 'absolute', left: 302, top: 70, height: 940, borderLeft: `1px solid ${line}`, opacity: 0.7 }} />
    <div style={{ position: 'absolute', left: 86, top: 190, color: muted, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: 25 }}>✎&nbsp;&nbsp; New chat</div>
    <div style={{ position: 'absolute', left: 86, top: 267, color: muted, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: 25 }}>▤&nbsp;&nbsp; Library</div>
    <div style={{ position: 'absolute', left: 86, top: 344, color: muted, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: 25 }}>◷&nbsp;&nbsp; Scheduled</div>
    <div style={{ position: 'absolute', left: 366, top: 95, width: 1170, textAlign: 'center', color: muted, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: 23 }}>Chat</div>
    <div style={{ position: 'absolute', right: 220, top: 182, padding: '17px 25px', borderRadius: 34, background: 'rgba(233, 135, 224, 0.15)', color: 'var(--osd-text)', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: 31 }}>
      how do I make a filesystem?
    </div>
    <Steps>
      <Step duration={180}>
        <div style={{ position: 'absolute', left: 500, top: 368, width: 1030, color: '#f2f2f2', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: 52, lineHeight: 1.23 }}>You’re absolutely right.</div>
      </Step>
      <Step duration={180}>
        <div style={{ position: 'absolute', left: 500, top: 462, width: 1030, color: '#f2f2f2', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: 52, lineHeight: 1.23 }}>That’s a <Accent>f*cking massive</Accent> question though.</div>
      </Step>
      <Step duration={180}>
        <div style={{ position: 'absolute', left: 500, top: 610, color: muted, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: 43 }}>maybe start with <Accent>FUSE?</Accent></div>
      </Step>
    </Steps>
    <div style={{ position: 'absolute', left: 510, bottom: 105, width: 1040, height: 76, boxSizing: 'border-box', padding: '23px 28px', border: `1px solid ${line}`, borderRadius: 40, color: muted, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: 25 }}>
      Ask ChatGPT
      <span style={{ float: 'right', color: 'var(--osd-accent)', fontSize: 31, lineHeight: '24px' }}>↑</span>
    </div>
    <Footer />
  </div>
);

const WhatIsFuse: Page = () => (
  <div style={{ ...base, padding: 120 }}>
    <Title size={128}>What is <Accent>FUSE?</Accent></Title>
    <div style={{ position: 'absolute', left: 180, top: 290, width: 1560, height: 630 }}>
      <img src={fuseWikipedia} alt="Wikipedia article for Filesystem in Userspace" style={{ width: 1560, height: 630, objectFit: 'contain', objectPosition: 'left top' }} />
    </div>
    <Footer />
  </div>
);

const PythonFuse: Page = () => (
  <div style={{ ...base, padding: 120 }}>
    <Title size={128}>Python <Accent>FUSE.</Accent></Title>
    <div style={{ position: 'absolute', left: 180, top: 290, width: 1560, height: 630 }}>
      <img src={pythonFuseGithub} alt="fuse-python GitHub repository" style={{ width: 1560, height: 630, objectFit: 'contain', objectPosition: 'left top' }} />
    </div>
    <Footer />
  </div>
);

const Result: Page = () => (
  <div style={{ ...base, padding: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
    <Title size={166}>Let’s make a file.</Title>
    <Footer />
  </div>
);

const FilesystemOperations: Page = () => (
  <div style={{ ...base, padding: 120 }}>
    <Title size={108}>A filesystem answers<br /><Accent>questions.</Accent></Title>
    <Steps>
      <Step duration={170}>
        <div style={{ position: 'absolute', left: 170, top: 395, fontSize: 56 }}>
          What is at this path? <span style={{ marginLeft: 24, color: pinkLight, fontFamily: 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace', fontSize: 38 }}>(getattr)</span>
        </div>
      </Step>
      <Step duration={170}>
        <div style={{ position: 'absolute', left: 170, top: 525, fontSize: 56 }}>
          What’s in this folder? <span style={{ marginLeft: 24, color: pinkLight, fontFamily: 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace', fontSize: 38 }}>(readdir)</span>
        </div>
      </Step>
      <Step duration={170}>
        <div style={{ position: 'absolute', left: 170, top: 655, fontSize: 56 }}>
          What’s in this file? <span style={{ marginLeft: 24, color: pinkLight, fontFamily: 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace', fontSize: 38 }}>(read)</span>
        </div>
      </Step>
      <Step duration={170}>
        <div style={{ position: 'absolute', left: 170, top: 785, fontSize: 56 }}>
          Put these bytes in this file. <span style={{ marginLeft: 24, color: pinkLight, fontFamily: 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace', fontSize: 38 }}>(write)</span>
        </div>
      </Step>
    </Steps>
    <Footer />
  </div>
);

const PathCallout = ({ left, width, label }: { left: number; width: number; label: string }) => (
  <div style={{ position: 'absolute', left, top: 520, width, height: 140, textAlign: 'center', color: muted }}>
    <svg aria-hidden="true" width={width} height="82" viewBox={`0 0 ${width} 82`} style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }}>
      <defs>
        <marker id="path-callout-arrow" viewBox="0 0 12 12" refX="8" refY="6" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M2 1 L10 6 L2 11" fill="none" stroke="var(--osd-accent)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
      </defs>
      <path d={`M${width / 2} 78 V10`} fill="none" stroke="var(--osd-accent)" strokeWidth="3" strokeLinecap="round" markerEnd="url(#path-callout-arrow)" />
    </svg>
    <div style={{ position: 'absolute', left: 0, right: 0, top: 95, fontSize: 34 }}>{label}</div>
  </div>
);

const PathToken = ({ id, left, top, width, height, fontSize, label, color = pinkLight }: { id: string; left: number; top: number; width: number; height: number; fontSize: number; label: string; color?: string }) => (
  <MorphElement id={id}>
    <div style={{ position: 'absolute', left, top, width, height, display: 'grid', placeItems: 'center', color, fontFamily: 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace', fontSize, lineHeight: 1, whiteSpace: 'nowrap' }}>
      {label}
    </div>
  </MorphElement>
);

const TreeArrow = ({ left, top, height, mutedArrow = false, className }: { left: number; top: number; height: number; mutedArrow?: boolean; className?: string }) => {
  const color = mutedArrow ? muted : 'var(--osd-accent)';
  const markerId = mutedArrow ? 'tree-arrowhead-muted' : 'tree-arrowhead-accent';
  return (
  <svg aria-hidden="true" className={className} width="16" height={height} viewBox={`0 0 16 ${height}`} style={{ position: 'absolute', left, top, overflow: 'visible' }}>
    <defs>
      <marker id={markerId} viewBox="0 0 12 12" refX="8" refY="6" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M2 1 L10 6 L2 11" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </marker>
    </defs>
    <path d={`M8 0 V${height - 8}`} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" markerEnd={`url(#${markerId})`} />
  </svg>
  );
};

const FilesystemNode = ({ id, left, top, label, kind, accent = false }: { id: string; left: number; top: number; label: string; kind: string; accent?: boolean }) => (
  <MorphElement id={id}>
    <div style={{ position: 'absolute', left, top, width: 260, height: 108, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace' }}>
      <div style={{ color: accent ? 'var(--osd-accent)' : 'var(--osd-text)', fontSize: 46, lineHeight: 1, whiteSpace: 'nowrap' }}>{label}</div>
      <div style={{ marginTop: 13, color: muted, fontSize: 22, letterSpacing: '0.08em' }}>{kind}</div>
    </div>
  </MorphElement>
);

const InodeTypeAnnotation = ({ top, type }: { top: number; type: string }) => (
  <div style={{ position: 'absolute', left: 1134, top, display: 'flex', gap: 12, fontFamily: 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace', fontSize: 23, whiteSpace: 'nowrap' }}>
    <span style={{ color: muted }}>inode type</span>
    <span style={{ color: pinkLight }}>{type}</span>
  </div>
);

const FilesystemLink = ({ left, top, width, label }: { left: number; top: number; width: number; label?: string }) => (
  <div style={{ position: 'absolute', left, top, width, height: 90 }}>
    {label && <div style={{ position: 'absolute', left: 0, right: 0, top: 0, color: pinkLight, textAlign: 'center', fontFamily: 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace', fontSize: 25 }}>{label}</div>}
    <svg aria-hidden="true" width={width} height="32" viewBox={`0 0 ${width} 32`} style={{ position: 'absolute', left: 0, top: label ? 38 : 22 }}>
      <defs>
        <marker id="filesystem-link-arrow" viewBox="0 0 12 12" refX="9" refY="6" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M2 1 L10 6 L2 11" fill="none" stroke="var(--osd-accent)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
      </defs>
      <path d={`M4 16 H${width - 14}`} fill="none" stroke="var(--osd-accent)" strokeWidth="3" strokeLinecap="round" markerEnd="url(#filesystem-link-arrow)" />
    </svg>
  </div>
);

const DataChunk = ({ left, top, label, className, fontSize = 32 }: { left: number; top: number; label: string; className?: string; fontSize?: number }) => (
  <div className={className} style={{ position: 'absolute', left, top, width: 200, textAlign: 'center', fontFamily: 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace' }}>
    <div className={className ? 'object-tree-pop' : undefined}>
      <div style={{ color: 'var(--osd-text)', fontSize }}>{label}</div>
      <div style={{ marginTop: 8, color: muted, fontSize: 19, letterSpacing: '0.08em' }}>DAT</div>
    </div>
  </div>
);

const ObjectTreeNode = ({
  left,
  top,
  label,
  kind,
  accent = false,
  width = 260,
  className,
}: {
  left: number;
  top: number;
  label: string;
  kind: string;
  accent?: boolean;
  width?: number;
  className?: string;
}) => (
  <div
    className={className}
    style={{
      position: 'absolute',
      left,
      top,
      width,
      height: 108,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace',
    }}
  >
    <div className={className ? 'object-tree-pop' : undefined}>
      <div style={{ color: accent ? 'var(--osd-accent)' : 'var(--osd-text)', fontSize: label === 'directory entries' ? 31 : 42, lineHeight: 1, whiteSpace: 'nowrap' }}>{label}</div>
      <div style={{ marginTop: 13, color: muted, fontSize: 21, letterSpacing: '0.08em' }}>{kind}</div>
    </div>
  </div>
);

const BranchingTreeLinks = ({ showDirectory = true, showFile = true }: { showDirectory?: boolean; showFile?: boolean }) => (
  <svg aria-hidden="true" width="800" height="82" viewBox="0 0 800 82" style={{ position: 'absolute', left: 560, top: 538, overflow: 'visible' }}>
    <defs>
      <marker id="object-tree-branch-arrow" viewBox="0 0 12 12" refX="8" refY="6" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M2 1 L10 6 L2 11" fill="none" stroke="var(--osd-accent)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </marker>
    </defs>
    {showDirectory && <path d="M400 0 V52 H0 V74" fill="none" stroke="var(--osd-accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" markerEnd="url(#object-tree-branch-arrow)" />}
    {showFile && <path d="M400 0 V52 H760 V74" fill="none" stroke="var(--osd-accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" markerEnd="url(#object-tree-branch-arrow)" />}
  </svg>
);

const ChunkTreeLinks = () => (
  <svg aria-hidden="true" width="800" height="132" viewBox="0 0 800 132" style={{ position: 'absolute', left: 770, top: 728, overflow: 'visible' }}>
    <defs>
      <marker id="object-tree-chunk-arrow" viewBox="0 0 12 12" refX="8" refY="6" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M2 1 L10 6 L2 11" fill="none" stroke="var(--osd-accent)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </marker>
    </defs>
    <path d="M550 0 V60 H320 V124" fill="none" stroke="var(--osd-accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" markerEnd="url(#object-tree-chunk-arrow)" />
    <path d="M550 0 V60 H520 V124" fill="none" stroke="var(--osd-accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" markerEnd="url(#object-tree-chunk-arrow)" />
    <path d="M550 0 V60 H720 V124" fill="none" stroke="var(--osd-accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" markerEnd="url(#object-tree-chunk-arrow)" />
  </svg>
);

const FamiliarPath: Page = () => (
  <div style={{ ...base, padding: 120 }}>
    <PathToken id="path-mount" left={180} top={320} width={612} height={76} fontSize={60} label="/mnt/slack-emojis" />
    <div style={{ position: 'absolute', left: 792, top: 320, color: pinkLight, fontFamily: 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace', fontSize: 60 }}>/</div>
    <PathToken id="path-files" left={829} top={320} width={180} height={76} fontSize={60} label="files" />
    <div style={{ position: 'absolute', left: 1009, top: 320, color: pinkLight, fontFamily: 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace', fontSize: 60 }}>/</div>
    <PathToken id="path-file" left={1046} top={320} width={396} height={76} fontSize={60} label="my-file.txt" />
    <Steps>
      <Step duration={170}><PathCallout left={175} width={617} label="mount path" /></Step>
      <Step duration={170}><PathCallout left={812} width={214} label="folder" /></Step>
      <Step duration={170}><PathCallout left={1034} width={424} label="file" /></Step>
    </Steps>
    <Footer />
  </div>
);

const FamiliarPathTree: Page = () => (
  <div style={{ ...base, padding: 120 }}>
    <Title size={98}>Files and folders make a <Accent>tree.</Accent></Title>
    <PathToken id="path-mount" left={776.4} top={250} width={367.2} height={45.6} fontSize={36} label="/mnt/slack-emojis" color="var(--osd-text)" />
    <TreeArrow left={952} top={295.6} height={124.4} />
    <PathToken id="path-files" left={906} top={420} width={108} height={45.6} fontSize={36} label="files" color="var(--osd-text)" />
    <TreeArrow left={952} top={465.6} height={124.4} />
    <PathToken id="path-file" left={841.2} top={590} width={237.6} height={45.6} fontSize={36} label="my-file.txt" color="var(--osd-text)" />
    <Footer />
  </div>
);

FamiliarPath.transition = diagramMorph;
FamiliarPathTree.transition = diagramMorph;

const FilesystemRoot: Page = () => (
  <div style={{ ...base, padding: 120 }}>
    <PathToken id="path-mount" left={776.4} top={250} width={367.2} height={45.6} fontSize={36} label="/mnt/slack-emojis" color={muted} />
    <TreeArrow left={952} top={295.6} height={124.4} mutedArrow />
    <PathToken id="path-files" left={906} top={420} width={108} height={45.6} fontSize={36} label="files" color={muted} />
    <TreeArrow left={952} top={465.6} height={124.4} mutedArrow />
    <PathToken id="path-file" left={841.2} top={590} width={237.6} height={45.6} fontSize={36} label="my-file.txt" color={muted} />
    <Footer />
  </div>
);

const RootDirectory: Page = () => (
  <div style={{ ...base, padding: 120 }}>
    <FilesystemNode id="fs-root" left={830} top={130} label="root" kind="ROT" accent />
    <TreeArrow left={952} top={238} height={122} />
    <FilesystemNode id="fs-root-directory" left={830} top={360} label="directory" kind="INO" />
    <PathToken id="path-files" left={906} top={650} width={108} height={45.6} fontSize={36} label="files" color={muted} />
    <TreeArrow left={952} top={695.6} height={54.4} mutedArrow />
    <PathToken id="path-file" left={841.2} top={750} width={237.6} height={45.6} fontSize={36} label="my-file.txt" color={muted} />
    <Footer />
  </div>
);

const FilesDirectory: Page = () => (
  <div style={{ ...base, padding: 120 }}>
    <FilesystemNode id="fs-root" left={830} top={100} label="root" kind="ROT" accent />
    <TreeArrow left={952} top={208} height={72} />
    <FilesystemNode id="fs-root-directory" left={830} top={280} label="directory" kind="INO" />
    <TreeArrow left={952} top={388} height={112} />
    <PathToken id="path-files" left={1000} top={435} width={108} height={45.6} fontSize={36} label="files" color={pinkLight} />
    <FilesystemNode id="fs-files-directory" left={830} top={500} label="directory" kind="INO" />
    <PathToken id="path-file" left={841.2} top={720} width={237.6} height={45.6} fontSize={36} label="my-file.txt" color={muted} />
    <Footer />
  </div>
);

const FileRecord: Page = () => (
  <div style={{ ...base, padding: 120 }}>
    <FilesystemNode id="fs-root" left={830} top={90} label="root" kind="ROT" accent />
    <TreeArrow left={952} top={198} height={62} />
    <FilesystemNode id="fs-root-directory" left={830} top={260} label="directory" kind="INO" />
    <TreeArrow left={952} top={368} height={72} />
    <PathToken id="path-files" left={1000} top={385} width={108} height={45.6} fontSize={36} label="files" color={pinkLight} />
    <FilesystemNode id="fs-files-directory" left={830} top={440} label="directory" kind="INO" />
    <TreeArrow left={952} top={548} height={72} />
    <PathToken id="path-file" left={1100} top={565} width={237.6} height={45.6} fontSize={36} label="my-file.txt" color={pinkLight} />
    <FilesystemNode id="fs-file" left={830} top={620} label="file" kind="INO" />
    <Footer />
  </div>
);

const FileDataChunks: Page = () => (
  <div style={{ ...base, padding: 120 }}>
    <FilesystemNode id="fs-root" left={830} top={70} label="root" kind="ROT" accent />
    <TreeArrow left={952} top={178} height={42} />
    <FilesystemNode id="fs-root-directory" left={830} top={220} label="directory" kind="INO" />
    <TreeArrow left={952} top={328} height={62} />
    <PathToken id="path-files" left={1000} top={345} width={108} height={45.6} fontSize={36} label="files" color={pinkLight} />
    <FilesystemNode id="fs-files-directory" left={830} top={390} label="directory" kind="INO" />
    <TreeArrow left={952} top={498} height={52} />
    <PathToken id="path-file" left={1100} top={505} width={237.6} height={45.6} fontSize={36} label="my-file.txt" color={pinkLight} />
    <FilesystemNode id="fs-file" left={830} top={550} label="file" kind="INO" />
    <svg aria-hidden="true" width="700" height="220" viewBox="0 0 700 220" style={{ position: 'absolute', left: 610, top: 658 }}>
      <defs>
        <marker id="filesystem-chunk-arrow" viewBox="0 0 12 12" refX="9" refY="6" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M2 1 L10 6 L2 11" fill="none" stroke="var(--osd-accent)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
      </defs>
      <path d="M350 0 V90 M350 90 H140 V180 M350 90 V180 M350 90 H560 V180" fill="none" stroke="var(--osd-accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" markerEnd="url(#filesystem-chunk-arrow)" />
    </svg>
    <DataChunk left={650} top={850} label="chunk 1" />
    <DataChunk left={860} top={850} label="chunk 2" />
    <DataChunk left={1070} top={850} label="chunk 3" />
    <Footer />
  </div>
);

const InodeTypesTree: Page = () => (
  <div style={{ ...base, padding: 120 }}>
    <FilesystemNode id="fs-root" left={830} top={70} label="root" kind="ROT" accent />
    <TreeArrow left={952} top={178} height={42} />
    <FilesystemNode id="fs-root-directory" left={830} top={220} label="directory" kind="INO" />
    <InodeTypeAnnotation top={262} type="DIR" />
    <TreeArrow left={952} top={328} height={62} />
    <PathToken id="path-files" left={1000} top={345} width={108} height={45.6} fontSize={36} label="files" color={pinkLight} />
    <FilesystemNode id="fs-files-directory" left={830} top={390} label="directory" kind="INO" />
    <InodeTypeAnnotation top={432} type="DIR" />
    <TreeArrow left={952} top={498} height={52} />
    <PathToken id="path-file" left={1100} top={505} width={237.6} height={45.6} fontSize={36} label="my-file.txt" color={pinkLight} />
    <FilesystemNode id="fs-file" left={830} top={550} label="file" kind="INO" />
    <InodeTypeAnnotation top={592} type="FILE" />
    <svg aria-hidden="true" width="700" height="220" viewBox="0 0 700 220" style={{ position: 'absolute', left: 610, top: 658 }}>
      <defs>
        <marker id="inode-types-chunk-arrow" viewBox="0 0 12 12" refX="9" refY="6" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M2 1 L10 6 L2 11" fill="none" stroke="var(--osd-accent)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
      </defs>
      <path d="M350 0 V90 M350 90 H140 V180 M350 90 V180 M350 90 H560 V180" fill="none" stroke="var(--osd-accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" markerEnd="url(#inode-types-chunk-arrow)" />
    </svg>
    <DataChunk left={650} top={850} label="chunk 1" />
    <DataChunk left={860} top={850} label="chunk 2" />
    <DataChunk left={1070} top={850} label="chunk 3" />
    <Footer />
  </div>
);

const PythonKeyword = ({ children }: { children: ReactNode }) => <span style={{ color: 'var(--osd-accent)' }}>{children}</span>;
const PythonClassName = ({ children }: { children: ReactNode }) => <span style={{ color: lilac }}>{children}</span>;
const PythonString = ({ children }: { children: ReactNode }) => <span style={{ color: gold }}>{children}</span>;
const PythonField = ({ children }: { children: ReactNode }) => <span style={{ color: 'var(--osd-text)' }}>{children}</span>;
const PythonLine = ({ indent = 0, children }: { indent?: number; children: ReactNode }) => (
  <div style={{ paddingLeft: indent * 56, whiteSpace: 'pre' }}>{children}</div>
);

const PythonSnippet = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      position: 'absolute',
      left: 210,
      top: 280,
      margin: 0,
      padding: '32px 48px',
      minWidth: 1120,
      boxSizing: 'border-box',
      background: '#1c1c27',
      color: pinkLight,
      fontFamily: 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace',
      fontSize: 30,
      lineHeight: 1.38,
    }}
  >
    {children}
  </div>
);

const YamlKey = ({ children }: { children: ReactNode }) => <span style={{ color: green }}>{children}</span>;
const YamlValue = ({ children }: { children: ReactNode }) => <span style={{ color: pinkLight }}>{children}</span>;
const YamlLine = ({ indent = 0, children }: { indent?: number; children: ReactNode }) => (
  <div style={{ paddingLeft: indent * 48, whiteSpace: 'pre' }}>{children}</div>
);
const YamlSnippet = ({ top = 610, children }: { top?: number; children: ReactNode }) => (
  <div
    style={{
      position: 'absolute',
      left: 210,
      top,
      minWidth: 1120,
      boxSizing: 'border-box',
      padding: '30px 48px',
      background: '#1c1c27',
      color: pinkLight,
      fontFamily: 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace',
      fontSize: 30,
      lineHeight: 1.38,
    }}
  >
    {children}
  </div>
);

const FilesystemObjects: Page = () => (
  <div style={{ ...base, padding: 120 }}>
    <Title size={118}>Four kinds of <Accent>object.</Accent></Title>
    <ObjectNode left={135} top={450} width={340} height={160} label="root" detail="ROT" active />
    <ObjectNode left={535} top={450} width={340} height={160} label="inode" detail="INO" />
    <ObjectNode left={935} top={450} width={340} height={160} label="directory entries" detail="DIR" />
    <ObjectNode left={1335} top={450} width={340} height={160} label="data chunk" detail="DAT" />
    <Footer />
  </div>
);

const DataChunkObjects: Page = () => (
  <div style={{ ...base, padding: 120 }}>
    <Title size={112}>Data chunk objects.</Title>
    <PythonSnippet>
      <PythonLine><PythonKeyword>class</PythonKeyword> <PythonClassName>DataChunk</PythonClassName>:</PythonLine>
      <PythonLine indent={1}><PythonField>object_type</PythonField> = <PythonString>"DAT"</PythonString></PythonLine>
      <PythonLine indent={1}><PythonField>data</PythonField>: <PythonClassName>bytes</PythonClassName></PythonLine>
    </PythonSnippet>
    <YamlSnippet>
      <YamlLine><YamlKey>object_type</YamlKey>: <YamlValue>DAT</YamlValue></YamlLine>
      <YamlLine><YamlKey>data</YamlKey>: <YamlValue>b"hello world"</YamlValue></YamlLine>
    </YamlSnippet>
    <Footer />
  </div>
);

const DirectoryEntryObjects: Page = () => (
  <div style={{ ...base, padding: 120 }}>
    <Title size={112}>Directory entry objects.</Title>
    <PythonSnippet>
      <PythonLine><PythonKeyword>class</PythonKeyword> <PythonClassName>DirectoryEntries</PythonClassName>:</PythonLine>
      <PythonLine indent={1}><PythonField>object_type</PythonField> = <PythonString>"DIR"</PythonString></PythonLine>
      <PythonLine indent={1}><PythonField>entries</PythonField>: <PythonClassName>dict</PythonClassName>[<PythonClassName>str</PythonClassName>, <PythonClassName>str</PythonClassName>]</PythonLine>
    </PythonSnippet>
    <YamlSnippet>
      <YamlLine><YamlKey>object_type</YamlKey>: <YamlValue>DIR</YamlValue></YamlLine>
      <YamlLine><YamlKey>entries</YamlKey>:</YamlLine>
      <YamlLine indent={1}><YamlKey>my-file.txt</YamlKey>: <YamlValue>efs_v1_ino_1_my_file</YamlValue></YamlLine>
    </YamlSnippet>
    <Footer />
  </div>
);

const InodeObjects: Page = () => (
  <div style={{ ...base, padding: 120 }}>
    <Title size={112}>Inodes.</Title>
    <PythonSnippet>
      <PythonLine><PythonKeyword>class</PythonKeyword> <PythonClassName>Inode</PythonClassName>:</PythonLine>
      <PythonLine indent={1}><PythonField>object_type</PythonField> = <PythonString>"INO"</PythonString></PythonLine>
      <PythonLine indent={1}><PythonField>inode_type</PythonField>: <PythonClassName>Literal</PythonClassName>[<PythonString>"FILE"</PythonString>, <PythonString>"DIR"</PythonString>]</PythonLine>
      <PythonLine indent={1}><PythonField>mode</PythonField>: <PythonClassName>int</PythonClassName></PythonLine>
      <PythonLine indent={1}><PythonField>uid</PythonField>: <PythonClassName>int</PythonClassName></PythonLine>
      <PythonLine indent={1}><PythonField>gid</PythonField>: <PythonClassName>int</PythonClassName></PythonLine>
      <PythonLine indent={1}><PythonField>mtime</PythonField>: <PythonClassName>int</PythonClassName></PythonLine>
      <PythonLine indent={1}><PythonField>ctime</PythonField>: <PythonClassName>int</PythonClassName></PythonLine>
    </PythonSnippet>
    <YamlSnippet top={720}>
      <YamlLine><YamlKey>object_type</YamlKey>: <YamlValue>INO</YamlValue></YamlLine>
      <YamlLine><YamlKey>inode_type</YamlKey>: <YamlValue>FILE</YamlValue></YamlLine>
      <YamlLine><YamlKey>mode</YamlKey>: <YamlValue>0o644</YamlValue></YamlLine>
      <YamlLine><YamlKey>uid</YamlKey>: <YamlValue>501</YamlValue></YamlLine>
      <YamlLine><YamlKey>mtime</YamlKey>: <YamlValue>1724042000</YamlValue></YamlLine>
    </YamlSnippet>
    <Footer />
  </div>
);

const FileInodeObjects: Page = () => (
  <div style={{ ...base, padding: 120 }}>
    <Title size={112}>File inodes.</Title>
    <PythonSnippet>
      <PythonLine><PythonKeyword>class</PythonKeyword> <PythonClassName>FileInode</PythonClassName>(<PythonClassName>Inode</PythonClassName>):</PythonLine>
      <PythonLine indent={1}><PythonField>inode_type</PythonField> = <PythonString>"FILE"</PythonString></PythonLine>
      <PythonLine indent={1}><PythonField>chunks</PythonField>: <PythonClassName>list</PythonClassName>[<PythonClassName>str</PythonClassName>]</PythonLine>
      <PythonLine indent={1}><PythonField>size</PythonField>: <PythonClassName>int</PythonClassName></PythonLine>
    </PythonSnippet>
    <YamlSnippet>
      <YamlLine><YamlKey>object_type</YamlKey>: <YamlValue>INO</YamlValue></YamlLine>
      <YamlLine><YamlKey>inode_type</YamlKey>: <YamlValue>FILE</YamlValue></YamlLine>
      <YamlLine><YamlKey>chunks</YamlKey>: <YamlValue>[efs_v1_dat_1_my_file_1]</YamlValue></YamlLine>
      <YamlLine><YamlKey>size</YamlKey>: <YamlValue>11</YamlValue></YamlLine>
    </YamlSnippet>
    <Footer />
  </div>
);

const DirectoryInodeObjects: Page = () => (
  <div style={{ ...base, padding: 120 }}>
    <Title size={112}>Directory inodes.</Title>
    <PythonSnippet>
      <PythonLine><PythonKeyword>class</PythonKeyword> <PythonClassName>DirectoryInode</PythonClassName>(<PythonClassName>Inode</PythonClassName>):</PythonLine>
      <PythonLine indent={1}><PythonField>inode_type</PythonField> = <PythonString>"DIR"</PythonString></PythonLine>
      <PythonLine indent={1}><PythonField>dirent_object_id</PythonField>: <PythonClassName>str</PythonClassName></PythonLine>
    </PythonSnippet>
    <YamlSnippet>
      <YamlLine><YamlKey>object_type</YamlKey>: <YamlValue>INO</YamlValue></YamlLine>
      <YamlLine><YamlKey>inode_type</YamlKey>: <YamlValue>DIR</YamlValue></YamlLine>
      <YamlLine><YamlKey>dirent_object_id</YamlKey>: <YamlValue>efs_v1_dir_1_files</YamlValue></YamlLine>
    </YamlSnippet>
    <Footer />
  </div>
);

const RootObjects: Page = () => (
  <div style={{ ...base, padding: 120 }}>
    <Title size={112}>Root objects.</Title>
    <PythonSnippet>
      <PythonLine><PythonKeyword>class</PythonKeyword> <PythonClassName>Root</PythonClassName>:</PythonLine>
      <PythonLine indent={1}><PythonField>object_type</PythonField> = <PythonString>"ROT"</PythonString></PythonLine>
      <PythonLine indent={1}><PythonField>root_inode_id</PythonField>: <PythonClassName>str</PythonClassName></PythonLine>
    </PythonSnippet>
    <YamlSnippet>
      <YamlLine><YamlKey>object_type</YamlKey>: <YamlValue>ROT</YamlValue></YamlLine>
      <YamlLine><YamlKey>root_inode_id</YamlKey>: <YamlValue>efs_v1_ino_1_root</YamlValue></YamlLine>
    </YamlSnippet>
    <Footer />
  </div>
);

const PuttingPiecesTogether: Page = () => (
  <div className="object-tree-page" style={base}>
    <style>{`
      @keyframes object-tree-pop {
        0% { opacity: 0; transform: scale(0.86); }
        68% { opacity: 1; transform: scale(1.035); }
        100% { opacity: 1; transform: scale(1); }
      }
      .object-tree-page .object-tree-node,
      .object-tree-page .object-tree-link {
        transition: transform 560ms cubic-bezier(0.22, 1.28, 0.36, 1);
        transform-origin: top center;
      }
      .object-tree-page [data-osd-step='pending'] .object-tree-pop { opacity: 0; transform: scale(0.86); }
      .object-tree-page [data-osd-step='revealed'] .object-tree-pop { animation: object-tree-pop 440ms cubic-bezier(0.22, 1.28, 0.36, 1) both; }
      .object-tree-page .object-tree-root { transform: translateY(380px); }
      .object-tree-page .object-tree-root-dir { transform: translateY(330px); }
      .object-tree-page .object-tree-root-link { transform: translateY(190px) scaleY(3); }
      .object-tree-page .object-tree-root-entries { transform: translateY(240px); }
      .object-tree-page .object-tree-entries-link { transform: translateY(145px) scaleY(2.1); }
      .object-tree-page:has([data-osd-step='revealed'] .object-tree-root-dir-stage) .object-tree-root { transform: translateY(190px); }
      .object-tree-page:has([data-osd-step='revealed'] .object-tree-root-entries-stage) .object-tree-root { transform: translateY(70px); }
      .object-tree-page:has([data-osd-step='revealed'] .object-tree-root-entries-stage) .object-tree-root-dir { transform: translateY(145px); }
      .object-tree-page:has([data-osd-step='revealed'] .object-tree-root-entries-stage) .object-tree-root-link { transform: translateY(70px) scaleY(2.1); }
      .object-tree-page:has([data-osd-step='revealed'] .object-tree-branch-stage) .object-tree-root,
      .object-tree-page:has([data-osd-step='revealed'] .object-tree-branch-stage) .object-tree-root-dir,
      .object-tree-page:has([data-osd-step='revealed'] .object-tree-branch-stage) .object-tree-root-entries,
      .object-tree-page:has([data-osd-step='revealed'] .object-tree-branch-stage) .object-tree-root-link,
      .object-tree-page:has([data-osd-step='revealed'] .object-tree-branch-stage) .object-tree-entries-link { transform: translateY(0) scaleY(1); }
    `}</style>
    <Steps>
      <Step duration={180}>
        <ObjectTreeNode className="object-tree-node object-tree-root" left={830} top={80} label="root" kind="ROT" accent />
      </Step>
      <Step duration={180}>
        <div className="object-tree-root-dir-stage">
          <TreeArrow className="object-tree-link object-tree-root-link" left={952} top={188} height={77} />
          <ObjectTreeNode className="object-tree-node object-tree-root-dir" left={830} top={265} label="directory inode" kind="INO · DIR" />
        </div>
      </Step>
      <Step duration={180}>
        <div className="object-tree-root-entries-stage">
          <TreeArrow className="object-tree-link object-tree-entries-link" left={952} top={373} height={57} />
          <ObjectTreeNode className="object-tree-node object-tree-root-entries" left={785} top={430} width={350} label="directory entries" kind="DIR" />
        </div>
      </Step>
      <Step duration={220}>
        <div className="object-tree-branch-stage">
          <BranchingTreeLinks showFile={false} />
          <div className="object-tree-pop" style={{ position: 'absolute', left: 600, top: 526, padding: '0 10px', background: 'var(--osd-bg)', color: pinkLight, fontFamily: 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace', fontSize: 26 }}>files</div>
          <ObjectTreeNode className="object-tree-node" left={430} top={620} label="directory inode" kind="INO · DIR" />
          <TreeArrow left={552} top={728} height={62} />
          <ObjectTreeNode className="object-tree-node" left={385} top={790} width={350} label="directory entries" kind="DIR" />
        </div>
      </Step>
      <Step duration={220}>
        <div className="object-tree-file-stage">
          <BranchingTreeLinks showDirectory={false} />
          <div className="object-tree-pop" style={{ position: 'absolute', left: 1100, top: 526, padding: '0 10px', background: 'var(--osd-bg)', color: pinkLight, fontFamily: 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace', fontSize: 26 }}>my-file.txt</div>
          <ObjectTreeNode className="object-tree-node" left={1190} top={620} label="file inode" kind="INO · FILE" />
        </div>
      </Step>
      <Step duration={220}>
        <div className="object-tree-chunks-stage">
          <ChunkTreeLinks />
          <DataChunk className="object-tree-node" left={990} top={860} label="chunk 1" />
          <DataChunk className="object-tree-node" left={1190} top={860} label="chunk 2" />
          <DataChunk className="object-tree-node" left={1390} top={860} label="chunk 3" />
        </div>
      </Step>
    </Steps>
    <Footer />
  </div>
);

const ObjectStorage: Page = () => (
  <div style={base}>
    <div style={{ position: 'absolute', left: 180, top: 145, fontFamily: 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace', fontSize: 44, color: 'var(--osd-text)' }}>root <span style={{ color: muted, fontSize: 24 }}>ROT</span></div>
    <div style={{ position: 'absolute', left: 180, top: 315, fontFamily: 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace', fontSize: 44, color: 'var(--osd-text)' }}>directory inode <span style={{ color: muted, fontSize: 24 }}>INO</span></div>
    <div style={{ position: 'absolute', left: 180, top: 485, fontFamily: 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace', fontSize: 44, color: 'var(--osd-text)' }}>directory entries <span style={{ color: muted, fontSize: 24 }}>DIR</span></div>
    <div style={{ position: 'absolute', left: 180, top: 655, fontFamily: 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace', fontSize: 44, color: 'var(--osd-text)' }}>file inode <span style={{ color: muted, fontSize: 24 }}>INO</span></div>
    <div style={{ position: 'absolute', left: 180, top: 825, fontFamily: 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace', fontSize: 44, color: 'var(--osd-text)' }}>data chunk <span style={{ color: muted, fontSize: 24 }}>DAT</span></div>
    <svg aria-hidden="true" width="1300" height="760" viewBox="0 0 1300 760" style={{ position: 'absolute', left: 0, top: 130, overflow: 'visible' }}>
      <defs>
        <marker id="object-storage-arrow" viewBox="0 0 12 12" refX="8" refY="6" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M2 1 L10 6 L2 11" fill="none" stroke="var(--osd-accent)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
      </defs>
      {[
        { start: 382, y: 48 },
        { start: 675, y: 218 },
        { start: 728, y: 388 },
        { start: 542, y: 558 },
        { start: 542, y: 728 },
      ].map(({ start, y }) => <path key={y} d={`M${start} ${y} C${start + 180} ${y}, 1030 380, 1200 380`} fill="none" stroke="var(--osd-accent)" strokeWidth="3" strokeLinecap="round" strokeDasharray="4 13" markerEnd="url(#object-storage-arrow)" />)}
    </svg>
    <div style={{ position: 'absolute', left: 1245, top: 440, color: pinkLight, fontFamily: '"Bradley Hand", "Comic Sans MS", cursive', fontSize: 76, transform: 'rotate(-4deg)' }}>a Slack emoji???</div>
    <Footer />
  </div>
);

const SlackOnlyImages: Page = () => (
  <div style={{ ...base, display: 'grid', placeItems: 'center' }}>
    <img src={slackEmojisMeme} alt="Meme showing Slack accepting images but rejecting arbitrary bytes" style={{ width: 1520, height: 900, objectFit: 'contain' }} />
    <Footer />
  </div>
);

const PackingPanel = ({ left, title, children }: { left: number; title: string; children: ReactNode }) => (
  <div style={{ position: 'absolute', left, top: 400, width: 310, textAlign: 'center' }}>
    <div style={{ height: 210, display: 'grid', placeItems: 'center', background: '#1c1c27', color: pinkLight, fontFamily: 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace', fontSize: 27, lineHeight: 1.45 }}>{children}</div>
    <div style={{ marginTop: 26, color: muted, fontSize: 28 }}>{title}</div>
  </div>
);

const PixelGrid = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 18px)', gap: 3 }}>
    {Array.from({ length: 64 }, (_, i) => <div key={i} style={{ width: 18, height: 18, background: [pinkLight, lilac, gold, green][(i * 5 + Math.floor(i / 8)) % 4] }} />)}
  </div>
);

const ImageDataPacking: Page = () => (
  <div style={{ ...base, padding: 120 }}>
    <Title size={100}>How do bytes become an <Accent>emoji?</Accent></Title>
    <Steps>
      <Step duration={180}><PackingPanel left={105} title="payload">b"hello world"</PackingPanel></Step>
      <Step duration={180}>
        <Arrow left={432} top={505} width={105} pink />
        <PackingPanel left={535} title="header + payload"><span><span style={{ color: gold }}>00 00 00 0b</span><br />hello world</span></PackingPanel>
      </Step>
      <Step duration={180}>
        <Arrow left={862} top={505} width={105} pink />
        <PackingPanel left={965} title="RGBA pixels"><PixelGrid /></PackingPanel>
      </Step>
      <Step duration={180}>
        <Arrow left={1292} top={505} width={105} pink />
        <PackingPanel left={1395} title="custom emoji"><span style={{ fontSize: 110, lineHeight: 1 }}>🟪</span></PackingPanel>
      </Step>
    </Steps>
    <Footer />
  </div>
);

const EmojiIds: Page = () => (
  <div style={{ ...base, padding: 120 }}>
    <Title size={106}>Every emoji needs a <Accent>name.</Accent></Title>
    <div style={{ position: 'absolute', left: 160, top: 350, color: muted, fontFamily: 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace', fontSize: 29 }}>efs_v1_talk_rot_1724042000123_13c18c0f0c6f4b68bcb8d99cefd0f961</div>
    <div style={{ position: 'absolute', left: 160, top: 425, color: muted, fontFamily: 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace', fontSize: 29 }}>efs_v1_talk_ino_1724042000456_2683e4351a9e4f7c9f7fe7589707798e</div>
    <div style={{ position: 'absolute', left: 160, top: 500, color: muted, fontFamily: 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace', fontSize: 29 }}>efs_v1_talk_dat_1724042000789_8d4e981aea4c4cec9bfbcf8ec2aa7238</div>
    <div style={{ position: 'absolute', left: 160, top: 665, fontFamily: 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace', fontSize: 39, letterSpacing: '-0.035em', whiteSpace: 'nowrap' }}>
      <span style={{ color: gold }}>efs</span><span style={{ color: muted }}>_</span><span style={{ color: lilac }}>v1</span><span style={{ color: muted }}>_</span><span style={{ color: green }}>talk</span><span style={{ color: muted }}>_</span><span style={{ color: pinkLight }}>dat</span><span style={{ color: muted }}>_</span><span style={{ color: gold }}>1724042000789</span><span style={{ color: muted }}>_</span><span style={{ color: 'var(--osd-text)' }}>8d4e981a…</span>
    </div>
    <svg aria-hidden="true" width="1350" height="210" viewBox="0 0 1350 210" style={{ position: 'absolute', left: 0, top: 700, overflow: 'visible' }}>
      <defs>
        <marker id="emoji-id-label-arrow" viewBox="0 0 12 12" refX="8" refY="6" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M2 1 L10 6 L2 11" fill="none" stroke={muted} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
      </defs>
      <path d="M180 112 C180 72 190 44 195 16" fill="none" stroke={muted} strokeWidth="2.5" strokeLinecap="round" markerEnd="url(#emoji-id-label-arrow)" />
      <path d="M315 162 C315 102 292 56 276 16" fill="none" stroke={muted} strokeWidth="2.5" strokeLinecap="round" markerEnd="url(#emoji-id-label-arrow)" />
      <path d="M455 112 C455 72 402 42 370 16" fill="none" stroke={muted} strokeWidth="2.5" strokeLinecap="round" markerEnd="url(#emoji-id-label-arrow)" />
      <path d="M572 162 C572 94 515 48 475 16" fill="none" stroke={muted} strokeWidth="2.5" strokeLinecap="round" markerEnd="url(#emoji-id-label-arrow)" />
      <path d="M700 112 C700 72 690 42 682 16" fill="none" stroke={muted} strokeWidth="2.5" strokeLinecap="round" markerEnd="url(#emoji-id-label-arrow)" />
      <path d="M1160 162 C1160 96 1080 48 1020 16" fill="none" stroke={muted} strokeWidth="2.5" strokeLinecap="round" markerEnd="url(#emoji-id-label-arrow)" />
    </svg>
    <div style={{ position: 'absolute', left: 130, top: 815, color: muted, fontFamily: 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace', fontSize: 24 }}>format</div>
    <div style={{ position: 'absolute', left: 255, top: 865, color: muted, fontFamily: 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace', fontSize: 24 }}>version</div>
    <div style={{ position: 'absolute', left: 375, top: 815, color: muted, fontFamily: 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace', fontSize: 24 }}>namespace</div>
    <div style={{ position: 'absolute', left: 535, top: 865, color: muted, fontFamily: 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace', fontSize: 24 }}>type</div>
    <div style={{ position: 'absolute', left: 635, top: 815, color: muted, fontFamily: 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace', fontSize: 24 }}>created at</div>
    <div style={{ position: 'absolute', left: 1095, top: 865, color: muted, fontFamily: 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace', fontSize: 24 }}>unique ID</div>
    <Footer />
  </div>
);

const StructuredObjects: Page = () => (
  <div style={{ ...base, padding: 120 }}>
    <Title size={100}>Objects need packing <Accent>too.</Accent></Title>
    <div style={{ position: 'absolute', left: 120, top: 335, width: 420, padding: '28px 34px', background: '#1c1c27', fontFamily: 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace', fontSize: 25, lineHeight: 1.55 }}>
      <div><span style={{ color: green }}>inode_type</span>: <span style={{ color: pinkLight }}>FILE</span></div>
      <div><span style={{ color: green }}>chunks</span>: <span style={{ color: pinkLight }}>[efs_v1_…]</span></div>
      <div><span style={{ color: green }}>size</span>: <span style={{ color: pinkLight }}>11</span></div>
    </div>
    <Arrow left={585} top={475} width={150} pink />
    <div style={{ position: 'absolute', left: 770, top: 366, width: 320, color: pinkLight, fontFamily: 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace', fontSize: 25, lineHeight: 1.55 }}>
      <div style={{ color: muted, marginBottom: 20 }}>cbor2.dumps(...)</div>
      a3 6a 69 6e 6f 64 65<br />5f 74 79 70 65 64<br />46 49 4c 45 66 63…
    </div>
    <Arrow left={1120} top={475} width={150} pink />
    <div style={{ position: 'absolute', left: 1370, top: 340, width: 260, textAlign: 'center' }}>
      <div style={{ height: 245, display: 'grid', placeItems: 'center', background: '#1c1c27' }}><PixelGrid /></div>
      <div style={{ marginTop: 24, color: pinkLight, fontFamily: 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace', fontSize: 20, whiteSpace: 'nowrap' }}>:efs_v1_talk_ino_…:</div>
    </div>
    <Footer />
  </div>
);

const EmojiObject: Page = () => (
  <div style={{ ...base, padding: 120 }}>
    <Title size={112}>The emoji <Accent>is</Accent> an object.</Title>
    <div style={{ position: 'absolute', left: 130, top: 325, color: pinkLight, fontFamily: 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace', fontSize: 25, whiteSpace: 'nowrap' }}>
      :<span style={{ color: gold }}>efs</span>_<span style={{ color: lilac }}>v1</span>_<span style={{ color: green }}>talk</span>_<span style={{ color: pinkLight }}>dat</span>_<span style={{ color: gold }}>1724042000789</span>_<span style={{ color: 'var(--osd-text)' }}>8d4e981a…</span>:
    </div>
    <div style={{ position: 'absolute', left: 130, top: 372, display: 'flex', gap: 15, color: muted, fontFamily: 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace', fontSize: 16 }}>
      <span>format</span><span>version</span><span>namespace</span><span>type</span><span>created at</span><span>unique ID</span>
    </div>
    <div style={{ position: 'absolute', left: 190, top: 475, width: 320, height: 320, display: 'grid', placeItems: 'center', background: '#1c1c27' }}>
      <img src={emojiObjectExample} alt="A real SlackEmojiFS data-chunk image, generated by the project's encoder" style={{ width: 288, height: 288, imageRendering: 'pixelated' }} />
    </div>
    <div style={{ position: 'absolute', left: 190, top: 816, width: 320, color: muted, textAlign: 'center', fontSize: 25 }}>16 × 16 demo packing</div>
    <div style={{ position: 'absolute', left: 190, top: 853, width: 320, color: muted, textAlign: 'center', fontSize: 18 }}>the real emojis are 128 × 128 px</div>
    <Arrow left={575} top={635} width={230} pink />
    <div style={{ position: 'absolute', left: 860, top: 505, width: 620, padding: '32px 40px', background: '#1c1c27', fontFamily: 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace', fontSize: 32, lineHeight: 1.55 }}>
      <div><span style={{ color: green }}>object_type</span>: <span style={{ color: pinkLight }}>DAT</span></div>
      <div><span style={{ color: green }}>data</span>: <span style={{ color: pinkLight }}>b"hello world\\n" × 70</span></div>
    </div>
    <div style={{ position: 'absolute', left: 860, top: 700, color: muted, fontSize: 32 }}>the original object</div>
    <Footer />
  </div>
);

FilesystemRoot.transition = diagramMorph;
RootDirectory.transition = diagramMorph;
FilesDirectory.transition = diagramMorph;
FileRecord.transition = diagramMorph;
FileDataChunks.transition = diagramMorph;
InodeTypesTree.transition = diagramMorph;

const EverythingEmojiTree: Page = () => (
  <div style={base}>
    <div style={{ position: 'absolute', left: 120, top: 80, width: 590 }}>
      <Title size={92}>Every node is a<br /><Accent>Slack emoji.</Accent></Title>
    </div>
    <img
      src={emojiObjectExample}
      alt="A packed SlackEmojiFS object represented as a Slack emoji image"
      style={{ position: 'absolute', left: 120, top: 340, width: 220, height: 220, imageRendering: 'pixelated' }}
    />
    <div style={{ position: 'absolute', left: 80, top: 590, width: 300, color: pinkLight, textAlign: 'center', fontFamily: 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace', fontSize: 25 }}>:efs_v1_…:</div>
    <div style={{ position: 'absolute', left: 80, top: 635, width: 300, color: muted, textAlign: 'center', fontSize: 30 }}>one stored object</div>
    <ObjectTreeNode left={830} top={55} label="root" kind=":efs_…rot…:" accent />
    <TreeArrow left={952} top={163} height={70} />
    <ObjectTreeNode left={830} top={233} label="directory inode" kind=":efs_…ino…:" />
    <TreeArrow left={952} top={341} height={54} />
    <ObjectTreeNode left={785} top={395} width={350} label="directory entries" kind=":efs_…dir…:" />
    <BranchingTreeLinks />
    <div style={{ position: 'absolute', left: 600, top: 526, padding: '0 10px', background: 'var(--osd-bg)', color: pinkLight, fontFamily: 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace', fontSize: 26 }}>files</div>
    <div style={{ position: 'absolute', left: 1100, top: 526, padding: '0 10px', background: 'var(--osd-bg)', color: pinkLight, fontFamily: 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace', fontSize: 26 }}>my-file.txt</div>
    <ObjectTreeNode left={430} top={620} label="directory inode" kind=":efs_…ino…:" />
    <TreeArrow left={552} top={728} height={52} />
    <ObjectTreeNode left={385} top={780} width={350} label="directory entries" kind=":efs_…dir…:" />
    <ObjectTreeNode left={1190} top={620} label="file inode" kind=":efs_…ino…:" />
    <ChunkTreeLinks />
    <DataChunk left={990} top={860} label=":efs_…dat:" fontSize={25} />
    <DataChunk left={1190} top={860} label=":efs_…dat:" fontSize={25} />
    <DataChunk left={1390} top={860} label=":efs_…dat:" fontSize={25} />
    <Footer />
  </div>
);

const CreateObject: Page = () => (
  <div style={{ ...base, padding: 120 }}>
    <Title size={112}>Creating a new object is <Accent>easy.</Accent></Title>
    <ObjectNode left={115} top={470} width={350} label="create(object)" detail="repository" active />
    <Steps>
      <Step duration={160}>
        <div>
          <Arrow left={475} top={530} width={105} pink />
          <ObjectNode left={590} top={470} width={310} label="serialize" detail="CBOR bytes" />
        </div>
      </Step>
      <Step duration={160}>
        <div>
          <Arrow left={910} top={530} width={105} pink />
          <ObjectNode left={1025} top={470} width={310} label="encode PNG" detail="RGBA pixels" />
        </div>
      </Step>
      <Step duration={160}>
        <div>
          <Arrow left={1345} top={530} width={105} pink />
          <ObjectNode left={1460} top={470} width={345} label="add emoji" detail="admin.emoji.add" active />
        </div>
      </Step>
    </Steps>
    <Footer />
  </div>
);

const EditingShouldBeEasy: Page = () => (
  <div style={{ ...base, padding: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
    <Title size={158}>So editing stuff<br />should be easy too, right?</Title>
    <Steps>
      <Step duration={170}><ForeshadowingIndicator /></Step>
    </Steps>
    <Footer />
  </div>
);

const ApiMethod = ({ top, children, accent = false }: { top: number; children: string; accent?: boolean }) => (
  <div style={{ position: 'absolute', left: 250, top, color: accent ? pinkLight : 'var(--osd-text)', fontFamily: 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace', fontSize: 48, lineHeight: 1 }}>{children}</div>
);

const EmojiApis: Page = () => (
  <div style={{ ...base, padding: 120 }}>
    <Title size={112}>Slack emoji APIs</Title>
    <ApiMethod top={330}>emoji.list</ApiMethod>
    <ApiMethod top={440}>admin.emoji.list</ApiMethod>
    <ApiMethod top={550} accent>admin.emoji.add</ApiMethod>
    <ApiMethod top={660}>admin.emoji.addAlias</ApiMethod>
    <ApiMethod top={770}>admin.emoji.remove</ApiMethod>
    <Footer />
  </div>
);

const NewObjectVersion: Page = () => (
  <div style={{ ...base, padding: 120 }}>
    <Title size={132}>Fine. Make a new version.</Title>
    <ObjectNode left={280} top={465} width={430} height={160} label="old chunk" detail="efs_…dat_a1" dim />
    <Arrow left={735} top={545} width={220} pink />
    <ObjectNode left={1000} top={465} width={500} height={160} label="new chunk" detail="efs_…dat_b2" active />
    <div style={{ position: 'absolute', left: 1080, top: 675, color: muted, fontSize: 38 }}>edited bytes, new object ID</div>
    <Footer />
  </div>
);

const StaleFileInode: Page = () => (
  <div style={{ ...base, padding: 120 }}>
    <Title size={108}>The file still points to the old chunk.</Title>
    <ObjectNode left={180} top={485} width={500} height={170} label="file inode" detail="chunks: [efs_…dat_a1]" active />
    <Arrow left={700} top={570} width={260} pink />
    <ObjectNode left={1010} top={485} width={430} height={170} label="old chunk" detail="efs_…dat_a1" dim />
    <ObjectNode left={1010} top={735} width={430} height={150} label="new chunk" detail="efs_…dat_b2" active />
    <div style={{ position: 'absolute', left: 735, top: 490, color: pinkLight, fontSize: 32 }}>still points here</div>
    <Footer />
  </div>
);

const NewFileInode: Page = () => (
  <div style={{ ...base, padding: 120 }}>
    <Title size={126}>So make a new inode.</Title>
    <ObjectNode left={180} top={350} width={480} height={150} label="old file inode" detail="chunks: [efs_…dat_a1]" dim />
    <Arrow left={680} top={425} width={210} />
    <ObjectNode left={930} top={350} width={410} height={150} label="old chunk" detail="efs_…dat_a1" dim />
    <ObjectNode left={180} top={650} width={480} height={150} label="new file inode" detail="chunks: [efs_…dat_b2]" active />
    <Arrow left={680} top={725} width={210} pink />
    <ObjectNode left={930} top={650} width={410} height={150} label="new chunk" detail="efs_…dat_b2" active />
    <div style={{ position: 'absolute', left: 1410, top: 686, width: 320, color: muted, fontSize: 34, lineHeight: 1.35 }}>unchanged chunks can still be shared</div>
    <Footer />
  </div>
);

const EveryReference: Page = () => (
  <div style={{ ...base, padding: 120 }}>
    <Title size={100}>Every reference has the same problem.</Title>
    <div style={{ position: 'absolute', left: 120, top: 330, color: muted, fontSize: 30 }}>old path</div>
    <ObjectNode left={120} top={380} width={260} label="root" detail="old" dim />
    <Arrow left={390} top={442} width={90} />
    <ObjectNode left={490} top={380} width={290} label="directory" detail="old inode" dim />
    <Arrow left={790} top={442} width={90} />
    <ObjectNode left={890} top={380} width={300} label="entries" detail="old mapping" dim />
    <Arrow left={1200} top={442} width={90} />
    <ObjectNode left={1300} top={380} width={300} label="file inode" detail="old chunks" dim />
    <div style={{ position: 'absolute', left: 120, top: 640, color: pinkLight, fontSize: 30 }}>replacement path</div>
    <Steps>
      <Step duration={160}><ObjectNode left={1300} top={690} width={300} label="file inode" detail="new chunks" active /></Step>
      <Step duration={160}>
        <div>
          <ObjectNode left={890} top={690} width={300} label="entries" detail="new mapping" active />
          <Arrow left={1200} top={752} width={90} pink />
        </div>
      </Step>
      <Step duration={160}>
        <div>
          <ObjectNode left={490} top={690} width={290} label="directory" detail="new inode" active />
          <Arrow left={790} top={752} width={90} pink />
        </div>
      </Step>
      <Step duration={160}>
        <div>
          <ObjectNode left={120} top={690} width={260} label="root" detail="new" active />
          <Arrow left={390} top={752} width={90} pink />
        </div>
      </Step>
    </Steps>
    <Footer />
  </div>
);

const PublishNewRoot: Page = () => (
  <div style={{ ...base, padding: 120 }}>
    <Title size={126}>Publish a new root.</Title>
    <ObjectNode left={160} top={350} width={320} height={150} label="old root" detail="previous state" dim />
    <Arrow left={500} top={425} width={190} />
    <ObjectNode left={720} top={350} width={420} height={150} label="old path" detail="still reachable" dim />
    <ObjectNode left={160} top={670} width={320} height={150} label="new root" detail="current" active />
    <Arrow left={500} top={745} width={190} pink />
    <ObjectNode left={720} top={670} width={420} height={150} label="rebuilt path" detail="changed objects" active />
    <Arrow left={1160} top={745} width={190} />
    <ObjectNode left={1380} top={670} width={360} height={150} label="shared branches" detail="unchanged objects" />
    <div style={{ position: 'absolute', left: 1280, top: 385, width: 420, color: muted, fontSize: 38, lineHeight: 1.4 }}>nothing old was overwritten</div>
    <Footer />
  </div>
);

const CopyOnWrite: Page = () => (
  <div style={{ ...base, padding: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
    <Title size={164}>That’s <Accent>copy-on-write.</Accent></Title>
    <Footer />
  </div>
);

const Snapshots: Page = () => (
  <div style={{ ...base, padding: 120 }}>
    <Title size={110}>Wait. Are those snapshots?</Title>
    <ObjectNode left={150} top={450} width={290} label="root 1" detail="old tree" dim />
    <Arrow left={455} top={512} width={125} />
    <ObjectNode left={600} top={450} width={290} label="root 2" detail="changed tree" dim />
    <Arrow left={905} top={512} width={125} />
    <ObjectNode left={1050} top={450} width={290} label="root 3" detail="current" active />
    <div style={{ position: 'absolute', left: 1410, top: 435, width: 350, color: muted, fontSize: 40, lineHeight: 1.4 }}>Every root can still reach its version of the tree.</div>
    <Footer />
  </div>
);

const Fuse: Page = () => (
  <div style={{ ...base, padding: 120 }}>
    <Title size={108}>How does Linux know?</Title>
    <div style={{ position: 'absolute', left: 150, top: 400, fontFamily: 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace', fontSize: 44 }}>cat …/my-file.txt</div>
    <Arrow left={565} top={436} width={112} />
    <ObjectNode left={705} top={380} width={210} label="FUSE" detail="userspace" active />
    <Arrow left={930} top={436} width={112} />
    <ObjectNode left={1070} top={380} width={280} label="Python" detail="read(path)" />
    <Arrow left={1365} top={436} width={112} />
    <div style={{ position: 'absolute', left: 1515, top: 389, fontSize: 68 }}>:efs_…:</div>
    <Footer />
  </div>
);

const SmallWriteBenchmark: Page = () => (
  <div style={{ ...base, padding: 120 }}>
    <Title size={108}>Writing a small text file</Title>
    <div style={{ position: 'absolute', left: 370, top: 370, width: WRITE_PLOT_WIDTH, height: 420, borderLeft: `3px solid ${line}`, borderBottom: `3px solid ${line}` }}>
      <div style={{ position: 'absolute', left: -360, top: 100, width: 330, transform: 'translateY(-50%)', textAlign: 'right', fontSize: 40, lineHeight: 1 }}>APFS</div>
      <div style={{ position: 'absolute', left: -360, top: 270, width: 330, transform: 'translateY(-50%)', textAlign: 'right', fontSize: 40, lineHeight: 1 }}>SlackEmojiFS</div>
      <div style={{ position: 'absolute', left: 0, top: 150, width: WRITE_PLOT_WIDTH, borderTop: `2px solid ${line}`, opacity: 0.45 }} />
      <div style={{ position: 'absolute', left: 0, top: 320, width: WRITE_PLOT_WIDTH, borderTop: `2px solid ${line}`, opacity: 0.45 }} />
      <div style={{ position: 'absolute', left: 0, top: 64, width: (APFS_SMALL_WRITE_MS / INITIAL_WRITE_SCALE_MS) * WRITE_PLOT_WIDTH, height: 72, background: gold }} />
      <div style={{ position: 'absolute', left: 138, top: 100, transform: 'translateY(-50%)', color: muted, fontSize: 32, lineHeight: 1 }}>1 ms</div>
      <div style={{ position: 'absolute', left: 0, top: 234, width: INITIAL_SLACK_BAR_WIDTH, height: 72, background: 'var(--osd-accent)' }} />
      <div style={{ position: 'absolute', left: 0, bottom: -54, color: muted, fontSize: 26 }}>0</div>
      <div style={{ position: 'absolute', left: 224, bottom: -54, color: muted, fontSize: 26 }}>2 ms</div>
      <div style={{ position: 'absolute', left: 462, bottom: -54, color: muted, fontSize: 26 }}>4 ms</div>
      <div style={{ position: 'absolute', left: 700, bottom: -54, color: muted, fontSize: 26 }}>6 ms</div>
      <div style={{ position: 'absolute', left: 938, bottom: -54, color: muted, fontSize: 26 }}>8 ms</div>
      <div style={{ position: 'absolute', right: -18, bottom: -54, color: muted, fontSize: 26 }}>10 ms</div>
    </div>
    <Footer />
  </div>
);

const FullWriteBenchmark: Page = () => {
  const active = useIsActivePage();
  const [zoomedOut, setZoomedOut] = useState(() => !active);

  useEffect(() => {
    if (!active) {
      setZoomedOut(true);
      return;
    }
    setZoomedOut(false);
    const timer = window.setTimeout(() => setZoomedOut(true), 160);
    return () => window.clearTimeout(timer);
  }, [active]);

  return (
  <div style={{ ...base, padding: 120 }}>
    <Title size={108}>Writing a small text file</Title>
    <div style={{ position: 'absolute', left: 370, top: 370, width: WRITE_PLOT_WIDTH, height: 420, borderLeft: `3px solid ${line}`, borderBottom: `3px solid ${line}` }}>
      <div style={{ position: 'absolute', left: -360, top: 100, width: 330, transform: 'translateY(-50%)', textAlign: 'right', fontSize: 40, lineHeight: 1 }}>APFS</div>
      <div style={{ position: 'absolute', left: -360, top: 270, width: 330, transform: 'translateY(-50%)', textAlign: 'right', fontSize: 40, lineHeight: 1 }}>SlackEmojiFS</div>
      <div style={{ position: 'absolute', left: 0, top: 150, width: WRITE_PLOT_WIDTH, borderTop: `2px solid ${line}`, opacity: 0.45 }} />
      <div style={{ position: 'absolute', left: 0, top: 320, width: WRITE_PLOT_WIDTH, borderTop: `2px solid ${line}`, opacity: 0.45 }} />
      <div style={{ position: 'absolute', left: 0, top: 64, width: zoomedOut ? (APFS_SMALL_WRITE_MS / SLACK_EMOJI_SMALL_WRITE_MS) * WRITE_PLOT_WIDTH : (APFS_SMALL_WRITE_MS / INITIAL_WRITE_SCALE_MS) * WRITE_PLOT_WIDTH, height: 72, background: gold, transition: 'width 920ms cubic-bezier(0.65, 0, 0.35, 1)' }} />
      <div style={{ position: 'absolute', left: zoomedOut ? 18 : 138, top: 100, transform: 'translateY(-50%)', color: muted, fontSize: 32, lineHeight: 1, transition: 'left 920ms cubic-bezier(0.65, 0, 0.35, 1)' }}>1 ms</div>
      <div style={{ position: 'absolute', left: 0, top: 234, width: zoomedOut ? WRITE_PLOT_WIDTH : INITIAL_SLACK_BAR_WIDTH, height: 72, background: 'var(--osd-accent)', transition: 'width 920ms cubic-bezier(0.65, 0, 0.35, 1)' }} />
      <div style={{ position: 'absolute', right: 0, top: 192, color: 'var(--osd-accent)', fontSize: 48, fontWeight: 700, lineHeight: 1, whiteSpace: 'nowrap', opacity: zoomedOut ? 1 : 0, transform: zoomedOut ? 'translateX(0)' : 'translateX(180px)', transition: 'transform 620ms cubic-bezier(0.16, 1, 0.3, 1) 480ms, opacity 180ms ease-out 480ms' }}>108,220 ms</div>
      <RetiringScaleTick label="0" left={0} leaving={zoomedOut} />
      <RetiringScaleTick label="2 ms" left={224} leaving={zoomedOut} />
      <RetiringScaleTick label="4 ms" left={462} leaving={zoomedOut} />
      <RetiringScaleTick label="6 ms" left={700} leaving={zoomedOut} />
      <RetiringScaleTick label="8 ms" left={938} leaving={zoomedOut} />
      <RetiringScaleTick label="10 ms" left={1172} leaving={zoomedOut} />
      <ArrivingScaleTick label="0" left={0} arrived={zoomedOut} />
      <ArrivingScaleTick label="30 sec" left={230} arrived={zoomedOut} />
      <ArrivingScaleTick label="60 sec" left={566} arrived={zoomedOut} />
      <ArrivingScaleTick label="90 sec" left={902} arrived={zoomedOut} />
      <ArrivingScaleTick label="108.22 sec" right={-48} arrived={zoomedOut} />
    </div>
    <Footer />
  </div>
  );
};
FullWriteBenchmark.transition = benchmarkZoom;

const DoomTest: Page = () => (
  <div style={{ ...base, padding: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
    <Title size={148}>but can it <span style={{ color: muted, textDecoration: 'line-through', textDecorationThickness: 7 }}>run</span><br />install <Accent>doom?</Accent></Title>
    <Footer />
  </div>
);

const FourHours: Page = () => (
  <div style={{ ...base, padding: 120, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
    <Title size={118}>Installing Doom</Title>
    <div style={{ marginTop: 66, color: 'var(--osd-accent)', fontFamily: 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace', fontSize: 150, fontWeight: 700, letterSpacing: '-0.07em', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}><DoomInstallClock /></div>
    <div style={{ marginTop: 36, color: muted, fontSize: 36 }}>total time</div>
    <Footer />
  </div>
);

const DidItWork: Page = () => (
  <div style={{ ...base, padding: 120 }}>
    <Title size={132}>It worked.</Title>
    <img src={runningDoom} alt="Doom running after installation through SlackEmojiFS" style={{ position: 'absolute', left: 360, top: 280, width: 1200, height: 675, objectFit: 'contain' }} />
    <Footer />
  </div>
);

const WhySlow: Page = () => (
  <div style={{ ...base, padding: 120 }}>
    <Title size={122}>Why so slow?</Title>
    <div style={{ position: 'absolute', left: 155, top: 420, width: 580 }}>
      <div style={{ color: 'var(--osd-accent)', fontSize: 66, fontWeight: 700 }}>Slack latency</div>
      <p style={{ margin: '24px 0 0', color: muted, fontSize: 42, lineHeight: 1.35 }}>Each object is a network/API operation designed for managing emoji.</p>
    </div>
    <div style={{ position: 'absolute', left: 1020, top: 420, width: 620 }}>
      <div style={{ color: 'var(--osd-accent)', fontSize: 66, fontWeight: 700 }}>Write amplification</div>
      <p style={{ margin: '24px 0 0', color: muted, fontSize: 42, lineHeight: 1.35 }}>One changed chunk can mean new metadata all the way to a new root.</p>
    </div>
    <Footer />
  </div>
);

const StorageVerdict: Page = () => (
  <div style={{ ...base, padding: 120 }}>
    <Title size={112}>Slack is a terrible storage device.</Title>
    <div style={{ position: 'absolute', left: 155, top: 430, fontSize: 52 }}>latency</div>
    <div style={{ position: 'absolute', left: 530, top: 560, color: muted, fontSize: 52 }}>rate limits</div>
    <div style={{ position: 'absolute', left: 960, top: 430, fontSize: 52 }}>storage efficiency</div>
    <div style={{ position: 'absolute', left: 1390, top: 560, color: muted, fontSize: 52 }}>garbage collection</div>
    <Footer />
  </div>
);

const TeachingDevice: Page = () => (
  <div style={{ ...base, padding: 120, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
    <Title size={114}>
      Slack gives us useful primitives,
      <br />
      <Accent>but not a filesystem.</Accent>
    </Title>

    <div style={{ marginTop: 48, color: muted, fontSize: 42, lineHeight: 1.4 }}>
      We can ignore disks and blocks,
      <br />
      but still have to invent directories, metadata and indirection
      <br />
      instead of shoving everything into one giant object.
    </div>

    <Footer />
  </div>
);

const LiveDemo: Page = () => (
  <div style={{ ...base, padding: 120, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
    <Title size={174}>Live demo.</Title>
    <Footer />
  </div>
);

const TitleQuestion: Page = () => (
  <div style={{ ...base, padding: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
    <Title size={142}>Is storing files in<br /><Accent>Slack emojis</Accent> a bad idea?</Title>
    <Footer />
  </div>
);

const Conclusion: Page = () => (
  <div style={{ ...base, padding: 120, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
    <Title size={142}>Terrible storage.</Title>
    <div style={{ height: 38 }} />
    <Title size={142}>Great way to learn <Accent>filesystems.</Accent></Title>
    <Footer />
  </div>
);

const SponsorThanks: Page = () => (
  <div style={{ ...base, padding: 120, textAlign: 'center' }}>
    <div style={{ position: 'absolute', left: 0, right: 0, top: 156 }}>
      <Title size={76}>Thanks, <Accent>PyCharm + Pyrefly.</Accent></Title>
    </div>
    <div style={{ position: 'absolute', left: 350, top: 375, width: 430, height: 320, display: 'grid', placeItems: 'center' }}>
      <img src={pycharmLogo} alt="PyCharm" style={{ width: 330, height: 250, objectFit: 'contain' }} />
    </div>
    <div style={{ position: 'absolute', left: 1140, top: 375, width: 430, height: 320, display: 'grid', placeItems: 'center' }}>
      <img src={pyreflyLogo} alt="Pyrefly" style={{ width: 390, height: 220, objectFit: 'contain' }} />
    </div>
    <div style={{ position: 'absolute', left: 0, right: 0, top: 805, color: muted, fontSize: 28, fontStyle: 'italic' }}>
      PyCon AU sponsors — and genuinely helpful on this project.
    </div>
    <Footer />
  </div>
);

const End: Page = () => (
  <div style={{ ...base, padding: 120, position: 'relative', textAlign: 'center' }}>
    <div style={{ position: 'absolute', left: 0, right: 0, top: 76, color: 'var(--osd-text)', fontFamily: '"Caveat", "Bradley Hand", cursive', fontSize: 190, fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 0.9 }}>cheers :)</div>
    <div style={{ position: 'absolute', left: 0, right: 0, top: 288, color: pinkLight, fontSize: 58 }}>ashl.dev</div>
    <div style={{ position: 'absolute', left: 560, top: 402 }}>
      <QrLink
        href="https://github.com/ashleylamont/fuse-slack-emoji"
        qr={fuseSlackEmojiQr}
        alt="QR code linking to the fuse-slack-emoji GitHub repository"
        path="/source"
        emojiName=":efs_repo:"
        note="check out the file system"
        accent={pinkLight}
        rotation={-1.1}
        captionSide="left"
      />
    </div>
    <div style={{ position: 'absolute', left: 1020, top: 402 }}>
      <QrLink
        href="https://github.com/ashleylamont/slides/tree/main/slides/slack-emoji-filesystem"
        qr={talkSlidesQr}
        alt="QR code linking to the SlackEmojiFS talk slides on GitHub"
        path="/slides"
        emojiName=":efs_slides:"
        note="these these slides with you"
        accent={lilac}
        rotation={1.1}
        captionSide="right"
      />
    </div>
    <div style={{ position: 'absolute', right: 350, bottom: 89, color: muted, fontFamily: '"Caveat", "Bradley Hand", cursive', fontSize: 40, fontWeight: 600, transform: 'rotate(-7deg)' }}>nice :)</div>
    <svg aria-hidden="true" width="140" height="70" viewBox="0 0 140 70" style={{ position: 'absolute', left: 1605, top: 943, overflow: 'visible' }}>
      <path d="M4 14 Q72 8 128 54" fill="none" stroke={muted} strokeWidth="3" strokeLinecap="round" />
      <path d="M128 54 L116 47 M128 54 L122 40" fill="none" stroke={muted} strokeWidth="3" strokeLinecap="round" />
    </svg>
    <Footer />
  </div>
);

export const meta: SlideMeta = {
  title: 'Is storing files in Slack emojis a bad idea? Maybe. Let’s do it anyway!',
  createdAt: '2026-08-24T11:15:41.497Z',
  theme: 'ashl-dev',
};

// Index-aligned with the assembled draft deck.
const noteTargets = [
  '00:00', '00:20', '00:35', '00:50', '01:15', '01:35', '01:55', '02:10', '02:30', '02:50',
  '03:10', '03:30', '03:50', '04:10', '04:35', '05:00', '05:25', '05:45', '06:05', '06:35',
  '07:05', '07:35', '07:55', '08:15', '08:35', '08:50', '09:05', '09:20', '09:35', '09:50',
  '10:05', '10:20', '10:35', '10:50', '11:05', '11:20', '11:35', '11:55', '12:15', '12:35',
  '12:55', '13:20', '13:45', '14:05', '14:50', '15:15', '15:35', '16:00', '16:20',
  '16:40', '17:00', '17:20', '17:40', '18:00', '18:20', '18:45', '19:10', '19:30', '19:50',
  '20:10', '20:30', '20:50', '21:10', '21:40', '22:00', '23:45', '24:15', '24:35',
  '25:00',
] as const;

const rawNotes: (string | undefined)[] = [
  'Read out the title.',
  'Briefly set the scene before introducing myself and where I work.',
  'Quick introduction only.',
  'I work at Atlassian. The important thing to know about us here is that we love shitposting with Slack emoji.',
  'Show a few emoji and emoji-tool examples. Mention :let-me-merge-or-ill-shit-my-pants: if it feels useful in the room.',
  'We have over 100,000 custom emoji. That is a lot, but we are not the only tech company with a strong emoji game.',
  'Canva has some excellent emoji technology too: a Slack workflow that plays the Shrek movie in emoji format.',
  'This is Harry Brewis, also known as hbomberguy. He is my foreshadowing indicator: when he appears, I am foreshadowing something.',
  'Looking at Canva’s Shrek workflow made me think they must have scripted the uploads. Slack does have an API for creating emoji. Reveal Harry and pause.',
  'Enough about Canva; we can come back to them once they IPO. I had downloaded every emoji in the Atlassian workspace and started wondering whether Slack was compressing them.',
  'I tested an image uploaded to and downloaded from Slack as an emoji. The pixels came back unchanged: unlike Discord, Slack stored this test losslessly.',
  'That is a lot of image storage. Surely Slack sets a total limit, and is Atlassian close to it? Reveal Harry after explaining there is no total limit.',
  'As far as I can tell, beyond per-emoji size limits, there is no total emoji limit. Could this be infinite data?',
  'We could label QR-code chunks as data-part-1, data-part-2, and so on. That would be extremely inconvenient, so I put the idea down for a while.',
  'A few weeks later, YouTube showed me DocJade running Factorio from thousands of floppy disks with a custom filesystem. Maybe this was the use case.',
  'I do not know anything about filesystems, but floppy disks and emoji are both things you can read and write. We can store data reliably, make as many objects as we need, and create them through an API. In theory, that is enough to start.',
  'Before this, I knew FAT32 could not store big files, APFS was supposedly good, and filesystems held files and folders. That was not enough to build one.',
  'I tried Googling how to make a filesystem. It turns out this is not a common enough question to have straightforward learning resources.',
  'So I did what many of us do instead in 2026: I asked ChatGPT. It pointed me toward something called FUSE.',
  'Building a filesystem normally means kernel-level operating-system integration. FUSE provides a simpler shared interface between a userspace filesystem and the OS, at some performance cost.',
  'FUSE is written in C, but Python libraries expose a simpler wrapper for it. That helps with talking to the OS; we still need to build the filesystem itself.',
  'A filesystem is fundamentally a program that answers questions from the operating system. Read through the FUSE operations as English questions first, then their names.',
  'A path is ultimately a label for a destination. Step through the mount path, folder, and file; then advance to pull them apart into the tree they represent.',
  'The path’s pieces form a tree-like structure: folders lead to more folders and eventually a file.',
  'Ignore the path outside the mounted filesystem. We only need a root: if everything can be found from it, we are set.',
  'The root points to a directory containing the filesystem’s files and folders.',
  'That directory has an entry named files which points to another directory.',
  'The files directory has an entry named my-file.txt which points to a file record.',
  'Finally, the file record points to data chunks containing the file’s contents.',
  'The inodes are not all the same: the two directory inodes have type DIR, while the file inode has type FILE.',
  'Everything in the filesystem is one of four object types: roots, inodes, directory entries, or data chunks.',
  'A data chunk is deliberately a dumb bytes container. Its size is tracked by the inode rather than the chunk itself.',
  'Directory entries map names to object IDs. On disk that might be a numeric address; here it is a Slack emoji object ID.',
  'Inodes hold common metadata: ownership, permissions, and timestamps, plus a tag saying whether this is a file or directory.',
  'A file inode adds an ordered list of data-chunk IDs and the total file size, so those chunks can read as one file.',
  'A directory inode points to its directory-entry object. This implementation has one entries object per directory.',
  'A root object is the entry point: find it, then follow its root inode ID into the filesystem tree.',
  'Put the object types back together: root to directory inode to directory entries, then branch into a directory or file. The file inode reaches its data chunks.',
  'The model needs a backing store. Every root, inode, directory-entry object, and data chunk needs to become something Slack can save and return to us.',
  'Slack will accept a custom emoji image, not an arbitrary byte string. So the bytes have to become an image first.',
  'A short header records the payload length, followed by the payload bytes. Map those bytes into RGBA pixel channels, then upload the resulting image as a custom emoji.',
  'Emoji names act as object IDs: format version, namespace, object type, creation time, and a random unique suffix.',
  'Structured filesystem objects need serialization too. Encode the YAML-like fields as CBOR bytes, then put those bytes into the same emoji-image format.',
  'An emoji name identifies an immutable image. Download its pixels and decode the original bytes — enough to act as an object store.',
  'Return briefly to the completed tree. The packed image at left is one real stored object; there is one Slack emoji like it for every root, inode, directory-entry object, and data chunk. The arrows are references containing those emoji names.',
  'Creating an object is conceptually simple: serialize it, encode it as a PNG, assign an ID, and add the emoji. The real backend stages a temporary Slack file before admin.emoji.add.',
  'We can create and retrieve arbitrary objects, so editing should be easy too. Reveal the foreshadowing indicator and pause.',
  'Slack exposes list, add, alias, and remove operations, but no operation that replaces an existing emoji image in place. [Sources]\nhttps://docs.slack.dev/reference/methods/emoji.list/\nhttps://docs.slack.dev/reference/methods/admin.emoji.add/\nhttps://docs.slack.dev/reference/methods/admin.emoji.addAlias/\nhttps://docs.slack.dev/reference/methods/admin.emoji.list/\nhttps://docs.slack.dev/reference/methods/admin.emoji.remove/\n[/Sources]',
  'If the old chunk cannot be edited, create a new chunk object containing the changed bytes. Both versions remain in Slack.',
  'The existing file inode still contains the old chunk ID. The new object is stored, but nothing in the current filesystem reaches it.',
  'Create a replacement file inode that points to the replacement chunk. Unchanged chunks can still be shared.',
  'The directory entry still points to the old inode. Replace it, then replace each referring object in turn all the way back toward the root.',
  'Publish a new root pointing to the rebuilt path. The old path remains reachable, while unchanged branches are reused.',
  'Now name the pattern: copy-on-write. Copy changed objects, reuse unchanged objects, and move the root.',
  'Because the earlier roots still reach earlier trees, the roots form a history of filesystem snapshots. Garbage collection is a future problem.',
  'Return to FUSE as the integration layer: ordinary filesystem calls enter the Python implementation, which reads or updates the Slack-backed object tree.',
  'The small-write benchmark begins with APFS at one millisecond and SlackEmojiFS apparently somewhere off the end of a 10 ms scale.',
  'Zoom out to the actual scale: SlackEmojiFS takes 108,220 ms for that small text-file write.',
  'Two things dominate: each object requires Slack network/API work, and copy-on-write amplifies one logical write into several new objects.',
  'A small text file is not a representative benchmark. But can it run—well, install—Doom?',
  'Installing Doom completed in 3:46:26.94. Pause and let the number land.',
  'Doom did install and run. Show the screenshot briefly, then move on.',
  'The verdict as storage is straightforward: latency, rate limits, poor efficiency, and unresolved garbage collection make this a terrible production backend.',
  'A normal filesystem hides most of its machinery. Slack gives us only emoji images and names, so we have to build the storage format, naming scheme, references, and update behaviour ourselves. That is why it is useful for learning.',
  'Run the prepared one-to-two-minute demo: list a directory, read a tiny file, optionally write one, then show the resulting emoji objects or viewer. Use the matching recording if needed.',
  'Return to the opening question and answer it plainly: yes, it is a bad idea — and that is exactly why it is useful.',
  'Deliver the final verdict: terrible storage, great way to learn filesystems.',
  'Acknowledge PyCharm and Pyrefly: both were genuinely helpful while building this project, and both sponsor PyCon AU. Then advance to the QR-code closing slide.',
  'Thank the audience and leave ashl.dev plus the two QR codes on screen: one for the filesystem source and one for the talk slides.',
];

if (noteTargets.length !== rawNotes.length) throw new Error('Every slide needs one elapsed-time target.');

export const notes: string[] = rawNotes.map((note, index) => `Target elapsed: ${noteTargets[index]}\n${note ?? ''}`);

export default [
  Cover,
  SetTheScene,
  AboutMe,
  Atlassian,
  EmojiShitposting,
  AtlassianEmoji,
  CanvaEmojis,
  Foreshadowing,
  CanvaForeshadowed,
  LeaveCanva,
  LosslessEmoji,
  NaturalQuestion,
  InfiniteData,
  DodgyStorage,
  Meanwhile,
  Collision,
  FilesystemsAreHard,
  GoogleFilesystem,
  ChatGptFilesystem,
  WhatIsFuse,
  PythonFuse,
  FilesystemOperations,
  FamiliarPath,
  FamiliarPathTree,
  FilesystemRoot,
  RootDirectory,
  FilesDirectory,
  FileRecord,
  FileDataChunks,
  InodeTypesTree,
  FilesystemObjects,
  DataChunkObjects,
  DirectoryEntryObjects,
  InodeObjects,
  FileInodeObjects,
  DirectoryInodeObjects,
  RootObjects,
  PuttingPiecesTogether,
  ObjectStorage,
  SlackOnlyImages,
  ImageDataPacking,
  EmojiIds,
  StructuredObjects,
  EmojiObject,
  EverythingEmojiTree,
  CreateObject,
  EditingShouldBeEasy,
  EmojiApis,
  NewObjectVersion,
  StaleFileInode,
  NewFileInode,
  EveryReference,
  PublishNewRoot,
  CopyOnWrite,
  Snapshots,
  Fuse,
  SmallWriteBenchmark,
  FullWriteBenchmark,
  WhySlow,
  DoomTest,
  FourHours,
  DidItWork,
  StorageVerdict,
  TeachingDevice,
  LiveDemo,
  TitleQuestion,
  Conclusion,
  SponsorThanks,
  End,
] satisfies Page[];

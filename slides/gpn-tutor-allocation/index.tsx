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
import gpnLogo from './assets/Copy of Pictagram Green.png';

export const design: DesignSystem = {
  palette: { bg: '#242432', text: '#d5cabd', accent: '#e987e0' },
  fonts: {
    display: '"Rokkitt", Rockwell, Georgia, serif',
    body: '"Rokkitt", Rockwell, Georgia, serif',
  },
  typeScale: { hero: 176, body: 40 },
  radius: 0,
};

const FONT_HREF = 'https://fonts.googleapis.com/css2?family=Rokkitt:wght@400;700&display=swap';
const FONT_LINK_ID = 'osd-webfont-gpn-tutor-allocation';
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
const red = '#e3a9b8';
const EASE_SETTLE = 'cubic-bezier(0.16, 1, 0.3, 1)';
const EASE_IN = 'cubic-bezier(0.4, 0, 1, 1)';
const MATRIX_MORPH_MS = 520;

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

const matrixMorph: SlideTransition = {
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
  morph: { duration: MATRIX_MORPH_MS, easing: 'cubic-bezier(0.18, 0.86, 0.24, 1)' },
};

const base: CSSProperties = {
  width: '100%',
  height: '100%',
  boxSizing: 'border-box',
  position: 'relative',
  background: 'var(--osd-bg)',
  color: 'var(--osd-text)',
  fontFamily: 'var(--osd-font-body)',
};

const Accent = ({ children }: { children: ReactNode }) => (
  <span style={{ color: 'var(--osd-accent)' }}>{children}</span>
);

const Footer = () => {
  const { current, total } = useSlidePageNumber();
  return (
    <div style={{ position: 'absolute', right: 120, bottom: 50, color: muted, fontSize: 23 }}>
      {current} / {total}
    </div>
  );
};

const PageTitle = ({ children }: { children: ReactNode }) => (
  <h2
    style={{
      margin: 0,
      fontFamily: 'var(--osd-font-display)',
      fontSize: 76,
      fontWeight: 700,
      lineHeight: 1,
      letterSpacing: '-0.02em',
    }}
  >
    {children}
  </h2>
);

const Statement = ({
  children,
  size = 132,
  align = 'left',
}: {
  children: ReactNode;
  size?: number;
  align?: 'left' | 'center';
}) => (
  <div
    style={{
      ...base,
      padding: '120px 150px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: align === 'center' ? 'center' : 'flex-start',
      justifyContent: 'center',
      textAlign: align,
    }}
  >
    <div
      style={{
        maxWidth: 1580,
        fontFamily: 'var(--osd-font-display)',
        fontSize: size,
        fontWeight: 700,
        lineHeight: 0.98,
        letterSpacing: '-0.025em',
      }}
    >
      {children}
    </div>
    <Footer />
  </div>
);

const MathFormula = ({
  children,
  label,
  accent = false,
  size = 66,
}: {
  children: ReactNode;
  label: string;
  accent?: boolean;
  size?: number;
}) => (
  <math
    xmlns="http://www.w3.org/1998/Math/MathML"
    display="block"
    aria-label={label}
    style={{
      color: accent ? 'var(--osd-accent)' : 'var(--osd-text)',
      fontFamily: '"STIX Two Math", "Cambria Math", "Times New Roman", serif',
      fontSize: size,
      margin: 0,
    }}
  >
    {children}
  </math>
);

const BinaryChoiceMath = () => (
  <MathFormula label="x sub t comma r is an element of the set zero, one" accent size={76}>
    <msub><mi>x</mi><mrow><mi>t</mi><mo>,</mo><mi>r</mi></mrow></msub>
    <mo>∈</mo>
    <mo>{'{'}</mo><mn>0</mn><mo>,</mo><mn>1</mn><mo>{'}'}</mo>
  </MathFormula>
);

const ExactlyOneMath = () => (
  <MathFormula label="the sum over rooms r of x sub t comma r equals one" accent>
    <mrow>
      <msub><mo>∑</mo><mi>r</mi></msub>
      <msub><mi>x</mi><mrow><mi>t</mi><mo>,</mo><mi>r</mi></mrow></msub>
      <mo>=</mo><mn>1</mn>
    </mrow>
  </MathFormula>
);

const LeadPinMath = () => (
  <MathFormula label="x sub lead comma A equals one" accent>
    <msub><mi>x</mi><mrow><mtext>lead</mtext><mo>,</mo><mi>A</mi></mrow></msub>
    <mo>=</mo><mn>1</mn>
  </MathFormula>
);

const LectureFillMath = () => (
  <MathFormula label="the sum over tutors t of y sub r comma s comma t equals one" accent>
    <mrow>
      <msub><mo>∑</mo><mi>t</mi></msub>
      <msub><mi>y</mi><mrow><mi>r</mi><mo>,</mo><mi>s</mi><mo>,</mo><mi>t</mi></mrow></msub>
      <mo>=</mo><mn>1</mn>
    </mrow>
  </MathFormula>
);

const BalanceMath = () => (
  <MathFormula label="negative one is less than or equal to the sum over tutors of x sub t A minus the sum over tutors of x sub t B, which is less than or equal to one" accent size={70}>
    <mrow>
      <mo>−</mo><mn>1</mn><mo>≤</mo>
      <msub><mo>∑</mo><mi>t</mi></msub>
      <msub><mi>x</mi><mrow><mi>t</mi><mo>,</mo><mi>A</mi></mrow></msub>
      <mo>−</mo>
      <msub><mo>∑</mo><mi>t</mi></msub>
      <msub><mi>x</mi><mrow><mi>t</mi><mo>,</mo><mi>B</mi></mrow></msub>
      <mo>≤</mo><mn>1</mn>
    </mrow>
  </MathFormula>
);

const WeightedObjectiveMath = () => (
  <MathFormula label="maximize the sum over i of w sub i times z sub i" accent size={72}>
    <mrow>
      <mo>max</mo>
      <msub><mo>∑</mo><mi>i</mi></msub>
      <msub><mi>w</mi><mi>i</mi></msub>
      <msub><mi>z</mi><mi>i</mi></msub>
    </mrow>
  </MathFormula>
);

const FreezeMath = () => (
  <MathFormula label="f sub j of x is greater than or equal to f sub j star minus epsilon" size={64}>
    <mrow>
      <msub><mi>f</mi><mi>j</mi></msub><mo>(</mo><mi>x</mi><mo>)</mo>
      <mo>≥</mo>
      <msubsup><mi>f</mi><mi>j</mi><mo>∗</mo></msubsup>
      <mo>−</mo><mi>ε</mi>
    </mrow>
  </MathFormula>
);

const MatrixCell = ({
  children,
  selected = false,
  highlight = false,
  label = false,
  size,
}: {
  children: ReactNode;
  selected?: boolean;
  highlight?: boolean;
  label?: boolean;
  size: number;
}) => (
  <div
    style={{
      width: label ? 140 : size,
      height: size,
      display: 'grid',
      placeItems: 'center',
      boxSizing: 'border-box',
      border: label ? 'none' : `2px solid ${highlight || selected ? 'var(--osd-accent)' : line}`,
      background: selected ? 'var(--osd-accent)' : highlight ? '#342d42' : 'transparent',
      color: selected ? 'var(--osd-bg)' : label ? muted : 'var(--osd-text)',
      fontSize: label ? 28 : 42,
      fontWeight: selected ? 700 : 400,
      fontFamily: label ? 'var(--osd-font-body)' : 'ui-monospace, "SFMono-Regular", Menlo, monospace',
    }}
  >
    {children}
  </div>
);

const AssignmentMatrix = ({
  left,
  top,
  size,
  highlightRow = false,
  highlightLead = false,
}: {
  left: number;
  top: number;
  size: number;
  highlightRow?: boolean;
  highlightLead?: boolean;
}) => {
  const gap = size > 120 ? 16 : 12;
  const width = 140 + size * 4 + gap * 4;
  const height = size * 5 + gap * 4;
  return (
    <MorphElement id="assignment-grid">
      <div
        style={{
          position: 'absolute',
          left,
          top,
          width,
          height,
          display: 'grid',
          gridTemplateColumns: `140px repeat(4, ${size}px)`,
          gridTemplateRows: `repeat(5, ${size}px)`,
          gap,
        }}
      >
        <MatrixCell label size={size}>x[t,r]</MatrixCell>
        <MatrixCell label size={size}>Room A</MatrixCell>
        <MatrixCell label size={size}>Room B</MatrixCell>
        <MatrixCell label size={size}>Room C</MatrixCell>
        <MatrixCell label size={size}>Room D</MatrixCell>

        <MatrixCell label size={size}>Tutor 1</MatrixCell>
        <MatrixCell size={size} selected highlight={highlightRow || highlightLead}>1</MatrixCell>
        <MatrixCell size={size} highlight={highlightRow}>0</MatrixCell>
        <MatrixCell size={size} highlight={highlightRow}>0</MatrixCell>
        <MatrixCell size={size} highlight={highlightRow}>0</MatrixCell>

        <MatrixCell label size={size}>Tutor 2</MatrixCell>
        <MatrixCell size={size}>0</MatrixCell>
        <MatrixCell size={size}>0</MatrixCell>
        <MatrixCell size={size} selected>1</MatrixCell>
        <MatrixCell size={size}>0</MatrixCell>

        <MatrixCell label size={size}>Tutor 3</MatrixCell>
        <MatrixCell size={size}>0</MatrixCell>
        <MatrixCell size={size} selected>1</MatrixCell>
        <MatrixCell size={size}>0</MatrixCell>
        <MatrixCell size={size}>0</MatrixCell>

        <MatrixCell label size={size}>Tutor 4</MatrixCell>
        <MatrixCell size={size}>0</MatrixCell>
        <MatrixCell size={size}>0</MatrixCell>
        <MatrixCell size={size}>0</MatrixCell>
        <MatrixCell size={size} selected>1</MatrixCell>
      </div>
    </MorphElement>
  );
};

const BandRow = ({ number, title }: { number: string; title: string }) => (
  <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr', alignItems: 'baseline', gap: 26 }}>
    <div style={{ color: 'var(--osd-accent)', fontSize: 32 }}>{number}</div>
    <div style={{ fontSize: 48, fontWeight: 700 }}>{title}</div>
  </div>
);

const TetrisRoom = ({ left, label }: { left: number; label: string }) => (
  <div
    style={{
      position: 'absolute',
      left,
      top: 384,
      width: 330,
      height: 410,
      border: `3px solid ${line}`,
      borderTop: 'none',
      boxSizing: 'border-box',
    }}
  >
    <div style={{ position: 'absolute', top: -54, left: 0, right: 0, color: muted, fontSize: 30, textAlign: 'center' }}>
      ROOM {label}
    </div>
  </div>
);

const TetrisTutor = ({
  active,
  left,
  top,
  label,
  color,
  delay,
  width = 136,
}: {
  active: boolean;
  left: number;
  top: number;
  label: string;
  color: string;
  delay: number;
  width?: number;
}) => (
  <div
    style={{
      position: 'absolute',
      left,
      top,
      width,
      height: 82,
      display: 'grid',
      placeItems: 'center',
      boxSizing: 'border-box',
      border: `3px solid ${color}`,
      background: '#2f2d3a',
      color,
      fontSize: 30,
      fontWeight: 700,
      animation: active ? `gpnTetrisDrop 660ms ${EASE_SETTLE} ${delay}ms both` : undefined,
    }}
  >
    {label}
  </div>
);

const FailureChip = ({
  active,
  top,
  label,
  state,
  delay,
}: {
  active: boolean;
  top: number;
  label: string;
  state: string;
  delay: number;
}) => (
  <div
    style={{
      position: 'absolute',
      left: 1190,
      top,
      width: 560,
      minHeight: 112,
      display: 'grid',
      gridTemplateColumns: '62px 1fr auto',
      alignItems: 'center',
      gap: 20,
      padding: '20px 28px',
      boxSizing: 'border-box',
      border: `2px solid ${red}`,
      background: '#302c38',
      opacity: active ? undefined : 1,
      animation: active ? `gpnFailureLand 360ms ${EASE_SETTLE} ${delay}ms both` : undefined,
    }}
  >
    <div style={{ color: red, fontSize: 54, fontWeight: 700, lineHeight: 1 }}>×</div>
    <div style={{ fontSize: 34 }}>{label}</div>
    <div style={{ color: red, fontSize: 27, fontFamily: 'ui-monospace, monospace' }}>{state}</div>
  </div>
);

type LexCellState = 'blank' | 'locked' | 'max';

const LexCell = ({ top, state, pulse = false }: { top: number; state: LexCellState; pulse?: boolean }) => {
  const isLocked = state === 'locked';
  const isMax = state === 'max';
  return (
    <div
      style={{
        position: 'absolute',
        top,
        width: 206,
        height: 72,
        display: 'grid',
        placeItems: 'center',
        border: `2px solid ${isMax ? 'var(--osd-accent)' : isLocked ? green : line}`,
        background: isMax ? 'var(--osd-accent)' : isLocked ? '#173a32' : 'transparent',
        color: isMax ? 'var(--osd-bg)' : isLocked ? green : line,
        fontFamily: 'ui-monospace, "SFMono-Regular", Menlo, monospace',
        fontSize: 26,
        fontWeight: 700,
        animation: pulse ? `gpnLexPulse 440ms ${EASE_SETTLE} both` : undefined,
      }}
    >
      {isMax ? 'MAX' : isLocked ? 'LOCKED' : '—'}
    </div>
  );
};

const LexPassColumn = ({ left, pass, current = false }: { left: number; pass: number; current?: boolean }) => {
  const stateFor = (row: number): LexCellState => row < pass ? 'locked' : row === pass ? 'max' : 'blank';
  return (
    <div style={{ position: 'absolute', left, top: 0, width: 206, animation: current ? `gpnLexColumn 360ms ${EASE_SETTLE} both` : undefined }}>
      <div style={{ position: 'absolute', top: 226, width: 206, color: muted, fontSize: 24, textAlign: 'center', fontFamily: 'ui-monospace, monospace' }}>
        PASS {pass + 1}
      </div>
      <LexCell top={284} state={stateFor(0)} pulse={current && pass === 0} />
      <LexCell top={376} state={stateFor(1)} pulse={current && pass === 1} />
      <LexCell top={468} state={stateFor(2)} pulse={current && pass === 2} />
      <LexCell top={560} state={stateFor(3)} pulse={current && pass === 3} />
      <LexCell top={652} state={stateFor(4)} pulse={current && pass === 4} />
    </div>
  );
};

const CandidateDot = ({
  active,
  valid,
  cx,
  cy,
  label,
  delay,
}: {
  active: boolean;
  valid: boolean;
  cx: number;
  cy: number;
  label: string;
  delay: number;
}) => {
  const finalOpacity = valid ? 1 : 0.18;
  return (
    <g
      style={{
        opacity: active ? undefined : finalOpacity,
        animation: active
          ? `${valid ? 'gpnCandidateKeep' : 'gpnCandidateCull'} 520ms ${EASE_SETTLE} ${delay}ms both`
          : undefined,
      }}
    >
      <circle cx={cx} cy={cy} r={valid ? 19 : 16} fill={valid ? 'var(--osd-accent)' : red} />
      {!valid ? (
        <g stroke={red} strokeWidth="5" strokeLinecap="round">
          <line x1={cx - 20} y1={cy - 20} x2={cx + 20} y2={cy + 20} />
          <line x1={cx + 20} y1={cy - 20} x2={cx - 20} y2={cy + 20} />
        </g>
      ) : null}
      <text x={cx + 28} y={cy + 8} fill={valid ? 'var(--osd-text)' : muted} fontSize="28">{label}</text>
    </g>
  );
};

const ConstraintOutcome = ({
  kind,
  example,
  outcome,
}: {
  kind: 'HARD' | 'SOFT';
  example: string;
  outcome: string;
}) => {
  const isHard = kind === 'HARD';
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr 430px', alignItems: 'center', gap: 48 }}>
      <div style={{ color: isHard ? red : gold, fontSize: 30, fontFamily: 'ui-monospace, monospace' }}>{kind}</div>
      <div style={{ fontSize: 52, fontWeight: 700 }}>{example}</div>
      <div style={{ color: isHard ? red : 'var(--osd-accent)', fontSize: 48, fontWeight: 700, textAlign: 'right' }}>{outcome}</div>
    </div>
  );
};

const ScoreTerm = ({
  active,
  label,
  points,
  width,
  color,
  delay,
}: {
  active: boolean;
  label: string;
  points: string;
  width: number;
  color: string;
  delay: number;
}) => (
  <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr 110px', alignItems: 'center', gap: 26 }}>
    <div style={{ fontSize: 36 }}>{label}</div>
    <div style={{ height: 30, background: '#332f3b', position: 'relative' }}>
      <div
        style={{
          width,
          height: 30,
          background: color,
          transformOrigin: 'left center',
          transform: active ? undefined : 'scaleX(1)',
          animation: active ? `gpnScoreGrow 620ms ${EASE_SETTLE} ${delay}ms both` : undefined,
        }}
      />
    </div>
    <div style={{ color, fontSize: 36, fontFamily: 'ui-monospace, monospace', textAlign: 'right' }}>{points}</div>
  </div>
);

const TradeBar = ({
  active,
  label,
  score,
  width,
  winner = false,
  delay,
}: {
  active: boolean;
  label: string;
  score: string;
  width: number;
  winner?: boolean;
  delay: number;
}) => (
  <div style={{ display: 'grid', gridTemplateColumns: '500px 1fr 150px', gap: 34, alignItems: 'center' }}>
    <div style={{ fontSize: 34 }}>{label}</div>
    <div style={{ height: 44, background: '#332f3b' }}>
      <div
        style={{
          width,
          height: 44,
          background: winner ? 'var(--osd-accent)' : muted,
          transformOrigin: 'left center',
          animation: active
            ? `${winner ? 'gpnTradeWinner' : 'gpnTradeLeader'} 760ms ${EASE_SETTLE} ${delay}ms both`
            : undefined,
        }}
      />
    </div>
    <div
      style={{
        color: winner ? 'var(--osd-accent)' : muted,
        fontSize: 42,
        fontFamily: 'ui-monospace, monospace',
        textAlign: 'right',
        animation: active ? `gpnTradeScore 220ms ease-out ${delay + 560}ms both` : undefined,
      }}
    >
      {score}
    </div>
  </div>
);

const OptimalityGap = () => {
  const active = useIsActivePage();
  const [progress, setProgress] = useState(() => active ? 0 : 1);

  useEffect(() => {
    if (!active) {
      setProgress(1);
      return;
    }

    setProgress(0);
    const startedAt = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const raw = Math.min((now - startedAt) / 2_300, 1);
      const eased = 1 - Math.pow(1 - raw, 3);
      setProgress(eased);
      if (raw < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active]);

  const incumbent = Math.round(112 + 38 * progress);
  const upperBound = 178 - 27.5 * progress;
  const gap = upperBound - incumbent;
  const incumbentX = 190 + (incumbent - 100) * 14;
  const boundX = 190 + (upperBound - 100) * 14;
  const proofComplete = gap < 1;
  const boundLabel = upperBound.toFixed(1);
  const gapLabel = proofComplete ? '< 1' : gap.toFixed(1);

  return (
    <div style={{ position: 'relative', width: 1420, height: 500 }} aria-live="polite">
      <svg width="1420" height="500" viewBox="0 0 1420 500" role="img" aria-label={`Best integer solution ${incumbent}; upper bound ${boundLabel}; optimality gap ${gapLabel}`}>
        <line x1="190" y1="300" x2="1310" y2="300" stroke={line} strokeWidth="4" />
        <line x1="190" y1="286" x2="190" y2="314" stroke={line} strokeWidth="4" />
        <line x1="890" y1="286" x2="890" y2="314" stroke={line} strokeWidth="4" />
        <line x1="1310" y1="286" x2="1310" y2="314" stroke={line} strokeWidth="4" />
        <text x="190" y="352" textAnchor="middle" fill={muted} fontSize="28">100</text>
        <text x="890" y="352" textAnchor="middle" fill={muted} fontSize="28">150</text>
        <text x="1310" y="352" textAnchor="middle" fill={muted} fontSize="28">180</text>

        <line x1={incumbentX} y1="238" x2={boundX} y2="238" stroke="var(--osd-accent)" strokeWidth="18" strokeLinecap="round" opacity="0.32" />
        <line x1={incumbentX} y1="210" x2={incumbentX} y2="318" stroke={green} strokeWidth="7" />
        <circle cx={incumbentX} cy="300" r="16" fill={green} />
        <line x1={boundX} y1="210" x2={boundX} y2="318" stroke={gold} strokeWidth="7" />
        <circle cx={boundX} cy="300" r="16" fill={gold} />

        <text x={incumbentX} y="175" textAnchor="middle" fill={green} fontSize="30">best found · {incumbent}</text>
        <text x={boundX} y="405" textAnchor="middle" fill={gold} fontSize="30">best still possible · {boundLabel}</text>
        <text x={(incumbentX + boundX) / 2} y="238" textAnchor="middle" dominantBaseline="middle" fill="var(--osd-text)" fontSize="28" fontWeight="700">gap {gapLabel}</text>
      </svg>
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          textAlign: 'center',
          color: proofComplete ? 'var(--osd-accent)' : muted,
          fontSize: proofComplete ? 82 : 46,
          fontWeight: 700,
          transition: 'font-size 240ms ease-out, color 240ms ease-out',
        }}
      >
        {proofComplete ? 'OPTIMAL' : 'checking for a better one…'}
      </div>
    </div>
  );
};

const Cover: Page = () => {
  const active = useIsActivePage();
  return (
    <div
      style={{
        ...base,
        padding: '110px 140px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <style>{`
        @keyframes gpnPerfectPulse {
          0%, 35% { transform: scale(1); text-shadow: 0 0 0 rgba(233, 135, 224, 0); }
          58% { transform: scale(1.045); text-shadow: 0 0 34px rgba(233, 135, 224, .28); }
          78% { transform: scale(.994); }
          100% { transform: scale(1); text-shadow: 0 0 0 rgba(233, 135, 224, 0); }
        }
      `}</style>
      <h1
        style={{
          margin: 0,
          maxWidth: 1600,
          fontFamily: 'var(--osd-font-display)',
          fontSize: 156,
          fontWeight: 700,
          lineHeight: 0.94,
          letterSpacing: '-0.03em',
        }}
      >
        Allocating GPN Tutors{' '}
        <span
          style={{
            display: 'inline-block',
            color: 'var(--osd-accent)',
            animation: active ? `gpnPerfectPulse 980ms ${EASE_SETTLE} 380ms both` : undefined,
          }}
        >
          Perfectly
        </span>{' '}
        Using Linear Algebra
      </h1>
      <Footer />
    </div>
  );
};

const GDay: Page = () => (
  <Statement size={148}>
    G’Day, I’m <Accent>Ashley.</Accent>
  </Statement>
);

const Gpn: Page = () => (
  <div style={{ ...base, padding: 120, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
    <img src={gpnLogo} alt="Girls’ Programming Network" style={{ width: 1040, height: 'auto' }} />
    <div style={{ marginTop: 58, fontSize: 100, fontWeight: 700, lineHeight: 1 }}>
      free coding workshops<br /><Accent>for kids.</Accent>
    </div>
    <Footer />
  </div>
);

const OneEvent: Page = () => (
  <div style={{ ...base, padding: 120 }}>
    <PageTitle>For one event, we somehow need to fit…</PageTitle>
    <div style={{ marginTop: 110, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 48 }}>
      <div style={{ fontSize: 58, lineHeight: 1.05 }}>dozens of<br /><Accent>tutors</Accent></div>
      <div style={{ fontSize: 58, lineHeight: 1.05 }}>into<br /><Accent>classrooms</Accent></div>
      <div style={{ fontSize: 58, lineHeight: 1.05 }}>plus<br /><Accent>lectures</Accent></div>
      <div style={{ fontSize: 58, lineHeight: 1.05 }}>and all the<br /><Accent>jobs</Accent></div>
    </div>
    <Footer />
  </div>
);

const SpreadsheetTetris: Page = () => {
  const active = useIsActivePage();
  return (
    <div style={base}>
      <style>{`
        @keyframes gpnTetrisDrop {
          0% { opacity: 0; transform: translateY(-360px) rotate(2deg); }
          74% { opacity: 1; transform: translateY(8px) rotate(-.25deg); }
          100% { opacity: 1; transform: translateY(0) rotate(0); }
        }
        @keyframes gpnTetrisJam {
          0% { opacity: 0; transform: translateY(-280px) rotate(-3deg); }
          66% { opacity: 1; transform: translateY(0) rotate(0); }
          78% { transform: translateY(-14px) rotate(1deg); }
          100% { opacity: 1; transform: translateY(0) rotate(0); }
        }
        @keyframes gpnTetrisNope {
          0%, 68% { opacity: 0; transform: scale(.8); }
          82% { opacity: 1; transform: scale(1.08); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
      <div style={{ position: 'absolute', left: 120, right: 120, top: 94, textAlign: 'center', fontSize: 128, fontWeight: 700, lineHeight: 1 }}>
        It is <Accent>spreadsheet Tetris.</Accent>
      </div>

      <TetrisRoom left={155} label="A" />
      <TetrisRoom left={565} label="B" />
      <TetrisRoom left={975} label="C" />
      <TetrisRoom left={1385} label="D" />

      <TetrisTutor active={active} left={180} top={690} label="T1" color={green} delay={80} />
      <TetrisTutor active={active} left={324} top={690} label="T2" color={lilac} delay={150} />
      <TetrisTutor active={active} left={590} top={690} label="T3" color={gold} delay={220} />
      <TetrisTutor active={active} left={734} top={690} label="T4" color={green} delay={290} />
      <TetrisTutor active={active} left={1000} top={690} label="BUDDY" color={lilac} delay={360} width={280} />
      <TetrisTutor active={active} left={1410} top={690} label="T6" color={green} delay={430} />
      <TetrisTutor active={active} left={1554} top={690} label="T7" color={gold} delay={500} />

      <div
        style={{
          position: 'absolute',
          left: 1428,
          top: 584,
          width: 250,
          height: 82,
          display: 'grid',
          placeItems: 'center',
          border: `3px solid ${gold}`,
          background: '#3a3426',
          color: gold,
          fontSize: 30,
          fontWeight: 700,
          animation: active ? `gpnTetrisJam 760ms ${EASE_SETTLE} 820ms both` : undefined,
        }}
      >
        🍕 PIZZA
      </div>
      <div
        style={{
          position: 'absolute',
          left: 1650,
          top: 536,
          color: red,
          fontSize: 88,
          fontWeight: 700,
          animation: active ? `gpnTetrisNope 420ms ${EASE_SETTLE} 980ms both` : undefined,
        }}
      >
        ×
      </div>
      <Footer />
    </div>
  );
};

const PerfectAllocation: Page = () => (
  <Statement size={150} align="center">
    Surely there’s one <Accent>perfect</Accent> allocation?
  </Statement>
);

const OneRoomRule: Page = () => (
  <Statement size={132}>
    Every tutor gets <Accent>one room.</Accent>
  </Statement>
);

const LeadRule: Page = () => (
  <Statement size={132}>
    Leads stay in <Accent>their rooms.</Accent>
  </Statement>
);

const LectureRule: Page = () => (
  <Statement size={132}>
    Lectures need <Accent>a tutor.</Accent>
  </Statement>
);

const LateRule: Page = () => (
  <Statement size={124}>
    Turns out, <Accent>time is linear.</Accent>
  </Statement>
);

const PizzaRule: Page = () => (
  <Statement size={124}>
    Pizza makes this <Accent>harder.</Accent>
  </Statement>
);

const BuddyRule: Page = () => (
  <Statement size={132}>
    Please don’t split up <Accent>the buddies.</Accent>
  </Statement>
);

const PreferencesRule: Page = () => (
  <Statement size={126}>
    Also, everyone has <Accent>opinions.</Accent>
  </Statement>
);

const ChangeOneThing: Page = () => {
  const active = useIsActivePage();
  return (
    <div style={{ ...base, padding: 120 }}>
      <style>{`
        @keyframes gpnTutorMove {
          0%, 18% { transform: translateX(0); }
          72% { transform: translateX(510px); }
          84% { transform: translateX(500px); }
          100% { transform: translateX(510px); }
        }
        @keyframes gpnFailureLand {
          0% { opacity: 0; transform: translateX(-26px) scale(.97); }
          72% { opacity: 1; transform: translateX(3px) scale(1.01); }
          100% { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes gpnBreakLine {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <PageTitle>Move one tutor.</PageTitle>

      <div style={{ position: 'absolute', left: 150, top: 320, width: 390, height: 330, border: `3px solid ${line}`, padding: 34, boxSizing: 'border-box' }}>
        <div style={{ color: muted, fontSize: 28 }}>ROOM A</div>
        <div style={{ marginTop: 44, display: 'flex', gap: 18 }}>
          <div style={{ width: 92, height: 72, display: 'grid', placeItems: 'center', border: `3px solid ${green}`, color: green, fontSize: 28 }}>T1</div>
          <div style={{ width: 92, height: 72, display: 'grid', placeItems: 'center', border: `3px solid ${lilac}`, color: lilac, fontSize: 28 }}>T2</div>
        </div>
      </div>
      <div style={{ position: 'absolute', left: 660, top: 320, width: 390, height: 330, border: `3px solid ${line}`, padding: 34, boxSizing: 'border-box' }}>
        <div style={{ color: muted, fontSize: 28 }}>ROOM B</div>
        <div style={{ marginTop: 44, display: 'flex', gap: 18 }}>
          <div style={{ width: 92, height: 72, display: 'grid', placeItems: 'center', border: `3px solid ${gold}`, color: gold, fontSize: 28 }}>T4</div>
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 380,
          top: 500,
          width: 118,
          height: 82,
          display: 'grid',
          placeItems: 'center',
          border: '3px solid var(--osd-accent)',
          background: '#3b3043',
          color: 'var(--osd-accent)',
          fontSize: 30,
          fontWeight: 700,
          transform: active ? undefined : 'translateX(510px)',
          animation: active ? `gpnTutorMove 920ms ${EASE_SETTLE} 160ms both` : undefined,
          zIndex: 2,
        }}
      >
        T3
      </div>
      <svg style={{ position: 'absolute', left: 510, top: 506 }} width="140" height="70" viewBox="0 0 140 70" aria-hidden="true">
        <path d="M5 35 H125 M105 15 L128 35 L105 55" fill="none" stroke="var(--osd-accent)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      <FailureChip active={active} top={270} label="lecture" state="EMPTY" delay={760} />
      <FailureChip active={active} top={422} label="buddies" state="SPLIT" delay={930} />
      <FailureChip active={active} top={574} label="pizza" state="UNCOVERED" delay={1100} />

      <div
        style={{
          position: 'absolute',
          left: 150,
          top: 760,
          color: 'var(--osd-accent)',
          fontSize: 88,
          fontWeight: 700,
          animation: active ? `gpnBreakLine 340ms ${EASE_SETTLE} 1320ms both` : undefined,
        }}
      >
        Break three other things.
      </div>
      <Footer />
    </div>
  );
};

const StopChoosing: Page = () => (
  <Statement size={148} align="center">
    So I made the <Accent>computer do it.</Accent>
  </Statement>
);

const BinaryDecision: Page = () => (
  <div style={{ ...base, padding: 120 }}>
    <PageTitle>Turn every choice into a yes/no.</PageTitle>
    <div style={{ position: 'absolute', left: 290, top: 380 }}>
      <BinaryChoiceMath />
    </div>
    <div style={{ position: 'absolute', left: 300, top: 520, display: 'flex', gap: 170, fontSize: 46 }}>
      <div><span style={{ color: muted }}>0</span> = nope</div>
      <div><span style={{ color: 'var(--osd-accent)' }}>1</span> = put them there</div>
    </div>
    <Footer />
  </div>
);

const DecisionMatrix: Page = () => (
  <div style={base}>
    <AssignmentMatrix left={585} top={205} size={130} />
    <Footer />
  </div>
);

const ExactlyOneConstraint: Page = () => {
  const active = useIsActivePage();
  return (
    <div style={{ ...base, padding: 120 }}>
      <style>{`@keyframes gpnSettleIn { 0% { opacity: 0; transform: translateY(7px) scale(.99); } 72% { opacity: 1; transform: translateY(-1px) scale(1.002); } 100% { opacity: 1; transform: translateY(0) scale(1); } }`}</style>
      <AssignmentMatrix left={120} top={205} size={130} highlightRow />
      <div style={{ position: 'absolute', left: 900, top: 305, width: 850, animation: active ? `gpnSettleIn 220ms ${EASE_SETTLE} ${MATRIX_MORPH_MS}ms both` : undefined }}>
        <PageTitle>Exactly one room</PageTitle>
        <div style={{ marginTop: 72 }}><ExactlyOneMath /></div>
      </div>
      <Footer />
    </div>
  );
};

const LeadPinConstraint: Page = () => {
  const active = useIsActivePage();
  return (
    <div style={{ ...base, padding: 120 }}>
      <style>{`@keyframes gpnSettleIn { 0% { opacity: 0; transform: translateY(7px) scale(.99); } 72% { opacity: 1; transform: translateY(-1px) scale(1.002); } 100% { opacity: 1; transform: translateY(0) scale(1); } }`}</style>
      <AssignmentMatrix left={120} top={205} size={130} highlightLead />
      <div style={{ position: 'absolute', left: 900, top: 305, width: 850, animation: active ? `gpnSettleIn 220ms ${EASE_SETTLE} ${MATRIX_MORPH_MS}ms both` : undefined }}>
        <PageTitle>The lead stays put</PageTitle>
        <div style={{ marginTop: 72 }}><LeadPinMath /></div>
      </div>
      <Footer />
    </div>
  );
};

const LectureConstraint: Page = () => (
  <div style={{ ...base, padding: 120, display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', alignItems: 'center', gap: 80 }}>
    <PageTitle>One tutor per<br /><Accent>lecture slot</Accent></PageTitle>
    <div>
      <LectureFillMath />
    </div>
    <Footer />
  </div>
);

const BalanceConstraint: Page = () => (
  <div style={{ ...base, padding: 120 }}>
    <PageTitle>Keep tutor numbers roughly even</PageTitle>
    <div style={{ marginTop: 150, display: 'flex', justifyContent: 'center' }}>
      <BalanceMath />
    </div>
    <Footer />
  </div>
);

const FeasibleSpace: Page = () => {
  const active = useIsActivePage();
  return (
    <div style={{ ...base, padding: 120 }}>
      <style>{`
        @keyframes gpnCandidateCull { 0% { opacity: 1; } 65% { opacity: 1; } 100% { opacity: .18; } }
        @keyframes gpnCandidateKeep { 0% { opacity: .3; } 72% { opacity: 1; } 100% { opacity: 1; } }
      `}</style>
      <PageTitle>First, throw out the impossible ones.</PageTitle>
      <svg width="1680" height="710" viewBox="0 0 1680 710" role="img" aria-label="Candidate allocations outside the feasible region are crossed out while valid allocations remain">
        <path d="M430 575 L520 250 L870 120 L1280 235 L1390 570 Z" fill="none" stroke="var(--osd-accent)" strokeWidth="4" strokeDasharray="16 18" opacity="0.7" />
        <text x="910" y="390" textAnchor="middle" fill="var(--osd-text)" fontSize="42" fontWeight="700">legal allocations</text>

        <CandidateDot active={active} valid={false} cx={210} cy={190} label="A" delay={80} />
        <CandidateDot active={active} valid={false} cx={310} cy={510} label="B" delay={140} />
        <CandidateDot active={active} valid={false} cx={1450} cy={180} label="C" delay={200} />
        <CandidateDot active={active} valid={false} cx={1510} cy={560} label="D" delay={260} />
        <CandidateDot active={active} valid cx={610} cy={330} label="E" delay={330} />
        <CandidateDot active={active} valid cx={780} cy={520} label="F" delay={390} />
        <CandidateDot active={active} valid cx={1040} cy={240} label="G" delay={450} />
        <CandidateDot active={active} valid cx={1200} cy={485} label="H" delay={510} />
      </svg>
      <Footer />
    </div>
  );
};

const Objective: Page = () => (
  <div style={{ ...base, padding: 120 }}>
    <PageTitle>Some rules are rules. Some are vibes.</PageTitle>
    <Steps>
      <Step duration={180}>
        <div style={{ marginTop: 105 }}>
          <ConstraintOutcome kind="HARD" example="lecture slot is empty" outcome="REJECTED" />
        </div>
      </Step>
      <Step duration={180}>
        <div style={{ marginTop: 86 }}>
          <ConstraintOutcome kind="SOFT" example="buddy pair is split" outcome="forgo +2500" />
        </div>
      </Step>
    </Steps>
    <Footer />
  </div>
);

const WeightedSum: Page = () => {
  const active = useIsActivePage();
  return (
    <div style={{ ...base, padding: 120 }}>
      <style>{`
        @keyframes gpnScoreGrow { from { transform: scaleX(0); opacity: .35; } to { transform: scaleX(1); opacity: 1; } }
        @keyframes gpnScoreTotal { from { opacity: 0; transform: translateY(8px) scale(.96); } to { opacity: 1; transform: translateY(0) scale(1); } }
      `}</style>
      <PageTitle>So we give the vibes points.</PageTitle>
      <div style={{ marginTop: 88, display: 'grid', gridTemplateColumns: '1.25fr .75fr', gap: 100, alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 38 }}>
          <ScoreTerm active={active} label="preferred level" points="+4200" width={420} color={green} delay={80} />
          <ScoreTerm active={active} label="buddy together" points="+2500" width={250} color={gold} delay={210} />
          <ScoreTerm active={active} label="preferred morning job" points="+560" width={80} color={lilac} delay={340} />
        </div>
        <div style={{ textAlign: 'center', animation: active ? `gpnScoreTotal 420ms ${EASE_SETTLE} 820ms both` : undefined }}>
          <div style={{ color: muted, fontSize: 32 }}>total</div>
          <div style={{ color: 'var(--osd-accent)', fontSize: 142, fontWeight: 700, lineHeight: 1 }}>7260</div>
        </div>
      </div>
      <div style={{ marginTop: 76, display: 'flex', justifyContent: 'center' }}><WeightedObjectiveMath /></div>
      <Footer />
    </div>
  );
};

const WeightsLie: Page = () => {
  const active = useIsActivePage();
  return (
    <div style={{ ...base, padding: 120 }}>
      <style>{`
        @keyframes gpnTradeLeader {
          from { transform: scaleX(0); opacity: .35; }
          to { transform: scaleX(1); opacity: 1; }
        }
        @keyframes gpnTradeWinner {
          0% { transform: scaleX(0) scaleY(1); opacity: .35; background: ${muted}; }
          72% { transform: scaleX(.93) scaleY(1); opacity: 1; background: ${muted}; }
          88% { transform: scaleX(1) scaleY(1.14); background: var(--osd-accent); }
          100% { transform: scaleX(1) scaleY(1); opacity: 1; background: var(--osd-accent); }
        }
        @keyframes gpnTradeScore {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes gpnBadWinner { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
      <PageTitle>Unfortunately, the maths is very obedient.</PageTitle>
      <div style={{ marginTop: 120, display: 'flex', flexDirection: 'column', gap: 70 }}>
        <TradeBar active={active} label="fill one required morning slot" score="+8500" width={570} delay={60} />
        <TradeBar active={active} label="2 level matches + morning preference" score="+8960" width={600} winner delay={330} />
      </div>
      <div style={{ marginTop: 72, textAlign: 'right', color: 'var(--osd-accent)', fontSize: 40, animation: active ? `gpnBadWinner 360ms ${EASE_SETTLE} 1160ms both` : undefined }}>
        weighted sum picks this ↑
      </div>
      <Footer />
    </div>
  );
};

const PriorityDefinition: Page = () => (
  <Statement size={128} align="center">
    So… what does <Accent>“perfect”</Accent> actually mean?
  </Statement>
);

const BandLadder: Page = () => (
  <div style={{ ...base, padding: 120 }}>
    <PageTitle>Okay. In this order:</PageTitle>
    <Steps>
      <Step duration={160}><div style={{ marginTop: 60 }}><BandRow number="01" title="Don’t bend the rules" /></div></Step>
      <Step duration={160}><div style={{ marginTop: 24 }}><BandRow number="02" title="Change as little as possible" /></div></Step>
      <Step duration={160}><div style={{ marginTop: 24 }}><BandRow number="03" title="Cover the important jobs" /></div></Step>
      <Step duration={160}><div style={{ marginTop: 24 }}><BandRow number="04" title="Be fair" /></div></Step>
      <Step duration={160}><div style={{ marginTop: 24 }}><BandRow number="05" title="Honour preferences" /></div></Step>
    </Steps>
    <div style={{ position: 'absolute', left: 120, right: 120, bottom: 126, height: 64, display: 'grid', placeItems: 'center', border: `2px solid ${line}`, color: muted, fontSize: 25, fontFamily: 'ui-monospace, monospace', letterSpacing: '.08em' }}>
      THE ACTUAL HARD CONSTRAINTS · ALWAYS THERE
    </div>
    <Footer />
  </div>
);

const SolveFreezeRepeat: Page = () => {
  const active = useIsActivePage();
  const [phase, setPhase] = useState(() => active ? 0 : 5);

  useEffect(() => {
    if (!active) {
      setPhase(5);
      return;
    }

    setPhase(0);
    const timers = [
      window.setTimeout(() => setPhase(1), 120),
      window.setTimeout(() => setPhase(2), 580),
      window.setTimeout(() => setPhase(3), 1040),
      window.setTimeout(() => setPhase(4), 1500),
      window.setTimeout(() => setPhase(5), 1960),
    ];
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [active]);

  const shown = active ? phase : 5;
  const scannerLeft = 480 + Math.max(0, Math.min(shown - 1, 4)) * 250;

  return (
    <div style={base}>
      <style>{`
        @keyframes gpnLexColumn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes gpnLexPulse {
          0% { box-shadow: 0 0 0 0 rgba(233, 135, 224, .45); }
          60% { box-shadow: 0 0 0 18px rgba(233, 135, 224, 0); }
          100% { box-shadow: 0 0 0 0 rgba(233, 135, 224, 0); }
        }
        @keyframes gpnLexScanGlow {
          0%, 100% { opacity: .24; }
          50% { opacity: .72; }
        }
      `}</style>
      <div style={{ position: 'absolute', left: 120, top: 105 }}><PageTitle>Solve one thing. Lock it. Keep going.</PageTitle></div>
      <div style={{ position: 'absolute', left: 138, top: 284, width: 300, display: 'flex', flexDirection: 'column' }}>
        <div style={{ height: 92, display: 'flex', alignItems: 'center', fontSize: 31 }}>Don’t bend rules</div>
        <div style={{ height: 92, display: 'flex', alignItems: 'center', fontSize: 31 }}>Change less</div>
        <div style={{ height: 92, display: 'flex', alignItems: 'center', fontSize: 31 }}>Cover jobs</div>
        <div style={{ height: 92, display: 'flex', alignItems: 'center', fontSize: 31 }}>Be fair</div>
        <div style={{ height: 92, display: 'flex', alignItems: 'center', fontSize: 31 }}>Preferences</div>
      </div>

      {shown >= 1 ? <LexPassColumn left={500} pass={0} current={active && shown === 1} /> : null}
      {shown >= 2 ? <LexPassColumn left={750} pass={1} current={active && shown === 2} /> : null}
      {shown >= 3 ? <LexPassColumn left={1000} pass={2} current={active && shown === 3} /> : null}
      {shown >= 4 ? <LexPassColumn left={1250} pass={3} current={active && shown === 4} /> : null}
      {shown >= 5 ? <LexPassColumn left={1500} pass={4} current={active && shown === 5} /> : null}

      {active && shown > 0 ? (
        <div
          style={{
            position: 'absolute',
            left: scannerLeft,
            top: 264,
            width: 4,
            height: 480,
            background: `linear-gradient(to bottom, transparent, var(--osd-accent), transparent)`,
            boxShadow: '0 0 20px rgba(233, 135, 224, .35)',
            transition: `left 400ms ${EASE_SETTLE}`,
            animation: 'gpnLexScanGlow 620ms ease-in-out infinite',
            pointerEvents: 'none',
          }}
        />
      ) : null}

      <div style={{ position: 'absolute', left: 138, top: 786, width: 1568, height: 66, display: 'grid', placeItems: 'center', border: `2px solid ${line}`, color: muted, fontSize: 25, fontFamily: 'ui-monospace, monospace', letterSpacing: '.07em' }}>
        THE ACTUAL HARD CONSTRAINTS · STILL THERE EVERY TIME
      </div>
      <div style={{ position: 'absolute', left: 530, top: 885 }}><FreezeMath /></div>
      <Footer />
    </div>
  );
};

const HighsResult: Page = () => (
  <div style={{ ...base, padding: 120 }}>
    <PageTitle>But is it <Accent>actually the best one?</Accent></PageTitle>
    <div style={{ marginTop: 32, display: 'flex', justifyContent: 'center' }}>
      <OptimalityGap />
    </div>
    <Footer />
  </div>
);

const MilpReveal: Page = () => (
  <Statement size={132} align="center">
    Technically, this is <Accent>mixed-integer linear programming.</Accent>
  </Statement>
);

const Closing: Page = () => {
  const active = useIsActivePage();
  return (
    <div style={{ ...base, padding: '110px 140px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
      <style>{`
        @keyframes gpnPerfectStrike {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        @keyframes gpnLeastBadLand {
          0% { opacity: 0; transform: translateY(10px) scale(.97); }
          72% { opacity: 1; transform: translateY(-2px) scale(1.012); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
      <div style={{ maxWidth: 1580, fontSize: 136, fontWeight: 700, lineHeight: 0.98, letterSpacing: '-0.025em' }}>
        So{' '}
        <span style={{ position: 'relative', display: 'inline-block', color: muted }}>
          “perfect”
          <span
            style={{
              position: 'absolute',
              left: -4,
              right: -4,
              top: '53%',
              height: 8,
              background: red,
              transformOrigin: 'left center',
              transform: active ? undefined : 'scaleX(1)',
              animation: active ? `gpnPerfectStrike 360ms ${EASE_SETTLE} 300ms both` : undefined,
            }}
          />
        </span>{' '}
        means the{' '}
        <span
          style={{
            display: 'inline-block',
            color: 'var(--osd-accent)',
            animation: active ? `gpnLeastBadLand 480ms ${EASE_SETTLE} 650ms both` : undefined,
          }}
        >
          least-bad option
        </span>
        , in the right order.
      </div>
      <img src={gpnLogo} alt="Girls’ Programming Network" style={{ width: 520, height: 'auto', marginTop: 62 }} />
        <div style={{ maxWidth: 1580, fontSize: 30, fontWeight: 400, marginTop: '2em'}}>
            find me at <Accent>ashl.dev</Accent> :)
        </div>
      <Footer />
    </div>
  );
};

DecisionMatrix.transition = matrixMorph;
ExactlyOneConstraint.transition = matrixMorph;
LeadPinConstraint.transition = matrixMorph;

export const meta: SlideMeta = {
  title: 'Allocating GPN Tutors Perfectly Using Linear Algebra',
  createdAt: '2026-08-29T03:26:33.479Z',
  theme: 'ashl-dev',
};

const noteTargets = [
  '00:00', '00:06', '00:15', '00:23', '00:35', '00:42', '00:46', '00:55',
  '01:04', '01:10', '01:19', '01:25', '01:32', '01:38', '01:47', '01:54',
  '02:02', '02:13', '02:21', '02:30', '02:37', '02:51', '02:59', '03:11',
  '03:24', '03:38', '03:45', '03:58', '04:22', '04:41', '04:50',
] as const;

const rawNotes = [
  'Read out the title, with just enough emphasis on “perfectly” to make it sound suspicious.',
  'G’Day, I’m Ashley. I have a habit of making tools for problems that should probably remain spreadsheets, and this is one of those tools.',
  'Girls Programming Network runs free coding workshops for kids around Australia, powered by a frankly unreasonable number of wonderful volunteer tutors.',
  'For each event we need to put dozens of tutors into classrooms, then assign lectures, morning jobs, lunch activities, and afternoon jobs. It is a lot of little choices.',
  'Historically, this is spreadsheet Tetris—except every Tetris piece has preferences, qualifications, friends, and occasionally needs to leave early.',
  'So surely there is one perfect allocation hiding in there somewhere, right?',
  'Every ordinary allocating tutor needs exactly one classroom. I am simplifying a couple of special roles here, but this is the basic shape.',
  'Room leads and shadow leads are already attached to their rooms. The solver is not allowed to get creative about that.',
  'Every lecture slot needs exactly one person who is both willing and actually eligible to teach it.',
  'A tutor arriving late cannot do a morning job or one of the early lecture slots, because unfortunately time is linear too.',
  'Pizza helpers cannot teach the later lectures, because distributing pizza turns out to have scheduling consequences.',
  'Buddy requests should be kept together where possible. We are trying to allocate tutors, not end friendships.',
  'And everyone has preferences: classroom level, jobs, lectures, lunch activities. People, it turns out, have opinions.',
  'Doing this by hand becomes a chain reaction. Move one tutor and suddenly a lecture, a buddy pair, and the pizza are all sad.',
  'So I stopped choosing. More precisely, I turned every possible choice into maths and made a computer choose.',
  'For each tutor and room, make a binary variable. Zero means no; one means put that tutor in that room.',
  'Do that for every possible assignment and you get one giant matrix of tiny yes-or-no decisions. The actual model has more matrices for lectures and jobs too.',
  'Now the human rules become equations. Add across one tutor’s row and require the total to equal one: exactly one room.',
  'If Tutor 1 is the lead for Room A, pin that specific variable to one. Clever optimiser; absolutely no cleverness permitted here.',
  'Lecture assignments get another set of binary variables. For each slot, add every eligible candidate and require exactly one.',
  'By default, non-advanced classrooms stay within one tutor of each other. Compare their column totals and bound the difference. That tolerance is configurable; the compact line here is really two inequalities in a trench coat.',
  'Each dot is a whole allocation. Hard constraints cross out the illegal ones; the feasible region still contains many legal survivors.',
  'A hard miss rejects an allocation. An ordinary buddy request is soft: splitting it stays legal, but forgoes its reward. A deliberately forced buddy pair is a separate hard constraint.',
  'These are current model weights: forty-two hundred for a preferred classroom level, twenty-five hundred for a buddy pair, and five-sixty for a preferred morning job. Within one band, the optimiser maximises their weighted total.',
  'A single weighted sum can trade across priorities. With today’s weights, two level matches plus one morning preference score eighty-nine sixty: enough to beat one morning staffing target at eighty-five hundred. Numerically correct, operationally cursed.',
  'So “perfect” is not really the biggest number. For this problem, perfect means putting our compromises in the correct order.',
  'The live solver’s five objective bands are explicit emergency relaxations, continuity, coverage, fairness, then preferences. Structural hard constraints remain in every pass. The first band is usually empty unless relaxations are enabled.',
  'The columns build themselves, so no clicks here. Each column is a fresh solve: maximise the current band, then every later pass locks all earlier optima with a tolerance of half a point. Scores are integer-valued, so that admits no integer degradation. Weights still trade within a row, never across rows. This is the default path; if the five-pass plan cannot finish, the tool falls back to one weighted solve.',
  'HiGHS keeps an incumbent while proving a bound on every unseen solution. The band solve accepts an absolute gap below one. Because these objective scores are integers, a fractional gap means no better integer score exists. This ruler is illustrative, but that stopping rule is the real one.',
  'The technically correct phrase for all of this is mixed-integer linear programming. So “linear algebra” in the title is only lying a little.',
  'And that is what perfectly means here: not making everybody completely happy, because that allocation does not exist—just finding the least-bad compromise in the correct order.',
] as const;

if (noteTargets.length !== rawNotes.length) throw new Error('Every slide needs one elapsed-time target.');

export const notes: string[] = rawNotes.map((note, index) => `Target elapsed: ${noteTargets[index]}\n${note}`);

export default [
  Cover,
  GDay,
  Gpn,
  OneEvent,
  SpreadsheetTetris,
  PerfectAllocation,
  OneRoomRule,
  LeadRule,
  LectureRule,
  LateRule,
  PizzaRule,
  BuddyRule,
  PreferencesRule,
  ChangeOneThing,
  StopChoosing,
  BinaryDecision,
  DecisionMatrix,
  ExactlyOneConstraint,
  LeadPinConstraint,
  LectureConstraint,
  BalanceConstraint,
  FeasibleSpace,
  Objective,
  WeightedSum,
  WeightsLie,
  PriorityDefinition,
  BandLadder,
  SolveFreezeRepeat,
  HighsResult,
  MilpReveal,
  Closing,
] satisfies Page[];

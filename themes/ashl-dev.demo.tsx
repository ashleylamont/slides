import {
  MorphElement,
  Step,
  Steps,
  type DesignSystem,
  type Page,
  type SlideTransition,
  useIsActivePage,
  useSlidePageNumber,
} from '@open-slide/core';

export const design: DesignSystem = {
  palette: { bg: '#242432', text: '#d5cabd', accent: '#e987e0' },
  fonts: {
    display: '"Rokkitt", Rockwell, Georgia, serif',
    body: '"Rokkitt", Rockwell, Georgia, serif',
  },
  typeScale: { hero: 176, body: 40 },
  radius: 0,
};

const EASE_SETTLE = 'cubic-bezier(0.16, 1, 0.3, 1)';
const EASE_DRAW = 'cubic-bezier(0.55, 0.02, 0.22, 1)';
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

const muted = '#9f9894';
const line = '#625c68';
const DIAGRAM_MORPH_MS = 560;

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

const Accent = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: '#e987e0' }}>{children}</span>
);

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

const base = {
  width: '100%',
  height: '100%',
  boxSizing: 'border-box',
  position: 'relative',
  background: 'var(--osd-bg)',
  color: 'var(--osd-text)',
  fontFamily: 'var(--osd-font-body)',
} as const;

const fonts = (
  <style>{`@import url('https://fonts.googleapis.com/css2?family=Rokkitt:wght@400;700&display=swap');`}</style>
);

const Cover: Page = () => (
  <div
    style={{
      ...base,
      padding: 120,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
    }}
  >
    {fonts}
    <Title>Make cool things.</Title>
    <p style={{ maxWidth: 1040, margin: '38px 0 0', fontSize: 'var(--osd-size-body)', lineHeight: 1.5, color: muted }}>
      One interesting problem at a time.
    </p>
    <Footer />
  </div>
);

const DiagramNode = ({
  id,
  label,
  detail,
  left,
  top,
  width = 400,
  height = 132,
  active = false,
}: {
  id: string;
  label: string;
  detail: string;
  left: number;
  top: number;
  width?: number;
  height?: number;
  active?: boolean;
}) => (
  <MorphElement id={id}>
    <div
      style={{
        position: 'absolute',
        left,
        top,
        width,
        height,
        boxSizing: 'border-box',
        padding: '24px 28px',
        background: '#242432',
        border: `2px solid ${active ? '#e987e0' : line}`,
        color: active ? '#e987e0' : '#d5cabd',
      }}
    >
      <div style={{ fontSize: 34, fontWeight: 700, lineHeight: 1 }}>{label}</div>
      <div style={{ marginTop: 13, color: muted, fontFamily: 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace', fontSize: 20 }}>
        {detail}
      </div>
    </div>
  </MorphElement>
);

const Edge = ({ left, top }: { left: number; top: number }) => (
  <svg aria-hidden="true" width="85" height="30" viewBox="0 0 85 30" style={{ position: 'absolute', left, top }}>
    <path className="ashl-dev-edge" pathLength="1" d="M0 15 H67" fill="none" stroke={line} strokeWidth="3" strokeDasharray="1" />
    <path className="ashl-dev-arrowhead" d="M80 15 L66 7 L66 23 Z" fill={line} />
  </svg>
);

const Diagram: Page = () => (
  <div style={{ ...base, padding: '104px 120px 136px' }}>
    {fonts}
    <style>{`
      [data-osd-step='pending'] .ashl-dev-edge { stroke-dashoffset: 1; }
      [data-osd-step='pending'] .ashl-dev-arrowhead { opacity: 0; transform: scale(0.65); }
      [data-osd-step='revealed'] .ashl-dev-edge {
        stroke-dashoffset: 0;
        transition: stroke-dashoffset 260ms ${EASE_DRAW};
      }
      [data-osd-step='revealed'] .ashl-dev-arrowhead {
        opacity: 1;
        transform: scale(1);
        transform-box: fill-box;
        transform-origin: center;
        transition: opacity 70ms ease-out 260ms, transform 130ms cubic-bezier(0.2, 1.45, 0.42, 1) 260ms;
      }
    `}</style>
    <h2 style={{ margin: 0, fontSize: 76, fontWeight: 700, lineHeight: 1.1 }}>
      Follow one request through the system.
    </h2>
    <DiagramNode id="client-node" label="Client" detail="POST /notes" left={120} top={390} width={260} />
    <Steps>
      <Step duration={160}>
        <Edge left={380} top={441} />
        <DiagramNode id="api-node" label="API" detail="validate" left={465} top={390} width={260} />
      </Step>
      <Step duration={160}>
        <Edge left={725} top={441} />
        <DiagramNode id="queue-node" label="Queue" detail="notes.create" left={810} top={390} width={300} active />
      </Step>
      <Step duration={160}>
        <Edge left={1110} top={441} />
        <DiagramNode id="worker-node" label="Worker" detail="consume → run" left={1195} top={390} width={260} />
      </Step>
      <Step duration={160}>
        <Edge left={1455} top={441} />
        <DiagramNode id="store-node" label="Store" detail="notes.insert" left={1540} top={390} width={260} />
      </Step>
    </Steps>
    <Footer />
  </div>
);

const DiagramFocus: Page = () => {
  const animate = useIsActivePage();
  return (
    <div style={{ ...base, padding: '104px 120px 136px' }}>
      {fonts}
      <style>{`
        @keyframes ashlTrace { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
      `}</style>
      <h2 style={{ margin: 0, fontSize: 76, fontWeight: 700, lineHeight: 1.1 }}>
        The queue changes the shape of the work.
      </h2>
      <svg aria-hidden="true" width="1920" height="1080" viewBox="0 0 1920 1080" style={{ position: 'absolute', left: 0, top: 0 }}>
        <path pathLength="1" d="M360 232 H430" fill="none" stroke={line} strokeWidth="3" strokeDasharray="1" style={{ animation: animate ? `ashlTrace 220ms ${EASE_DRAW} both` : undefined }} />
        <path pathLength="1" d="M670 232 C735 232 735 435 800 435" fill="none" stroke={line} strokeWidth="3" strokeDasharray="1" style={{ animation: animate ? `ashlTrace 280ms 220ms ${EASE_DRAW} both` : undefined }} />
        <path pathLength="1" d="M1120 435 C1180 435 1170 232 1230 232" fill="none" stroke={line} strokeWidth="3" strokeDasharray="1" style={{ animation: animate ? `ashlTrace 280ms 500ms ${EASE_DRAW} both` : undefined }} />
        <path pathLength="1" d="M1470 232 H1540" fill="none" stroke={line} strokeWidth="3" strokeDasharray="1" style={{ animation: animate ? `ashlTrace 220ms 780ms ${EASE_DRAW} both` : undefined }} />
      </svg>
      <DiagramNode id="client-node" label="Client" detail="POST /notes" left={120} top={170} width={240} />
      <DiagramNode id="api-node" label="API" detail="validate" left={430} top={170} width={240} />
      <DiagramNode id="queue-node" label="Queue" detail="notes.create" left={800} top={360} width={320} height={150} active />
      <DiagramNode id="worker-node" label="Worker" detail="consume → run" left={1230} top={170} width={240} />
      <DiagramNode id="store-node" label="Store" detail="notes.insert" left={1540} top={170} width={240} />
      <p style={{ position: 'absolute', left: 720, top: 560, width: 480, margin: 0, textAlign: 'center', color: muted, fontSize: 32, lineHeight: 1.45 }}>
        The request can finish before the work does.
      </p>
      <Footer />
    </div>
  );
};

const CodeLine = ({ dim = false, children }: { dim?: boolean; children: React.ReactNode }) => (
  <span style={{ display: 'block', opacity: dim ? 0.42 : 1, transition: `opacity 180ms ${EASE_SETTLE}` }}>
    {children}
  </span>
);

const CreateNoteCode = ({ focus = 'all' }: { focus?: 'all' | 'enqueue' }) => (
  <CodeBlock>
    <CodeLine dim={focus === 'enqueue'}><Comment>// POST /notes</Comment></CodeLine>
    <CodeLine dim={focus === 'enqueue'}>
      <Keyword>export async function</Keyword>{' '}
      <FunctionName>createNote</FunctionName>(input: <TypeName>NoteInput</TypeName>) {'{'}
    </CodeLine>
    <CodeLine dim={focus === 'enqueue'}>{'  '}<Keyword>const</Keyword> note = schema.parse(input);</CodeLine>
    <CodeLine>{'  '}<Keyword>await</Keyword> jobs.enqueue({'{'} type: <StringLiteral>'create-note'</StringLiteral>, note {'}'});</CodeLine>
    <CodeLine dim={focus === 'enqueue'}>
      {'  '}<Keyword>return</Keyword> {'{'} status: <StringLiteral>'accepted'</StringLiteral>, queued: <Literal>true</Literal> {'}'};
    </CodeLine>
    <CodeLine dim={focus === 'enqueue'}>{'}'}</CodeLine>
  </CodeBlock>
);

const CodePanel = ({
  left,
  top,
  width,
  focus = 'all',
}: {
  left: number;
  top: number;
  width: number;
  focus?: 'all' | 'enqueue';
}) => (
  <MorphElement id="create-note-code">
    <div style={{ position: 'absolute', left, top, width, background: '#242432' }}>
      <CreateNoteCode focus={focus} />
    </div>
  </MorphElement>
);

const CodeContext: Page = () => {
  const animate = useIsActivePage();
  return (
    <div style={{ ...base, padding: '104px 120px 136px' }}>
      {fonts}
      <style>{`@keyframes ashlCodeIn { 0% { opacity: 0; transform: translateY(7px) scale(.99); } 72% { opacity: 1; transform: translateY(-1px) scale(1.002); } 100% { opacity: 1; transform: translateY(0) scale(1); } }`}</style>
      <DiagramNode id="client-node" label="Client" detail="POST /notes" left={120} top={120} width={260} />
      <DiagramNode id="api-node" label="API" detail="validate" left={465} top={120} width={260} active />
      <DiagramNode id="queue-node" label="Queue" detail="notes.create" left={810} top={120} width={300} />
      <DiagramNode id="worker-node" label="Worker" detail="consume → run" left={1195} top={120} width={260} />
      <DiagramNode id="store-node" label="Store" detail="notes.insert" left={1540} top={120} width={260} />
      <Edge left={380} top={171} />
      <Edge left={725} top={171} />
      <Edge left={1110} top={171} />
      <Edge left={1455} top={171} />
      <div
        style={{
          position: 'absolute',
          left: 120,
          top: 420,
          width: 430,
          animation: animate ? `ashlCodeIn 220ms ${EASE_SETTLE} ${DIAGRAM_MORPH_MS}ms both` : undefined,
        }}
      >
        <h2 style={{ margin: 0, fontSize: 76, fontWeight: 700, lineHeight: 1.08 }}>
          Now open the handler.
        </h2>
        <p style={{ margin: '28px 0 0', color: muted, fontSize: 30, lineHeight: 1.5 }}>
          The diagram keeps our place while the implementation appears.
        </p>
      </div>
      <CodePanel left={650} top={390} width={1120} />
      <Footer />
    </div>
  );
};

const CodeFocus: Page = () => (
  <div style={{ ...base, padding: '104px 120px 136px' }}>
    {fonts}
    <h2 style={{ margin: 0, fontSize: 76, fontWeight: 700, lineHeight: 1.08 }}>
      The slow work moved off the request.
    </h2>
    <CodePanel left={400} top={260} width={1120} focus="enqueue" />
    <Steps>
      <Step duration={160}>
        <p style={{ position: 'absolute', left: 400, top: 670, width: 1120, margin: 0, color: muted, fontSize: 32, lineHeight: 1.45 }}>
          The request waits for enqueueing—not for the worker to finish.
        </p>
      </Step>
    </Steps>
    <Footer />
  </div>
);

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

Diagram.transition = diagramMorph;
DiagramFocus.transition = diagramMorph;
CodeContext.transition = diagramMorph;
CodeFocus.transition = diagramMorph;

export default [Cover, Diagram, DiagramFocus, CodeContext, CodeFocus] satisfies Page[];

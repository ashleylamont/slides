import {
  MorphElement,
  Step,
  Steps,
  type DesignSystem,
  type Page,
  type SlideMeta,
  type SlideTransition,
  useIsActivePage,
  useSlidePageNumber,
} from '@open-slide/core';

const FONT_HREF = 'https://fonts.googleapis.com/css2?family=Coming+Soon&family=Rokkitt:wght@400;700&display=swap';
const FONT_LINK_ID = 'osd-webfont-ashl-dev-preview';
if (typeof document !== 'undefined' && !document.getElementById(FONT_LINK_ID)) {
  const link = document.createElement('link');
  link.id = FONT_LINK_ID;
  link.rel = 'stylesheet';
  link.href = FONT_HREF;
  document.head.appendChild(link);
}

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
const EASE_GLIDE = 'cubic-bezier(0.18, 0.86, 0.24, 1)';
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
      fontFamily: '"Coming Soon", "Comic Sans MS", cursive',
      fontSize: 26,
      fontWeight: 400,
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
      <style>{`
        @keyframes ashlTrace { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
        @keyframes ashlFade { 0% { opacity: 0; transform: translateY(7px) scale(.99); } 72% { opacity: 1; transform: translateY(-1px) scale(1.002); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
      `}</style>
      <h2 style={{ margin: 0, fontSize: 76, fontWeight: 700, lineHeight: 1.1 }}>
        The queue changes the shape of the work.
      </h2>
      <svg aria-hidden="true" width="1920" height="1080" viewBox="0 0 1920 1080" style={{ position: 'absolute', left: 0, top: 0 }}>
        <path pathLength="1" d="M380 336 H430" fill="none" stroke={line} strokeWidth="3" strokeDasharray="1" style={{ animation: animate ? `ashlTrace 220ms ${DIAGRAM_MORPH_MS}ms ${EASE_DRAW} both` : undefined }} />
        <path pathLength="1" d="M690 336 C750 336 750 526 810 526" fill="none" stroke={line} strokeWidth="3" strokeDasharray="1" style={{ animation: animate ? `ashlTrace 280ms ${DIAGRAM_MORPH_MS + 220}ms ${EASE_DRAW} both` : undefined }} />
        <path pathLength="1" d="M1110 526 C1170 526 1170 336 1230 336" fill="none" stroke={line} strokeWidth="3" strokeDasharray="1" style={{ animation: animate ? `ashlTrace 280ms ${DIAGRAM_MORPH_MS + 500}ms ${EASE_DRAW} both` : undefined }} />
        <path pathLength="1" d="M1490 336 H1540" fill="none" stroke={line} strokeWidth="3" strokeDasharray="1" style={{ animation: animate ? `ashlTrace 220ms ${DIAGRAM_MORPH_MS + 780}ms ${EASE_DRAW} both` : undefined }} />
      </svg>
      <DiagramNode id="client-node" label="Client" detail="POST /notes" left={120} top={270} width={260} />
      <DiagramNode id="api-node" label="API" detail="validate" left={430} top={270} width={260} />
      <DiagramNode id="queue-node" label="Queue" detail="notes.create" left={810} top={460} width={300} active />
      <DiagramNode id="worker-node" label="Worker" detail="consume → run" left={1230} top={270} width={260} />
      <DiagramNode id="store-node" label="Store" detail="notes.insert" left={1540} top={270} width={260} />
      <p style={{ position: 'absolute', left: 720, top: 660, width: 480, margin: 0, textAlign: 'center', color: muted, fontSize: 32, lineHeight: 1.45, animation: animate ? `ashlFade 220ms ${DIAGRAM_MORPH_MS + 1000}ms ${EASE_SETTLE} both` : undefined }}>
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
    <div style={{ position: 'absolute', left, top, width, height: 300, background: '#242432' }}>
      <CreateNoteCode focus={focus} />
    </div>
  </MorphElement>
);

const CodeContext: Page = () => {
  const animate = useIsActivePage();
  return (
    <div style={{ ...base, padding: '104px 120px 136px' }}>
      <style>{`@keyframes ashlCodeIn { 0% { opacity: 0; transform: translateY(7px) scale(.99); } 72% { opacity: 1; transform: translateY(-1px) scale(1.002); } 100% { opacity: 1; transform: translateY(0) scale(1); } }`}</style>
      <DiagramNode id="client-node" label="Client" detail="POST /notes" left={120} top={120} width={260} />
      <DiagramNode id="api-node" label="API" detail="validate" left={465} top={120} width={260} active />
      <DiagramNode id="queue-node" label="Queue" detail="notes.create" left={810} top={120} width={300} />
      <DiagramNode id="worker-node" label="Worker" detail="consume → run" left={1195} top={120} width={260} />
      <DiagramNode id="store-node" label="Store" detail="notes.insert" left={1540} top={120} width={260} />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          animation: animate ? `ashlCodeIn 220ms ${DIAGRAM_MORPH_MS}ms ${EASE_SETTLE} both` : undefined,
        }}
      >
        <Edge left={380} top={171} />
        <Edge left={725} top={171} />
        <Edge left={1110} top={171} />
        <Edge left={1455} top={171} />
      </div>
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

const CodeFocus: Page = () => {
  const animate = useIsActivePage();
  return (
    <div style={{ ...base, padding: '104px 120px 136px' }}>
      <style>{`@keyframes ashlFocusIn { 0% { opacity: 0; transform: translateY(7px) scale(.99); } 72% { opacity: 1; transform: translateY(-1px) scale(1.002); } 100% { opacity: 1; transform: translateY(0) scale(1); } }`}</style>
      <h2 style={{ margin: 0, fontSize: 76, fontWeight: 700, lineHeight: 1.08, animation: animate ? `ashlFocusIn 220ms ${DIAGRAM_MORPH_MS}ms ${EASE_SETTLE} both` : undefined }}>
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
};

const EvolutionLine = ({
  id,
  top,
  dim = false,
  children,
}: {
  id: string;
  top: number;
  dim?: boolean;
  children: React.ReactNode;
}) => (
  <MorphElement id={id}>
    <div
      style={{
        position: 'absolute',
        left: 400,
        top,
        width: 1120,
        height: 48,
        color: '#d5cabd',
        fontFamily: 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace',
        fontSize: 30,
        lineHeight: 1.55,
        opacity: dim ? 0.42 : 1,
      }}
    >
      {children}
    </div>
  </MorphElement>
);

const CodeChangeLine = ({ top, children }: { top: number; children: React.ReactNode }) => {
  const animate = useIsActivePage();
  return (
    <div
      style={{
        position: 'absolute',
        left: 400,
        top,
        width: 1120,
        height: 48,
        color: '#d5cabd',
        fontFamily: 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace',
        fontSize: 30,
        lineHeight: 1.55,
        animation: animate ? `ashlCodeChangeIn 220ms ${DIAGRAM_MORPH_MS}ms ${EASE_SETTLE} both` : undefined,
      }}
    >
      {children}
    </div>
  );
};

const IdempotentCode: Page = () => (
  <div style={{ ...base, padding: '104px 120px 136px' }}>
    <style>{`@keyframes ashlCodeChangeIn { 0% { opacity: 0; transform: translateY(7px) scale(.99); } 72% { opacity: 1; transform: translateY(-1px) scale(1.002); } 100% { opacity: 1; transform: translateY(0) scale(1); } }`}</style>
    <h2 style={{ margin: 0, fontSize: 76, fontWeight: 700, lineHeight: 1.08 }}>
      Now make it safe to retry.
    </h2>
    <EvolutionLine id="evo-open" top={270}><Keyword>export async function</Keyword> <FunctionName>handle</FunctionName>(job: <TypeName>Job</TypeName>) {'{'}</EvolutionLine>
    <CodeChangeLine top={330}><Comment>{'  '}// safe to run more than once</Comment></CodeChangeLine>
    <EvolutionLine id="evo-key" top={390}>{'  '}<Keyword>const</Keyword> key = <StringLiteral>{'`note:${job.id}`'}</StringLiteral>;</EvolutionLine>
    <EvolutionLine id="evo-seen" top={450}>{'  '}<Keyword>if</Keyword> (<Keyword>await</Keyword> seen.has(key)) <Keyword>return</Keyword>;</EvolutionLine>
    <EvolutionLine id="evo-insert" top={510}>{'  '}<Keyword>await</Keyword> notes.insert(job.note);</EvolutionLine>
    <EvolutionLine id="evo-mark" top={570}>{'  '}<Keyword>await</Keyword> seen.add(key);</EvolutionLine>
    <EvolutionLine id="evo-brace" top={690}>{'}'}</EvolutionLine>
    <p style={{ position: 'absolute', left: 400, top: 780, width: 1120, margin: 0, color: muted, fontSize: 32 }}>
      Same job twice. Same result once.
    </p>
    <Footer />
  </div>
);

const ObservableCode: Page = () => {
  return (
    <div style={{ ...base, padding: '104px 120px 136px' }}>
      <style>{`@keyframes ashlCodeChangeIn { 0% { opacity: 0; transform: translateY(7px) scale(.99); } 72% { opacity: 1; transform: translateY(-1px) scale(1.002); } 100% { opacity: 1; transform: translateY(0) scale(1); } }`}</style>
      <h2 style={{ margin: 0, fontSize: 76, fontWeight: 700, lineHeight: 1.08 }}>
        Then make it explain itself.
      </h2>
      <EvolutionLine id="evo-open" top={270}><Keyword>export async function</Keyword> <FunctionName>handle</FunctionName>(job: <TypeName>Job</TypeName>) {'{'}</EvolutionLine>
      <CodeChangeLine top={330}>{'  '}<Keyword>const</Keyword> span = trace.startSpan(<StringLiteral>'create-note'</StringLiteral>);</CodeChangeLine>
      <EvolutionLine id="evo-key" top={390}>{'  '}<Keyword>const</Keyword> key = <StringLiteral>{'`note:${job.id}`'}</StringLiteral>;</EvolutionLine>
      <EvolutionLine id="evo-seen" top={450}>{'  '}<Keyword>if</Keyword> (<Keyword>await</Keyword> seen.has(key)) <Keyword>return</Keyword>;</EvolutionLine>
      <EvolutionLine id="evo-insert" top={510}>{'  '}<Keyword>await</Keyword> notes.insert(job.note);</EvolutionLine>
      <EvolutionLine id="evo-mark" top={570}>{'  '}<Keyword>await</Keyword> seen.add(key);</EvolutionLine>
      <CodeChangeLine top={630}>{'  '}span.end();</CodeChangeLine>
      <EvolutionLine id="evo-brace" top={690}>{'}'}</EvolutionLine>
      <p style={{ position: 'absolute', left: 400, top: 780, width: 1120, margin: 0, color: muted, fontSize: 32 }}>
        The implementation and the evidence evolve together.
      </p>
      <Footer />
    </div>
  );
};

const QueueBoundary = ({
  left,
  top,
  width,
  height,
  active = true,
}: {
  left: number;
  top: number;
  width: number;
  height: number;
  active?: boolean;
}) => (
  <MorphElement id="queue-concept">
    <div
      style={{
        position: 'absolute',
        left,
        top,
        width,
        height,
        boxSizing: 'border-box',
        background: '#242432',
        border: `2px solid ${active ? '#e987e0' : line}`,
      }}
    />
  </MorphElement>
);

const QueueNode = ({ detail, active = false, revealAfterMorph = false }: { detail: string; active?: boolean; revealAfterMorph?: boolean }) => {
  const animate = useIsActivePage();
  return (
    <>
      <QueueBoundary left={160} top={430} width={260} height={132} active={active} />
      <div
        style={{
          position: 'absolute',
          left: 160,
          top: 430,
          width: 260,
          height: 132,
          boxSizing: 'border-box',
          padding: '24px 28px',
          color: active ? '#e987e0' : '#d5cabd',
          pointerEvents: 'none',
          animation: animate && revealAfterMorph ? `ashlQueueCopyIn 220ms ${DIAGRAM_MORPH_MS}ms ${EASE_SETTLE} both` : undefined,
        }}
      >
        <div style={{ fontSize: 34, fontWeight: 700, lineHeight: 1 }}>Queue</div>
        <div style={{ marginTop: 13, color: muted, fontFamily: 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace', fontSize: 20 }}>{detail}</div>
      </div>
    </>
  );
};

const QueueCall: Page = () => (
  <div style={{ ...base, padding: '104px 120px 136px' }}>
    <h2 style={{ margin: 0, fontSize: 76, fontWeight: 700, lineHeight: 1.08 }}>
      This one call changes the topology.
    </h2>
    <QueueBoundary left={290} top={390} width={1340} height={156} />
    <div
      style={{
        position: 'absolute',
        left: 310,
        top: 420,
        width: 1300,
        height: 96,
        color: '#d5cabd',
        fontFamily: 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace',
        fontSize: 38,
        lineHeight: 1.5,
      }}
    >
      <Keyword>await</Keyword> jobs.<FunctionName>enqueue</FunctionName>({'{'} type: <StringLiteral>'create-note'</StringLiteral>, note {'}'});
    </div>
    <p style={{ position: 'absolute', left: 310, top: 570, width: 920, margin: 0, color: muted, fontSize: 34 }}>
      A line of code becomes a system boundary.
    </p>
    <Footer />
  </div>
);

const fanoutPathA = 'M420 496 C560 496 600 286 760 286';
const fanoutPathB = 'M420 496 H760';
const fanoutPathC = 'M420 496 C560 496 600 706 760 706';
const joinPathA = 'M1060 286 C1220 286 1360 496 1500 496';
const joinPathB = 'M1060 496 H1500';
const joinPathC = 'M1060 706 C1220 706 1360 496 1500 496';

const FanoutEdges = ({ activePath = 'none' }: { activePath?: 'none' | 'middle' | 'retry' }) => (
  <svg aria-hidden="true" width="1920" height="1080" viewBox="0 0 1920 1080" style={{ position: 'absolute', inset: 0 }}>
    <path d={fanoutPathA} fill="none" stroke={line} strokeWidth="3" />
    <path d={fanoutPathB} fill="none" stroke={activePath === 'middle' ? '#e987e0' : line} strokeWidth={activePath === 'middle' ? '5' : '3'} />
    <path d={fanoutPathC} fill="none" stroke={line} strokeWidth="3" />
    <path d={joinPathA} fill="none" stroke={line} strokeWidth="3" />
    <path d={joinPathB} fill="none" stroke={activePath === 'retry' ? '#e987e0' : line} strokeWidth={activePath === 'retry' ? '5' : '3'} />
    <path d={joinPathC} fill="none" stroke={line} strokeWidth="3" />
  </svg>
);

const Fanout: Page = () => {
  const animate = useIsActivePage();
  return (
    <div style={{ ...base, padding: '104px 120px 136px' }}>
      <style>{`
        @keyframes ashlFlowDraw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
        @keyframes ashlQueueCopyIn { 0% { opacity: 0; transform: translateY(7px) scale(.99); } 72% { opacity: 1; transform: translateY(-1px) scale(1.002); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
      `}</style>
      <h2 style={{ margin: 0, fontSize: 76, fontWeight: 700, lineHeight: 1.08 }}>
        One event can fan out—and meet again.
      </h2>
      <svg aria-hidden="true" width="1920" height="1080" viewBox="0 0 1920 1080" style={{ position: 'absolute', inset: 0 }}>
        <path pathLength="1" d={fanoutPathA} fill="none" stroke={line} strokeWidth="3" strokeDasharray="1" style={{ animation: animate ? `ashlFlowDraw 240ms ${DIAGRAM_MORPH_MS}ms ${EASE_DRAW} both` : undefined }} />
        <path pathLength="1" d={fanoutPathB} fill="none" stroke={line} strokeWidth="3" strokeDasharray="1" style={{ animation: animate ? `ashlFlowDraw 240ms ${DIAGRAM_MORPH_MS + 40}ms ${EASE_DRAW} both` : undefined }} />
        <path pathLength="1" d={fanoutPathC} fill="none" stroke={line} strokeWidth="3" strokeDasharray="1" style={{ animation: animate ? `ashlFlowDraw 240ms ${DIAGRAM_MORPH_MS + 80}ms ${EASE_DRAW} both` : undefined }} />
        <path pathLength="1" d={joinPathA} fill="none" stroke={line} strokeWidth="3" strokeDasharray="1" style={{ animation: animate ? `ashlFlowDraw 260ms ${DIAGRAM_MORPH_MS + 600}ms ${EASE_DRAW} both` : undefined }} />
        <path pathLength="1" d={joinPathB} fill="none" stroke={line} strokeWidth="3" strokeDasharray="1" style={{ animation: animate ? `ashlFlowDraw 260ms ${DIAGRAM_MORPH_MS + 640}ms ${EASE_DRAW} both` : undefined }} />
        <path pathLength="1" d={joinPathC} fill="none" stroke={line} strokeWidth="3" strokeDasharray="1" style={{ animation: animate ? `ashlFlowDraw 260ms ${DIAGRAM_MORPH_MS + 680}ms ${EASE_DRAW} both` : undefined }} />
        {animate ? <circle r="8" fill="#e987e0"><animateMotion path={fanoutPathA} dur="320ms" begin={`${DIAGRAM_MORPH_MS + 240}ms`} calcMode="spline" keyPoints="0;1" keyTimes="0;1" keySplines="0.18 0.86 0.24 1" fill="freeze" /></circle> : null}
        {animate ? <circle r="8" fill="#e987e0"><animateMotion path={fanoutPathB} dur="320ms" begin={`${DIAGRAM_MORPH_MS + 280}ms`} calcMode="spline" keyPoints="0;1" keyTimes="0;1" keySplines="0.18 0.86 0.24 1" fill="freeze" /></circle> : null}
        {animate ? <circle r="8" fill="#e987e0"><animateMotion path={fanoutPathC} dur="320ms" begin={`${DIAGRAM_MORPH_MS + 320}ms`} calcMode="spline" keyPoints="0;1" keyTimes="0;1" keySplines="0.18 0.86 0.24 1" fill="freeze" /></circle> : null}
        {animate ? <circle r="8" fill="#e987e0"><animateMotion path={joinPathA} dur="320ms" begin={`${DIAGRAM_MORPH_MS + 860}ms`} calcMode="spline" keyPoints="0;1" keyTimes="0;1" keySplines="0.18 0.86 0.24 1" fill="freeze" /></circle> : null}
        {animate ? <circle r="8" fill="#e987e0"><animateMotion path={joinPathB} dur="320ms" begin={`${DIAGRAM_MORPH_MS + 900}ms`} calcMode="spline" keyPoints="0;1" keyTimes="0;1" keySplines="0.18 0.86 0.24 1" fill="freeze" /></circle> : null}
        {animate ? <circle r="8" fill="#e987e0"><animateMotion path={joinPathC} dur="320ms" begin={`${DIAGRAM_MORPH_MS + 940}ms`} calcMode="spline" keyPoints="0;1" keyTimes="0;1" keySplines="0.18 0.86 0.24 1" fill="freeze" /></circle> : null}
      </svg>
      <QueueNode detail="notes.create" active revealAfterMorph />
      <DiagramNode id="fan-worker-a" label="Worker 1" detail="deliver email" left={760} top={220} width={300} />
      <DiagramNode id="fan-worker-b" label="Worker 2" detail="index search" left={760} top={430} width={300} />
      <DiagramNode id="fan-worker-c" label="Worker 3" detail="emit analytics" left={760} top={640} width={300} />
      <DiagramNode id="fan-store" label="Store" detail="note ready" left={1500} top={430} width={260} />
      <Footer />
    </div>
  );
};

const Backpressure: Page = () => {
  const animate = useIsActivePage();
  return (
    <div style={{ ...base, padding: '104px 120px 136px' }}>
      <h2 style={{ margin: 0, fontSize: 76, fontWeight: 700, lineHeight: 1.08 }}>
        Parallel does not mean equally fast.
      </h2>
      <FanoutEdges activePath="middle" />
      <svg aria-hidden="true" width="1920" height="1080" viewBox="0 0 1920 1080" style={{ position: 'absolute', inset: 0 }}>
        {animate ? (
          <circle r="9" fill="#e987e0">
            <animateMotion path={fanoutPathB} dur="1400ms" begin={`${DIAGRAM_MORPH_MS}ms`} keyPoints="0;0.55;0.55;1" keyTimes="0;0.32;0.76;1" calcMode="spline" keySplines="0.18 0.86 0.24 1;0 0 1 1;0.18 0.86 0.24 1" fill="freeze" />
          </circle>
        ) : null}
      </svg>
      <QueueNode detail="notes.create" />
      <DiagramNode id="fan-worker-a" label="Worker 1" detail="done · 42 ms" left={760} top={220} width={300} />
      <DiagramNode id="fan-worker-b" label="Worker 2" detail="still indexing…" left={760} top={430} width={300} active />
      <DiagramNode id="fan-worker-c" label="Worker 3" detail="done · 18 ms" left={760} top={640} width={300} />
      <DiagramNode id="fan-store" label="Store" detail="waiting on 1 / 3" left={1500} top={430} width={260} />
      <div style={{ position: 'absolute', left: 570, top: 448, display: 'flex', gap: 12 }}>
        <span style={{ width: 22, height: 96, border: `2px solid ${line}` }} />
        <span style={{ width: 22, height: 96, border: `2px solid ${line}` }} />
        <span style={{ width: 22, height: 96, border: `2px solid ${line}` }} />
      </div>
      <p style={{ position: 'absolute', left: 1180, top: 680, width: 580, margin: 0, color: muted, fontSize: 32 }}>
        Backpressure is part of the architecture.
      </p>
      <Footer />
    </div>
  );
};

const Failure: Page = () => {
  const animate = useIsActivePage();
  return (
    <div style={{ ...base, padding: '104px 120px 136px' }}>
      <style>{`@keyframes ashlFail { 0%,100% { opacity: 1; } 24% { opacity: .32; } 42% { opacity: .9; } 58% { opacity: .46; } 76% { opacity: 1; } }`}</style>
      <h2 style={{ margin: 0, fontSize: 76, fontWeight: 700, lineHeight: 1.08 }}>
        Eventually, one worker has a bad day.
      </h2>
      <FanoutEdges activePath="middle" />
      <QueueNode detail="notes.create" />
      <DiagramNode id="fan-worker-a" label="Worker 1" detail="done · 42 ms" left={760} top={220} width={300} />
      <div style={{ animation: animate ? `ashlFail 360ms ${DIAGRAM_MORPH_MS}ms ease-out 1` : undefined }}>
        <DiagramNode id="fan-worker-b" label="Worker 2" detail="timeout" left={760} top={430} width={300} active />
      </div>
      <DiagramNode id="fan-worker-c" label="Worker 3" detail="done · 18 ms" left={760} top={640} width={300} />
      <DiagramNode id="fan-store" label="Store" detail="waiting on 1 / 3" left={1500} top={430} width={260} />
      <p style={{ position: 'absolute', left: 760, top: 800, width: 680, margin: 0, color: '#e987e0', fontSize: 34 }}>
        timeout after 5,000 ms
      </p>
      <Footer />
    </div>
  );
};

const Retry: Page = () => {
  const animate = useIsActivePage();
  return (
    <div style={{ ...base, padding: '104px 120px 136px' }}>
      <style>{`@keyframes ashlRetryDraw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }`}</style>
      <h2 style={{ margin: 0, fontSize: 76, fontWeight: 700, lineHeight: 1.08 }}>
        Failure becomes another route.
      </h2>
      <FanoutEdges />
      <svg aria-hidden="true" width="1920" height="1080" viewBox="0 0 1920 1080" style={{ position: 'absolute', inset: 0 }}>
        <path pathLength="1" d="M1060 496 C1120 496 1080 806 1150 806" fill="none" stroke="#e987e0" strokeWidth="4" strokeDasharray="1" style={{ animation: animate ? `ashlRetryDraw 320ms ${DIAGRAM_MORPH_MS}ms ${EASE_DRAW} both` : undefined }} />
        <path pathLength="1" d="M1450 806 C1540 806 1450 560 1500 496" fill="none" stroke="#e987e0" strokeWidth="4" strokeDasharray="1" style={{ animation: animate ? `ashlRetryDraw 320ms ${DIAGRAM_MORPH_MS + 320}ms ${EASE_DRAW} both` : undefined }} />
      </svg>
      <QueueNode detail="notes.create" />
      <DiagramNode id="fan-worker-a" label="Worker 1" detail="done · 42 ms" left={760} top={220} width={300} />
      <DiagramNode id="fan-worker-b" label="Worker 2" detail="timeout" left={760} top={430} width={300} active />
      <DiagramNode id="fan-worker-c" label="Worker 3" detail="done · 18 ms" left={760} top={640} width={300} />
      <DiagramNode id="fan-store" label="Store" detail="waiting on retry" left={1500} top={430} width={260} />
      <DiagramNode id="retry-node" label="Retry queue" detail="attempt 2 · 2s" left={1150} top={740} width={300} active />
      <Footer />
    </div>
  );
};

const Recovery: Page = () => (
  <div style={{ ...base, padding: '104px 120px 136px' }}>
    <h2 style={{ margin: 0, fontSize: 76, fontWeight: 700, lineHeight: 1.08 }}>
      The request survives a bad worker.
    </h2>
    <FanoutEdges activePath="retry" />
    <QueueNode detail="empty" />
    <DiagramNode id="fan-worker-a" label="Worker 1" detail="done · 42 ms" left={760} top={220} width={300} />
    <DiagramNode id="fan-worker-b" label="Worker 2" detail="recovered · try 2" left={760} top={430} width={300} />
    <DiagramNode id="fan-worker-c" label="Worker 3" detail="done · 18 ms" left={760} top={640} width={300} />
    <DiagramNode id="fan-store" label="Store" detail="complete · 3 / 3" left={1500} top={430} width={260} active />
    <DiagramNode id="retry-node" label="Retry queue" detail="empty" left={1150} top={740} width={300} />
    <p style={{ position: 'absolute', left: 120, top: 820, width: 760, margin: 0, color: muted, fontSize: 32 }}>
      Idempotency made the second attempt boring.
    </p>
    <Footer />
  </div>
);

const TerminalRun: Page = () => {
  const animate = useIsActivePage();
  return (
    <div style={{ ...base, padding: '104px 120px 136px' }}>
      <style>{`
        @keyframes ashlType { from { width: 0; } to { width: 54ch; } }
        @keyframes ashlOutput { 0% { opacity: 0; transform: translateY(7px) scale(.99); } 72% { opacity: 1; transform: translateY(-1px) scale(1.002); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
      `}</style>
      <h2 style={{ margin: 0, fontSize: 76, fontWeight: 700, lineHeight: 1.08 }}>
        Sometimes the best interface is still a terminal.
      </h2>
      <div style={{ position: 'absolute', left: 180, top: 360, width: 1560, fontFamily: 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace', fontSize: 32, lineHeight: 1.75 }}>
        <div style={{ height: 58 }}>
          <span style={{ color: '#e987e0' }}>$ </span>
          <span style={{ display: 'inline-block', width: animate ? undefined : '54ch', maxWidth: '54ch', overflow: 'hidden', whiteSpace: 'nowrap', verticalAlign: 'bottom', animation: animate ? 'ashlType 1150ms steps(54, end) both' : undefined }}>
            curl -X POST localhost:3000/notes -d @note.json
          </span>
        </div>
        <div style={{ color: '#9ed4c0', animation: animate ? `ashlOutput 220ms 1250ms ${EASE_SETTLE} both` : undefined }}>HTTP/1.1 202 Accepted</div>
        <div style={{ animation: animate ? `ashlOutput 220ms 1440ms ${EASE_SETTLE} both` : undefined }}>{'{'} "queued": <Literal>true</Literal>, "jobId": <StringLiteral>"job_8f31"</StringLiteral> {'}'}</div>
        <div style={{ color: muted, animation: animate ? `ashlOutput 220ms 1630ms ${EASE_SETTLE} both` : undefined }}>trace: api 18ms → queue 6ms → worker 240ms</div>
      </div>
      <Footer />
    </div>
  );
};

const LatencyTimeline: Page = () => {
  const animate = useIsActivePage();
  const bar = (width: number, delay: number, color: string) => ({
    width,
    height: 54,
    background: color,
    transformOrigin: 'left center',
    animation: animate ? `ashlSpan 420ms ${delay}ms ${EASE_SETTLE} both` : undefined,
  });
  return (
    <div style={{ ...base, padding: '104px 120px 136px' }}>
      <style>{`@keyframes ashlSpan { 0% { transform: scaleX(0); opacity: .35; } 76% { transform: scaleX(1.018); opacity: 1; } 100% { transform: scaleX(1); opacity: 1; } }`}</style>
      <h2 style={{ margin: 0, fontSize: 76, fontWeight: 700, lineHeight: 1.08 }}>
        Where did the 264 ms go?
      </h2>
      <div style={{ position: 'absolute', left: 260, top: 330, width: 1420, fontSize: 30 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', alignItems: 'center', gap: 28, marginBottom: 54 }}><span>API · 18 ms</span><div style={bar(150, 220, '#9f9894')} /></div>
        <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', alignItems: 'center', gap: 28, marginBottom: 54 }}><span>Queue · 6 ms</span><div style={bar(72, 420, '#9f9894')} /></div>
        <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', alignItems: 'center', gap: 28 }}><span>Worker · 240 ms</span><div style={bar(980, 620, '#e987e0')} /></div>
      </div>
      <p style={{ position: 'absolute', left: 468, top: 720, width: 1000, margin: 0, color: muted, fontSize: 34 }}>
        The trace turns “slow” into somewhere specific.
      </p>
      <Footer />
    </div>
  );
};

const SimpleService: Page = () => (
  <div style={{ ...base, padding: '104px 120px 136px' }}>
    <h2 style={{ margin: 0, fontSize: 76, fontWeight: 700, lineHeight: 1.08 }}>
      The diagram starts simple on purpose.
    </h2>
    <DiagramNode id="service-api" label="Notes API" detail="POST /notes" left={760} top={420} width={400} height={160} active />
    <p style={{ position: 'absolute', left: 610, top: 670, width: 700, margin: 0, textAlign: 'center', color: muted, fontSize: 32 }}>
      Then we turn the complexity back on.
    </p>
    <Footer />
  </div>
);

const ExpandedService: Page = () => {
  const animate = useIsActivePage();
  return (
    <div style={{ ...base, padding: '104px 120px 136px' }}>
      <style>{`@keyframes ashlExpandDraw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }`}</style>
      <h2 style={{ margin: 0, fontSize: 76, fontWeight: 700, lineHeight: 1.08 }}>
        “API” was hiding four decisions.
      </h2>
      <svg aria-hidden="true" width="1920" height="1080" viewBox="0 0 1920 1080" style={{ position: 'absolute', inset: 0 }}>
        <path pathLength="1" d="M500 496 H720" fill="none" stroke={line} strokeWidth="3" strokeDasharray="1" style={{ animation: animate ? `ashlExpandDraw 220ms ${DIAGRAM_MORPH_MS}ms ${EASE_DRAW} both` : undefined }} />
        <path pathLength="1" d="M1020 316 C1140 316 1140 441 1250 441" fill="none" stroke={line} strokeWidth="3" strokeDasharray="1" style={{ animation: animate ? `ashlExpandDraw 240ms ${DIAGRAM_MORPH_MS + 220}ms ${EASE_DRAW} both` : undefined }} />
        <path pathLength="1" d="M1020 566 C1140 566 1140 441 1250 441" fill="none" stroke={line} strokeWidth="3" strokeDasharray="1" style={{ animation: animate ? `ashlExpandDraw 240ms ${DIAGRAM_MORPH_MS + 460}ms ${EASE_DRAW} both` : undefined }} />
      </svg>
      <DiagramNode id="service-api" label="Gateway" detail="route + limit" left={200} top={430} width={300} height={132} active />
      <DiagramNode id="service-auth" label="Auth" detail="who are you?" left={720} top={250} width={300} />
      <DiagramNode id="service-cache" label="Cache" detail="have we seen this?" left={720} top={500} width={300} />
      <DiagramNode id="service-db" label="Database" detail="make it durable" left={1250} top={375} width={340} />
      <Footer />
    </div>
  );
};

const SyntaxSample = ({ left, top, label, children }: { left: number; top: number; label: string; children: React.ReactNode }) => (
  <div style={{ position: 'absolute', left, top, width: 740 }}>
    <div style={{ marginBottom: 18, color: muted, fontFamily: 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace', fontSize: 22 }}>{label}</div>
    <pre style={{ margin: 0, color: '#d5cabd', fontFamily: 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace', fontSize: 28, lineHeight: 1.5, whiteSpace: 'pre-wrap' }}><code>{children}</code></pre>
  </div>
);

const SyntaxSampler: Page = () => (
  <div style={{ ...base, padding: '86px 120px 110px' }}>
    <h2 style={{ margin: 0, fontSize: 68, fontWeight: 700, lineHeight: 1.08 }}>
      Different artefacts. One syntax language.
    </h2>
    <SyntaxSample left={120} top={235} label="TypeScript">
      <Keyword>const</Keyword> job: <TypeName>Job</TypeName> = {'{'}{`\n  `}type: <StringLiteral>'create-note'</StringLiteral>,{`\n  `}attempt: <Literal>2</Literal>{`\n`}{'}'};
    </SyntaxSample>
    <SyntaxSample left={1000} top={235} label="shell">
      <span style={{ color: '#e987e0' }}>$</span> worker retry job_8f31{`\n`}<span style={{ color: '#9ed4c0' }}>✓</span> completed in 240ms
    </SyntaxSample>
    <SyntaxSample left={120} top={605} label="JSON">
      {'{'}{`\n  `}<StringLiteral>"queued"</StringLiteral>: <Literal>true</Literal>,{`\n  `}<StringLiteral>"attempt"</StringLiteral>: <Literal>2</Literal>{`\n`}{'}'}
    </SyntaxSample>
    <SyntaxSample left={1000} top={605} label="logs">
      <span style={{ color: muted }}>16:41:02</span> <span style={{ color: '#9ed4c0' }}>INFO</span> note.created{`\n`}<span style={{ color: muted }}>16:41:02</span> trace=<StringLiteral>8f31</StringLiteral>
    </SyntaxSample>
    <Footer />
  </div>
);

const RecapItem = ({
  id,
  left,
  top,
  width,
  height,
  label,
  detail,
  revealAfterMorph = false,
}: {
  id: string;
  left: number;
  top: number;
  width: number;
  height: number;
  label: string;
  detail: string;
  revealAfterMorph?: boolean;
}) => {
  const animate = useIsActivePage();
  return (
    <>
      <MorphElement id={id}>
        <div style={{ position: 'absolute', left, top, width, height, boxSizing: 'border-box', border: `2px solid ${line}`, background: '#242432' }} />
      </MorphElement>
      <div
        style={{
          position: 'absolute',
          left,
          top,
          width,
          height,
          boxSizing: 'border-box',
          padding: '22px 26px',
          pointerEvents: 'none',
          animation: animate && revealAfterMorph ? `ashlRecapCopyIn 220ms ${DIAGRAM_MORPH_MS}ms ${EASE_SETTLE} both` : undefined,
        }}
      >
      <div style={{ fontSize: 32, fontWeight: 700 }}>{label}</div>
      <div style={{ marginTop: 10, color: muted, fontFamily: 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace', fontSize: 19 }}>{detail}</div>
      </div>
    </>
  );
};

const RecapSpread: Page = () => (
  <div style={{ ...base, padding: '104px 120px 136px' }}>
    <h2 style={{ margin: 0, fontSize: 76, fontWeight: 700, lineHeight: 1.08 }}>
      We looked at one request four ways.
    </h2>
    <RecapItem id="recap-code" left={140} top={300} width={700} height={170} label="Code" detail="await jobs.enqueue(…)" />
    <RecapItem id="recap-queue" left={1120} top={250} width={340} height={150} label="Queue" detail="notes.create" />
    <RecapItem id="recap-terminal" left={240} top={690} width={680} height={140} label="Terminal" detail="202 Accepted · job_8f31" />
    <RecapItem id="recap-trace" left={1120} top={650} width={560} height={150} label="Trace" detail="18ms → 6ms → 240ms" />
    <Footer />
  </div>
);

const RecapCompressed: Page = () => {
  const animate = useIsActivePage();
  return (
    <div style={{ ...base, padding: '104px 120px 136px' }}>
      <style>{`
        @keyframes ashlRecapLine { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
        @keyframes ashlRecapCopyIn { 0% { opacity: 0; transform: translateY(7px) scale(.99); } 72% { opacity: 1; transform: translateY(-1px) scale(1.002); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
      `}</style>
      <h2 style={{ margin: 0, fontSize: 76, fontWeight: 700, lineHeight: 1.08 }}>
        Now keep only the shape.
      </h2>
      <svg aria-hidden="true" width="1920" height="1080" viewBox="0 0 1920 1080" style={{ position: 'absolute', inset: 0 }}>
        <path pathLength="1" d="M440 526 H540 M820 526 H920 M1200 526 H1300" fill="none" stroke={line} strokeWidth="3" strokeDasharray="1" style={{ animation: animate ? `ashlRecapLine 360ms ${DIAGRAM_MORPH_MS}ms ${EASE_DRAW} both` : undefined }} />
      </svg>
      <RecapItem id="recap-code" left={160} top={465} width={280} height={122} label="Code" detail="enqueue" revealAfterMorph />
      <RecapItem id="recap-queue" left={540} top={465} width={280} height={122} label="Queue" detail="buffer" revealAfterMorph />
      <RecapItem id="recap-terminal" left={920} top={465} width={280} height={122} label="Terminal" detail="observe" revealAfterMorph />
      <RecapItem id="recap-trace" left={1300} top={465} width={360} height={122} label="Trace" detail="explain" revealAfterMorph />
      <p style={{ position: 'absolute', left: 500, top: 700, width: 920, margin: 0, textAlign: 'center', color: muted, fontSize: 36, animation: animate ? `ashlRecapCopyIn 220ms ${DIAGRAM_MORPH_MS + 60}ms ${EASE_SETTLE} both` : undefined }}>
        Code, runtime, and explanation stay connected.
      </p>
      <Footer />
    </div>
  );
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
  morph: {
    duration: DIAGRAM_MORPH_MS,
    easing: EASE_GLIDE,
  },
};

Diagram.transition = diagramMorph;
DiagramFocus.transition = diagramMorph;
CodeContext.transition = diagramMorph;
CodeFocus.transition = diagramMorph;
IdempotentCode.transition = diagramMorph;
ObservableCode.transition = diagramMorph;
Fanout.transition = diagramMorph;
Backpressure.transition = diagramMorph;
Failure.transition = diagramMorph;
Retry.transition = diagramMorph;
Recovery.transition = diagramMorph;
SimpleService.transition = diagramMorph;
ExpandedService.transition = diagramMorph;
RecapCompressed.transition = diagramMorph;

export const meta: SlideMeta = {
  title: 'ashl.dev theme preview',
  createdAt: '2026-08-23T06:19:25.057Z',
  theme: 'ashl-dev',
};

export default [
  Cover,
  Diagram,
  DiagramFocus,
  CodeContext,
  CodeFocus,
  IdempotentCode,
  ObservableCode,
  QueueCall,
  Fanout,
  Backpressure,
  Failure,
  Retry,
  Recovery,
  TerminalRun,
  LatencyTimeline,
  SimpleService,
  ExpandedService,
  SyntaxSampler,
  RecapSpread,
  RecapCompressed,
] satisfies Page[];

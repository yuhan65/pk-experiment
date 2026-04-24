/* ═══════════════════════════════════════════════════════════════
   PEAKO — shared UI primitives (v2, calmer)
   ═══════════════════════════════════════════════════════════════ */

// Squishy icon-labeled tab bar — softer, cleaner
function PeakoTabBar({ tab, onTab }) {
  const items = [
    { id: 'today',    label: 'Today' },
    { id: 'progress', label: 'Progress' },
    { id: 'you',      label: 'You' },
  ];
  const Icon = ({ id, active }) => {
    const c = active ? '#fff' : 'var(--ink-2)';
    if (id === 'today') return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
        <path d="M3 11 L12 3 L21 11 V21 H3 Z"/>
        <path d="M9 21 V14 H15 V21"/>
      </svg>
    );
    if (id === 'progress') return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round">
        <rect x="4" y="13" width="4" height="8" rx="1"/>
        <rect x="10" y="8" width="4" height="13" rx="1"/>
        <rect x="16" y="3" width="4" height="18" rx="1"/>
      </svg>
    );
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinejoin="round">
        <circle cx="12" cy="9" r="4"/>
        <path d="M4 21 C 4 15, 20 15, 20 21"/>
      </svg>
    );
  };
  return (
    <div style={{
      position: 'absolute', left: 14, right: 14, bottom: 18,
      background: 'var(--paper)',
      border: '1px solid var(--hairline)',
      borderRadius: 22,
      boxShadow: 'var(--sh-3)',
      padding: 6,
      display: 'flex',
      gap: 3,
      zIndex: 20,
    }}>
      {items.map(it => {
        const active = tab === it.id;
        return (
          <button key={it.id}
            onClick={() => onTab(it.id)}
            style={{
              flex: 1,
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
              padding: '9px 2px 7px',
              border: 'none',
              borderRadius: 16,
              background: active ? 'var(--line)' : 'transparent',
              color: active ? '#fff7ea' : 'var(--ink-2)',
              fontFamily: 'var(--font-ui)',
              fontSize: 11.5,
              fontWeight: 800,
              cursor: 'pointer',
              transition: 'background .14s',
            }}>
            <Icon id={it.id} active={active}/>
            <span>{it.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function ScreenHeader({ title, sub, right }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '6px 20px 10px' }}>
      <div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 700, letterSpacing: '-.02em', lineHeight: 1 }}>{title}</div>
        {sub && <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-3)', marginTop: 4, letterSpacing: '.08em' }}>{sub}</div>}
      </div>
      {right}
    </div>
  );
}

function SoftLabel({ children, color = 'var(--ink-3)' }) {
  return (
    <span style={{
      fontFamily: 'var(--font-mono)', fontSize: 10.5, fontWeight: 800,
      letterSpacing: '.14em', textTransform: 'uppercase', color,
    }}>{children}</span>
  );
}

Object.assign(window, { PeakoTabBar, ScreenHeader, SoftLabel });

// screens-feed-log-challenge.jsx — supporting screens

function Feed({ mascot = 'blorb' }) {
  const posts = [
    {
      time: '2m', emo: 'judging',
      t: "You've held plank longer than any of my exes. Concerning? Maybe. Proud? Sure.",
      meta: "Challenge · Plank Patience", kind: 'challenge',
    },
    {
      time: '1h', emo: 'unimpressed',
      t: "Oat milk latte. A croissant. A 'protein bar' that's 70% sugar. Big morning for the brand.",
      meta: "You tagged: 🍕 Treat", kind: 'meal',
    },
    {
      time: '6h', emo: 'sus',
      t: "Two salads in a row. I'm not clapping yet but I'm… watching.",
      meta: "You tagged: 🥗 Healthy", kind: 'meal',
    },
    {
      time: 'yest', emo: 'proud',
      t: "3/3 and a streak extension. Fine. Good, even. Don't get used to it.",
      meta: "Milestone · 12-day streak", kind: 'milestone',
    },
  ];
  return (
    <PhoneFrame label="04 Peako's Feed" dark>
      {/* Nav */}
      <div style={{
        padding: '58px 18px 12px', display: 'flex', alignItems: 'center',
        gap: 12, borderBottom: '2px solid #2a2620',
      }}>
        <button style={{
          background: 'transparent', border: 'none', color: '#f3efe6',
          fontFamily: 'var(--f-mono)', fontSize: 20, lineHeight: 1, padding: 0,
        }}>‹</button>
        <div style={{ flex: 1 }}>
          <div className="label" style={{ color: '#8a8276' }}>@peako · online</div>
          <div style={{ fontFamily: 'var(--f-display)', fontSize: 22, lineHeight: 1, color: '#f3efe6' }}>Peako's phone</div>
        </div>
        <div style={{ width: 38, height: 38, borderRadius: 12, background: 'var(--acid)', border: '2px solid #f3efe6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <PeakoAvatar size={32} variant={mascot} emotion="deadpan"/>
        </div>
      </div>

      <div className="no-scrollbar" style={{
        padding: '12px 14px 110px', overflowY: 'auto', height: 'calc(100% - 108px)',
      }}>
        {posts.map((p, i) => (
          <FeedPost key={i} post={p} mascot={mascot}/>
        ))}
      </div>
    </PhoneFrame>
  );
}

function FeedPost({ post, mascot }) {
  const kindBg = { meal: '#ffe4df', challenge: 'var(--acid)', milestone: 'var(--bruise)' }[post.kind];
  const kindFg = post.kind === 'milestone' ? '#f3efe6' : '#1a1814';
  return (
    <div style={{
      background: '#f3efe6', borderRadius: 20, padding: '14px 14px 12px',
      marginBottom: 12, border: '2px solid #1a1814', color: '#1a1814',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 14, background: 'var(--acid)',
          border: '2px solid var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <PeakoAvatar size={38} variant={mascot} emotion={post.emo}/>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'var(--f-sans)', fontSize: 14, fontWeight: 700 }}>peako</div>
          <div className="label" style={{ color: 'var(--ink-4)' }}>{post.time} · via peako's phone</div>
        </div>
        <div style={{ fontSize: 20, color: 'var(--ink-4)' }}>⋯</div>
      </div>
      <div style={{ fontFamily: 'var(--f-display)', fontSize: 22, lineHeight: 1.2, marginBottom: 10, textWrap: 'balance' }}>
        "{post.t}"
      </div>
      <div style={{
        display: 'inline-flex', padding: '5px 10px', background: kindBg, color: kindFg,
        border: '1.5px solid var(--ink)', borderRadius: 999, marginBottom: 10,
        fontFamily: 'var(--f-mono)', fontSize: 10.5, fontWeight: 800, letterSpacing: '0.1em',
      }}>{post.meta.toUpperCase()}</div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', borderTop: '1px dashed var(--ink-3)', paddingTop: 10 }}>
        <Act icon="♡" label="like"/>
        <Act icon="❏" label="save"/>
        <Act icon="↗" label="share"/>
        <span style={{ marginLeft: 'auto', fontFamily: 'var(--f-mono)', fontSize: 10, color: 'var(--ink-4)' }}>0 others liked</span>
      </div>
    </div>
  );
}

function Act({ icon, label }) {
  return (
    <button style={{
      background: 'transparent', border: 'none', display: 'inline-flex', gap: 5, alignItems: 'center',
      fontFamily: 'var(--f-mono)', fontSize: 11, fontWeight: 700, color: 'var(--ink-2)',
    }}>
      <span style={{ fontSize: 15 }}>{icon}</span>{label}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
// Log Modal — bottom sheet
// ─────────────────────────────────────────────────────────────
function LogModal({ mascot = 'blorb' }) {
  return (
    <PhoneFrame label="05 Log Modal">
      {/* dim background - show a ghost of Today */}
      <div style={{ filter: 'blur(2px)', opacity: 0.4, pointerEvents: 'none' }}>
        <TopBar streak={5} coins={150}/>
        <div style={{ padding: '4px 18px' }}>
          <div style={{ height: 60, background: '#fff', borderRadius: 18, marginBottom: 10 }}/>
          <div style={{ height: 110, background: '#ffe4df', borderRadius: 22, marginBottom: 10 }}/>
          <div style={{ height: 110, background: '#edffc2', borderRadius: 22 }}/>
        </div>
      </div>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)' }}/>

      {/* Sheet */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        background: 'var(--paper)', borderRadius: '24px 24px 0 0',
        border: '2px solid var(--ink)', borderBottom: 'none',
        padding: '14px 18px 28px', maxHeight: '82%', overflowY: 'auto',
      }}>
        <div style={{ width: 44, height: 5, background: 'var(--ink-3)', borderRadius: 3, margin: '0 auto 14px' }}/>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, marginBottom: 16 }}>
          <PeakoAvatar size={54} variant={mascot} emotion="sus"/>
          <Bubble color="#fff" style={{ flex: 1, marginBottom: 4 }}>
            Show me. Or lie. I find out either way.
          </Bubble>
        </div>

        {/* type chooser */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          <TypeChip active glyph="🍽" label="Meal"/>
          <TypeChip glyph="📝" label="Other"/>
        </div>

        {/* photo */}
        <div style={{
          background: '#fff', borderRadius: 18, padding: 8,
          border: '2px solid var(--ink)', marginBottom: 12, position: 'relative',
        }}>
          <div style={{
            aspectRatio: '16/10', borderRadius: 10,
            background: 'repeating-linear-gradient(135deg, var(--paper-2) 0 10px, var(--paper-3) 10px 20px)',
            border: '2px dashed var(--ink)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column', gap: 4,
          }}>
            <div style={{ fontSize: 28 }}>📷</div>
            <div className="label">TAP TO ADD PHOTO</div>
          </div>
        </div>

        {/* caption */}
        <div style={{
          background: '#fff', borderRadius: 14, padding: '10px 12px',
          border: '2px solid var(--ink)', marginBottom: 14,
          fontFamily: 'var(--f-sans)', fontSize: 14, color: 'var(--ink-4)',
        }}>
          <span style={{ opacity: 0.6 }}>Caption, if you dare…</span>
        </div>

        {/* tag picker — the signature bit */}
        <div className="label" style={{ marginBottom: 8 }}>HOW IS THIS, REALLY?</div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          <TagPick glyph="🥗" label="Healthy" sub="eating well today" color="#edffc2"/>
          <TagPick glyph="🍕" label="Treat" sub="going off the rails" color="#ffe4df" active/>
          <TagPick glyph="🤷" label="Whatever" sub="don't ask" color="#dceeff"/>
        </div>

        <button className="squish" style={{
          width: '100%', padding: '16px', borderRadius: 18, background: 'var(--ink)',
          color: '#f3efe6', fontFamily: 'var(--f-mono)', fontSize: 13, fontWeight: 800,
          letterSpacing: '0.15em', textTransform: 'uppercase',
        }}>Send to Peako →</button>
      </div>
    </PhoneFrame>
  );
}

function TypeChip({ glyph, label, active }) {
  return (
    <button style={{
      flex: 1, padding: '12px', borderRadius: 14,
      background: active ? 'var(--ink)' : '#fff',
      color: active ? '#f3efe6' : 'var(--ink)',
      border: '2px solid var(--ink)',
      fontFamily: 'var(--f-mono)', fontSize: 12, fontWeight: 700,
      letterSpacing: '0.1em', textTransform: 'uppercase',
      display: 'flex', gap: 8, alignItems: 'center', justifyContent: 'center',
      boxShadow: active ? 'none' : '2px 2px 0 var(--ink)',
    }}>
      <span style={{ fontSize: 16 }}>{glyph}</span>{label}
    </button>
  );
}
function TagPick({ glyph, label, sub, color, active }) {
  return (
    <button style={{
      flex: 1, padding: '12px 8px', borderRadius: 14,
      background: active ? color : '#fff',
      border: '2px solid var(--ink)',
      boxShadow: active ? '3px 3px 0 var(--ink)' : '2px 2px 0 var(--ink-3)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
      transform: active ? 'translate(-1px,-1px)' : 'none',
    }}>
      <span style={{ fontSize: 22 }}>{glyph}</span>
      <span style={{ fontFamily: 'var(--f-mono)', fontSize: 11, fontWeight: 800, letterSpacing: '0.05em' }}>{label.toUpperCase()}</span>
      <span style={{ fontSize: 9.5, color: 'var(--ink-3)', fontStyle: 'italic' }}>{sub}</span>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
// Thinking animation screen
// ─────────────────────────────────────────────────────────────
function Thinking({ mascot = 'blorb' }) {
  return (
    <PhoneFrame label="06 Thinking" dark>
      <div style={{
        padding: '80px 24px', height: '100%',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        color: '#f3efe6', position: 'relative',
      }}>
        {/* halo */}
        <div style={{
          width: 240, height: 240, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200,255,60,0.3), transparent 70%)',
          position: 'absolute', top: '26%',
        }}/>
        <div style={{ position: 'relative' }}>
          <PeakoAvatar size={180} variant={mascot} emotion="thinking"/>
          {/* thought dots */}
          <div style={{ position: 'absolute', top: -30, right: -20, display: 'flex', gap: 6 }}>
            <Dot d={0}/><Dot d={0.2}/><Dot d={0.4}/>
          </div>
        </div>
        <div style={{ fontFamily: 'var(--f-display)', fontSize: 34, marginTop: 34, textAlign: 'center', lineHeight: 1.1 }}>
          Peako is <i>thinking…</i>
        </div>
        <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, marginTop: 10, color: '#8a8276', letterSpacing: '0.1em' }}>
          DON'T HOLD YOUR BREATH
        </div>
      </div>
    </PhoneFrame>
  );
}
function Dot({ d }) {
  return (
    <div style={{
      width: 12, height: 12, borderRadius: '50%', background: 'var(--acid)',
      border: '2px solid #1a1814',
      animation: `peakobob 1.4s ${d}s ease-in-out infinite`,
    }}/>
  );
}

// ─────────────────────────────────────────────────────────────
// Challenge — timer
// ─────────────────────────────────────────────────────────────
function ChallengeTimer({ mascot = 'blorb' }) {
  return (
    <PhoneFrame label="07 Challenge / Timer" dark>
      <div style={{ padding: '68px 20px 120px', height: '100%', position: 'relative' }}>
        {/* Exit */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button style={{
            background: 'transparent', border: '2px solid #f3efe6',
            borderRadius: 999, padding: '6px 10px', color: '#f3efe6',
            fontFamily: 'var(--f-mono)', fontSize: 11, fontWeight: 700,
          }}>× END</button>
          <span className="label" style={{ color: '#8a8276' }}>TIMER · 1 OF 3</span>
        </div>

        <div style={{ textAlign: 'center', color: '#f3efe6', marginTop: 24 }}>
          <div className="label" style={{ color: '#8a8276' }}>PLANK PATIENCE</div>
          <div style={{ fontFamily: 'var(--f-display)', fontSize: 30, marginTop: 4 }}>Hold it. Quietly.</div>
        </div>

        {/* Ring + number */}
        <div style={{ position: 'relative', width: 260, height: 260, margin: '30px auto 0' }}>
          <svg width="260" height="260" viewBox="0 0 260 260" style={{ transform: 'rotate(-90deg)' }}>
            <circle cx="130" cy="130" r="118" stroke="#2a2620" strokeWidth="14" fill="none"/>
            <circle cx="130" cy="130" r="118" stroke="var(--acid)" strokeWidth="14" fill="none"
              strokeDasharray={2 * Math.PI * 118} strokeDashoffset={2 * Math.PI * 118 * 0.45}
              strokeLinecap="round"/>
          </svg>
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', color: '#f3efe6',
          }}>
            <div style={{ fontFamily: 'var(--f-display)', fontSize: 110, lineHeight: 0.9, letterSpacing: '-0.04em' }}>33</div>
            <div className="label" style={{ color: '#8a8276' }}>SECONDS LEFT</div>
          </div>
        </div>

        {/* Peako hype */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end', marginTop: 28, justifyContent: 'center' }}>
          <div style={{ transform: 'rotate(-4deg)' }}>
            <PeakoAvatar size={56} variant={mascot} emotion="dontest"/>
          </div>
          <Bubble color="#f3efe6" tail="left" style={{ maxWidth: 240 }}>
            Shoulders. <i>Shoulders.</i> You're not a wet noodle.
          </Bubble>
        </div>

        {/* pause bar */}
        <div style={{
          position: 'absolute', left: 20, right: 20, bottom: 30,
          display: 'flex', gap: 10,
        }}>
          <button className="squish" style={{
            flex: 1, padding: 14, background: '#1f1c18', color: '#f3efe6',
            border: '2px solid #f3efe6', borderRadius: 18,
            fontFamily: 'var(--f-mono)', fontSize: 12, fontWeight: 700, letterSpacing: '0.1em',
          }}>PAUSE</button>
          <button className="squish" style={{
            flex: 1, padding: 14, background: 'var(--acid)', color: '#1a1814',
            borderRadius: 18,
            fontFamily: 'var(--f-mono)', fontSize: 12, fontWeight: 700, letterSpacing: '0.1em',
          }}>I'M DONE</button>
        </div>
      </div>
    </PhoneFrame>
  );
}

// Challenge — counter
function ChallengeCounter({ mascot = 'blorb' }) {
  return (
    <PhoneFrame label="07 Challenge / Counter">
      <div style={{ padding: '68px 20px 120px', height: '100%', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button style={{
            background: 'transparent', border: '2px solid var(--ink)',
            borderRadius: 999, padding: '6px 10px',
            fontFamily: 'var(--f-mono)', fontSize: 11, fontWeight: 700,
          }}>× END</button>
          <span className="label">COUNTER · 2 OF 3</span>
        </div>
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <div className="label">SQUAT THERAPY</div>
          <div style={{ fontFamily: 'var(--f-display)', fontSize: 28 }}>Low. Slow.</div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 30 }}>
          <div style={{ fontFamily: 'var(--f-display)', fontSize: 220, lineHeight: 0.8, letterSpacing: '-0.05em' }}>17</div>
          <div className="label">OF 30 REPS</div>
        </div>

        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end', marginTop: 18, justifyContent: 'center' }}>
          <PeakoAvatar size={48} variant={mascot} emotion="bored"/>
          <Bubble color="#fff" style={{ maxWidth: 220 }}>13 more. Don't half-rep.</Bubble>
        </div>

        <button className="squish" style={{
          position: 'absolute', left: 20, right: 20, bottom: 30,
          padding: 24, background: 'var(--acid)', borderRadius: 24,
          fontFamily: 'var(--f-display)', fontSize: 34, lineHeight: 1,
        }}>+1</button>
      </div>
    </PhoneFrame>
  );
}

// Challenge — guided
function ChallengeGuided({ mascot = 'blorb' }) {
  return (
    <PhoneFrame label="07 Challenge / Guided">
      <div style={{ padding: '68px 20px 120px', height: '100%', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button style={{
            background: 'transparent', border: '2px solid var(--ink)',
            borderRadius: 999, padding: '6px 10px',
            fontFamily: 'var(--f-mono)', fontSize: 11, fontWeight: 700,
          }}>× END</button>
          <span className="label">GUIDED · 3 OF 3</span>
        </div>

        <div style={{ display: 'flex', gap: 4, marginTop: 16 }}>
          {[1,1,1,0,0].map((s, i) => (
            <div key={i} style={{
              flex: 1, height: 6, borderRadius: 3,
              background: s ? 'var(--ink)' : 'var(--paper-2)',
            }}/>
          ))}
        </div>
        <div className="label" style={{ marginTop: 10 }}>STEP 3 OF 5 · UNKINK YOURSELF</div>
        <div style={{ fontFamily: 'var(--f-display)', fontSize: 38, lineHeight: 1, marginTop: 6 }}>
          Cat–cow. Thirty seconds.
        </div>

        <div style={{
          aspectRatio: '1/1', borderRadius: 24, background: 'var(--sky)',
          border: '2px solid var(--ink)', boxShadow: '3px 3px 0 var(--ink)',
          marginTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ fontSize: 120 }}>🐈</div>
          <div style={{
            position: 'absolute', top: 12, left: 12, padding: '6px 10px',
            background: '#fff', border: '2px solid var(--ink)', borderRadius: 999,
            fontFamily: 'var(--f-mono)', fontSize: 11, fontWeight: 800,
          }}>0:22</div>
          <div style={{
            position: 'absolute', bottom: 12, right: 12, padding: '6px 10px',
            background: 'var(--ink)', color: '#f3efe6',
            borderRadius: 999, fontFamily: 'var(--f-mono)', fontSize: 10, fontWeight: 700,
          }}>NEXT · CHILD POSE</div>
        </div>

        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end', marginTop: 16, justifyContent: 'center' }}>
          <PeakoAvatar size={48} variant={mascot} emotion="judging"/>
          <Bubble color="#fff" style={{ maxWidth: 220 }}>Slower. Like you mean it.</Bubble>
        </div>

        <div style={{
          position: 'absolute', left: 20, right: 20, bottom: 30,
          display: 'flex', gap: 10,
        }}>
          <button style={{
            flex: 1, padding: 14, background: '#fff', border: '2px solid var(--ink)',
            borderRadius: 18, fontFamily: 'var(--f-mono)', fontSize: 12, fontWeight: 700, letterSpacing: '0.1em',
            boxShadow: '2px 2px 0 var(--ink)',
          }}>PAUSE</button>
          <button className="squish" style={{
            flex: 2, padding: 14, background: 'var(--acid)',
            borderRadius: 18, fontFamily: 'var(--f-mono)', fontSize: 12, fontWeight: 800, letterSpacing: '0.1em',
          }}>NEXT STEP →</button>
        </div>
      </div>
    </PhoneFrame>
  );
}

// ─────────────────────────────────────────────────────────────
// Streak freeze confirm
// ─────────────────────────────────────────────────────────────
function FreezeConfirm({ mascot = 'blorb' }) {
  return (
    <PhoneFrame label="08 Freeze Confirm">
      <div style={{ padding: '60px 20px 120px', background: 'rgba(0,0,0,0.35)', height: '100%', position: 'relative' }}>
        <div style={{
          background: 'var(--sky)', borderRadius: 26, padding: 20,
          border: '2px solid var(--ink)', boxShadow: '4px 4px 0 var(--ink)',
          marginTop: 80, textAlign: 'center', position: 'relative',
        }}>
          <div style={{ fontSize: 80, lineHeight: 1 }}>❄️</div>
          <div style={{ fontFamily: 'var(--f-display)', fontSize: 32, lineHeight: 1.1, marginTop: 8 }}>
            You want me to <i>freeze</i> this?
          </div>
          <div style={{ fontSize: 15, marginTop: 10, color: 'var(--ink-2)', lineHeight: 1.4 }}>
            Fine. 100 coins. I'm not proud. You're not either. Moving on.
          </div>

          <div style={{
            display: 'flex', justifyContent: 'center', gap: 12, marginTop: 16,
            padding: '12px 0', borderTop: '1.5px dashed var(--ink)', borderBottom: '1.5px dashed var(--ink)',
          }}>
            <FreezeStat label="COST" value="100 💎"/>
            <div style={{ width: 1, background: 'var(--ink-3)', opacity: 0.3 }}/>
            <FreezeStat label="STREAK AT" value="12 🔥"/>
            <div style={{ width: 1, background: 'var(--ink-3)', opacity: 0.3 }}/>
            <FreezeStat label="USES LEFT" value="1/1"/>
          </div>

          <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
            <button style={{
              flex: 1, padding: 14, background: '#fff', border: '2px solid var(--ink)',
              borderRadius: 16, fontFamily: 'var(--f-mono)', fontSize: 12, fontWeight: 700,
              letterSpacing: '0.1em', boxShadow: '2px 2px 0 var(--ink)',
            }}>NEVERMIND</button>
            <button className="squish" style={{
              flex: 1.4, padding: 14, background: 'var(--ink)', color: '#f3efe6',
              borderRadius: 16, fontFamily: 'var(--f-mono)', fontSize: 12, fontWeight: 800,
              letterSpacing: '0.1em',
            }}>SAVE ME →</button>
          </div>

          {/* Peako in corner */}
          <div style={{ position: 'absolute', top: -36, right: -4, transform: 'rotate(10deg)' }}>
            <PeakoAvatar size={72} variant={mascot} emotion="unimpressed"/>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
function FreezeStat({ label, value }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div className="label" style={{ color: 'var(--ink-3)' }}>{label}</div>
      <div style={{ fontFamily: 'var(--f-mono)', fontSize: 14, fontWeight: 800, marginTop: 2 }}>{value}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Onboarding — one hero frame
// ─────────────────────────────────────────────────────────────
function Onboarding({ mascot = 'blorb' }) {
  return (
    <PhoneFrame label="09 Onboarding · 1">
      <div style={{
        padding: '70px 24px 120px', height: '100%',
        display: 'flex', flexDirection: 'column',
        background: 'var(--acid)',
      }}>
        <div className="label">HI.</div>
        <div style={{ fontFamily: 'var(--f-display)', fontSize: 58, lineHeight: 0.95, marginTop: 6 }}>
          I'm Peako. I'm going to <i>ruin</i> your excuses.
        </div>
        <div style={{ fontSize: 15.5, marginTop: 14, maxWidth: 300, lineHeight: 1.4 }}>
          Three little challenges a day. I'll roast what you eat. I won't clap unless you earn it. Deal?
        </div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 20 }}>
          <div style={{ transform: 'rotate(-4deg)' }}>
            <PeakoAvatar size={180} variant={mascot} emotion="smug"/>
          </div>
        </div>
        <button className="squish" style={{
          padding: 16, background: 'var(--ink)', color: 'var(--acid)',
          borderRadius: 20, fontFamily: 'var(--f-mono)', fontSize: 14, fontWeight: 800,
          letterSpacing: '0.15em', textTransform: 'uppercase',
        }}>Deal →</button>
        <div style={{ textAlign: 'center', fontFamily: 'var(--f-mono)', fontSize: 11, marginTop: 10, fontWeight: 700 }}>
          1 · 2 · 3
        </div>
      </div>
    </PhoneFrame>
  );
}

Object.assign(window, { Feed, LogModal, Thinking, ChallengeTimer, ChallengeCounter, ChallengeGuided, FreezeConfirm, Onboarding });

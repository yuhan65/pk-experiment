// Placeholder Peako avatar. Final mascot IP is TBD (see Peako_Design_Brief §4);
// everything around the character stays placeholder until the mascot is locked.
//
// Use `size` to scale (px); any extra className is appended.

export default function PeakoMascot({ size = 44, className = '', ring = true }) {
  const fontSize = Math.round(size * 0.46);
  return (
    <div
      className={`shrink-0 rounded-full bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 grid place-items-center text-white font-extrabold shadow-card ${
        ring ? 'ring-2 ring-white' : ''
      } ${className}`}
      style={{ width: size, height: size, fontSize }}
      aria-label="Peako"
    >
      P
    </div>
  );
}

// Larger stage version — used on Challenge modals / empty-states as a "Peako
// is here" placeholder. Still just a gradient tile for now.
export function PeakoStage({ size = 120, label = 'Peako', className = '' }) {
  return (
    <div
      className={`relative rounded-3xl bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 grid place-items-center text-white font-black shadow-card ${className}`}
      style={{ width: size, height: size, fontSize: Math.round(size * 0.28) }}
      aria-label={label}
    >
      P
      <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.35),transparent_55%)]" />
    </div>
  );
}

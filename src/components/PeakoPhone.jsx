import { motion } from 'framer-motion';

// The big "scene" phone that sits next to the mascot on the Today page.
// When Peako has posted something new it flashes a mood sign overlayed on
// the screen; otherwise it shows a quiet lock-screen vibe.
//
// Props:
//   mood    — { emoji, color, label } | null  (from getPostMood)
//   unread  — number of unread posts (controls badge)
//   onClick — open the Feed overlay

export default function PeakoPhone({ mood, unread = 0, onClick }) {
  const hasSign = !!mood && unread > 0;

  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      whileHover={{ y: -2 }}
      aria-label="Open Peako's feed"
      className="relative shrink-0"
      style={{ width: 92, height: 168 }}
    >
      {/* Phone body */}
      <div className="absolute inset-0 rounded-[22px] bg-gradient-to-br from-slate-800 via-slate-900 to-black shadow-phone p-[3px]">
        {/* Screen */}
        <div className="w-full h-full rounded-[19px] bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 relative overflow-hidden">
          {/* Notch */}
          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 h-2 w-10 rounded-full bg-black/80" />

          {/* Lock-screen clock */}
          <div className="absolute inset-x-0 top-6 text-center">
            <div className="text-white/90 text-[10px] font-semibold tracking-wide">
              Peako
            </div>
            <div className="text-white font-extrabold text-[22px] leading-none tabular-nums mt-0.5">
              9:41
            </div>
          </div>

          {/* Mood sign bubble (shown when unread) */}
          {hasSign ? (
            <motion.div
              key={mood.label}
              initial={{ scale: 0, rotate: -20, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 480, damping: 18 }}
              className="absolute left-1/2 bottom-4 -translate-x-1/2"
            >
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${mood.color} grid place-items-center text-[28px] shadow-card ring-4 ring-white/20`}
                aria-label={`Peako is feeling ${mood.label}`}
              >
                <span>{mood.emoji}</span>
              </div>
              <div className="mt-1 text-center text-[9px] font-bold uppercase tracking-wider text-white/70">
                {mood.label}
              </div>
            </motion.div>
          ) : (
            <div className="absolute inset-x-0 bottom-4 text-center text-white/40 text-[9px] font-semibold uppercase tracking-widest">
              Quiet
            </div>
          )}
        </div>
      </div>

      {/* Side buttons */}
      <div className="absolute -right-[2px] top-10 w-[2px] h-8 bg-slate-700 rounded-r" />
      <div className="absolute -left-[2px] top-7 w-[2px] h-5 bg-slate-700 rounded-l" />
      <div className="absolute -left-[2px] top-16 w-[2px] h-10 bg-slate-700 rounded-l" />

      {/* Unread badge */}
      {unread > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 20 }}
          className="absolute -top-1.5 -right-1.5 min-w-[22px] h-[22px] px-1.5 rounded-full bg-rose-500 text-white text-[12px] font-extrabold grid place-items-center ring-2 ring-white shadow-card"
        >
          {unread > 9 ? '9+' : unread}
        </motion.span>
      )}

      {/* Subtle pulse when there's a sign */}
      {hasSign && (
        <motion.div
          className="absolute inset-0 rounded-[22px] pointer-events-none"
          initial={{ boxShadow: '0 0 0 0 rgba(244,63,94,0.5)' }}
          animate={{
            boxShadow: [
              '0 0 0 0 rgba(244,63,94,0.5)',
              '0 0 0 12px rgba(244,63,94,0)',
              '0 0 0 0 rgba(244,63,94,0)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
        />
      )}
    </motion.button>
  );
}

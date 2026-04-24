import { motion } from 'framer-motion';
import { Flame, Gem, ChevronRight, Plus } from 'lucide-react';
import PeakoMascot from '../components/PeakoMascot.jsx';
import PeakoPhone from '../components/PeakoPhone.jsx';
import { StatChip } from '../components/ui.jsx';
import { GAMES_BY_ID, getPostMood } from '../peakoData.js';

function SpeechBubble({ children }) {
  return (
    <div className="relative">
      <div className="bg-white rounded-2xl shadow-card border border-slate-100 px-4 py-3">
        <p className="text-[15px] font-semibold leading-snug text-slate-800">
          {children}
        </p>
      </div>
      {/* Tail pointing down-left toward the mascot */}
      <div className="absolute -bottom-2 left-8 w-4 h-4 bg-white border-r border-b border-slate-100 rotate-45" />
    </div>
  );
}

function ChallengeBanner({ todayChallenges, onOpen, restDay, allDoneOrSkipped }) {
  const doneCount = todayChallenges.filter((c) => c.status === 'done').length;
  const skippedCount = todayChallenges.filter((c) => c.status === 'skipped').length;
  const remaining = todayChallenges.length - doneCount - skippedCount;

  if (restDay) {
    return (
      <div className="rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-200 px-4 py-3.5">
        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
          Today
        </div>
        <div className="mt-0.5 text-[17px] font-extrabold text-slate-700">
          Rest day
        </div>
      </div>
    );
  }

  const label = allDoneOrSkipped
    ? 'All done'
    : remaining === todayChallenges.length
    ? 'Three challenges'
    : `${remaining} left`;

  const subtitle = allDoneOrSkipped
    ? 'Streak secured. Review →'
    : 'Tap to start →';

  return (
    <motion.button
      onClick={onOpen}
      whileTap={{ scale: 0.98 }}
      whileHover={{ y: -1 }}
      className="w-full text-left rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 text-white shadow-phone px-4 py-3.5 flex items-center gap-3 active:shadow-card transition-shadow"
    >
      <div className="flex-1 min-w-0">
        <div className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/70">
          Today · Challenge
        </div>
        <div className="mt-0.5 text-[22px] font-extrabold leading-tight">
          {label}
        </div>
        <div className="text-[12px] text-white/80 font-medium">{subtitle}</div>
      </div>

      {/* Mini emoji row of the 3 challenges */}
      <div className="flex items-center gap-1.5">
        {todayChallenges.map((c, i) => {
          const g = GAMES_BY_ID[c.gameId];
          const isDone = c.status === 'done';
          const isSkip = c.status === 'skipped';
          return (
            <div
              key={i}
              className={`w-9 h-9 rounded-xl grid place-items-center text-[18px] ${
                isDone
                  ? 'bg-white/90 text-emerald-600'
                  : isSkip
                  ? 'bg-white/25 text-white/60'
                  : 'bg-white/20 text-white'
              }`}
            >
              <span>{isDone ? '✓' : isSkip ? '–' : g.emoji}</span>
            </div>
          );
        })}
      </div>

      <ChevronRight className="w-5 h-5 shrink-0 text-white/70" />
    </motion.button>
  );
}

function buildNag({ restDay, allDoneOrSkipped, anyDone, remaining }) {
  if (restDay) return "You get today off. Don't get used to it.";
  if (allDoneOrSkipped) return "All three. Done. Almost impressive.";
  if (anyDone && remaining === 1) return "One left. Don't fumble it now.";
  if (anyDone) return "Keep going. I'm watching.";
  return "Three challenges. Don't embarrass me.";
}

export default function Today({
  state,
  onOpenFeed,
  onOpenLog,
  onOpenChallenges,
}) {
  const { streak, coins, unread, todayChallenges, restDay, posts } = state;

  const allDoneOrSkipped = todayChallenges.every(
    (c) => c.status === 'done' || c.status === 'skipped'
  );
  const anyDone = todayChallenges.some((c) => c.status === 'done');
  const remaining = todayChallenges.filter((c) => c.status === 'pending').length;

  const latestPost = posts?.[0];
  const mood = unread > 0 ? getPostMood(latestPost) : null;
  const nag = buildNag({ restDay, allDoneOrSkipped, anyDone, remaining });

  return (
    <div className="absolute inset-0 isolate flex flex-col bg-slate-50">
      {/* Compact stats row */}
      <div className="px-5 pt-3 pb-2 flex items-center gap-2">
        <StatChip icon={Flame} value={streak} suffix="Days" color="orange" />
        <StatChip icon={Gem} value={coins} suffix="Coins" color="sky" />
      </div>

      {/* Prominent challenge banner */}
      <div className="px-4 pt-1 pb-3">
        <ChallengeBanner
          todayChallenges={todayChallenges}
          onOpen={onOpenChallenges}
          restDay={restDay}
          allDoneOrSkipped={allDoneOrSkipped}
        />
      </div>

      {/* Scene: mascot + phone in the center */}
      <div className="flex-1 relative overflow-hidden">
        {/* Soft stage background */}
        <div className="absolute inset-0">
          <div className="absolute inset-x-8 top-10 bottom-28 rounded-[48px] bg-gradient-to-br from-white via-slate-50 to-slate-100 border border-slate-200/60 shadow-card" />
          <div className="absolute inset-x-16 top-20 bottom-40 rounded-[40px] bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.08),transparent_60%)]" />
        </div>

        {/* Speech bubble */}
        <div className="relative z-10 mx-auto mt-5 max-w-[280px] px-4">
          <SpeechBubble>{nag}</SpeechBubble>
        </div>

        {/* Mascot + Phone */}
        <div className="relative z-10 mt-6 flex items-end justify-center gap-4 px-6">
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <PeakoMascotStage size={168} />
          </motion.div>

          <div className="pb-2">
            <PeakoPhone mood={mood} unread={unread} onClick={onOpenFeed} />
          </div>
        </div>

        {/* Caption */}
        <div className="relative z-10 mt-4 text-center">
          <p className="text-[11px] text-slate-400">
            Mascot placeholder — final art TBD
          </p>
          {mood ? (
            <p className="mt-1 text-[12px] text-slate-600 font-medium">
              Peako just posted · tap the phone
            </p>
          ) : (
            <p className="mt-1 text-[12px] text-slate-400">
              Peako is quiet… for now
            </p>
          )}
        </div>
      </div>

      {/* Floating log button */}
      <motion.button
        whileTap={{ scale: 0.92 }}
        whileHover={{ y: -1 }}
        onClick={onOpenLog}
        className="absolute right-5 bottom-[110px] w-14 h-14 rounded-full bg-gradient-to-br from-fuchsia-500 via-rose-500 to-orange-400 text-white shadow-phone grid place-items-center z-20"
        aria-label="Log something"
      >
        <Plus className="w-7 h-7" strokeWidth={2.6} />
      </motion.button>
    </div>
  );
}

// Bigger, scene-sized mascot (still placeholder art).
function PeakoMascotStage({ size = 160 }) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Shadow on the ground */}
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-[50%] bg-slate-900/10 blur-md"
        style={{ width: size * 0.7, height: size * 0.08, bottom: -size * 0.02 }}
      />
      <PeakoMascot size={size} ring={false} className="!rounded-[36%]" />
      {/* Mouth-ish hint that he's talking */}
      <div
        className="absolute left-1/2 -translate-x-1/2 bg-white/70 rounded-full"
        style={{ bottom: size * 0.28, width: size * 0.08, height: size * 0.04 }}
      />
    </div>
  );
}

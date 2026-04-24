import { motion } from 'framer-motion';
import { ChevronLeft, Lock, Repeat2, Play, SkipForward, Check } from 'lucide-react';
import { GAMES_BY_ID } from '../peakoData.js';

function ChallengeCard({
  idx,
  game,
  status,
  active,
  onStart,
  onSwap,
  onSkip,
  swapsLeft,
  skipsLeft,
}) {
  const locked = status === 'locked' || (!active && status === 'pending');
  const done = status === 'done';
  const skipped = status === 'skipped';

  const typeLabel =
    game.type === 'timer'
      ? `${game.duration}s`
      : game.type === 'counter'
      ? `${game.target} ${game.unit}`
      : `${game.steps.length} moves`;

  const diffColor = {
    easy:   'bg-emerald-100 text-emerald-700',
    medium: 'bg-amber-100 text-amber-700',
    hard:   'bg-rose-100 text-rose-700',
  }[game.difficulty];

  return (
    <motion.div
      layout
      className={`rounded-2xl border ${
        active ? 'bg-white border-slate-200 shadow-card' : 'bg-white/60 border-slate-100'
      } overflow-hidden`}
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div
            className={`w-12 h-12 shrink-0 rounded-xl grid place-items-center text-2xl ${
              active ? 'bg-gradient-to-br from-slate-900 to-slate-700 text-white' : 'bg-slate-100'
            }`}
          >
            <span>{done ? '✅' : skipped ? '⏭️' : game.emoji}</span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Challenge {idx + 1} of 3
              </span>
              {done && <span className="text-[11px] font-bold text-emerald-600">Done</span>}
              {skipped && <span className="text-[11px] font-bold text-slate-500">Skipped</span>}
            </div>
            <h3
              className={`mt-0.5 text-[17px] font-bold ${
                locked ? 'text-slate-500' : 'text-slate-900'
              }`}
            >
              {locked ? '???' : game.name}
            </h3>
            {!locked && (
              <div className="mt-1 flex items-center gap-2 text-[12px] text-slate-500">
                <span className={`px-2 py-0.5 rounded-full font-semibold ${diffColor}`}>
                  {game.difficulty}
                </span>
                <span>•</span>
                <span>{typeLabel}</span>
                <span>•</span>
                <span className="capitalize">{game.category}</span>
              </div>
            )}
            {locked && (
              <div className="mt-1 flex items-center gap-1.5 text-[12px] text-slate-400">
                <Lock className="w-3.5 h-3.5" />
                <span>Unlocks after challenge {idx}</span>
              </div>
            )}
          </div>
        </div>

        {active && (
          <div className="mt-4 flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={onStart}
              className="flex-1 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-bold text-[15px] shadow-card flex items-center justify-center gap-1.5"
            >
              <Play className="w-4 h-4" fill="currentColor" />
              Start
            </motion.button>
            <button
              onClick={onSwap}
              disabled={swapsLeft <= 0}
              className="h-11 px-3 rounded-xl bg-slate-100 text-slate-700 font-semibold text-[13px] flex items-center gap-1 disabled:opacity-40 active:scale-95"
            >
              <Repeat2 className="w-4 h-4" />
              Swap
            </button>
            <button
              onClick={onSkip}
              disabled={skipsLeft <= 0}
              className="h-11 px-3 rounded-xl bg-slate-100 text-slate-700 font-semibold text-[13px] flex items-center gap-1 disabled:opacity-40 active:scale-95"
            >
              <SkipForward className="w-4 h-4" />
              Skip
            </button>
          </div>
        )}

        {done && (
          <div className="mt-3 flex items-center gap-2 text-[13px] text-emerald-700 bg-emerald-50 rounded-xl px-3 py-2">
            <Check className="w-4 h-4" />
            <span className="font-semibold">+10 coins</span>
            <span className="text-emerald-600/70 truncate">— {game.done}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function Challenges({
  todayChallenges,
  swapsLeft,
  skipsLeft,
  onBack,
  onStartChallenge,
  onSwap,
  onSkip,
}) {
  const doneCount = todayChallenges.filter((c) => c.status === 'done').length;
  const skippedCount = todayChallenges.filter((c) => c.status === 'skipped').length;

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', stiffness: 380, damping: 38 }}
      className="absolute inset-0 bg-slate-50 flex flex-col"
    >
      {/* Nav bar */}
      <div className="px-2 pt-3 pb-3 bg-white/90 backdrop-blur-xl border-b border-slate-200/70 flex items-center">
        <button
          onClick={onBack}
          className="h-10 pl-2 pr-3 rounded-full flex items-center gap-1 text-slate-700 font-semibold active:scale-95 transition-transform"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-[15px]">Today</span>
        </button>
        <div className="flex-1 text-center">
          <div className="text-[15px] font-bold text-slate-900">Today's challenges</div>
          <div className="text-[11px] text-slate-500 -mt-0.5">
            {doneCount} done · {skippedCount} skipped · {3 - doneCount - skippedCount} left
          </div>
        </div>
        <div className="w-16" />
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-4 pt-4 pb-6 space-y-3">
        {todayChallenges.map((c, i) => {
          const game = GAMES_BY_ID[c.gameId];
          const isActive =
            c.status === 'pending' &&
            todayChallenges.slice(0, i).every((p) => p.status !== 'pending');
          return (
            <ChallengeCard
              key={c.gameId + i}
              idx={i}
              game={game}
              status={isActive ? 'active' : c.status === 'pending' ? 'locked' : c.status}
              active={isActive}
              onStart={() => onStartChallenge(i)}
              onSwap={() => onSwap(i)}
              onSkip={() => onSkip(i)}
              swapsLeft={swapsLeft}
              skipsLeft={skipsLeft}
            />
          );
        })}

        <div className="flex items-center justify-between text-[12px] text-slate-500 px-1 pt-1">
          <span>
            <span className="font-semibold text-slate-700">{swapsLeft}</span> swaps left today
          </span>
          <span>
            <span className="font-semibold text-slate-700">{skipsLeft}</span> skips left this month
          </span>
        </div>
      </div>
    </motion.div>
  );
}

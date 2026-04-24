import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { PhoneFrame, StatusBar, TabBar } from './components/ui.jsx';
import Today from './screens/Today.jsx';
import Progress from './screens/Progress.jsx';
import You from './screens/You.jsx';
import Feed from './screens/Feed.jsx';
import Challenges from './screens/Challenges.jsx';
import LogSheet from './screens/LogSheet.jsx';
import ChallengeModal from './screens/ChallengeModal.jsx';
import {
  GAMES_BY_ID,
  MEAL_TAGS,
  SEED_POSTS,
  SKIP_VOICE,
  SWAP_VOICE,
  TODAY_ASSIGNMENT,
} from './peakoData.js';

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const INITIAL_STATE = {
  tab: 'today',
  overlay: null,   // 'feed' | 'challenges' | null
  sheetOpen: false,
  challenge: null, // { idx, gameId }

  streak: 5,
  coins: 150,
  unread: 2,

  todayChallenges: TODAY_ASSIGNMENT.map((gameId) => ({
    gameId,
    status: 'pending', // pending | done | skipped
  })),
  swapsLeft: 3,
  skipsLeft: 5,
  restDay: false,

  posts: SEED_POSTS,

  weekStats: { healthy: 4, treat: 3, whatever: 1, total: 8 },
  lifetime: { challenges: 47, logs: 62, daysActive: 23, swaps: 9 },

  roastLevel: 'classic',
  difficulty: 'normal',
  restDayPref: 'auto',
  notifications: true,
};

export default function PeakoPrototype() {
  const [state, setState] = useState(INITIAL_STATE);

  const patch = (p) => setState((s) => ({ ...s, ...p }));

  /* ---------------- Feed ---------------- */
  const openFeed = () => patch({ overlay: 'feed', unread: 0 });
  const closeFeed = () => patch({ overlay: null });

  /* ---------------- Challenges list ---------------- */
  const openChallenges = () => patch({ overlay: 'challenges' });
  const closeChallenges = () => patch({ overlay: null });
  const refreshFeed = () => {
    const filler = {
      id: `idle-${Date.now()}`,
      kind: 'idle',
      text: pick([
        'Still here. Still judging.',
        "I've been watching. It's been… a time.",
        "Pull-to-refresh? Fine. Here's a vibe check: questionable.",
      ]),
      imageLabel: '👀 Observing',
      imageClass: 'bg-gradient-to-br from-fuchsia-400 via-pink-500 to-rose-500',
      createdAt: Date.now(),
      likes: Math.floor(Math.random() * 20) + 3,
    };
    setState((s) => ({ ...s, posts: [filler, ...s.posts] }));
  };

  const addPost = (post) => {
    setState((s) => ({
      ...s,
      posts: [{ ...post, id: `p-${Date.now()}`, createdAt: Date.now(), likes: Math.floor(Math.random() * 20) + 3 }, ...s.posts],
      unread: s.overlay === 'feed' ? 0 : s.unread + 1,
    }));
  };

  /* ---------------- Log sheet ---------------- */
  const openLog = () => patch({ sheetOpen: true });
  const closeLog = () => patch({ sheetOpen: false });

  const submitLog = (entry) => {
    if (entry.kind === 'meal') {
      const t = MEAL_TAGS[entry.tag];
      addPost({
        text: pick(t.voice),
        imageLabel: t.imageLabel,
        imageClass: t.imageClass,
        tag: t.label,
      });
      setState((s) => ({
        ...s,
        coins: s.coins + t.coins,
        weekStats: {
          ...s.weekStats,
          total: s.weekStats.total + 1,
          healthy: s.weekStats.healthy + (entry.tag === 'healthy' ? 1 : 0),
          treat: s.weekStats.treat + (entry.tag === 'treat' ? 1 : 0),
          whatever: s.weekStats.whatever + (entry.tag === 'whatever' ? 1 : 0),
        },
        lifetime: { ...s.lifetime, logs: s.lifetime.logs + 1 },
      }));
    } else {
      addPost({
        text: `"${entry.text}" — noted. Filed under "Concerning."`,
        imageLabel: '📝 Other',
        imageClass: 'bg-gradient-to-br from-indigo-300 via-purple-400 to-fuchsia-500',
        tag: 'Other',
      });
    }
  };

  /* ---------------- Challenges ---------------- */
  const startChallenge = (idx) => {
    const entry = state.todayChallenges[idx];
    if (!entry) return;
    patch({ challenge: { idx, gameId: entry.gameId } });
  };
  const closeChallenge = () => patch({ challenge: null });

  const completeChallenge = () => {
    const { idx, gameId } = state.challenge ?? {};
    if (idx == null) return;
    const game = GAMES_BY_ID[gameId];

    setState((s) => {
      const next = s.todayChallenges.map((c, i) =>
        i === idx ? { ...c, status: 'done' } : c
      );
      const doneCount = next.filter((c) => c.status === 'done').length;
      const allDone = next.every((c) => c.status === 'done' || c.status === 'skipped');
      const coinsGained = 10 + (allDone && doneCount === 3 ? 10 : 0);
      return {
        ...s,
        todayChallenges: next,
        coins: s.coins + coinsGained,
        lifetime: { ...s.lifetime, challenges: s.lifetime.challenges + 1 },
      };
    });

    // Queue a post about the completion.
    addPost({
      text: `${game.done} (${game.name})`,
      imageLabel: `${game.emoji} ${game.name}`,
      imageClass: 'bg-gradient-to-br from-sky-400 via-indigo-500 to-purple-600',
      tag: 'Challenge',
    });
  };

  const swapChallenge = (idx) => {
    if (state.swapsLeft <= 0) return;
    // Pick another game of same archetype not already used today.
    const current = GAMES_BY_ID[state.todayChallenges[idx].gameId];
    const used = new Set(state.todayChallenges.map((c) => c.gameId));
    const alt = Object.values(GAMES_BY_ID).find(
      (g) => g.type === current.type && !used.has(g.id)
    );
    if (!alt) return;
    setState((s) => ({
      ...s,
      swapsLeft: s.swapsLeft - 1,
      todayChallenges: s.todayChallenges.map((c, i) =>
        i === idx ? { ...c, gameId: alt.id } : c
      ),
      lifetime: { ...s.lifetime, swaps: s.lifetime.swaps + 1 },
    }));
    addPost({
      text: pick(SWAP_VOICE) + ` (${current.name} → ${alt.name})`,
      imageLabel: '🔁 Swap',
      imageClass: 'bg-gradient-to-br from-amber-300 via-orange-400 to-rose-500',
      tag: 'Swap',
    });
  };

  const skipChallenge = (idx) => {
    if (state.skipsLeft <= 0) return;
    const game = GAMES_BY_ID[state.todayChallenges[idx].gameId];
    setState((s) => ({
      ...s,
      skipsLeft: s.skipsLeft - 1,
      coins: Math.max(0, s.coins - 5),
      todayChallenges: s.todayChallenges.map((c, i) =>
        i === idx ? { ...c, status: 'skipped' } : c
      ),
    }));
    addPost({
      text: `${pick(SKIP_VOICE)} (${game.name})`,
      imageLabel: '⏭️ Skipped',
      imageClass: 'bg-gradient-to-br from-slate-400 via-slate-500 to-slate-700',
      tag: 'Skip',
    });
  };

  /* ---------------- Render ---------------- */
  const currentGame =
    state.challenge && GAMES_BY_ID[state.challenge.gameId];

  return (
    <div className="font-ios">
      <PhoneFrame>
        <StatusBar />

        {/* Main content area (below status bar, above tab bar) */}
        <div className="absolute inset-x-0 top-11 bottom-0">
          {state.tab === 'today' && (
            <Today
              state={state}
              onOpenFeed={openFeed}
              onOpenLog={openLog}
              onOpenChallenges={openChallenges}
            />
          )}
          {state.tab === 'progress' && <Progress state={state} />}
          {state.tab === 'you' && (
            <You state={state} onChange={(p) => patch(p)} />
          )}

          <TabBar tab={state.tab} onChange={(t) => patch({ tab: t })} />

          {/* Feed overlay */}
          <AnimatePresence>
            {state.overlay === 'feed' && (
              <Feed
                posts={state.posts}
                onBack={closeFeed}
                onPullRefresh={refreshFeed}
              />
            )}
          </AnimatePresence>

          {/* Challenges list overlay */}
          <AnimatePresence>
            {state.overlay === 'challenges' && (
              <Challenges
                todayChallenges={state.todayChallenges}
                swapsLeft={state.swapsLeft}
                skipsLeft={state.skipsLeft}
                onBack={closeChallenges}
                onStartChallenge={startChallenge}
                onSwap={swapChallenge}
                onSkip={skipChallenge}
              />
            )}
          </AnimatePresence>

          {/* Log sheet */}
          <AnimatePresence>
            {state.sheetOpen && (
              <LogSheet onClose={closeLog} onSubmit={submitLog} />
            )}
          </AnimatePresence>

          {/* Challenge full-screen modal */}
          <AnimatePresence>
            {state.challenge && currentGame && (
              <ChallengeModal
                game={currentGame}
                challengeIdx={state.challenge.idx}
                totalChallenges={state.todayChallenges.length}
                onClose={closeChallenge}
                onComplete={completeChallenge}
              />
            )}
          </AnimatePresence>
        </div>
      </PhoneFrame>
    </div>
  );
}

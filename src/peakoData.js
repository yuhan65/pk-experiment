// Static data driving the prototype. Voice lines come straight from the design
// docs (Peako_Design_Brief.md §3 and Peako_Games.md).

export const GAMES = [
  {
    id: 'squat',
    name: 'Squat Holdup',
    type: 'counter',
    target: 20,
    unit: 'reps',
    difficulty: 'easy',
    category: 'strength',
    emoji: '🦵',
    hook: "Squats. Simple. Don't complicate it.",
    mid: ['Keep going. I am watching.', "Halfway. Don't quit on me now."],
    done: "Fine. That was… fine. I'll allow it.",
  },
  {
    id: 'pushup',
    name: 'Pushup Punishment',
    type: 'counter',
    target: 10,
    unit: 'reps',
    difficulty: 'medium',
    category: 'strength',
    emoji: '💪',
    hook: "If you do these on your knees, I won't tell anyone. I'll just know.",
    mid: ['Arms shaking already? Interesting.', 'Five left. Finish what you started.'],
    done: 'Ten pushups. A real athlete. Almost.',
  },
  {
    id: 'lunge',
    name: 'Lunge Line',
    type: 'counter',
    target: 16,
    unit: 'reps',
    difficulty: 'medium',
    category: 'strength',
    emoji: '🚶',
    hook: 'Both legs. Yes, both. I can see you.',
    mid: ['Alternate. ALTERNATE.', 'Eight down. Eight to go. Math.'],
    done: 'Legs. Used. Acceptable.',
  },
  {
    id: 'burpee',
    name: 'Burpee Breakdown',
    type: 'counter',
    target: 8,
    unit: 'reps',
    difficulty: 'hard',
    category: 'strength',
    emoji: '🔥',
    hook: 'Burpees. The exercise people pretend to like. Begin.',
    mid: ["You chose this. Well, I chose this. For you.", 'Three left. Dig.'],
    done: "Burpees done. I'm mildly impressed. Don't tell anyone.",
  },
  {
    id: 'calf',
    name: 'Calf Raise Riot',
    type: 'counter',
    target: 25,
    unit: 'reps',
    difficulty: 'easy',
    category: 'strength',
    emoji: '🦿',
    hook: "The easy one. Don't blow it.",
    mid: ['Up. Down. Up. Down. Riveting.', 'Ten left. Stay with me.'],
    done: 'Twenty-five calves. That is in fact a thing.',
  },
  {
    id: 'plank',
    name: 'Plank Patience',
    type: 'timer',
    duration: 30,
    unit: 's',
    difficulty: 'medium',
    category: 'endurance',
    emoji: '🧘',
    hook: '30 seconds. You can read a tweet. You can hold a plank. Prove me wrong.',
    mid: ["10 more seconds. I've seen tectonic plates move faster.", 'Halfway. Breathe.'],
    done: "Plank held. I'm almost proud.",
  },
  {
    id: 'wallsit',
    name: 'Wall Sit Woe',
    type: 'timer',
    duration: 45,
    unit: 's',
    difficulty: 'medium',
    category: 'endurance',
    emoji: '🧱',
    hook: 'Find a wall. Lean. Suffer. That is it. That is the game.',
    mid: ['Quads on fire? Good.', '15 seconds left. Do not sit. Do not stand. Suffer.'],
    done: 'Wall sat. Legs regret it. I do not.',
  },
  {
    id: 'highknees',
    name: 'High-Knees Havoc',
    type: 'timer',
    duration: 30,
    unit: 's',
    difficulty: 'easy',
    category: 'endurance',
    emoji: '🏃',
    hook: "Run in place. Aggressively. Like you're late for something important.",
    mid: ['Knees UP. Not shuffling. UP.', 'Ten seconds. Sprint it.'],
    done: "Thirty seconds of chaos. I'll take it.",
  },
  {
    id: 'morning',
    name: 'Morning Thaw',
    type: 'guided',
    difficulty: 'easy',
    category: 'flexibility',
    emoji: '☀️',
    hook: 'Wake up. Slowly. Like a Victorian lady.',
    steps: [
      { name: 'Neck rolls', duration: 20, cue: 'Slow circles. Both directions.' },
      { name: 'Shoulder rolls', duration: 20, cue: 'Big circles. Release.' },
      { name: 'Side bends', duration: 30, cue: 'Reach over. Breathe.' },
      { name: 'Forward fold', duration: 30, cue: 'Hinge. Soft knees.' },
      { name: 'Cat-cow', duration: 30, cue: 'Flow with the breath.' },
    ],
    done: 'Stretched. Almost a human.',
  },
  {
    id: 'evening',
    name: 'Evening Shutdown',
    type: 'guided',
    difficulty: 'easy',
    category: 'flexibility',
    emoji: '🌙',
    hook: 'Wind down. Yes, you. Not the phone. You.',
    steps: [
      { name: 'Seated twist', duration: 45, cue: 'Twist. Breathe. Twist other side.' },
      { name: 'Figure-4', duration: 45, cue: 'Hip opener. Don’t wince.' },
      { name: 'Butterfly', duration: 45, cue: 'Knees out. Spine long.' },
      { name: 'Legs up the wall', duration: 45, cue: 'Legs up. Brain off.' },
    ],
    done: 'Shut down. Sleep well. Maybe.',
  },
];

export const GAMES_BY_ID = Object.fromEntries(GAMES.map((g) => [g.id, g]));

// Today's (fake) assignment: 1 strength + 1 endurance + 1 flexibility,
// easier → harder. Deterministic for the prototype.
export const TODAY_ASSIGNMENT = ['calf', 'plank', 'morning'];

export const MEAL_TAGS = {
  healthy: {
    id: 'healthy',
    emoji: '🥗',
    label: 'Healthy',
    sub: "I'm being good",
    coins: 5,
    color: 'from-emerald-400 to-green-600',
    voice: [
      "Fine. That was… actually fine. Don't get cocky.",
      'Is that a leaf? Are we a rabbit now? Anyway, 1 point to Gryffindor.',
      'A vegetable. In this economy. Brave.',
      'I almost respect this. Almost.',
    ],
    imageLabel: '🥗 Healthy',
    imageClass: 'bg-gradient-to-br from-emerald-300 via-lime-300 to-green-500',
  },
  treat: {
    id: 'treat',
    emoji: '🍕',
    label: 'Treat',
    sub: "I'm having fun",
    coins: 2,
    color: 'from-orange-400 to-red-500',
    voice: [
      "I've calculated your 'beach body' progress. It's now scheduled for the year 2099.",
      "Pizza again? That's three this week. Are we committed to this bit or giving up entirely?",
      'Bold choice. By which I mean: predictable.',
      'The crunch you heard was my last shred of hope.',
    ],
    imageLabel: '🍕 Treat',
    imageClass: 'bg-gradient-to-br from-amber-300 via-orange-400 to-red-500',
  },
  whatever: {
    id: 'whatever',
    emoji: '🤷',
    label: 'Whatever',
    sub: "Don't make me pick",
    coins: 2,
    color: 'from-slate-400 to-slate-600',
    voice: [
      "'Whatever.' Nice dodge. What was it really, pizza?",
      "Mysterious. I'm assuming the worst.",
      'Vague. Suspicious. Logged.',
      "If it was a salad, you'd have said so. Noted.",
    ],
    imageLabel: '🤷 Whatever',
    imageClass: 'bg-gradient-to-br from-slate-300 via-slate-400 to-slate-600',
  },
};

export const SKIP_VOICE = [
  'So we are just… not doing this today? Alright. Noted. Forever.',
  "Skipped. I'll add it to the file I'm definitely not keeping on you.",
  'Skip used. You have a finite number of these. I am counting.',
];

export const SWAP_VOICE = [
  "Swapped. Don't think I didn't notice.",
  'A swap. Same shape, different suffering.',
];

export const COMPLETE_ALL_VOICE = [
  'Three for three. I will allow one smug selfie.',
  "All three done. I'm… not disappointed. Rare.",
];

export const REST_DAY_VOICE = [
  "You get today off. I'm feeling generous. Don't get used to it.",
  'Rest day. Try not to mistake this for a personality.',
];

export const SEED_POSTS = [
  {
    id: 'seed-welcome',
    kind: 'welcome',
    text: "Oh, you opened the app. That's basically a workout, right? …Right?",
    imageLabel: '👀 Observing',
    imageClass: 'bg-gradient-to-br from-fuchsia-400 via-pink-500 to-rose-500',
    tag: 'Hello',
    createdAt: Date.now() - 1000 * 60 * 60 * 3,
    likes: 42,
  },
];

// Fake streak calendar (last 30 days). 'done' all 3, 'partial' 2/3, 'rest',
// 'missed'. Right-most is today (active/partial).
export const STREAK_CALENDAR = (() => {
  const seq = [
    'done', 'done', 'partial', 'done', 'rest', 'done', 'done',
    'done', 'done', 'missed', 'done', 'partial', 'done', 'rest',
    'done', 'done', 'done', 'partial', 'done', 'done', 'rest',
    'done', 'done', 'done', 'partial', 'done', 'done', 'rest',
    'done', 'active',
  ];
  const today = new Date();
  return seq.map((state, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (seq.length - 1 - i));
    return { date: d, state };
  });
})();

// Maps a post (tag/kind) to a mood "sign" the Peako-phone flashes when the
// most recent post is unread. Kept tiny and data-driven so we can tune copy
// without touching components.
export const POST_MOODS = {
  healthy:   { emoji: '😌', color: 'from-emerald-400 to-teal-500',  label: 'smug'          },
  treat:     { emoji: '🙄', color: 'from-amber-400 to-orange-500',  label: 'unimpressed'   },
  whatever:  { emoji: '🤨', color: 'from-slate-400 to-slate-600',   label: 'suspicious'    },
  challenge: { emoji: '💪', color: 'from-sky-400 to-indigo-500',    label: 'proud'         },
  swap:      { emoji: '🔁', color: 'from-fuchsia-400 to-rose-500',  label: 'side-eye'      },
  skip:      { emoji: '😒', color: 'from-zinc-400 to-zinc-600',     label: 'disappointed'  },
  other:     { emoji: '📝', color: 'from-indigo-400 to-purple-500', label: 'noted'         },
  hello:     { emoji: '👋', color: 'from-pink-400 to-rose-500',     label: 'hello'         },
  observing: { emoji: '👀', color: 'from-fuchsia-400 to-pink-500',  label: 'watching'      },
};

export function getPostMood(post) {
  if (!post) return null;
  const key = (post.tag || '').toLowerCase();
  if (POST_MOODS[key]) return POST_MOODS[key];
  if (post.kind === 'welcome') return POST_MOODS.hello;
  if (post.kind === 'idle') return POST_MOODS.observing;
  return POST_MOODS.observing;
}

export const COIN_EVENTS = [
  { label: 'Completed Plank Patience', delta: 10, when: '2h' },
  { label: 'Logged Healthy meal', delta: 5, when: '5h' },
  { label: '3 Healthy in a row bonus', delta: 10, when: '5h' },
  { label: 'Completed Calf Raise Riot', delta: 10, when: '1d' },
  { label: 'Logged Treat meal', delta: 2, when: '1d' },
];

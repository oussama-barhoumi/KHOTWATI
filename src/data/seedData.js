export const MOCK_USERS = [
  { id: '1', name: 'Sarah Chen', username: 'sarahchen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah', bio: 'Building habits one goal at a time' },
  { id: '2', name: 'Alex Rivera', username: 'alexrivera', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex', bio: 'Fitness enthusiast | Goal crusher' },
  { id: '3', name: 'Maya Patel', username: 'mayapatel', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maya', bio: 'Learning to code' },
  { id: '4', name: 'Jordan Kim', username: 'jordankim', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan', bio: 'Meditation & mindfulness' },
  { id: '5', name: 'Taylor Brooks', username: 'taylorbrooks', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor', bio: 'Early bird runner' },
];

export const MOCK_GOALS = [
  { id: 'g1', userId: '1', title: 'Run 5K every week', description: 'Building consistency with morning runs. Week 3 going strong!', progress: 75, likes: 124, comments: 28, approves: 89, createdAt: '2025-02-15' },
  { id: 'g2', userId: '2', title: 'Learn Spanish - 30 min daily', description: 'Duolingo streak at 45 days. Can hold basic conversations now!', progress: 60, likes: 89, comments: 15, approves: 52, createdAt: '2025-02-12' },
  { id: 'g3', userId: '3', title: 'Build a portfolio website', description: 'Learning React and Tailwind. First project almost done!', progress: 40, likes: 56, comments: 22, approves: 34, createdAt: '2025-02-18' },
  { id: 'g4', userId: '4', title: 'Meditate 10 min daily', description: 'Mindfulness journey. Feeling more present each day.', progress: 90, likes: 203, comments: 41, approves: 178, createdAt: '2025-02-01' },
  { id: 'g5', userId: '5', title: 'Read 24 books this year', description: '2 books down, 22 to go. Currently: Atomic Habits', progress: 8, likes: 34, comments: 8, approves: 21, createdAt: '2025-02-19' },
];

export const MOCK_GROUPS = [
  { id: 'gr1', name: 'Morning Routines', description: 'Early birds unite! Share your AM rituals.', memberCount: 234, iconKey: 'sunrise' },
  { id: 'gr2', name: 'Fitness Goals', description: 'Get fit together. Support & accountability.', memberCount: 567, iconKey: 'dumbbell' },
  { id: 'gr3', name: 'Learn to Code', description: 'Beginners welcome. Share progress & tips.', memberCount: 189, iconKey: 'code' },
  { id: 'gr4', name: 'Mindfulness', description: 'Meditation, journaling, presence.', memberCount: 312, iconKey: 'meditate' },
];

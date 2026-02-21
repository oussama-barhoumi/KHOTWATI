import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MOCK_GOALS, MOCK_GROUPS } from '../data/seedData';

const INITIAL_GOALS = MOCK_GOALS.map((g) => ({
  ...g,
  commentList: [],
}));

const defaultAiMessages = [
  { id: 1, text: "Hey! How's your goal going?", fromMe: false, time: '10:30' },
  { id: 2, text: 'Going well! Just finished my 5K run', fromMe: true, time: '10:32' },
  { id: 3, text: "That's amazing! Keep it up!", fromMe: false, time: '10:33' },
];

const defaultChat1Messages = [
  { id: 1, text: "Hey! How's your goal going?", fromMe: false, time: '10:30' },
  { id: 2, text: 'Going well! Just finished my 5K run', fromMe: true, time: '10:32' },
  { id: 3, text: "That's amazing! Keep it up!", fromMe: false, time: '10:33' },
];

const ensureValidChatMessages = (raw) => {
  if (!raw || typeof raw !== 'object') return { ai: [...defaultAiMessages], '1': [...defaultChat1Messages] };
  const out = {};
  for (const [k, v] of Object.entries(raw)) {
    if (Array.isArray(v)) out[String(k)] = v;
  }
  if (!out.ai) out.ai = [...defaultAiMessages];
  if (!out['1']) out['1'] = [...defaultChat1Messages];
  return out;
};

export const useDataStore = create(
  persist(
    (set) => ({
      goals: INITIAL_GOALS,
      goalEngagement: {},
      groups: MOCK_GROUPS,
      stories: [],
      chatMessages: { ai: defaultAiMessages, '1': defaultChat1Messages },

      addStory: (story) =>
        set((state) => ({
          stories: [{ ...story, id: 's' + Date.now(), createdAt: new Date().toISOString() }, ...state.stories],
        })),

      addGoal: (goal) =>
        set((state) => ({
          goals: [
            {
              ...goal,
              id: 'g' + Date.now(),
              likes: 0,
              approves: 0,
              comments: 0,
              commentList: [],
              createdAt: new Date().toISOString().split('T')[0],
            },
            ...state.goals,
          ],
        })),

      updateGoal: (goalId, updates) =>
        set((state) => ({
          goals: state.goals.map((g) => (g.id === goalId ? { ...g, ...updates } : g)),
        })),

      deleteGoal: (goalId) =>
        set((state) => ({
          goals: state.goals.filter((g) => g.id !== goalId),
        })),

      updateGoalLikes: (goalId, delta) =>
        set((state) => ({
          goals: state.goals.map((g) => (g.id === goalId ? { ...g, likes: Math.max(0, g.likes + delta) } : g)),
        })),

      updateGoalApproves: (goalId, delta) =>
        set((state) => ({
          goals: state.goals.map((g) => (g.id === goalId ? { ...g, approves: Math.max(0, g.approves + delta) } : g)),
        })),

      addGoalComment: (goalId, comment) =>
        set((state) => ({
          goals: state.goals.map((g) =>
            g.id === goalId
              ? { ...g, commentList: [...(g.commentList || []), { ...comment, id: Date.now(), createdAt: comment.createdAt || 'now' }] }
              : g
          ),
        })),

      setGoalEngagement: (goalId, { liked, approved }) =>
        set((state) => ({
          goalEngagement: {
            ...state.goalEngagement,
            [goalId]: { ...state.goalEngagement[goalId], liked, approved },
          },
        })),

      addGroup: (group) =>
        set((state) => ({
          groups: [
            ...state.groups,
            { ...group, id: 'gr' + Date.now(), memberCount: 1, iconKey: group.iconKey || 'sunrise' },
          ],
        })),

      addChatMessage: (chatId, message) =>
        set((state) => {
          const key = String(chatId || 'ai');
          const msgs = state.chatMessages && typeof state.chatMessages === 'object' ? state.chatMessages : {};
          const prev = Array.isArray(msgs[key]) ? msgs[key] : [];
          const newMsg = { ...message, id: message.id || Date.now(), fromMe: message.fromMe ?? true, time: message.time ?? 'now' };
          return { chatMessages: { ...msgs, [key]: [...prev, newMsg] } };
        }),

      setChatMessages: (chatId, messages) =>
        set((state) => {
          const key = String(chatId || 'ai');
          const msgs = state.chatMessages && typeof state.chatMessages === 'object' ? state.chatMessages : {};
          const arr = Array.isArray(messages) ? messages : [];
          return { chatMessages: { ...msgs, [key]: arr } };
        }),
    }),
    {
      name: 'khotwa-data',
      partialize: (s) => ({ goals: s.goals, goalEngagement: s.goalEngagement, groups: s.groups, stories: s.stories, chatMessages: s.chatMessages }),
      merge: (persisted, current) => {
        const p = persisted || {};
        const goals = Array.isArray(p.goals)
          ? p.goals.map((g) => ({
              ...g,
              likes: Number(g.likes) || 0,
              approves: Number(g.approves) || 0,
              comments: Number(g.comments) || 0,
              commentList: Array.isArray(g.commentList) ? g.commentList : [],
            }))
          : current.goals;
        const groups = Array.isArray(p.groups) && p.groups.length > 0 ? p.groups : (Array.isArray(current.groups) && current.groups.length > 0 ? current.groups : MOCK_GROUPS);
        return {
          ...current,
          goals,
          goalEngagement: p.goalEngagement && typeof p.goalEngagement === 'object' ? p.goalEngagement : current.goalEngagement,
          groups,
          stories: Array.isArray(p.stories) ? p.stories : current.stories,
          chatMessages: ensureValidChatMessages(p.chatMessages),
        };
      },
    }
  )
);

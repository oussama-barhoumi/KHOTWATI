import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MOCK_USERS } from '../../../data/seedData';
import { CreateStory } from './CreateStory';
import { useAppStore } from '../../../store/UseAppStore';
import { useDataStore } from '../../../store/UseDataStore';
import { IconClose } from '../../../constant/icon/Icon';

export function Stories() {
  const user = useAppStore((s) => s.user);
  const stories = useDataStore((s) => s.stories);
  const [viewingStory, setViewingStory] = useState(null);

  const usersWithStories = [];
  const seen = new Set();
  stories.forEach((s) => {
    if (!seen.has(s.userId)) {
      seen.add(s.userId);
      usersWithStories.push({
        ...s,
        stories: stories.filter((st) => st.userId === s.userId),
      });
    }
  });

  return (
    <div className="mb-6 overflow-x-auto scrollbar-hide -mx-4 px-4">
      <div className="flex gap-4 pb-2">
        {user && <CreateStory />}
        {usersWithStories.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="shrink-0 flex flex-col items-center cursor-pointer group"
            onClick={() => setViewingStory(item)}
          >
            <div className="relative">
              <div className="w-16 h-16 rounded-full p-0.75 bg-linear-to-br from-accent to-accent-light group-hover:scale-105 transition-transform">
                <img
                  src={item.userAvatar}
                  alt={item.userName}
                  className="w-full h-full rounded-full object-cover border-2 border-white dark:border-charcoal"
                />
              </div>
            </div>
            <span className="mt-1 text-xs text-charcoal dark:text-white truncate max-w-18">{item.userUsername}</span>
          </motion.div>
        ))}
        {usersWithStories.length === 0 &&
          MOCK_USERS.map((u, i) => (
            <motion.div
              key={u.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: (usersWithStories.length + i) * 0.05 }}
              className="shrink-0 flex flex-col items-center cursor-pointer group opacity-60"
            >
              <div className="relative">
                <div className="w-16 h-16 rounded-full p-0.75 bg-linear-to-br from-accent/50 to-accent-light/50">
                  <img
                    src={u.avatar}
                    alt={u.name}
                    className="w-full h-full rounded-full object-cover border-2 border-white dark:border-charcoal"
                  />
                </div>
              </div>
              <span className="mt-1 text-xs text-charcoal dark:text-white truncate max-w-18">{u.username}</span>
            </motion.div>
          ))}
      </div>

      <AnimatePresence>
        {viewingStory && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-[200]"
              onClick={() => setViewingStory(null)}
            />
            <div className="fixed inset-0 z-[201] flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="pointer-events-auto w-full max-w-sm aspect-[9/16] max-h-[85vh] rounded-2xl overflow-hidden bg-black relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setViewingStory(null)}
                  className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70"
                  aria-label="Close"
                >
                  <IconClose className="w-5 h-5" />
                </button>
                <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
                  <img
                    src={viewingStory.userAvatar}
                    alt=""
                    className="w-8 h-8 rounded-full object-cover border-2 border-white"
                  />
                  <span className="text-white text-sm font-medium">{viewingStory.userName}</span>
                </div>
                <img
                  src={viewingStory.imageUrl}
                  alt="Story"
                  className="w-full h-full object-contain"
                />
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

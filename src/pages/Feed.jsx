import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Stories } from '../components/feed/partials/Stories';
import { GoalPost } from '../components/feed/partials/GoalPost';
import { CreateGoal } from '../components/feed/partials/CreateGoal';
import { SuggestedUsers } from '../components/feed/partials/SuggestedUsers';
import { useAppStore } from '../store/UseAppStore';
import { useDataStore } from '../store/UseDataStore';
import { calculateTokens } from '../utils/Token';
import { GlassNavbar } from '../layout/GlassNavbar';
import { FloatingSidebar } from '../layout/FloatingSidebar';
import { IconToken } from '../constant/icon/Icon';

export function Feed() {
  const user = useAppStore((s) => s.user);
  const suggestedUsersVisible = useAppStore((s) => s.suggestedUsersVisible ?? true);
  const setSuggestedUsersVisible = useAppStore((s) => s.setSuggestedUsersVisible);
  const goals = useDataStore((s) => s.goals);
  const addGoal = useDataStore((s) => s.addGoal);

  const [showModal, setShowModal] = useState(false);

  const totalTokens = goals.reduce((acc, g) => {
    const commentCount = g.comments + (g.commentList?.length || 0);
    return acc + calculateTokens(g.likes, commentCount, g.approves);
  }, 0);

  const handleGoalCreated = (newGoal) => {
    addGoal({
      ...newGoal,
      userId: user?.id || '1',
      userName: user?.name,
      userAvatar: user?.avatar,
      userUsername: user?.username,
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-beige-50 via-beige-100 to-beige-200 dark:from-bg-dark dark:via-charcoal dark:to-bg-dark relative">
      <GlassNavbar />
      <FloatingSidebar />

      <div className="pt-20 pb-24 md:pb-12 md:pl-24">
        <div className="max-w-4xl mx-auto px-4 md:px-8">

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex items-center justify-between"
          >
            <h1 className="text-2xl font-bold text-charcoal dark:text-white">
              Feed
            </h1>

            <div className="flex items-center gap-2 px-4 py-2 rounded-[20px] bg-accent/10 dark:bg-accent/20 text-accent font-medium">
              <IconToken className="w-5 h-5" />
              <span>{totalTokens} tokens</span>
            </div>
          </motion.div>

          <Stories />

          <CreateGoal
            onGoalCreated={(goal) => {
              if (!user) {
                setShowModal(true);
                return;
              }
              handleGoalCreated(goal);
            }}
          />

          <div className="space-y-4">
            {goals.map((goal, i) => (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <GoalPost goal={goal} />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="hidden lg:block fixed right-8 top-24 w-72">
          <SuggestedUsers />
          {!suggestedUsersVisible && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setSuggestedUsersVisible(true)}
              className="mt-4 px-4 py-2 rounded-[20px] bg-white/60 dark:bg-white/10 backdrop-blur-xl border border-white/25 dark:border-white/10 text-sm font-medium text-charcoal dark:text-white hover:bg-white/80 dark:hover:bg-white/15 transition-colors"
            >
              Show Suggested
            </motion.button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="w-[90%] max-w-md bg-white/60 dark:bg-white/10 backdrop-blur-xl rounded-[32px] border border-white/25 dark:border-white/10 shadow-xl p-8 text-center"
            >
              <h2 className="text-xl font-bold mb-4 text-charcoal dark:text-white">
                Login Required
              </h2>

              <p className="mb-6 text-charcoal/70 dark:text-white/70">
                You must log in to create a goal.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => (window.location.href = '/login')}
                  className="flex-1 px-4 py-2 rounded-[20px] bg-accent text-white font-medium"
                >
                  Login
                </button>

                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 rounded-[20px] bg-white/60 dark:bg-white/10 border border-white/25 dark:border-white/10"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
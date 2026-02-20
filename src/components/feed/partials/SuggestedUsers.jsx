import { motion } from 'framer-motion';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { IconClose } from '../../../components/icons';
import { MOCK_USERS } from '../../../data/seedData';
import { useAppStore } from '../../../store/useAppStore';

export function SuggestedUsers() {
  const suggestedUsersVisible = useAppStore((s) => s.suggestedUsersVisible ?? true);
  const setSuggestedUsersVisible = useAppStore((s) => s.setSuggestedUsersVisible);

  if (!suggestedUsersVisible) return null;

  return (
    <Card className="top-24 relative">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-charcoal dark:text-white">Suggested</h3>
        <button
          onClick={() => setSuggestedUsersVisible(false)}
          className="p-1 rounded-full text-charcoal-light dark:text-text-dark hover:bg-white/30 dark:hover:bg-white/10 hover:text-charcoal dark:hover:text-white transition-colors"
          title="Close"
        >
          <IconClose className="w-5 h-5" />
        </button>
      </div>
      <div className="space-y-3">
        {MOCK_USERS.slice(0, 4).map((user, i) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center gap-3"
          >
            <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm text-charcoal dark:text-white truncate">{user.name}</p>
              <p className="text-xs text-charcoal-light dark:text-text-dark truncate">@{user.username}</p>
            </div>
            <Button size="sm" variant="secondary" className="text-xs py-1.5 px-2">Follow</Button>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}

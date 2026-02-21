import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAppStore } from '../store/UseAppStore';
import { Button } from './ui/Button';

export function GoalReminderBanner() {
  const focusGoal = useAppStore((s) => s.focusGoal);
  const setFocusGoal = useAppStore((s) => s.setFocusGoal);
  const [dismissed, setDismissed] = useState(false);
  const [notificationShown, setNotificationShown] = useState(false);

  useEffect(() => {
    if (!focusGoal || dismissed) return;
    if ('Notification' in window && Notification.permission === 'granted' && !notificationShown) {
      new Notification('You have a goal!', { body: focusGoal.reminder });
      setNotificationShown(true);
    }
  }, [focusGoal, dismissed, notificationShown]);

  const requestNotificationPermission = () => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  };

  if (!focusGoal || dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="bg-accent/15 dark:bg-accent/25 border-b border-accent/30 overflow-hidden"
      >
        <div className="max-w-4xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <p className="text-charcoal dark:text-white font-medium">
            <span className="text-accent">You have a goal:</span> {focusGoal.reminder}
            {focusGoal.socialMedia?.length > 0 && (
              <span className="text-charcoal-light dark:text-text-dark text-sm ml-2">
                — Avoid: {focusGoal.socialMedia.map((u) => {
                  try { return new URL(u.startsWith('http') ? u : 'https://' + u).hostname; } catch { return u; }
                }).join(', ')}
              </span>
            )}
          </p>
          <div className="flex items-center gap-2">
            {Notification.permission === 'default' && (
              <Button variant="ghost" size="sm" onClick={requestNotificationPermission}>
                Enable reminders
              </Button>
            )}
            <button
              onClick={() => setDismissed(true)}
              className="text-charcoal-light dark:text-text-dark hover:text-charcoal dark:hover:text-white text-sm"
            >
              Dismiss
            </button>
            <Button variant="ghost" size="sm" onClick={() => setFocusGoal(null)}>
              Clear goal
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

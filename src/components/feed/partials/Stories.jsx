import { motion } from 'motion/react';
import { MOCK_USERS } from '../../../data/seedData';

export function Stories() {
  return (
    <div className="mb-6 overflow-x-auto scrollbar-hide -mx-4 px-4">
      <div className="flex gap-4 pb-2">
        {MOCK_USERS.map((user, i) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="shrink-0 flex flex-col items-center cursor-pointer group"
          >
            <div className="relative">
              <div className="w-16 h-16 rounded-full p-0.75 bg-linear-to-br from-accent to-accent-light group-hover:scale-105 transition-transform">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full rounded-full object-cover border-2 border-white dark:border-charcoal"
                />
              </div>
            </div>
            <span className="mt-1 text-xs text-charcoal dark:text-white truncate max-w-18">
              {user.username}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

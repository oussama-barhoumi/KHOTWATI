import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { IconFeed, IconUsers, IconChat, IconUser } from '../constant/icon/Icon';

const navItems = [
  { path: '/feed', Icon: IconFeed, label: 'Feed' },
  { path: '/groups', Icon: IconUsers, label: 'Groups' },
  { path: '/chat', Icon: IconChat, label: 'Chat' },
  { path: '/profile', Icon: IconUser, label: 'Profile' },
];

export function FloatingSidebar() {
  const location = useLocation();

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 md:left-6 md:translate-x-0 md:top-1/2 md:-translate-y-1/2 z-40"
    >
      <nav className="flex md:flex-col gap-2 p-2 bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-[32px] border border-white/25 dark:border-white/10 shadow-soft dark:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.3)] w-fit transition-[width] duration-300">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className="group flex md:w-13 md:hover:w-32.5 transition-[width] duration-300 ease-out md:overflow-hidden"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center justify-center md:justify-start gap-2 p-3 rounded-[20px] transition-colors w-full min-w-0 ${
                  isActive
                    ? 'bg-accent text-white'
                    : 'text-charcoal dark:text-white hover:bg-accent/15 dark:hover:bg-accent/20 hover:text-accent dark:hover:text-accent'
                }`}
                title={item.label}
              >
                <item.Icon className="w-5 h-5 shrink-0" />
                <span className="hidden md:inline-block text-sm font-medium whitespace-nowrap max-w-0 opacity-0 group-hover:max-w-28 group-hover:opacity-100 transition-all duration-300 ease-out overflow-hidden">
                  {item.label}
                </span>
              </motion.div>
            </Link>
          );
        })}
      </nav>
    </motion.aside>
  );
}

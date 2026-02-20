import { motion } from 'motion/react';

export function Card({
  children,
  className = '',
  hover = true,
  padding = true,
  glass = true,
  ...props
}) {
  const base = glass
    ? 'bg-white/60 dark:bg-[#1A1A1A] backdrop-blur-xl rounded-[28px] border border-white/25 dark:border-white/10 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.4)]'
    : 'bg-white dark:bg-[#1A1A1A] rounded-[28px] shadow-lg';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={hover ? { y: -2, transition: { duration: 0.2 } } : {}}
      className={`${base} ${padding ? 'p-6' : ''} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}

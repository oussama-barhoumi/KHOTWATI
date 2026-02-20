import { motion } from 'motion/react';
import { IconSpinner } from '../../constant/icon/Icon';

const variants = {
  tap: { scale: 0.97 },
  hover: { scale: 1.02 },
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled,
  loading,
  icon,
  ...props
}) {
  const base = 'inline-flex items-center justify-center gap-2 font-medium rounded-[28px] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  const variants_style = {
    primary: 'bg-gradient-to-r from-[#FF6600] to-[#FFBF00] hover:from-[#e65c00] hover:to-[#FFBF00] text-white focus:ring-[#FF6600] shadow-lg shadow-[#FF6600]/25',
    secondary: 'bg-white/80 dark:bg-[#262626] hover:bg-white dark:hover:bg-white/20 text-[#2d2d2d] dark:text-white border border-white/40 dark:border-white/10 focus:ring-white/50',
    ghost: 'bg-transparent hover:bg-white/50 dark:hover:bg-white/10 text-[#2d2d2d] dark:text-white focus:ring-white/30',
    danger: 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-500',
  };
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    icon: 'p-3',
  };

  return (
    <motion.button
      variants={variants}
      whileHover="hover"
      whileTap="tap"
      className={`${base} ${variants_style[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <IconSpinner className="h-5 w-5" />
      ) : (
        <>
          {icon && <span className="w-5 h-5">{icon}</span>}
          {children}
        </>
      )}
    </motion.button>
  );
}

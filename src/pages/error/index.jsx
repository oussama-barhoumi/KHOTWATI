import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const floatVariants = {
  animate: {
    y: [0, -12, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

const pulseGlowVariants = {
  animate: {
    opacity: [0.3, 0.6, 0.3],
    scale: [1, 1.05, 1],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

const cardFloatVariants = {
  animate: {
    y: [0, -18, 0],
    x: [0, 8, -6, 0],
    rotate: [-1, 1.5, -1],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: 'easeInOut',
      delay: 0.8,
    },
  },
};

export function ErrorPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-beige-50 via-beige-100 to-beige-200 dark:from-bg-dark dark:via-charcoal dark:to-bg-dark overflow-hidden relative">
      <motion.div
        variants={floatVariants}
        animate="animate"
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-accent/10 dark:bg-accent/20 blur-3xl pointer-events-none"
      />
      <motion.div
        variants={floatVariants}
        animate="animate"
        transition={{ duration: 5, delay: 0.5 }}
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent-light/10 dark:bg-accent-light/15 blur-3xl pointer-events-none"
      />
      <motion.div
        variants={pulseGlowVariants}
        animate="animate"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-accent/5 dark:bg-accent/10 blur-[100px] pointer-events-none"
      />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-lg"
        >
          <motion.div variants={itemVariants} className="w-full">
            <motion.div
              variants={cardFloatVariants}
              animate="animate"
              className="relative overflow-hidden rounded-2xl border border-white/25 dark:border-glass-border bg-white/60 dark:bg-bg-card/90 backdrop-blur-2xl shadow-soft dark:shadow-soft-dark"
            >
              <div className="absolute inset-0 bg-linear-to-br from-accent/5 via-transparent to-accent-light/5 dark:from-accent/10 dark:to-accent-light/10 pointer-events-none" />

              <div className="relative px-8 py-12 sm:px-12 sm:py-16 text-center">
                
                <motion.div
                  variants={itemVariants}
                  className="inline-flex items-center justify-center mb-6"
                >
                  <span className="px-6 py-3 rounded-xl bg-white/40 dark:bg-glass-bg backdrop-blur-xl border border-white/30 dark:border-glass-border text-6xl sm:text-8xl font-bold font-orbitron bg-linear-to-r from-accent to-accent-light bg-clip-text text-transparent">
                    404
                  </span>
                </motion.div>

                <motion.h1
                  variants={itemVariants}
                  className="text-2xl sm:text-3xl font-bold text-charcoal dark:text-white mb-3"
                >
                  Oops! Page not found
                </motion.h1>

                <motion.p
                  variants={itemVariants}
                  className="text-charcoal dark:text-text-dark mb-8 max-w-sm mx-auto"
                >
                  The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
                </motion.p>

                <motion.div
                  variants={itemVariants}
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                  <Link to="/">
                    <Button size="lg" className="min-w-45">
                      Back to Home
                    </Button>
                  </Link>
                  <Link to="/feed">
                    <Button variant="secondary" size="lg" className="min-w-45">
                      Explore Feed
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>


        </motion.div>
      </div>
    </div>
  );
}

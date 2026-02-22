import { useEffect, useState } from "react";
import { GlassNavbar } from "../../layout/GlassNavbar";
import { motion } from "motion/react";
import { Button } from "../../components/ui/Button";
import { IconTarget,IconHandshake,IconToken,IconUsers, } from "../../constant/icon/Icon";
import { Link } from "react-router-dom";
import { HiOutlinePhoto } from "react-icons/hi2";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
};
const heroStagger = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.2, delayChildren: 0.25 },
  },
};
const heroTransition = { duration: 0.9, ease: [0.22, 1, 0.36, 1] };

export const Home = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-beige-50 via-beige-100 to-beige-200 dark:from-bg-dark dark:via-charcoal dark:to-bg-dark overflow-x-hidden">
      <GlassNavbar />

      <section className="pt-28 sm:pt-36 pb-24 px-4 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 left-[10%] w-72 h-72 rounded-full bg-accent/10 dark:bg-accent/5 blur-3xl"
            animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.55, 0.35] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-40 right-[15%] w-56 h-56 rounded-full bg-accent-light/10 dark:bg-accent-light/5 blur-3xl"
            animate={{ scale: [1.15, 1, 1.15], opacity: [0.25, 0.5, 0.25] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <motion.div
          className="max-w-4xl mx-auto text-center relative"
          variants={heroStagger}
          initial="initial"
          animate={mounted ? "animate" : "initial"}
        >
          <motion.div className="glass-card dark:bg-bg-card/80 dark:border-[var(--color-glass-border)] rounded-[var(--radius-2xl)] p-8 sm:p-10 md:p-12 shadow-soft dark:shadow-soft-dark">
            <motion.p
              variants={fadeUp}
              transition={heroTransition}
              className="text-sm font-medium uppercase tracking-widest text-accent dark:text-accent-light mb-4"
            >
              Your goals, your pace
            </motion.p>
            <motion.h1
              variants={fadeUp}
              transition={heroTransition}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-charcoal dark:text-white mb-6 leading-tight"
            >
              Share your goals.{" "}
              <span className="bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
                Start today.
              </span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              transition={heroTransition}
              className="text-lg sm:text-xl text-charcoal dark:text-text-dark mb-4 max-w-2xl mx-auto leading-relaxed"
            >
              You’re one step away from the life you want. Share what matters, get support from people who get you, and make it happen.
            </motion.p>
            <motion.p
              variants={fadeUp}
              transition={heroTransition}
              className="text-base text-charcoal-light dark:text-text-dark mb-10 max-w-xl mx-auto"
            >
              Build your community your way. Create groups, share stories, and enjoy the journey—every day.
            </motion.p>
            <motion.div
              variants={fadeUp}
              transition={heroTransition}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/signup">
                <Button size="lg" className="min-w-[180px]">
                  Get started free
                </Button>
              </Link>
              <Link to="/feed">
                <Button variant="secondary" size="lg" className="min-w-[180px]">
                  Explore the feed
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      <section className="py-16 px-4">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="glass-card dark:bg-bg-card/80 dark:border-[var(--color-glass-border)] rounded-[var(--radius-2xl)] p-8 shadow-soft dark:shadow-soft-dark">
            <h2 className="text-2xl sm:text-3xl font-bold text-charcoal dark:text-white mb-4">
              What is Khotwa?
            </h2>
            <p className="text-charcoal dark:text-text-dark leading-relaxed">
              Khotwa is a place where you share your goals and feel at home. You build groups and communities your way, create stories that inspire, and get real support. It’s your space for a better experience—enjoyable and yours.
            </p>
          </div>
        </motion.div>
      </section>

      <section className="py-20 px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center text-charcoal dark:text-white mb-14"
        >
          What you can do
        </motion.h2>
        <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-6">
          {[
            {
              step: "01",
              title: "Share your goals",
              desc: "Post your goals and progress. Get likes, comments, and approval from your community.",
              Icon: IconTarget,
              delay: 0,
            },
            {
              step: "02",
              title: "Build groups & community",
              desc: "Create and join groups. Shape your community the way you want—your space, your rules.",
              Icon: IconUsers,
              delay: 0.1,
            },
            {
              step: "03",
              title: "Create stories",
              desc: "Share moments in stories. Keep people in the loop and inspire others.",
              Icon: HiOutlinePhoto,
              delay: 0.2,
            },
          ].map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: item.delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <div className="glass-card dark:bg-bg-card/80 dark:border-[var(--color-glass-border)] rounded-[var(--radius-2xl)] p-6 h-full flex flex-col items-center text-center shadow-soft dark:shadow-soft-dark">
                <motion.span
                  className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/10 dark:bg-accent/20 text-accent mb-4"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                >
                  <item.Icon className="w-7 h-7" />
                </motion.span>
                <span className="text-accent font-semibold text-sm">
                  {item.step}
                </span>
                <h3 className="text-xl font-semibold mt-2 text-charcoal dark:text-white">
                  {item.title}
                </h3>
                <p className="text-charcoal dark:text-text-dark mt-2 flex-1">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-20 px-4">
        <motion.div
          className="max-w-5xl mx-auto rounded-[var(--radius-2xl)] p-8 sm:p-10 glass-card dark:bg-bg-card/80 dark:border-[var(--color-glass-border)] shadow-soft dark:shadow-soft-dark"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-3xl font-bold text-center text-charcoal dark:text-white mb-14">
            How it works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Share your goal",
                desc: "Post your goal with a title and description. Track progress over time.",
                Icon: IconTarget,
              },
              {
                step: "02",
                title: "Get support",
                desc: "Others like, comment, and approve. Build verification through community trust.",
                Icon: IconHandshake,
              },
              {
                step: "03",
                title: "Earn tokens",
                desc: "Tokens from engagement. Bonus when verification exceeds 70%.",
                Icon: IconToken,
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="text-center"
              >
                <item.Icon className="w-12 h-12 mb-4 mx-auto text-accent" />
                <span className="text-accent font-semibold text-sm">
                  {item.step}
                </span>
                <h3 className="text-xl font-semibold mt-2 text-charcoal dark:text-white">
                  {item.title}
                </h3>
                <p className="text-charcoal dark:text-text-dark mt-2">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-md md:max-w-lg mx-auto"
        >
          <div className="glass-card dark:bg-bg-card/80 dark:border-[var(--color-glass-border)] rounded-[var(--radius-2xl)] md:p-6 p-5 text-center shadow-soft dark:shadow-soft-dark">
            <h2 className="text-2xl font-bold text-charcoal dark:text-white mb-6">
              Token system
            </h2>
            <div className="space-y-3 text-charcoal dark:text-text-dark">
              <p>• 100 likes = 10 tokens</p>
              <p>• 20 comments = 5 tokens</p>
              <p>• 10 approves = 15 tokens</p>
              <p className="text-accent font-medium">
                • Verification &gt; 70% = +25 bonus tokens
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="py-24 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="glass-card dark:bg-bg-card/80 dark:border-[var(--color-glass-border)] rounded-[var(--radius-2xl)] p-8 shadow-soft dark:shadow-soft-dark">
            <h2 className="text-3xl font-bold text-charcoal dark:text-white mb-4">
              Join Khotwa today
            </h2>
            <p className="text-charcoal-light dark:text-text-dark mb-8">
              Start sharing goals, building your community, and creating stories.
            </p>
            <Link to="/signup">
              <Button size="lg">Create account</Button>
            </Link>
          </div>
        </motion.div>
      </section>

      <footer className="border-t border-[var(--color-glass-border)] bg-[var(--color-glass-bg)] dark:bg-bg-card/40 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8">
            <div>
              <Link
                to="/"
                className="text-xl font-bold font-orbitron uppercase tracking-wider bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent"
              >
                Khotwa
              </Link>
              <p className="mt-2 text-sm text-charcoal-light dark:text-text-dark max-w-xs">
                Where you share goals and build your community. Your space, your pace.
              </p>
            </div>
            <nav className="flex flex-wrap gap-6 sm:gap-8">
              <Link
                to="/feed"
                className="text-sm font-medium text-charcoal dark:text-white hover:text-accent transition-colors"
              >
                Feed
              </Link>
              <Link
                to="/groups"
                className="text-sm font-medium text-charcoal dark:text-white hover:text-accent transition-colors"
              >
                Groups
              </Link>
              <Link
                to="/login"
                className="text-sm font-medium text-charcoal dark:text-white hover:text-accent transition-colors"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="text-sm font-medium text-charcoal dark:text-white hover:text-accent transition-colors"
              >
                Sign up
              </Link>
            </nav>
          </div>
          <div className="mt-10 pt-8 border-t border-[var(--color-glass-border)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-xs text-charcoal-light dark:text-text-dark/80">
              © {new Date().getFullYear()} Khotwa. Share goals. Build community.
            </p>
            <p className="text-xs text-charcoal-light/80 dark:text-text-dark/60">
              Khotwa.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

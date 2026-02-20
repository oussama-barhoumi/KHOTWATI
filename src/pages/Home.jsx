import { GlassNavbar } from "../layout/GlassNavbar"
import { motion } from 'motion/react'
import { Button } from '../components/ui/Button'
import { IconTarget, IconHandshake, IconToken } from '../constant/icon/Icon';
import { Card } from '../components/ui/Card';
import { Link } from 'react-router-dom';

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };

export const Home = ()=> {
  return (
    <div className="min-h-screen bg-linear-to-br from-beige-50 via-beige-100 to-beige-100 dark:from-bg-dark dark:via-charcoal dark:to-bg-dark">
      <GlassNavbar />

      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            {...fadeUp}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-charcoal dark:text-white mb-6 leading-tight"
          >
            Share goals.{' '}
            <span className="bg-linear-to-r from-accent to-accent-light bg-clip-text text-transparent">
              Get support.
            </span>
          </motion.h1>
          <motion.p
            {...fadeUp}
            transition={{ delay: 0.2 }}
            className="text-xl text-charcoal dark:text-white mb-10 max-w-2xl mx-auto"
          >
            The community that helps you achieve. Share your goals, earn tokens from engagement, and get verified approval from peers.
          </motion.p>
          <motion.div
            {...fadeUp}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/signup">
              <Button size="lg" className="min-w-50">Get Started Free</Button>
            </Link>
            <Link to="/feed">
              <Button variant="secondary" size="lg" className="min-w-50">Explore Feed</Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center text-charcoal dark:text-white mb-16"
        >
          How it works
        </motion.h2>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            { step: '01', title: 'Share your goal', desc: 'Post your goal with a title and description. Track progress over time.', Icon: IconTarget },
            { step: '02', title: 'Get support', desc: 'Others like, comment, and approve. Build verification through community trust.', Icon: IconHandshake },
            { step: '03', title: 'Earn tokens', desc: 'Tokens from engagement. Bonus when verification exceeds 70%.', Icon: IconToken },
          ].map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="text-center h-full">
                <item.Icon className="w-12 h-12 mb-4 mx-auto text-accent" />
                <span className="text-accent font-semibold text-sm">{item.step}</span>
                <h3 className="text-xl font-semibold mt-2 text-charcoal dark:text-white">{item.title}</h3>
                <p className="text-charcoal dark:text-white mt-2">{item.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <Card>
            <h2 className="text-2xl font-bold text-charcoal dark:text-white mb-6">Token System</h2>
            <div className="space-y-4 text-charcoal dark:text-white">
              <p>• 100 likes = 10 tokens</p>
              <p>• 20 comments = 5 tokens</p>
              <p>• 10 approves = 15 tokens</p>
              <p className="text-accent font-medium">• Verification &gt; 70% = +25 bonus tokens</p>
            </div>
          </Card>
        </motion.div>
      </section>

      <section className="py-24 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold text-charcoal dark:text-white mb-4">Join Khotwa today</h2>
          <p className="text-charcoal dark:text-text-dark mb-8">Start sharing goals and building your community.</p>
          <Link to="/signup">
            <Button size="lg">Create Account</Button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}

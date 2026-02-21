import { motion } from 'motion/react';
import { GlassNavbar } from '../layout/GlassNavbar';
import { FloatingSidebar } from '../layout/FloatingSidebar';
import { useAppStore } from '../store/UseAppStore';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';

export function Chat() {
  const user = useAppStore((s) => s.user);

  return (
    <div className="min-h-screen bg-linear-to-br from-beige-50 via-beige-100 to-beige-200 dark:from-bg-dark dark:via-charcoal dark:to-bg-dark">
      <GlassNavbar />
      <FloatingSidebar />

      <div className="pt-20 pb-24 md:pb-12 md:pl-24">
        <div className="max-w-2xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <div className="text-center py-12">
                <h2 className="text-xl font-bold text-charcoal dark:text-white mb-2">Chat</h2>
                <p className="text-charcoal-light dark:text-text-dark mb-6">Start conversations and connect with others.</p>
                {user ? (
                  <p className="text-sm text-charcoal dark:text-white">Chat coming soon.</p>
                ) : (
                  <Link to="/login">
                    <Button>Log in to chat</Button>
                  </Link>
                )}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

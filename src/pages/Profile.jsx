import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassNavbar } from '../components/layout/GlassNavbar';
import { FloatingSidebar } from '../components/layout/FloatingSidebar';
import { Card } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { GoalPost } from '../features/feed/components/GoalPost';
import { MOCK_USERS } from '../data/seedData';
import { useAppStore } from '../store/useAppStore';
import { useDataStore } from '../store/useDataStore';
import { calculateTokens } from '../utils/tokenLogic';

const TABS = ['Goals', 'Saved', 'Groups'];

export function Profile() {
  const [activeTab, setActiveTab] = useState('Goals');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editName, setEditName] = useState('');
  const [editNickname, setEditNickname] = useState('');
  const [editBio, setEditBio] = useState('');
  
  const user = useAppStore((s) => s.user) || MOCK_USERS[0];
  const setUser = useAppStore((s) => s.setUser);
  const goals = useDataStore((s) => s.goals);
  const myGoals = goals.filter((g) => g.userId === user?.id || g.userId === '1');
  const totalTokens = myGoals.reduce((acc, g) => {
    const commentCount = g.comments + (g.commentList?.length || 0);
    return acc + calculateTokens(g.likes, commentCount, g.approves);
  }, 0);

  useEffect(() => {
    if (editModalOpen) {
      setEditName(user?.name || '');
      setEditNickname(user?.username || '');
      setEditBio(user?.bio || '');
    }
  }, [editModalOpen, user?.name, user?.username, user?.bio]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf8f5] via-[#f5f0e8] to-[#ebe4d9] dark:from-[#141414] dark:via-[#1a1a1a] dark:to-[#141414]">
      <GlassNavbar />
      <FloatingSidebar />

      <div className="pt-20 pb-24 md:pb-12 md:pl-24">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center mb-8">
            <div className="relative">
              <img
                src={user?.avatar || MOCK_USERS[0].avatar}
                alt={user?.name}
                className="w-24 h-24 rounded-full object-cover ring-4 ring-[#FF6600]/40"/>
            </div>
            <h1 className="mt-4 text-2xl font-bold text-[#2d2d2d] dark:text-white">{user?.name || MOCK_USERS[0].name}</h1>
            <p className="text-[#3d3d3d] dark:text-[#C8C8C8]">@{user?.username || MOCK_USERS[0].username}</p>
            <p className="mt-2 text-center text-[#3d3d3d] dark:text-[#C8C8C8] max-w-md">{user?.bio || MOCK_USERS[0].bio}</p>
            <Button variant="secondary" size="sm" className="mt-4" onClick={() => setEditModalOpen(true)}>
              Edit profile
            </Button>
            <div className="flex gap-8 mt-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-[#2d2d2d] dark:text-white">{myGoals.length}</p>
                <p className="text-sm text-[#3d3d3d] dark:text-[#C8C8C8]">Goals</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-[#2d2d2d] dark:text-white">128</p>
                <p className="text-sm text-[#3d3d3d] dark:text-[#C8C8C8]">Followers</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-[#2d2d2d] dark:text-white">42</p>
                <p className="text-sm text-[#3d3d3d] dark:text-[#C8C8C8]">Following</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-[#FF6600]">{totalTokens}</p>
                <p className="text-sm text-[#3d3d3d] dark:text-[#C8C8C8]">Tokens</p>
              </div>
            </div>
          </motion.div>
          <div className="flex gap-2 mb-6">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-[20px] text-sm font-medium transition-colors ${
                  activeTab === tab ? 'bg-[#FF6600] text-white' : 'bg-white/50 dark:bg-white/5 hover:bg-white/70 dark:hover:bg-white/10 text-[#2d2d2d] dark:text-white'
                }`}>
                {tab}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            {activeTab === 'Goals' && (
              <motion.div
                key="goals"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4">
                {myGoals.length ? (
                  myGoals.map((goal) => <GoalPost key={goal.id} goal={goal} />)
                ) : (
                  <Card>
                    <p className="text-center text-[#3d3d3d] dark:text-[#C8C8C8]">No goals yet. Create one from the feed!</p>
                  </Card>
                )}
              </motion.div>
            )}
            {activeTab === 'Saved' && (
              <motion.div key="saved" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Card>
                  <p className="text-center text-[#3d3d3d] dark:text-[#C8C8C8]">No saved goals.</p>
                </Card>
              </motion.div>
            )}
            {activeTab === 'Groups' && (
              <motion.div key="groups" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Card>
                  <p className="text-center text-[#3d3d3d] dark:text-[#C8C8C8]">No groups joined.</p>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <Modal isOpen={editModalOpen} onClose={() => setEditModalOpen(false)} title="Edit profile">
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            setUser({ ...user, name: editName, username: editNickname, bio: editBio });
            setEditModalOpen(false);
          }}
        >
          <Input label="Name" value={editName} onChange={(e) => setEditName(e.target.value)} placeholder="Your name" />
          <Input label="Nickname" value={editNickname} onChange={(e) => setEditNickname(e.target.value)} placeholder="@username" />
          <Input label="Bio" value={editBio} onChange={(e) => setEditBio(e.target.value)} placeholder="Tell us about yourself" />
          <Button type="submit" className="w-full">
            Save
          </Button>
        </form>
      </Modal>
    </div>
  );
}

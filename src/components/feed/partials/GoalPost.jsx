import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { IconHeart, IconComment, IconCheck, IconToken, IconPencil, IconTrash } from '../../../constant/icon/Icon';
import { calculateTokens, calculateVerificationPercentage } from '../../../utils/Token';
import { MOCK_USERS } from '../../../data/seedData';
import { useDataStore } from '../../../store/UseDataStore';
import { useAppStore } from '../../../store/UseAppStore';

export function GoalPost({ goal }) {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(goal.title);
  const [editDescription, setEditDescription] = useState(goal.description);
  const [editProgress, setEditProgress] = useState(goal.progress);

  const currentUser = useAppStore((s) => s.user);
  const { updateGoalLikes, updateGoalApproves, addGoalComment, updateGoal, deleteGoal, goalEngagement, setGoalEngagement } = useDataStore();
  const engagement = goalEngagement[goal.id] || { liked: false, approved: false };
  const liked = engagement.liked;
  const approved = engagement.approved;

  const likes = goal.likes;
  const approves = goal.approves;
  const comments = goal.commentList || [];
  const totalComments = (goal.comments || 0) + comments.length;

  const isOwner = goal.userId === (currentUser?.id || '1');
  const userFromStore = MOCK_USERS.find((u) => u.id === goal.userId) || MOCK_USERS[0];
  const user = goal.userName
    ? { name: goal.userName, username: goal.userUsername || goal.userName, avatar: goal.userAvatar || userFromStore.avatar }
    : userFromStore;
  const verification = calculateVerificationPercentage(likes, totalComments, approves);
  const tokens = calculateTokens(likes, totalComments, approves);

  const handleLike = () => {
    setGoalEngagement(goal.id, { ...engagement, liked: !liked });
    updateGoalLikes(goal.id, liked ? -1 : 1);
  };

  const handleApprove = () => {
    setGoalEngagement(goal.id, { ...engagement, approved: !approved });
    updateGoalApproves(goal.id, approved ? -1 : 1);
  };

  const handleAddComment = () => {
    if (!commentText.trim()) return;
    addGoalComment(goal.id, { userId: currentUser?.id || '1', text: commentText });
    setCommentText('');
    setShowComments(true);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    updateGoal(goal.id, { title: editTitle, description: editDescription, progress: editProgress });
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      deleteGoal(goal.id);
      setIsEditing(false);
    }
  };

  useEffect(() => {
    if (isEditing) {
      setEditTitle(goal.title);
      setEditDescription(goal.description);
      setEditProgress(goal.progress);
    }
  }, [isEditing, goal.title, goal.description, goal.progress]);

  return (
    <Card className="mb-6">
      <div className="flex items-start gap-4">
        <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full object-cover" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-semibold text-charcoal dark:text-white">{user.name}</h3>
            <div className="flex items-center gap-2">
              {isOwner && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsEditing(true)}
                  className="p-1.5 rounded-full text-charcoal-light dark:text-text-dark hover:bg-white/50 dark:hover:bg-white/10"
                  title="Edit post"
                >
                  <IconPencil className="w-4 h-4" />
                </motion.button>
              )}
              <span className="text-xs text-accent bg-accent/10 dark:bg-accent/20 px-2 py-1 rounded-full">
                {verification}% verified
              </span>
            </div>
          </div>
          <p className="text-sm text-charcoal-light dark:text-text-dark">@{user.username}</p>
        </div>
      </div>

      <h2 className="mt-4 text-xl font-semibold text-charcoal dark:text-white">{goal.title}</h2>
      <p className="mt-2 text-charcoal-light dark:text-text-dark">{goal.description}</p>

      <div className="mt-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-charcoal-light dark:text-text-dark">Progress</span>
          <span className="font-medium text-accent">{goal.progress}%</span>
        </div>
        <div className="h-2 bg-white/50 dark:bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${goal.progress}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="h-full bg-linear-to-r from-accent to-accent-dark rounded-full"
          />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLike}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-[20px] text-sm transition-colors ${
            liked ? 'bg-accent text-white' : 'bg-white/50 dark:bg-white/10 hover:bg-white/70 dark:hover:bg-white/15 text-charcoal dark:text-white'
          }`}
        >
          <IconHeart className="w-4 h-4" filled={liked} /> {likes}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-[20px] text-sm bg-white/50 dark:bg-white/10 hover:bg-white/70 dark:hover:bg-white/15 text-charcoal dark:text-white transition-colors"
        >
          <IconComment className="w-4 h-4" /> {totalComments}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleApprove}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-[20px] text-sm transition-colors ${
            approved ? 'bg-accent text-white' : 'bg-white/50 dark:bg-white/10 hover:bg-white/70 dark:hover:bg-white/15 text-charcoal dark:text-white'
          }`}
        >
          <IconCheck className="w-4 h-4" /> Approve ({approves})
        </motion.button>
        <span className="flex items-center gap-1.5 px-4 py-2 rounded-[20px] text-sm bg-accent/10 dark:bg-accent/20 text-accent font-medium">
          <IconToken className="w-4 h-4" /> {tokens} tokens
        </span>
      </div>

      {showComments && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 pt-4 border-t border-white/20 dark:border-white/5"
        >
          <div className="space-y-3 mb-4">
            {comments.map((c) => (
              <div key={c.id} className="flex gap-2">
                <div className="flex-1 bg-white/30 dark:bg-white/5 rounded-[16px] px-3 py-2 text-sm">
                  {c.text}
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 rounded-[20px] border border-white/30 dark:border-white/10 bg-white/50 dark:bg-white/5 px-4 py-2 text-sm text-charcoal dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
            <Button size="sm" onClick={handleAddComment}>Reply</Button>
          </div>
        </motion.div>
      )}

      <AnimatePresence>
        {isEditing && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-9999999"
              onClick={() => setIsEditing(false)}
            />
            <div className="fixed inset-0 flex items-center justify-center p-4 z-9999999 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="pointer-events-auto w-full max-w-md bg-white/80 dark:bg-charcoal/95 backdrop-blur-xl rounded-[32px] border border-white/25 dark:border-white/10 shadow-2xl p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-xl font-semibold text-charcoal dark:text-white mb-4">Edit goal</h2>
                <form onSubmit={handleSaveEdit} className="space-y-4">
                  <Input label="Title" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} placeholder="Goal title" />
                  <div>
                    <label className="block text-sm font-medium text-charcoal dark:text-beige-200 mb-2">Description</label>
                    <textarea
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      placeholder="Describe your goal..."
                      rows={3}
                      className="w-full rounded-[20px] border border-beige-200 dark:border-white/10 bg-white/80 dark:bg-white/5 px-4 py-3 text-charcoal dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal dark:text-beige-200 mb-2">Progress %</label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={editProgress}
                      onChange={(e) => setEditProgress(Number(e.target.value))}
                      className="w-full h-2 rounded-full appearance-none bg-white/50 dark:bg-white/10 accent-accent"
                    />
                    <span className="text-sm text-accent">{editProgress}%</span>
                  </div>
                  <div className="space-y-2 pt-2">
                    <div className="flex gap-2">
                      <Button type="button" variant="ghost" className="flex-1" onClick={() => setIsEditing(false)}>Cancel</Button>
                      <Button type="submit" className="flex-1">Save</Button>
                    </div>
                    <Button type="button" variant="ghost" className="w-full text-red-500 hover:bg-red-500/10 hover:text-red-600" onClick={handleDelete}>
                      <IconTrash className="w-4 h-4 inline mr-1" /> Delete post
                    </Button>
                  </div>
                </form>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </Card>
  );
}

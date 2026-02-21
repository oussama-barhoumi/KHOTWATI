import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { IconPlus } from '../../../constant/icon/Icon';
import { useAppStore } from '../../../store/UseAppStore';

export function CreateGoal({ onGoalCreated }) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [progress, setProgress] = useState(0);
  const [enableFocusReminder, setEnableFocusReminder] = useState(false);
  const [reminder, setReminder] = useState('Keep concentrating!');
  const [socialUrl, setSocialUrl] = useState('');
  const [socialMedia, setSocialMedia] = useState([]);
  const setFocusGoal = useAppStore((s) => s.setFocusGoal);

  const addSocial = () => {
    let url = socialUrl.trim();
    if (!url) return;
    if (!url.startsWith('http')) url = 'https://' + url;
    if (!socialMedia.includes(url)) {
      setSocialMedia((prev) => [...prev, url]);
      setSocialUrl('');
    }
  };

  const removeSocial = (url) => setSocialMedia((prev) => prev.filter((u) => u !== url));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onGoalCreated?.({ title, description, progress: progress || 0 });
    if (enableFocusReminder && reminder.trim()) {
      setFocusGoal({ socialMedia, reminder: reminder.trim() });
    }
    setTitle('');
    setDescription('');
    setProgress(0);
    setEnableFocusReminder(false);
    setReminder('Keep concentrating!');
    setSocialMedia([]);
    setSocialUrl('');
    setIsOpen(false);
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(true)}
        className="w-full mb-6 p-6 rounded-xl border-2 border-dashed border-accent/40 dark:border-accent/30 bg-white/30 dark:bg-white/5 hover:bg-white/50 dark:hover:bg-white/10 transition-colors text-accent flex items-center justify-center gap-2"
      >
        <IconPlus className="w-6 h-6" />
        <span className="font-medium">Create a goal</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-100"
              onClick={() => setIsOpen(false)}
            />
            <div className="fixed inset-0 flex items-center justify-center p-4 z-100 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="pointer-events-auto w-full max-w-md bg-white/80 dark:bg-charcoal/95 backdrop-blur-xl rounded-[32px] border border-white/25 dark:border-white/10 shadow-2xl p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-xl font-semibold text-charcoal dark:text-white mb-4">New goal</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input label="Title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Run 5K every week" />
                  <div>
                    <label className="block text-sm font-medium text-charcoal dark:text-beige-200 mb-2">Description</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
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
                      value={progress}
                      onChange={(e) => setProgress(Number(e.target.value))}
                      className="w-full h-2 rounded-full appearance-none bg-white/50 dark:bg-white/10 accent-accent"
                    />
                    <span className="text-sm text-accent">{progress}%</span>
                  </div>
                  <div className="border-t border-white/20 dark:border-white/10 pt-4 space-y-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={enableFocusReminder}
                        onChange={(e) => setEnableFocusReminder(e.target.checked)}
                        className="rounded accent-accent"
                      />
                      <span className="text-sm font-medium text-charcoal dark:text-beige-200">Remind me when I open social media</span>
                    </label>
                    {enableFocusReminder && (
                      <div className="space-y-2 pl-6">
                        <Input label="Reminder message" value={reminder} onChange={(e) => setReminder(e.target.value)} placeholder="e.g. Keep concentrating!" />
                        <div>
                          <label className="block text-sm font-medium text-charcoal dark:text-beige-200 mb-2">Social media URLs to avoid</label>
                          <div className="flex gap-2 mb-2">
                            <input
                              type="url"
                              value={socialUrl}
                              onChange={(e) => setSocialUrl(e.target.value)}
                              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSocial())}
                              placeholder="https://instagram.com, twitter.com..."
                              className="flex-1 rounded-[20px] border border-beige-200 dark:border-white/10 bg-white/80 dark:bg-white/5 px-4 py-2 text-sm text-charcoal dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/50"
                            />
                            <Button type="button" variant="secondary" size="sm" onClick={addSocial}>Add</Button>
                          </div>
                          {socialMedia.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {socialMedia.map((url) => (
                                <span key={url} className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-accent/20 text-accent text-xs">
                                  {(() => { try { return new URL(url.startsWith('http') ? url : 'https://' + url).hostname; } catch { return url; }})()}
                                  <button type="button" onClick={() => removeSocial(url)} className="hover:text-charcoal dark:hover:text-white" aria-label="Remove">×</button>
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button type="button" variant="ghost" className="flex-1" onClick={() => setIsOpen(false)}>Cancel</Button>
                    <Button type="submit" className="flex-1">Create</Button>
                  </div>
                </form>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

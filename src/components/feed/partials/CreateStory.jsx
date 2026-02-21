import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { IconPlus } from '../../../constant/icon/Icon';
import { useAppStore } from '../../../store/UseAppStore';
import { useDataStore } from '../../../store/UseDataStore';
import { FREE_STORY_MUSIC } from '../../../data/seedData';

export function CreateStory({ onStoryCreated }) {
  const [isOpen, setIsOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [preview, setPreview] = useState(null);
  const [musicId, setMusicId] = useState('');
  const fileInputRef = useRef(null);
  const user = useAppStore((s) => s.user) || { id: '1', name: 'You', username: 'you', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user' };
  const addStory = useDataStore((s) => s.addStory);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
      setImageUrl('');
    };
    reader.readAsDataURL(file);
  };

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setImageUrl(url);
    setPreview(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const src = preview || imageUrl.trim();
    if (!src) return;
    const music = musicId ? FREE_STORY_MUSIC.find((m) => m.id === musicId) : null;
    const story = {
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar,
      userUsername: user.username,
      imageUrl: src,
      musicUrl: music?.url || null,
    };
    addStory(story);
    onStoryCreated?.(story);
    setImageUrl('');
    setPreview(null);
    setMusicId('');
    setIsOpen(false);
  };

  const reset = () => {
    setImageUrl('');
    setPreview(null);
    setMusicId('');
    setIsOpen(false);
    fileInputRef.current && (fileInputRef.current.value = '');
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(true)}
        className="shrink-0 flex flex-col items-center cursor-pointer group"
      >
        <div className="relative">
          <div className="w-16 h-16 rounded-full p-0.75 bg-white/80 dark:bg-white/10 border-2 border-dashed border-accent/50 group-hover:border-accent transition-colors flex items-center justify-center">
            <IconPlus className="w-8 h-8 text-accent" />
          </div>
        </div>
        <span className="mt-1 text-xs text-charcoal dark:text-white truncate max-w-18">Add story</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
              onClick={reset}
            />
            <div className="fixed inset-0 flex items-center justify-center p-4 z-[101] pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="pointer-events-auto w-full max-w-sm bg-white/90 dark:bg-charcoal/95 backdrop-blur-xl rounded-2xl border border-white/25 dark:border-white/10 shadow-2xl p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-lg font-semibold text-charcoal dark:text-white mb-4">Create story</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {(preview || imageUrl) && (
                    <div className="aspect-[9/16] max-h-64 rounded-xl overflow-hidden bg-black/10">
                      <img
                        src={preview || imageUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={() => setPreview(null) || setImageUrl('')}
                      />
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <Button type="button" variant="secondary" className="w-full" onClick={() => fileInputRef.current?.click()}>
                    Upload image
                  </Button>
                  <div className="text-center text-sm text-charcoal-light dark:text-text-dark">or</div>
                  <Input
                    label="Image URL"
                    type="url"
                    value={imageUrl}
                    onChange={handleUrlChange}
                    placeholder="https://example.com/image.jpg"
                  />
                  <div>
                    <label className="block text-sm font-medium text-charcoal dark:text-beige-200 mb-2">Free background music</label>
                    <select
                      value={musicId}
                      onChange={(e) => setMusicId(e.target.value)}
                      className="w-full rounded-[20px] border border-beige-200 dark:border-white/10 bg-white/80 dark:bg-white/5 px-4 py-3 text-sm text-charcoal dark:text-white focus:outline-none focus:ring-2 focus:ring-accent/50"
                    >
                      <option value="">None</option>
                      {FREE_STORY_MUSIC.map((m) => (
                        <option key={m.id} value={m.id}>{m.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button type="button" variant="ghost" className="flex-1" onClick={reset}>
                      Cancel
                    </Button>
                    <Button type="submit" className="flex-1" disabled={!preview && !imageUrl.trim()}>
                      Post
                    </Button>
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

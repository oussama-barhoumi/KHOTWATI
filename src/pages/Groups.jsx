import { useState } from 'react';
import { motion } from 'motion/react';
import { GlassNavbar } from '../layout/GlassNavbar';
import { IconSunrise, IconDumbbell, IconCode, IconMeditate } from '../constant/icon/Icon';
import { FloatingSidebar } from '../layout/FloatingSidebar';
import { ChatWindow } from '../components/chat/partials/ChatWindow';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useDataStore } from '../store/UseDataStore';

const ICON_KEYS = ['sunrise', 'dumbbell', 'code', 'meditate'];

export function Groups() {
    const groups = useDataStore((s) => s.groups);
    const addGroup = useDataStore((s) => s.addGroup);
    const chatMessages = useDataStore((s) => s.chatMessages);
    const addChatMessage = useDataStore((s) => s.addChatMessage);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [newName, setNewName] = useState('');
    const [newDesc, setNewDesc] = useState('');
    const [newIcon, setNewIcon] = useState('sunrise');

    return (
        <div className="min-h-screen bg-gradient-to-br from-beige-50 via-beige-100 to-beige-200 dark:from-bg-dark dark:via-charcoal-dark dark:to-[#141414] dark:to-bg-dark">
            <GlassNavbar />
            <FloatingSidebar />

        <div className="pt-20 pb-24 md:pb-12 md:pl-24">
            <div className="max-w-4xl mx-auto px-4 md:px-8">
                <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-charcoal  dark:text-white">Groups</h1>
                <Button onClick={() => setCreateModalOpen(true)}>Create group</Button>
                </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
            {groups.map((group, i) => (
                <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}>
                <Card
                  className="cursor-pointer hover:border-accent/30 transition-colors"
                  onClick={() => setSelectedGroup(group)}
                >
                    <div className="flex items-start gap-4">
                        <div className="w-14 h-14 rounded-[20px] bg-accent/20 dark:bg-accent/10 flex items-center justify-center text-accent">
                            {group.iconKey === 'sunrise' && <IconSunrise className="w-7 h-7" />}
                            {group.iconKey === 'dumbbell' && <IconDumbbell className="w-7 h-7" />}
                            {group.iconKey === 'code' && <IconCode className="w-7 h-7" />}
                            {group.iconKey === 'meditate' && <IconMeditate className="w-7 h-7" />}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-charcoal dark:text-white">{group.name}</h3>
                            <p className="text-sm text-charcoal-light dark:text-text-dark mt-1 line-clamp-2">{group.description}</p>
                            <p className="text-xs text-accent mt-2">{group.memberCount} members</p>
                            <Button size="sm" variant="secondary" className="mt-3">Join</Button>
                        </div>
                    </div>
                </Card>
            </motion.div>
            ))}
            </div>
        </div>
    </div>

        {createModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={() => setCreateModalOpen(false)}>
            <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/80 dark:bg-charcoal/95 backdrop-blur-xl rounded-[32px] border border-white/25 dark:border-white/10 shadow-xl p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-semibold text-charcoal dark:text-white mb-4">Create group</h2>
            <input
                type="text"
                placeholder="Group name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full rounded-[20px] border border-white/30 dark:border-white/10 bg-white/50 dark:bg-white/5 px-4 py-3 mb-4 text-charcoal dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
            <textarea
                placeholder="Description"
                rows={3}
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                className="w-full rounded-[20px] border border-white/30 dark:border-white/10 bg-white/50 dark:bg-white/5 px-4 py-3 mb-4 text-charcoal dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none"
            />
            <div className="flex gap-2 mb-4">
                {ICON_KEYS.map((key) => (
                <button
                    key={key}
                    type="button"
                    onClick={() => setNewIcon(key)}
                    className={`p-2 rounded-[12px] transition-colors ${newIcon === key ? 'bg-accent text-white' : 'bg-white/50 dark:bg-white/5 hover:bg-white/20'}`}
                >
                    {key === 'sunrise' && <IconSunrise className="w-5 h-5" />}
                    {key === 'dumbbell' && <IconDumbbell className="w-5 h-5" />}
                    {key === 'code' && <IconCode className="w-5 h-5" />}
                    {key === 'meditate' && <IconMeditate className="w-5 h-5" />}
                </button>
            ))}
            </div>
            <div className="flex gap-2">
                <Button variant="ghost" className="flex-1" onClick={() => { setCreateModalOpen(false); setNewName(''); setNewDesc(''); }}>Cancel</Button>
                <Button
                className="flex-1"
                onClick={() => {
                    if (newName.trim()) {
                        addGroup({ name: newName.trim(), description: newDesc.trim(), iconKey: newIcon });
                        setCreateModalOpen(false);
                        setNewName('');
                        setNewDesc('');
                }
                }}> Create </Button>
            </div>
            </motion.div>
        </div>
        )}
        {selectedGroup && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={() => setSelectedGroup(null)}>
            <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/80 dark:bg-charcoal/95 backdrop-blur-xl rounded-[20px] border border-white/25 dark:border-white/10 shadow-xl p-4 w-full max-w-3xl"
            onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-charcoal dark:text-white">{selectedGroup.name}</h3>
                    <button onClick={() => setSelectedGroup(null)} className="text-charcoal/70 dark:text-white/70">Close</button>
                </div>

                <div>
                    <ChatWindow contact={selectedGroup} messages={chatMessages[selectedGroup.id] ?? []} onSend={(id, text) => addChatMessage(id, { text, fromMe: true })} />
                </div>
            </motion.div>
        </div>
        )}
    </div>
    );
}

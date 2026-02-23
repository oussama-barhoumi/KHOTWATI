import React, { useState, useEffect } from 'react';
import { ChatWindow } from './partials/ChatWindow';
import { useDataStore } from '../../store/UseDataStore';
import { useAppStore } from '../../store/UseAppStore';
import { sendGrogMessage } from '../../utils/grog';

export function GrogWidget() {
  const [open, setOpen] = useState(false);
  const contacts = useDataStore((s) => s.contacts || []);
  const addChatMessage = useDataStore((s) => s.addChatMessage);
  const addContact = useDataStore((s) => s.addContact);
  // subscribe to messages for the bot so the widget updates in real-time
  // return undefined when there are no messages to avoid creating a new empty array
  const botMessages = useDataStore((s) => (s.chatMessages && s.chatMessages['khotwa']) ? s.chatMessages['khotwa'] : undefined);
  const user = useAppStore((s) => s.user);

  const botId = 'khotwa';
  const found = contacts.find((c) => c.id === botId);
  const botContact = found || { id: botId, name: 'Khotwa (bot)', initials: 'KH', status: 'Bot' };

  useEffect(() => {
    // ensure the grog contact exists in store so it shows up in conversations
    if (!contacts.find((c) => c.id === botId)) {
      addContact(botContact);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSend(chatId, text) {
    // persist user message
    addChatMessage(chatId, { text, fromMe: true });

    // build simple context
    const history = (useDataStore.getState().chatMessages?.[chatId] || []).slice(-8).map((m) => ({ role: (m.fromMe ? 'user' : 'assistant'), content: m.text }));
    history.push({ role: 'user', content: text });

    try {
      const resp = await sendGrogMessage({ messages: history, model: 'grog-small' });
      const reply = resp?.reply || resp?.choices?.[0]?.message?.content || resp?.content || (typeof resp === 'string' ? resp : JSON.stringify(resp));
      addChatMessage(chatId, { text: reply, fromMe: false, from: 'khotwa' });
    } catch (e) {
      addChatMessage(chatId, { text: `Khotwa error: ${e.message}`, fromMe: false, from: 'khotwa' });
    }
  }

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setOpen((v) => !v)}
          title="Open Grog chat"
          className="w-14 h-14 rounded-full bg-accent shadow-lg flex items-center justify-center text-white text-lg"
        >
          💬
        </button>
      </div>

      {/* Side chat drawer */}
      <div className={`fixed top-0 right-0 z-40 h-full w-full md:w-96 bg-transparent ${open ? '' : 'pointer-events-none'}`} aria-hidden={!open}>
        <div className={`absolute inset-0 bg-black/40 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`} onClick={() => setOpen(false)} />
        <div className={`absolute top-0 right-0 h-full w-full md:w-96 bg-white dark:bg-[#081018] shadow-xl transform transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-4 border-b border-white/25 dark:border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white font-medium">GR</div>
              <div>
                <div className="text-sm font-medium text-charcoal dark:text-white">Grog (bot)</div>
                <div className="text-xs text-charcoal/70 dark:text-white/70">AI assistant</div>
              </div>
            </div>
            <div>
              <button onClick={() => setOpen(false)} className="px-3 py-1 rounded-md bg-white/10">Close</button>
            </div>
          </div>

          <div className="p-4">
            <ChatWindow
              contact={botContact}
              messages={botMessages || []}
              currentUserId={user?.id}
              onSend={handleSend}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default GrogWidget;

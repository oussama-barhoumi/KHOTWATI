import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { GlassNavbar } from '../layout/GlassNavbar';
import { FloatingSidebar } from '../layout/FloatingSidebar';
import { useAppStore } from '../store/UseAppStore';
import { useDataStore } from '../store/UseDataStore';
import { connectSocket, getSocket } from '../utils/socket';
import { sendGrogMessage } from '../utils/grog';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ChatList } from '../components/chat/partials/ChatList';
import { ChatWindow } from '../components/chat/partials/ChatWindow';
import { Link } from 'react-router-dom';
import { MOCK_USERS } from '../data/seedData';

export function Chat() {
  const user = useAppStore((s) => s.user);
  const setUser = useAppStore((s) => s.setUser);
  // persisted contacts from the data store
  const contacts = useDataStore((s) => s.contacts || []);
  const storeAddContact = useDataStore((s) => s.addContact);
  const removeContact = useDataStore((s) => s.removeContact);
  const chatMessages = useDataStore((s) => s.chatMessages);
  const addChatMessage = useDataStore((s) => s.addChatMessage);
  const [socketConnected, setSocketConnected] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loginName, setLoginName] = useState('');
  const [loginUsername, setLoginUsername] = useState('');

  // initialize socket and listeners
  useEffect(() => {
    const serverUrl = (typeof window !== 'undefined' && window.KHOTWATI_SERVER) ? window.KHOTWATI_SERVER : 'http://localhost:3000';
    const s = connectSocket({ url: serverUrl, user });
    setSocketConnected(!!s && s.connected);

    s.on('private_message', (payload) => {
      if (!payload) return;
      const key = String(payload.from || 'ai');
      const isSelf = payload.from && user && String(payload.from) === String(user.id);
      addChatMessage(key, { text: payload.message, fromMe: !!isSelf });
    });

    s.on('group_message', (payload) => {
      if (!payload) return;
      const key = String(payload.room);
      const isSelf = payload.from && user && String(payload.from) === String(user.id);
      addChatMessage(key, { text: payload.message, fromMe: !!isSelf });
    });

    s.on('contact_added', ({ from }) => {
      // optionally show a toast or add to contacts list; for now, log
      console.log('contact added by', from);
    });

    s.on('room_created', ({ roomId }) => {
      if (!roomId) return;
      const mapped = { id: roomId, name: `Room ${roomId.slice(2)}`, initials: 'RM', lastMessage: '', unread: 0, status: 'Group' };
      storeAddContact(mapped);
      setSelectedContact(mapped);
    });

    s.on('room_joined', ({ roomId }) => {
      if (!roomId) return;
      const mapped = { id: roomId, name: `Room ${roomId.slice(2)}`, initials: 'RM', lastMessage: '', unread: 0, status: 'Group' };
      storeAddContact(mapped);
      setSelectedContact(mapped);
    });

    s.on('room_not_found', ({ roomId }) => {
      alert(`Room not found: ${roomId}`);
    });

    return () => {
      try {
        s.off('private_message');
        s.off('group_message');
        s.off('contact_added');
        s.off('room_created');
        s.off('room_joined');
        s.off('room_not_found');
      } catch (e) {}
    };
  }, [user]);

  // add placeholder contacts on first load if none exist
  useEffect(() => {
    if (!contacts || contacts.length > 0) return;
    const defaults = MOCK_USERS.slice(0, 3);
    defaults.forEach((u) => storeAddContact({ id: u.id, name: u.name }));
  }, []);

  function generateCode(len = 6) {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let out = '';
    for (let i = 0; i < len; i++) out += chars[Math.floor(Math.random() * chars.length)];
    return out;
  }

  function createConnectionCode() {
    const code = generateCode(6);
    const roomId = 'gr' + code;
    const s = getSocket();
    if (s && s.connected) {
      s.emit('create_room', { roomId, meta: { createdBy: user?.id } });
    } else {
      // offline: still add to local contacts and select
      const mapped = { id: roomId, name: `Room ${code}`, initials: 'RM', lastMessage: '', unread: 0, status: 'Group' };
      storeAddContact(mapped);
      setSelectedContact(mapped);
      alert(`Room created locally: ${code}`);
    }
    return roomId;
  }

  async function joinByCode(code) {
    if (!code) return;
    const roomId = code.startsWith('gr') ? code : 'gr' + code;
    const s = getSocket();
    if (s && s.connected) {
      s.emit('join_room', { roomId });
    } else {
      alert('Not connected to server');
    }
  }

  useEffect(() => {
    const q = (searchQuery || '').trim().toLowerCase();
    if (!q) return setSearchResults([]);

    // first try server-backed discovery of connected users
    (async () => {
      try {
        const serverUrl = (typeof window !== 'undefined' && window.KHOTWATI_SERVER) ? window.KHOTWATI_SERVER : 'http://localhost:3000';
        const res = await fetch(`${serverUrl}/users`);
        if (res.ok) {
          const j = await res.json();
          const list = Array.isArray(j.users) ? j.users : [];
          const filtered = list.filter((u) => (u.name || '').toLowerCase().includes(q) || (u.username || '').toLowerCase().includes(q));
          if (filtered.length > 0) {
            setSearchResults(filtered);
            return;
          }
        }
      } catch (e) {
        // ignore and fallback to mock users
      }

      const results = MOCK_USERS.filter((u) => u.name.toLowerCase().includes(q) || u.username.toLowerCase().includes(q));
      setSearchResults(results);
    })();
  }, [searchQuery]);

  function addContact(contact) {
    if (!contact) return;
    // avoid duplicates
    if (contacts.find((c) => c.id === contact.id)) return;
    const mapped = { id: contact.id, name: contact.name, initials: (contact.name||'').split(' ').map(n=>n[0]).slice(0,2).join('').toUpperCase(), lastMessage: '', unread: 0, status: 'Active' };
    storeAddContact(mapped);
    // auto-select the new contact for convenience
    setSelectedContact(mapped);
    const s = getSocket();
    if (s && s.connected && user) {
      s.emit('add_contact', { to: contact.id, fromUser: user });
    }
  }

  function addAllContacts() {
    if (!searchResults || searchResults.length === 0) return;
    const toAdd = searchResults.filter((u) => !contacts.find((c) => c.id === u.id));
    if (toAdd.length === 0) return;
    const mapped = toAdd.map((contact) => ({ id: contact.id, name: contact.name, initials: (contact.name||'').split(' ').map(n=>n[0]).slice(0,2).join('').toUpperCase(), lastMessage: '', unread: 0, status: 'Active' }));
    mapped.forEach((m) => storeAddContact(m));
    setSelectedContact(mapped[0]);
    const s = getSocket();
    if (s && s.connected && user) {
      toAdd.forEach((contact) => s.emit('add_contact', { to: contact.id, fromUser: user }));
    }
  }
  return (
    <div className="min-h-screen bg-linear-to-br from-beige-50 via-beige-100 to-beige-200 dark:from-bg-dark dark:via-charcoal dark:to-bg-dark relative">
      {!user && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-sm bg-white/80 dark:bg-[#111] backdrop-blur-xl rounded-[20px] p-6 border border-white/25 dark:border-white/10">
            <h2 className="text-lg font-semibold text-charcoal dark:text-white mb-3">Set your name</h2>
            <input value={loginName} onChange={(e) => setLoginName(e.target.value)} placeholder="Full name" className="w-full mb-2 p-2 rounded-md border border-white/25" />
            <input value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} placeholder="Username (unique)" className="w-full mb-4 p-2 rounded-md border border-white/25" />
            <div className="flex gap-2">
              <button
                onClick={() => {
                  const id = loginUsername?.trim() || 'u' + Date.now();
                  const name = loginName?.trim() || id;
                  setUser({ id, name, username: loginUsername?.trim() || id });
                }}
                className="flex-1 px-4 py-2 rounded-[10px] bg-accent text-white"
              >
                Continue
              </button>

              <button onClick={() => { setLoginName(''); setLoginUsername(''); }} className="flex-1 px-4 py-2 rounded-[10px] bg-white/60">Clear</button>
            </div>
          </div>
        </div>
      )}
      <GlassNavbar />
      <FloatingSidebar />

      <div className="pt-20 pb-24 md:pb-12 md:pl-24">
        <div className="max-w-4xl mx-auto px-4 md:px-8">

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex items-center justify-between"
          >
            <h1 className="text-2xl font-bold text-charcoal dark:text-white">Chat</h1>
          </motion.div>

          <Card className="p-0 overflow-hidden h-[calc(100vh-5rem)]">
            <div className="flex flex-col md:flex-row h-full">
              <div className="md:w-80 w-full border-r border-white/25 dark:border-white/10 p-4 flex flex-col">
                <h3 className="text-sm font-medium text-charcoal dark:text-white mb-4">Conversations</h3>
                <div className="mb-3">
                  <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Find users to add"
                    className="w-full rounded-[12px] p-2 border border-white/25 dark:border-white/10 bg-white/30 dark:bg-white/5 text-sm text-charcoal dark:text-white"
                  />
                  <div className="flex flex-col md:flex-row gap-2 mt-2">
                    <button onClick={() => { const r = createConnectionCode(); navigator.clipboard?.writeText(r.slice(2)); }} className="px-3 py-1 rounded-[10px] bg-accent text-white text-sm w-full md:w-auto">Create code</button>
                    <div className="flex gap-2 w-full md:flex-1">
                      <input id="joinCode" placeholder="Enter code" className="flex-1 min-w-0 rounded-[10px] p-2 border border-white/25 dark:border-white/10 bg-white/30 dark:bg-white/5 text-sm text-charcoal dark:text-white" />
                      <button onClick={() => { const val = document.getElementById('joinCode').value.trim(); joinByCode(val); }} className="px-3 py-1 rounded-[10px] bg-accent text-white text-sm">Join</button>
                    </div>
                  </div>
                  {searchResults.length > 0 && (
                    <div className="mt-2 space-y-2">
                      {searchResults.length > 1 && (
                        <div className="flex justify-end mb-1">
                          <button onClick={addAllContacts} className="text-sm px-2 py-1 rounded-[10px] bg-accent/80 text-white">Add All</button>
                        </div>
                      )}
                      {searchResults.map((u) => (
                        <div key={u.id} className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white text-sm">{(u.name||'').split(' ').map(n=>n[0]).slice(0,2).join('')}</div>
                            <div className="text-sm text-charcoal dark:text-white">{u.name} <span className="text-xs text-charcoal/60 dark:text-white/60">@{u.username}</span></div>
                          </div>
                          <button onClick={() => addContact(u)} className="px-3 py-1 rounded-[10px] bg-accent text-white text-sm">Add</button>
                        </div>
                      ))}
                    </div>
                  )}
                  </div>
                  )}

                <div className="flex-1 overflow-y-auto mt-4">
                  <ChatList
                    contacts={contacts}
                    selectedId={selectedContact?.id}
                    onSelect={(c) => setSelectedContact(c)}
                  />
                </div>
              </div>

              <div className="flex-1 p-6 flex flex-col h-full">
                <ChatWindow
                  contact={selectedContact}
                  messages={chatMessages[selectedContact?.id] ?? []}
                  currentUserId={user?.id}
                  onSend={async (chatId, text) => {
                    // special-case the local Grog chatbot (client-side)
                    if (String(chatId) === 'khotwa') {
                      // add user's message locally
                      addChatMessage(chatId, { text, fromMe: true });

                      // build simple contextual history from recent messages
                      const history = (chatMessages[chatId] || []).slice(-8).map((m) => ({
                        role: (m.fromMe || (user && String(m.from) === String(user.id))) ? 'user' : 'assistant',
                        content: m.text,
                      }));
                      history.push({ role: 'user', content: text });

                      try {
                        const resp = await sendGrogMessage({ messages: history, model: 'grog-small' });
                        // try common response shapes
                        const reply = resp?.reply || resp?.choices?.[0]?.message?.content || resp?.content || (typeof resp === 'string' ? resp : JSON.stringify(resp));
                        addChatMessage(chatId, { text: reply, fromMe: false, from: 'khotwa' });
                      } catch (e) {
                        addChatMessage(chatId, { text: `Khotwa error: ${e.message}`, fromMe: false, from: 'khotwa' });
                      }

                      return;
                    }

                    // send via socket if connected, otherwise persist locally
                    const s = getSocket();
                    if (s && s.connected) {
                      // private chat if contact id starts with a user id (not gr)
                      if (String(chatId).startsWith('gr')) {
                        s.emit('group_message', { room: chatId, message: text, from: user?.id });
                      } else {
                        s.emit('private_message', { to: chatId, message: text, from: user?.id });
                      }
                    } else {
                      addChatMessage(chatId, { text, fromMe: true });
                    }
                  }}
                />
              </div>
            </div>
          </Card>

        </div>
      </div>
    </div>
  );
}

// (state is initialized in the `Chat` component above)

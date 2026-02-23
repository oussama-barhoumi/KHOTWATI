import { io } from 'socket.io-client';

let socket = null;

export function connectSocket({ url, user } = {}) {
  // resolution order for server URL:
  // 1. explicit `url` argument
  // 2. Vite env `import.meta.env.VITE_KHOTWATI_SERVER`
  // 3. runtime `window.KHOTWATI_SERVER` (console override)
  // 4. fallback `http://localhost:3000`
  const resolvedUrl = url || (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_KHOTWATI_SERVER)
    || (typeof window !== 'undefined' && window.KHOTWATI_SERVER)
    || 'http://localhost:3000';

  if (!socket) {
    socket = io(resolvedUrl, { transports: ['websocket'], autoConnect: true });

    socket.on('connect', () => {
      // prefer explicit user param, otherwise try window-scoped user
      let regUser = user;
      if (!regUser && typeof window !== 'undefined' && window.KHOTWATI_USER) regUser = window.KHOTWATI_USER;
      if (regUser && regUser.id) socket.emit('register', regUser);
    });
  } else {
    // reuse existing socket - if a user is provided and socket is connected, register immediately
    if (user && user.id && socket.connected) {
      try {
        socket.emit('register', user);
      } catch (e) {}
    }
  }

  // always return the socket instance
  return socket;
}

export function getSocket() {
  return socket;
}

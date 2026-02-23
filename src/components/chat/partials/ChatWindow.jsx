import React, { useRef, useEffect, useState } from 'react';

export function ChatWindow({ contact, messages = [], onSend, currentUserId } ) {
	const bottomRef = useRef(null);
	const [text, setText] = useState('');

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages, contact]);

	if (!contact) {
		return (
			<div className="h-[60vh] flex items-center justify-center text-charcoal/70 dark:text-white/70">
				Select a conversation
			</div>
		);
	}

	const avatarText = contact.initials || (contact.name || '').split(' ').map(n => n[0]).slice(0,2).join('').toUpperCase();

	return (
		<div className="flex flex-col h-[60vh]">
			<div className="border-b border-white/25 dark:border-white/10 pb-3 mb-4">
				<div className="flex items-center gap-3">
					<div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white font-medium">{avatarText}</div>
					<div>
						<div className="text-sm font-medium text-charcoal dark:text-white">{contact.name}</div>
						<div className="text-xs text-charcoal/70 dark:text-white/70">{contact.status || contact.description || 'Active'}</div>
					</div>
				</div>
			</div>

			<div className="flex-1 overflow-auto px-2">
				<div className="space-y-3">
					{messages.map((m, i) => {
						const sent = m.fromMe === true || m.from === 'me' || (currentUserId && String(m.from) === String(currentUserId));
						return (
							<div key={i} className={`flex ${sent ? 'justify-end' : 'justify-start'}`}>
								<div
									className={`max-w-[70%] p-3 ${sent ? 'bg-accent text-white rounded-xl rounded-tr-[6px]' : 'bg-white/90 dark:bg-white/5 text-charcoal dark:text-white rounded-xl rounded-tl-[6px]'} `}
									style={{ wordBreak: 'break-word' }}
								>
									<div className="text-sm">{m.text}</div>
								</div>
							</div>
						);
					})}

					<div ref={bottomRef} />
				</div>
			</div>

			<div className="mt-4">
				<div className="flex gap-2">
					<input
						value={text}
						onChange={(e) => setText(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === 'Enter' && text.trim()) {
								e.preventDefault();
								if (onSend) onSend(contact.id, text.trim());
								setText('');
							}
						}}
						className="flex-1 rounded-[12px] p-3 border border-white/25 dark:border-white/10 bg-transparent text-charcoal dark:text-white"
						placeholder="Type a message..."
					/>
					<button
						onClick={() => {
							if (!text.trim()) return;
							if (onSend) onSend(contact.id, text.trim());
							setText('');
						}}
						className="px-4 py-2 rounded-[12px] bg-accent text-white"
					>
						Send
					</button>
				</div>
			</div>
		</div>
	);
}

import React from 'react';

export function ChatList({ contacts = [], selectedId, onSelect = () => {} }) {
	if (!contacts || contacts.length === 0) {
		return (
			<div className="text-sm text-charcoal/70 dark:text-white/70 py-6 text-center">No conversations yet. Use the search above to add contacts.</div>
		);
	}

	return (
		<div className="space-y-2">
			{contacts.map((c) => (
				<button
					key={c.id}
					onClick={() => onSelect(c)}
					className={`w-full flex items-center gap-3 p-2 rounded-lg text-left transition-colors ${
						selectedId === c.id ? 'bg-white/60 dark:bg-white/10' : 'hover:bg-white/20 dark:hover:bg-white/5'
					}`}
				>
					<div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white font-medium">
						{c.initials}
					</div>

					<div className="flex-1 min-w-0">
						<div className="flex items-center justify-between">
							<div className="text-sm font-medium text-charcoal dark:text-white truncate">{c.name}</div>
							{c.unread > 0 && (
								<div className="text-xs bg-accent text-white px-2 py-0.5 rounded-full">{c.unread}</div>
							)}
						</div>

						<div className="text-xs text-charcoal/70 dark:text-white/70 truncate">{c.lastMessage}</div>
					</div>
				</button>
			))}
		</div>
	);
}

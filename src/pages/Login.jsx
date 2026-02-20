import { useState } from "react";
import { useAppStore } from "../store/useAppStore";
import { useNavigate } from "react-router-dom";
import { GlassNavbar } from "../layout/GlassNavbar";
import { motion } from "framer-motion";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button"; 


export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const setUser = useAppStore((s) => s.setUser);
    const navigate = useNavigate();

    const handleCancel = () => navigate('/');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }
        setLoading(true);
        try {
            const res = await fetch('https://jsonplaceholder.typicode.com/users/1');
            const data = await res.json();
            setUser({ id: String(data.id), name: data.name, username: data.username, email: data.email, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + data.name });
            navigate('/feed');
        } catch {
            setError('Login failed. Use any email/password for demo.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-beige-50 via-beige-100 to-beige-200 dark:from-bg-dark dark:via-charcoal-dark dark:to-bg-dark">
            <GlassNavbar />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex min-h-screen items-center justify-center px-4 pt-20"
            >
                <div className="w-full max-w-md">
                    <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-[32px] border border-white/25 dark:border-white/10 shadow-xl p-8">
                        <h1 className="text-2xl font-bold text-charcoal dark:text-white mb-2">Welcome back</h1>
                        <p className="text-charcoal-light dark:text-text-dark mb-6">Sign in to continue to Khotwa</p>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
                            <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
                            {error && <p className="text-sm text-red-500">{error}</p>}
                            <div className="flex gap-2">
                                <Button type="button" variant="ghost" className="flex-1" onClick={handleCancel}>Cancel</Button>
                                <Button type="submit" className="flex-1" loading={loading}>Log in</Button>
                            </div>
                        </form>
                        <p className="mt-6 text-center text-sm text-charcoal-light dark:text-text-dark">
                            Don&apos;t have an account?{' '}
                            <Link to="/signup" className="text-accent font-medium hover:underline">Sign up</Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
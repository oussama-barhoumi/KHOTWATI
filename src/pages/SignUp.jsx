import { useState } from "react";
import { useAppStore } from "../store/UseAppStore";
import { useNavigate, Link } from "react-router-dom";
import { GlassNavbar } from "../layout/GlassNavbar";
import { motion } from "motion/react";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";


export function SignUp() {
    const [name, setName] = useState('');
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
        if (!name || !email || !password) {
            setError('Please fill in all fields');
            return;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }
        setLoading(true);
        try {
            setUser({
                id: '1',
                name,
                username: name.toLowerCase().replace(/\s/g, ''),
                email,
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + name,
            });
            navigate('/feed');
        } catch {
            setError('Sign up failed');
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
                        <h1 className="text-2xl font-bold text-charcoal dark:text-white mb-2">Create account</h1>
                        <p className="text-charcoal-light dark:text-text-dark mb-6">Join Khotwa and start sharing goals</p>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input label="Name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
                            <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
                            <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min 6 characters" />
                            {error && <p className="text-sm text-red-500">{error}</p>}
                            <div className="flex gap-2">
                                <Button type="button" variant="ghost" className="flex-1" onClick={handleCancel}>Cancel</Button>
                                <Button type="submit" className="flex-1" loading={loading}>Create account</Button>
                            </div>
                        </form>
                        <p className="mt-6 text-center text-sm text-charcoal dark:text-text-dark">
                            Already have an account?{' '}
                            <Link to="/login" className="text-accent font-medium hover:underline">Log in</Link>
                        </p>
                    </div>
                </div>
            </motion.div>

        </div>
    );
}
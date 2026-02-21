import { useState } from "react";
import { useAppStore } from "../store/UseAppStore";
import { useNavigate, Link } from "react-router-dom";
import { GlassNavbar } from "../layout/GlassNavbar";
import { motion } from "motion/react";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";

export function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const setUser = useAppStore((s) => s.setUser);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        if (!name || !email || !password) {
            setError("Please fill in all fields");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            setError("Invalid email format");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        const existingUser = JSON.parse(localStorage.getItem("user"));

        if (existingUser && existingUser.email === email) {
            setError("Account already exists. Please login.");
            return;
        }

        const newUser = {
            id: Date.now().toString(),
            name,
            email,
            password,
            avatar:
                "https://api.dicebear.com/7.x/avataaars/svg?seed=" + name,
        };

        localStorage.setItem("user", JSON.stringify(newUser));
        setUser(newUser);

        navigate("/feed");
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
                        <h1 className="text-2xl font-bold mb-6">Create account</h1>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} />
                            <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                            {error && <p className="text-sm text-red-500">{error}</p>}

                            <Button type="submit" className="w-full" loading={loading}>
                                Sign Up
                            </Button>
                        </form>

                        <p className="mt-6 text-center text-sm">
                            Already have an account?{" "}
                            <Link to="/login" className="text-accent font-medium">
                                Log in
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
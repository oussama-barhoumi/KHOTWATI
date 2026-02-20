import { motion, AnimatePresence } from 'motion/react'
import { useRef, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IconMoon,IconSun } from "../constant/icon/Icon";
import { useAppStore }  from "../store/UseAppStore"
import { Button } from '../components/ui/Button';


export  const GlassNavbar = () => {
  const { user, toggleTheme, theme, logout } = useAppStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setShowUserMenu(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
  };

    return (
        <>
        <motion.nav
        initial={{y: -20 , opacity: 0 }}
        animate = {{y: 0 , opacity : 1}}
        className="fixed top-0 left-0 right-0 z-40  bg-white/40 dark:bg-white/5 backdrop-blur-xl  border-b border-white/20 dark:border-white/5"
        >
            <div className="max-w-7xl mx-auto pw-4 sm:px-6 lg:px-8" >
            <div className="flex items-center justify-between h-16">
                <Link to="/"  className="text-2xl  font-bold bg-linear-to-r from-accent  to-accent-light  bg-clip-text text-transparent">
                <span>
                    Khotwa
                </span>
                </Link>
                <div className="hidden md:flex items-center gap-2 ">
                    <Link 
                    to="/"
                    className={` px-4 py-2 rounded-xl  text-sm font-medium traansition-colors  ${
                        location.pathname === '/' ? 'text-accent bg-accent/10  ' : 'text-charcoal  dark:text-white hover:text-accent   hover:bg-accent/10'
                    } `} >
                        Feed
                    </Link>
                    <Link to= "/groups"
                    className={` px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                        location.pathname === '/groups ' ?  'text-accent  bg-accent/10 ' :'text-charcoal   dark:text-white    hover:text-accent  hover:bg-accent/10' 
                    }`}>
                        Groups
                    </Link>

                </div>


            <div className="flex items-center gap-3">
            <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-accent/10 hover:text-accent dark:hover:bg-accent/20 transition-colors"
            aria-label="Toggle theme"
            >
            {theme === 'light' ? (
                <IconMoon className="w-5 h-5 text-charcoal" />
            ) : (
                <IconSun className="w-5 h-5 text-white" />
            )}
            </button>
            {user ? (
            <div className="relative" ref={menuRef}>
                <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="focus:outline-none"
                >
                <img
                    src={user.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=user'}
                    alt={user.name}
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-accent/40 cursor-pointer hover:ring-accent transition-colors"
                />
                </button>
                <AnimatePresence>
                {showUserMenu && (
                    <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="absolute right-0 mt-2 w-40 py-1 bg-white/90 dark:bg-charcoal backdrop-blur-xl rounded-xl border border-white/25 dark:border-white/10 shadow-xl z-100"
                    >
                    <Link
                        to="/profile"
                        onClick={() => setShowUserMenu(false)}
                        className="block px-4 py-2 text-sm text-charcoal dark:text-white hover:bg-white/50 dark:hover:bg-white/10"
                    >
                        Profile
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-500/10"
                    >
                        Log out
                    </button>
                    </motion.div>
                )}
                </AnimatePresence>
            </div>
            ) : (
            <>
                <Link to="/login">
                <Button variant="ghost" size="sm">Log in</Button>
                </Link>
                <Link to="/signup">
                <Button variant="primary" size="sm">Sign up</Button>
                </Link>
            </>
            )}
        </div>
            


            </div>
            </div>

        </motion.nav>

        
            
        </>
    );
};


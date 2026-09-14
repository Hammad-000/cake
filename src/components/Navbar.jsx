import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaHome, 
  FaUtensils, 
  FaInfoCircle, 
  FaEnvelope, 
  FaShoppingCart, 
  FaSun, 
  FaMoon 
} from "react-icons/fa";
import { GiCakeSlice } from "GiCakeSlice" in "react-icons/gi" ? "react-icons/gi" : "react-icons/gi"; // standard import below
import { GiCakeSlice } from "react-icons/gi";
import { IoLogInOutline, IoLogOut } from "react-icons/io5";
import { BiSolidDashboard } from "react-icons/bi";
import { useCart } from "./CartContext";

const THEMES = {
  light: {
    navBg: "bg-white/95 backdrop-blur-md border-slate-200",
    text: "text-slate-600",
    hoverBg: "hover:bg-slate-100 hover:text-slate-900",
    activeBg: "bg-pink-500 text-white shadow-lg shadow-pink-500/20",
    logoBg: "bg-pink-500 text-white",
    cartBadge: "bg-pink-500 text-white",
  },
  dark: {
    navBg: "bg-[#1c0d0a]/95 backdrop-blur-md border-zinc-800",
    text: "text-[#f3e5d8]",
    hoverBg: "hover:bg-zinc-800/80 hover:text-white",
    activeBg: "bg-pink-600 text-white shadow-lg shadow-black/30",
    logoBg: "bg-pink-600 text-white",
    cartBadge: "bg-amber-300 text-pink-900",
  },
};

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalItems } = useCart();

  const [activePath, setActivePath] = useState(location.pathname);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("light");
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  useEffect(() => {
    setActivePath(location.pathname);
    setIsMobileMenuOpen(false); 
  }, [location]);

  const theme = THEMES[currentTheme];

  const navItems = [
    { path: "/", label: "Home", icon: FaHome },
    { path: "/menu", label: "Menu", icon: FaUtensils },
    { path: "/about", label: "About", icon: FaInfoCircle },
    { path: "/contact", label: "Contact", icon: FaEnvelope },
    ...(isLoggedIn
      ? [
          { path: "/dashboard", label: "Dashboard", icon: BiSolidDashboard },
          { path: "/logout", label: "Logout", icon: IoLogOut },
        ]
      : [{ path: "/login", label: "Login", icon: IoLogInOutline }]),
  ];

  const toggleTheme = () => {
    const nextTheme = currentTheme === "light" ? "dark" : "light";
    setCurrentTheme(nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
  };

  return (
    <nav className={`sticky top-0 z-50 border-b transition-colors duration-300 ${theme.navBg}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => navigate("/")}
          >
            <div className={`p-2.5 rounded-2xl shadow-md transition-all duration-300 group-hover:rotate-12 ${theme.logoBg}`}>
              <GiCakeSlice className="text-2xl" />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight drop-shadow-sm">
              <span className="text-brand-primary">Cakes</span>
              <span className="text-brand-secondary">Villa</span>
            </h1>
          </motion.div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center space-x-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePath === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`relative flex items-center space-x-2 px-4 py-2.5 rounded-2xl font-medium text-sm transition-all duration-200 cursor-pointer ${
                    isActive ? theme.activeBg : `${theme.text} ${theme.hoverBg}`
                  }`}
                >
                  <Icon className="text-base" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Action Buttons (Cart & Theme Toggle) */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Cart Button */}
            <button
              onClick={() => navigate("/cart")}
              className={`relative flex items-center space-x-2 px-4 py-2.5 rounded-2xl font-medium text-sm transition-all duration-200 cursor-pointer ${
                activePath === "/cart" ? theme.activeBg : `${theme.text} ${theme.hoverBg}`
              }`}
            >
              <FaShoppingCart className="text-base" />
              <span>Cart</span>
              {totalItems > 0 && (
                <span className={`absolute -top-1.5 -right-1.5 text-xs font-bold rounded-full h-5 min-w-[20px] px-1 flex items-center justify-center shadow-md animate-bounce ${theme.cartBadge}`}>
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </button>

            {/* Theme Toggle Button */}
            <motion.button
              whileTap={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
              onClick={toggleTheme}
              title={`Switch Theme (Current: ${currentTheme})`}
              className={`p-3 rounded-2xl transition-all duration-200 border border-white/10 dark:border-zinc-800 ${theme.text} ${theme.hoverBg} cursor-pointer`}
            >
              {currentTheme === "dark" ? <FaSun className="text-base text-amber-400" /> : <FaMoon className="text-base text-slate-700" />}
            </motion.button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-xl ${theme.text} cursor-pointer`}
            >
              {currentTheme === "dark" ? <FaSun className="text-lg text-amber-400" /> : <FaMoon className="text-lg text-slate-700" />}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2.5 rounded-xl ${theme.text} hover:bg-white/10 text-2xl focus:outline-none cursor-pointer`}
            >
              {isMobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu with Framer Motion */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden overflow-hidden"
            >
              <div className="pt-2 pb-6 space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activePath === item.path;
                  return (
                    <button
                      key={item.path}
                      onClick={() => navigate(item.path)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                        isActive ? theme.activeBg : `${theme.text} ${theme.hoverBg}`
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="text-base" />
                        <span>{item.label}</span>
                      </div>
                    </button>
                  );
                })}

                {/* Mobile Cart Button */}
                <button
                  onClick={() => navigate("/cart")}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                    activePath === "/cart" ? theme.activeBg : `${theme.text} ${theme.hoverBg}`
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <FaShoppingCart className="text-base" />
                    <span>Cart</span>
                  </div>
                  {totalItems > 0 && (
                    <span className={`text-xs font-bold rounded-full h-5 min-w-[20px] px-1 flex items-center justify-center ${theme.cartBadge}`}>
                      {totalItems > 99 ? "99+" : totalItems}
                    </span>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

export default Navbar;
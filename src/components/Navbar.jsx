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
import { GiCakeSlice } from "react-icons/gi";
import { IoLogInOutline, IoLogOut } from "react-icons/io5";
import { BiSolidDashboard } from "react-icons/bi";
import { useCart } from "./CartContext";
import { useTheme } from "../context/ThemeContext";
import "./Navbar.css"; // <- CSS file imported here

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const { theme: currentTheme, toggleTheme } = useTheme();

  const [activePath, setActivePath] = useState(location.pathname);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  useEffect(() => {
    setActivePath(location.pathname);
    setIsMobileMenuOpen(false); 
  }, [location]);

  const themeClass = currentTheme === "dark" ? "navbar-dark" : "navbar-light";

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

  return (
    <nav className={`sticky top-0 z-50 border-b transition-colors duration-300 ${themeClass}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="navbar-container">
          
          {/* Brand Logo */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => navigate("/")}
          >
            <div className={`p-2.5 rounded-2xl shadow-md transition-all duration-300 group-hover:rotate-12 logo-box`}>
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
                    isActive ? "nav-link-active" : `nav-link-hover`
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
                activePath === "/cart" ? "nav-link-active" : `nav-link-hover`
              }`}
            >
              <FaShoppingCart className="text-base" />
              <span>Cart</span>
              {totalItems > 0 && (
                <span className={`absolute -top-1.5 -right-1.5 text-xs font-bold rounded-full h-5 min-w-[20px] px-1 flex items-center justify-center shadow-md animate-bounce cart-badge`}>
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
              className={`p-3 rounded-2xl transition-all duration-200 border border-white/10 dark:border-zinc-800 nav-link-hover cursor-pointer`}
            >
              {currentTheme === "dark" ? <FaSun className="text-base text-amber-400" /> : <FaMoon className="text-base text-slate-700" />}
            </motion.button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl cursor-pointer"
            >
              {currentTheme === "dark" ? <FaSun className="text-lg text-amber-400" /> : <FaMoon className="text-lg text-slate-700" />}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-xl hover:bg-white/10 text-2xl focus:outline-none cursor-pointer"
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
                        isActive ? "nav-link-active" : `nav-link-hover`
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
                    activePath === "/cart" ? "nav-link-active" : `nav-link-hover`
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <FaShoppingCart className="text-base" />
                    <span>Cart</span>
                  </div>
                  {totalItems > 0 && (
                    <span className={`text-xs font-bold rounded-full h-5 min-w-[20px] px-1 flex items-center justify-center cart-badge`}>
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
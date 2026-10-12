import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  FaHome,
  FaUtensils,
  FaInfoCircle,
  FaEnvelope,
  FaShoppingCart,
  FaSun,
  FaMoon,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { GiCakeSlice } from "react-icons/gi";
import { IoLogInOutline, IoLogOut } from "react-icons/io5";
import { BiSolidDashboard } from "react-icons/bi";
import { useCart } from "./CartContext";
import { useTheme } from "../context/ThemeContext";

const baseDesktop =
  "relative flex items-center space-x-2 px-4 py-2.5 rounded-2xl font-medium text-sm transition-all duration-200 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";
const baseMobile =
  "w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

const desktopClass = ({ isActive }) =>
  `${baseDesktop} ${isActive ? "nav-link-active" : "nav-link-hover"}`;
const mobileClass = ({ isActive }) =>
  `${baseMobile} ${isActive ? "nav-link-active" : "nav-link-hover"}`;

function Navbar() {
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const { theme: currentTheme, toggleTheme } = useTheme();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // NOTE: abhi token localStorage se pada ja raha hai ("token" key).
  // Agar aap ke paas AuthContext hai to isay us se replace kar do,
  // warna login ke baad Navbar khud update nahi hoga.
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    try {
      return Boolean(localStorage.getItem("token"));
    } catch {
      return false;
    }
  });

  const closeMenu = () => setIsMobileMenuOpen(false);

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
    } catch {
      /* ignore */
    }
    setIsLoggedIn(false);
    closeMenu();
    navigate("/login");
  };

  const navItems = [
    { to: "/", label: "Home", icon: FaHome },
    { to: "/menu", label: "Menu", icon: FaUtensils },
    { to: "/about", label: "About", icon: FaInfoCircle },
    { to: "/contact", label: "Contact", icon: FaEnvelope },
    ...(isLoggedIn
      ? [{ to: "/dashboard", label: "Dashboard", icon: BiSolidDashboard }]
      : [{ to: "/login", label: "Login", icon: IoLogInOutline }]),
  ];

  const themeClass = currentTheme === "dark" ? "navbar-dark" : "navbar-light";
  const themeLabel =
    currentTheme === "dark" ? "Switch to light mode" : "Switch to dark mode";

  const ThemeIcon = ({ className }) =>
    currentTheme === "dark" ? (
      <FaSun className={`${className} text-amber-400`} />
    ) : (
      <FaMoon className={`${className} text-slate-700`} />
    );

  const CartBadge = ({ extra = "" }) =>
    totalItems > 0 ? (
      <span
        aria-label={`${totalItems} items in cart`}
        className={`text-xs font-bold rounded-full h-5 min-w-[20px] px-1 flex items-center justify-center cart-badge ${extra}`}
      >
        {totalItems > 99 ? "99+" : totalItems}
      </span>
    ) : null;

  return (
    <nav className={`sticky top-0 z-50 border-b transition-colors duration-300 ${themeClass}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="navbar-container">
          {/* Brand Logo */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              to="/"
              onClick={closeMenu}
              aria-label="Cakes Villa home"
              className="flex items-center space-x-3 group"
            >
              <div className="p-2.5 rounded-2xl shadow-md transition-all duration-300 group-hover:rotate-12 logo-box">
                <GiCakeSlice className="text-2xl" />
              </div>
              <h1 className="text-2xl font-extrabold tracking-tight drop-shadow-sm">
                <span className="text-brand-primary">Cakes</span>
                <span className="text-brand-secondary">Villa</span>
              </h1>
            </Link>
          </motion.div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center space-x-1.5">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink key={to} to={to} end={to === "/"} className={desktopClass}>
                <Icon className="text-base" />
                <span>{label}</span>
              </NavLink>
            ))}

            {isLoggedIn && (
              <button
                type="button"
                onClick={handleLogout}
                className={`${baseDesktop} nav-link-hover`}
              >
                <IoLogOut className="text-base" />
                <span>Logout</span>
              </button>
            )}
          </div>

          {/* Action Buttons (Cart & Theme Toggle) */}
          <div className="hidden lg:flex items-center space-x-3">
            <NavLink to="/cart" className={desktopClass}>
              <FaShoppingCart className="text-base" />
              <span>Cart</span>
              <CartBadge extra="absolute -top-1.5 -right-1.5 shadow-md" />
            </NavLink>

            <motion.button
              type="button"
              whileTap={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
              onClick={toggleTheme}
              aria-label={themeLabel}
              title={themeLabel}
              className="p-3 rounded-2xl transition-all duration-200 border border-white/10 dark:border-zinc-800 nav-link-hover cursor-pointer"
            >
              <ThemeIcon className="text-base" />
            </motion.button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={themeLabel}
              className="p-2.5 rounded-xl cursor-pointer"
            >
              <ThemeIcon className="text-lg" />
            </button>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              className="p-2.5 rounded-xl hover:bg-white/10 text-2xl cursor-pointer focus-visible:outline focus-visible:outline-2"
            >
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden overflow-hidden"
            >
              <div className="pt-2 pb-6 space-y-2">
                {navItems.map(({ to, label, icon: Icon }) => (
                  <NavLink
                    key={to}
                    to={to}
                    end={to === "/"}
                    onClick={closeMenu}
                    className={mobileClass}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="text-base" />
                      <span>{label}</span>
                    </div>
                  </NavLink>
                ))}

                <NavLink to="/cart" onClick={closeMenu} className={mobileClass}>
                  <div className="flex items-center space-x-3">
                    <FaShoppingCart className="text-base" />
                    <span>Cart</span>
                  </div>
                  <CartBadge />
                </NavLink>

                {isLoggedIn && (
                  <button
                    type="button"
                    onClick={handleLogout}
                    className={`${baseMobile} nav-link-hover`}
                  >
                    <div className="flex items-center space-x-3">
                      <IoLogOut className="text-base" />
                      <span>Logout</span>
                    </div>
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

export default Navbar;
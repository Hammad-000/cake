import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { 
  FaHome, 
  FaUtensils, 
  FaInfoCircle, 
  FaEnvelope, 
  FaShoppingCart, 
  FaSun, 
  FaMoon, 
  FaPalette 
} from "react-icons/fa";
import { GiCakeSlice } from "react-icons/gi";
import { IoLogInOutline, IoLogOut } from "react-icons/io5";
import { BiSolidDashboard } from "react-icons/bi";
import { useCart } from "./CartContext";

// Color presets
const THEMES = {
  pink: {
    navBg: "bg-pink-600/95 backdrop-blur-md border-pink-500",
    text: "text-amber-100",
    hoverBg: "hover:bg-pink-500 hover:text-white",
    activeBg: "bg-white text-pink-700 shadow-lg",
    logoBg: "bg-white text-pink-700",
    cartBadge: "bg-amber-300 text-pink-900",
  },
  dark: {
    navBg: "bg-slate-900/95 backdrop-blur-md border-slate-800",
    text: "text-slate-300",
    hoverBg: "hover:bg-slate-800 hover:text-white",
    activeBg: "bg-indigo-600 text-white shadow-lg",
    logoBg: "bg-indigo-600 text-white",
    cartBadge: "bg-indigo-500 text-white",
  },
  light: {
    navBg: "bg-white/95 backdrop-blur-md border-slate-200",
    text: "text-slate-600",
    hoverBg: "hover:bg-slate-100 hover:text-slate-900",
    activeBg: "bg-pink-500 text-white shadow-lg",
    logoBg: "bg-pink-500 text-white",
    cartBadge: "bg-pink-500 text-white",
  },
};

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalItems } = useCart();

  const [activePath, setActivePath] = useState(location.pathname);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("pink");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Auth state integration

  useEffect(() => {
    setActivePath(location.pathname);
    setIsMobileMenuOpen(false); // Route change hone par mobile menu automatically close hoga
  }, [location]);

  const theme = THEMES[currentTheme];

  // Dynamic Navigation Items
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
    const themeKeys = Object.keys(THEMES);
    const nextIndex = (themeKeys.indexOf(currentTheme) + 1) % themeKeys.length;
    setCurrentTheme(themeKeys[nextIndex]);
  };

  return (
    <nav className={`sticky top-0 z-50 border-b transition-colors duration-300 ${theme.navBg}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => navigate("/")}
          >
            <div className={`p-2.5 rounded-2xl shadow-md transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 ${theme.logoBg}`}>
              <GiCakeSlice className="text-2xl" />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight drop-shadow-sm">
              <span className={currentTheme === "light" ? "text-slate-900" : "text-white"}>Cakes</span>
              <span className={currentTheme === "light" ? "text-pink-600" : "text-pink-300"}>Villa</span>
            </h1>
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePath === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 cursor-pointer ${
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
              className={`relative flex items-center space-x-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 cursor-pointer ${
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
            <button
              onClick={toggleTheme}
              title={`Switch Theme (Current: ${currentTheme})`}
              className={`p-3 rounded-xl transition-all duration-200 border border-white/10 ${theme.text} ${theme.hoverBg}`}
            >
              {currentTheme === "pink" && <FaPalette className="text-base" />}
              {currentTheme === "dark" && <FaMoon className="text-base" />}
              {currentTheme === "light" && <FaSun className="text-base text-amber-500" />}
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-xl ${theme.text}`}
            >
              {currentTheme === "pink" && <FaPalette className="text-lg" />}
              {currentTheme === "dark" && <FaMoon className="text-lg" />}
              {currentTheme === "light" && <FaSun className="text-lg text-amber-500" />}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2.5 rounded-xl ${theme.text} hover:bg-white/10 text-2xl focus:outline-none`}
            >
              {isMobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isMobileMenuOpen ? "max-h-96 opacity-100 pb-6" : "max-h-0 opacity-0"
          }`}
        >
          <div className="pt-2 space-y-1.5">
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
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaHome, FaUtensils, FaInfoCircle, FaEnvelope, FaShoppingCart } from "react-icons/fa";
import { useCart } from './CartContext';
import { GiCakeSlice } from "react-icons/gi";
import { IoLogInOutline } from "react-icons/io5";
import { BiSolidDashboard } from "react-icons/bi";



function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activePath, setActivePath] = useState(location.pathname);
  const { totalItems } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  const navItems = [
    { path: "/", label: "Home", icon: FaHome },
    { path: "/menu", label: "Menu", icon: FaUtensils },
    { path: "/about", label: "About", icon: FaInfoCircle },
    { path: "/contact", label: "Contact", icon: FaEnvelope },
    { path: "/login", label: "Login", icon: IoLogInOutline },
    { path: "/dashboard", label: "Dashboard", icon:BiSolidDashboard},
  ];

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="navbar sticky top-0 z-50 bg-pink-500 p-4 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group" 
            onClick={() => navigate("/")}
          >
            <div className="bg-white p-2 rounded-full group-hover:rotate-12 transition-transform duration-300">
              <GiCakeSlice className="text-pink-700 text-2xl" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Cakes<span className="text-white">Villa</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePath === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-semibold
                    transition-all duration-300 transform hover:scale-105 cursor-pointer
                    ${isActive 
                      ? 'bg-white text-pink-700 shadow-md' 
                      : 'text-amber-100 hover:bg-pink-400 hover:text-white'
                    }`}
                >
                  <Icon className="text-lg" />
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* Cart */}
            <div className="relative ml-4">
              <button
                onClick={() => navigate("/cart")}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-semibold
                  transition-all duration-300 transform hover:scale-105 cursor-pointer
                  ${activePath === "/cart"
                    ? 'bg-white text-pink-700 shadow-md' 
                    : 'text-amber-100 hover:bg-pink-400 hover:text-white'
                  }`}
              >
                <FaShoppingCart className="text-lg" />
                <span>Cart</span>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-white text-pink-600 text-s font-bold 
                         rounded-full h-6 w-6 flex items-center justify-center animate-pulse shadow-lg">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white text-3xl transition-transform duration-300 transform hover:text-amber-200"
            onClick={toggleMobileMenu} 
          >
            {isMobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden mt-4 space-y-2 overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "max-h-screen" : "max-h-0"}`}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePath === item.path;
            return (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg font-semibold
                  transition-all duration-300
                  ${isActive 
                    ? 'bg-white text-pink-700 shadow-md' 
                    : 'text-amber-100 hover:bg-pink-800 hover:text-white'
                  }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="text-lg" />
                  <span>{item.label}</span>
                </div>
              </button>
            );
          })}

          {/* Mobile Cart */}
          <button
            onClick={() => {
              navigate("/cart");
              setIsMobileMenuOpen(false);
            }}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg font-semibold
              transition-all duration-300
              ${activePath === "/cart"
                ? 'bg-white text-pink-700 shadow-md' 
                : 'text-amber-100 hover:bg-pink-800 hover:text-white'
              }`}
          >
            <div className="flex items-center space-x-3">
              <FaShoppingCart className="text-lg" />
              <span>Cart</span>
            </div>
            {totalItems > 0 && (
              <span className="bg-white text-pink-500 text-xs font-bold 
                     rounded-full h-6 w-6 flex items-center justify-center">
                {totalItems > 99 ? '99+' : totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
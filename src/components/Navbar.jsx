import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaHome, FaUtensils, FaInfoCircle, FaEnvelope, FaShoppingCart } from "react-icons/fa";
import { useCart } from './CartContext';
import { GiCakeSlice } from "react-icons/gi";


function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activePath, setActivePath] = useState(location.pathname);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const { totalItems } = useCart();

  // Update active path when location changes
  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  // Navigation Items
  const navItems = [
    { path: "/", label: "Home", icon: FaHome },
    { path: "/menu", label: "Menu", icon: FaUtensils },
    { path: "/about", label: "About", icon: FaInfoCircle },
    { path: "/contact", label: "Contact", icon: FaEnvelope },
   
  ];

  

 

  return (
    <>
      <nav className="navbar sticky top-0 z-50 bg-gradient-to-r from-pink-600 to-purple-500 p-4 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo/Brand */}
            <div 
              className="flex items-center space-x-3 cursor-pointer group" 
              onClick={() => navigate("/")}
            >
              <div className="bg-white p-2 rounded-full group-hover:rotate-12 transition-transform duration-300">
                <GiCakeSlice 
className="text-amber-700 text-2xl" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">
                 Cakes<span className="text-amber-200">Villa</span>
                </h1>
               
              </div>
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
                    className={`
                      flex items-center space-x-2 px-4 py-3 rounded-lg font-semibold 
                      transition-all duration-300 transform hover:scale-105
                      ${isActive 
                        ? 'bg-white text-pink-700 shadow-md' 
                        : 'text-amber-100 hover:bg-purple-800 hover:text-white'
                      }
                    `}
                  >
                    <Icon className="text-lg" />
                    <span>{item.label}</span>
                  </button>
                );
              })}

              {/* Cart with badge */}
              <div className="relative ml-4">
                <button
                  onClick={() => navigate("/cart")}
                  className={`
                    flex items-center space-x-2 px-4 py-3 rounded-lg font-semibold
                    transition-all duration-300 transform hover:scale-105
                    ${activePath === "/cart"
                      ? 'bg-white text-pink-700 shadow-md' 
                      : 'text-amber-100 hover:bg-purple-800 hover:text-white'
                    }
                  `}
                >
                  <FaShoppingCart className="text-lg" />
                  <span>Cart</span>
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold 
                           rounded-full h-6 w-6 flex items-center justify-center 
                           animate-pulse shadow-lg">
                      {totalItems > 99 ? '99+' : totalItems}
                    </span>
                  )}
                </button>
              </div>

            
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-white text-2xl hover:text-amber-200 transition-colors">
              ☰
            </button>
          </div>

          {/* Mobile Navigation (Fixed - no isCart error) */}
          <div className="md:hidden mt-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePath === item.path;
              
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`
                    w-full flex items-center justify-between px-4 py-3 rounded-lg font-semibold
                    transition-all duration-300
                    ${isActive 
                      ? 'bg-white text-amber-700 shadow-md' 
                      : 'text-amber-100 hover:bg-amber-800 hover:text-white'
                    }
                  `}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="text-lg" />
                    <span>{item.label}</span>
                  </div>
                </button>
              );
            })}
            
            {/* Cart in Mobile Menu */}
            <button
              onClick={() => navigate("/cart")}
              className={`
                w-full flex items-center justify-between px-4 py-3 rounded-lg font-semibold
                transition-all duration-300
                ${activePath === "/cart"
                  ? 'bg-white text-pink-700 shadow-md' 
                  : 'text-amber-100 hover:bg-pink-800 hover:text-white'
                }
              `}
            >
              <div className="flex items-center space-x-3">
                <FaShoppingCart className="text-lg" />
                <span>Cart</span>
              </div>
              {totalItems > 0 && (
                <span className="bg-red-500 text-white text-xs font-bold 
                       rounded-full h-6 w-6 flex items-center justify-center">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </button>
            
     
          </div>
        </div>
      </nav>

   
    </>
  );
}

export default Navbar;
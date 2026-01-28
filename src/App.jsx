import React from "react";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Error from "./pages/Error";
import Contact from "./pages/Contact";
import ProductDetailpg from "./pages/ProductDetailpg";
import Cart from "./pages/Cart";
import { CartProvider } from "./components/CartContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
// import { AuthProvider, useAuth } from "./context/AuthContext";
// import Dashboard from "./Dashobard-Elements/Dashboard"

function App() {
  return (
    <CartProvider>
      <Router>
        {/* Navbar should be outside the Routes to be present on all pages */}
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/about" element={<About />} />
            <Route path="/product/:id" element={<ProductDetailpg />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile" element={<div>Profile Page</div>} />
            <Route path="*" element={<Error />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;

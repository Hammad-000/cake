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
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            {/* Use ProtectedRoute inside a <Route /> */}
           <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
            <Route path="/about" element={<About />} />
            <Route path="/product/:id" element={<ProductDetailpg />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
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
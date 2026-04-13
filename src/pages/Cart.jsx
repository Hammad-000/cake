import React, { useState } from "react";
import { useCart } from "../components/CartContext";
import FooterContent from "../components/FooterContent";
import { Link, useNavigate } from 'react-router-dom';
import { FaRegTrashCan } from "react-icons/fa6";
import { IoLogInOutline } from "react-icons/io5";

function Cart() {
  const { cart, removeFromCart, incrementQuantity, decrementQuantity, calculateTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderError, setOrderError] = useState("");

  const [customerInfo, setCustomerInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({ ...prev, [name]: value }));
  };

  const saveOrderToBackend = async (orderData) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("You must be logged in to place an order.");
    }

    const response = await fetch("https://cakes-backend-gamma.vercel.app/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(orderData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to save order");
    }
    return await response.json();
  };

  const handleConfirmOrder = async (e) => {
    e.preventDefault();

    const phoneRegex = /^\d{10,15}$/;
    if (!phoneRegex.test(customerInfo.phone)) {
      alert("Please enter a valid phone number (10-15 digits).");
      return;
    }

    if (!customerInfo.fullName || !customerInfo.email || !customerInfo.address || !customerInfo.phone) {
      alert("Please fill in all required fields.");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    setIsSubmitting(true);
    setOrderError("");

    try {
      const items = cart.map(item => ({
        product: item.id,
        quantity: item.quantity
      }));

      const orderData = {
        items,
        customer: customerInfo
      };

      const savedOrder = await saveOrderToBackend(orderData);
      console.log("Order saved:", savedOrder);

      clearCart();
      setCustomerInfo({ fullName: "", email: "", phone: "", address: "", city: "" });

      alert("Order placed successfully! Thank you for your purchase.");
      navigate("/menu");
    } catch (err) {
      console.error("Order error:", err);
      setOrderError(err.message);
      alert(`Failed to place order: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = customerInfo.fullName && customerInfo.email && customerInfo.address && customerInfo.phone;
  const token = localStorage.getItem("authToken");
  const isLoggedIn = !!token;

  const handleLogin = () => navigate('/login');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col">
      <div className="grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">Your Shopping Cart</h2>
          <p className="text-gray-600 font-bold">Review your items and complete your purchase</p>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-16 max-w-md mx-auto">
            <div className="text-7xl mb-6 animate-bounce">🛒</div>
            <p className="text-2xl font-semibold text-gray-800 mb-3">Your cart is empty</p>
            <p className="text-gray-500 mb-6">It seems you haven't added any delicious items yet!</p>
            <Link
              to="/menu"
              className="px-8 py-4 text-white bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-pink-300 inline-flex items-center gap-2"
            >
              <span>Explore Our Menu</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 mb-8">
              <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
                <h3 className="text-xl font-bold text-gray-800">Cart Items ({cart.length})</h3>
              </div>

              <div className="divide-y divide-gray-100">
                {cart.map((product) => (
                  <div key={product.id} className="p-6 flex flex-col sm:flex-row items-center gap-6 hover:bg-blue-50/50 transition-all duration-300 group">
                    <div className="shrink-0">
                      <div className="relative">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-24 h-24 object-cover rounded-xl border-2 border-white shadow-md group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                          {product.quantity}
                        </div>
                      </div>
                    </div>

                    <div className="grow text-center sm:text-left">
                      <h4 className="font-bold text-gray-800 line-clamp-2 mb-2 text-lg">
                        {product.title}
                      </h4>
                      <p className="text-xl font-bold text-green-600">
                        Rs {product.price.toFixed()}
                      </p>
                    </div>

                    <div className="flex items-center space-x-3 bg-gray-100 rounded-xl p-1">
                      <button
                        onClick={() => decrementQuantity(product.id)}
                        className="w-10 h-10 flex items-center justify-center bg-white rounded-lg hover:bg-gray-200 transition-all duration-200 cursor-pointer hover:bg-red-600 shadow-sm hover:shadow"
                      >
                        <span className="text-xl font-bold text-gray-600">−</span>
                      </button>
                      <span className="w-10 text-center font-bold text-gray-800 text-lg">
                        {product.quantity}
                      </span>
                      <button
                        onClick={() => incrementQuantity(product.id)}
                        className="w-10 h-10 flex items-center justify-center bg-white rounded-lg hover:bg-gray-200 transition-all duration-200 shadow-sm cursor-pointer hover:bg-green-500 hover:shadow"
                      >
                        <span className="text-xl font-bold text-gray-600">+</span>
                      </button>
                    </div>

                    <div className="flex flex-col items-center gap-4">
                      <div className="text-center">
                        <p className="text-sm text-gray-500">Total</p>
                        <span className="text-2xl font-bold">
                          Rs {(product.price * product.quantity).toFixed(2)}
                        </span>
                      </div>
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="text-red-500 hover:text-red-600 text-m cursor-pointer font-semibold transition-colors flex items-center gap-1 hover:gap-0.5"
                      >
                        <FaRegTrashCan />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Show login prompt if not logged in */}
            {!isLoggedIn ? (
              <div className="text-center py-16 max-w-md mx-auto flex flex-col items-center justify-center">
                <p className="text-2xl font-semibold text-gray-800 mb-3">You need to log in to confirm your order</p>
                <button
                  onClick={handleLogin}
                  className="px-8 py-4 text-white bg-gradient-to-r flex items-center justify-center cursor-pointer from-green-500 to-emerald-600 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-green-300"
                >
                  <span>Log in</span>
                  <IoLogInOutline className="ml-2 text-lg" />
                </button>
              </div>
            ) : (
              /* Order Summary and Customer Info Form */
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-800 mb-6">Delivery Information</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            placeholder="Full Name *"
                            value={customerInfo.fullName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border rounded-xl focus:ring-pink-500 focus:border-pink-500"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email *"
                            value={customerInfo.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border rounded-xl"
                          />
                        </div>
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            placeholder="Phone Number *"
                            value={customerInfo.phone}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border rounded-xl"
                          />
                        </div>
                        <div>
                          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                            Address *
                          </label>
                          <input
                            type="text"
                            id="address"
                            name="address"
                            placeholder="Address *"
                            value={customerInfo.address}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border rounded-xl"
                          />
                        </div>
                        <div>
                          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                            City (optional)
                          </label>
                          <input
                            type="text"
                            id="city"
                            name="city"
                            placeholder="City (optional)"
                            value={customerInfo.city}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border rounded-xl"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg p-6 border border-blue-100">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b border-blue-100">Order Summary</h3>
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-semibold text-gray-800">Rs {calculateTotalPrice().toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Shipping</span>
                        <span className="font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full text-sm">Free</span>
                      </div>
                      <div className="border-t border-blue-100 pt-4 flex justify-between items-center">
                        <span className="text-lg font-bold text-gray-800">Total Amount</span>
                        <div className="text-right">
                          <p className="text-2xl font-bold">Rs {calculateTotalPrice().toFixed(2)}</p>
                          <p className="text-xs text-gray-500">Inclusive of all taxes</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                    {orderError && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-xl">{orderError}</div>}
                    <button
                      onClick={handleConfirmOrder}
                      disabled={!isFormValid || isSubmitting}
                      className={`w-full py-4 px-4 rounded-xl font-bold text-white transition-all duration-300 transform ${
                        isFormValid && !isSubmitting
                          ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 hover:shadow-lg hover:scale-[1.02] cursor-pointer shadow-lg shadow-green-200'
                          : 'bg-gray-300 cursor-not-allowed'
                      }`}
                    >
                      {isSubmitting ? "Placing Order..." : "Confirm Order"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <FooterContent />
    </div>
  );
}

export default Cart;
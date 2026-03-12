import React, { useState } from "react";
import { useCart } from "../components/CartContext";
import FooterContent from "../components/FooterContent";
import { Link } from 'react-router-dom';
import { FaRegTrashCan } from "react-icons/fa6";

function Cart() {
  const { cart, removeFromCart, incrementQuantity, decrementQuantity, calculateTotalPrice } = useCart();
  const [customerInfo, setCustomerInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    country: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

 const handleConfirmOrder = (e) => {
  e.preventDefault();

  // Basic validation for phone number format (assuming it should be digits only)
  const phoneRegex = /^\d{10,15}$/;  // Adjust to your country's phone format
  if (!phoneRegex.test(customerInfo.phone)) {
    alert("Please enter a valid phone number.");
    return;
  }

  // Format the message for WhatsApp
  const message = `
    *New Order from Cakes Villa*\n
    _Customer Details:_\n
    Full Name: ${customerInfo.fullName}\n
    Phone: ${customerInfo.phone}\n
    Address: ${customerInfo.address}\n
    _Cart Details:_\n
    ${cart.map(product => `${product.title} x${product.quantity} - $${(product.price * product.quantity).toFixed(2)}`).join('\n')}\n\n
    _Total Price:_ $${calculateTotalPrice().toFixed(2)}\n
    *Thank you for your order!*
  `;

  // Encode the message for the URL
  const encodedMessage = encodeURIComponent(message);

  // Your phone number
  const phoneNumber = "923110250787";  

  // Format the WhatsApp link
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  // Open the WhatsApp link in a new window/tab
  window.open(whatsappLink, "_blank");

  // Optionally, log the data or alert for confirmation
  console.log("Order confirmed:", { customerInfo, cart, total: calculateTotalPrice() });
  alert("Order confirmed successfully! You will be redirected to WhatsApp.");
};

  const isFormValid = customerInfo.fullName && customerInfo.email && customerInfo.address && customerInfo.phone;

  return (
    <div className="min-h-screen bg-gradient-to-br   from-gray-50 to-blue-50 flex flex-col">
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
            <button className="group">
              <Link
                to="/menu"
                className="px-8 py-4 text-white bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-pink-300 inline-flex items-center gap-2"
              >
                <span>Explore Our Menu</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
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
                          ${product.price.toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">${(product.price * product.quantity).toFixed(2)} total</p>
                      </div>

                      <div className="flex items-center space-x-3 bg-gray-100 rounded-xl p-1">
                        <button
                          onClick={() => decrementQuantity(product.id)}
                          className="w-10 h-10 flex items-center justify-center bg-white rounded-lg hover:bg-gray-200 transition-all duration-200 cursor-pointer hover:bg-red-600 shadow-sm hover:shadow"
                          aria-label="Decrease quantity"
                        >
                          <span className="text-xl font-bold text-gray-600 cursor-pointer ">−</span>
                        </button>
                        <span className="w-10 text-center font-bold text-gray-800 text-lg">
                          {product.quantity}
                        </span>
                        <button
                          onClick={() => incrementQuantity(product.id)}
                          className="w-10 h-10 flex items-center justify-center bg-white rounded-lg hover:bg-gray-200 transition-all duration-200 shadow-sm cursor-pointer hover:bg-green-500 hover:shadow"
                          aria-label="Increase quantity"
                        >
                          <span className="text-xl font-bold text-gray-600 ">+</span>
                        </button>
                      </div>

                      <div className="flex flex-col items-center gap-4">
                        <div className="text-center">
                          <p className="text-sm text-gray-500">Total</p>
                          <span className="text-2xl font-bold ">
                            ${(product.price * product.quantity).toFixed(2)}
                          </span>
                        </div>
                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="text-red-500 hover:text-red-600 text-m cursor-pointer font-semibold transition-colors flex items-center gap-1 hover:gap-0.5"
                        >
                          <span><FaRegTrashCan /></span>
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg p-6 border border-blue-100">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b border-blue-100">Order Summary</h3>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold text-gray-800">${calculateTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full text-sm">Free</span>
                  </div>
               
                  <div className="border-t border-blue-100 pt-4 flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-800 ">Total Amount</span>
                    <div className="text-right">
                      <p className="text-2xl font-bold ">${(calculateTotalPrice() ).toFixed(2)}</p>
                      <p className="text-xs text-gray-500">Inclusive of all taxes</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <span className="text-blue-600 text-xl">👤</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Delivery Details</h3>
                    <p className="text-sm text-gray-500">Fill in your information</p>
                  </div>
                </div>

                <form onSubmit={handleConfirmOrder} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={customerInfo.fullName}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={customerInfo.email}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                        placeholder="john@example.com"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={customerInfo.phone}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                        placeholder="+1 (555) 123-4567"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Delivery Address *
                    </label>
                    <textarea
                      name="address"
                      value={customerInfo.address}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                      placeholder="123 Main St, Apartment 4B, New York, NY"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 ">
                    <div className="w-fit" >
                      <label className="block text-sm  font-semibold text-gray-700 mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={customerInfo.city}
                        onChange={handleInputChange}
                        className="p-3 border w-90 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                        placeholder="Karachi"
                      />
                    </div>

                  
                  </div>

                  <button
                    type="submit"
                    disabled={!isFormValid}
                    className={`w-full py-4 px-4 rounded-xl font-bold text-white transition-all duration-300 transform ${isFormValid
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 hover:shadow-lg hover:scale-[1.02] cursor-pointer shadow-lg shadow-green-200'
                        : 'bg-gray-300 cursor-not-allowed'
                      }`}
                  >
                    <div className="flex justify-between items-center">
                      <span>Confirm Order</span>
                      <span className="text-lg font-bold">${(calculateTotalPrice()).toFixed(2)}</span>
                    </div>
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
      <FooterContent />
    </div>
  );
}

export default Cart;

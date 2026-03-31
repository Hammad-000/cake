import React, { useState } from "react";
import axios from "axios";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import FooterContent from "../components/FooterContent";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setMessage(""); // Clear previous messages

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        formData
      );
      setMessage("Login successful!");
      localStorage.setItem("token", response.data.token); 
     navigate("/dashboard");; 
    } catch (error) {
      setMessage(error.response ? error.response.data.message : "Error logging in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 px-4 py-8 relative overflow-hidden">
      <div className="relative w-full max-w-6xl mx-auto z-10 mb-8">
        <div className="grid md:grid-cols-2 gap-8 items-center bg-white/40 backdrop-blur-lg rounded-3xl shadow-2xl p-6 md:p-8 border border-white/50">
          {/* Left side */}
          <div className="hidden md:block space-y-6">
            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent leading-tight">
              Welcome Back to Cake Villa!
            </h1>
            <p className="text-gray-700 text-lg">
              Login to continue your sweet journey. Enjoy personalized offers and easy access to your orders.
            </p>
            <div className="flex justify-center my-8">
              <img
                src="./images/Login-bro.png"
                alt="Celebration illustration"
                className="w-72 h-90 object-contain"
              />
            </div>
          </div>

          {/* Right side - Login Form */}
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
              Log In
            </h2>
            <p className="text-center text-gray-500 mb-8">
              Welcome back! Please log in to your account.
            </p>

            {message && (
              <div
                className={`text-center ${message.includes("Error") ? "text-red-500" : "text-green-500"} mb-4`}
              >
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email Address
                </label>
                <div
                  className={`flex items-center border rounded-xl px-4 transition-all duration-200 ${
                    errors.email
                      ? "border-red-400 ring-2 ring-red-100"
                      : "border-gray-300 focus-within:border-purple-400 focus-within:ring-2 focus-within:ring-purple-100"
                  }`}
                >
                  <FaEnvelope
                    className={`text-gray-400 mr-3 ${errors.email ? "text-red-400" : ""}`}
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full py-3 outline-none bg-transparent text-gray-700 placeholder-gray-400"
                    disabled={loading}
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.email}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Password
                </label>
                <div
                  className={`flex items-center border rounded-xl px-4 transition-all duration-200 ${
                    errors.password
                      ? "border-red-400 ring-2 ring-red-100"
                      : "border-gray-300 focus-within:border-purple-400 focus-within:ring-2 focus-within:ring-purple-100"
                  }`}
                >
                  <FaLock
                    className={`text-gray-400 mr-3 ${errors.password ? "text-red-400" : ""}`}
                  />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full py-3 outline-none bg-transparent text-gray-700 placeholder-gray-400"
                    disabled={loading}
                  />
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.password}</p>}
              </div>

              {/* Login button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3.5 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-pink-600 transform hover:-translate-y-0.5 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 mt-6"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Logging in...</span>
                  </>
                ) : (
                  <span className="cursor-pointer">Log In</span>
                )}
              </button>

              {/* Signup link */}
              <p className="text-center text-gray-600 pt-2">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-purple-600 font-semibold hover:text-purple-700 hover:underline transition-colors"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>

      <FooterContent />
    </div>
  );
}

export default Login;
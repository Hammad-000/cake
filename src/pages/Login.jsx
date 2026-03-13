import React, { useState } from "react";
import { FaEnvelope, FaLock, FaSignInAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import FooterContent from "../components/FooterContent";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear field-specific error when user types
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
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
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

    try {
      const response = await axios.post("http://your-backend-url/api/login", formData);
      // Assume the response contains a token
      const { token } = response.data;

      // Store the token (e.g., in localStorage)
      if (rememberMe) {
        localStorage.setItem("authToken", token);
      } else {
        sessionStorage.setItem("authToken", token);
      }

      // Navigate to the dashboard or home page after login
      navigate("/dashboard");

      alert("Login Successful!");
    } catch (error) {
      setLoading(false);
      // Handle errors such as wrong credentials
      if (error.response && error.response.data) {
        setErrors({
          email: error.response.data.message || "Invalid credentials",
        });
      } else {
        alert("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Background & main content */}
      <div className="relative w-full max-w-6xl z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center bg-white/40 backdrop-blur-lg rounded-3xl shadow-2xl p-6 md:p-8 border border-white/50">
          {/* Left side - Illustration & Benefits */}
          <div className="hidden md:block space-y-6">
            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent leading-tight">
              Welcome Back!
            </h1>
            <p className="text-gray-700 text-lg">
              Log in to continue your sweet journey with Cake Villa. Fresh cakes, easy ordering, and exclusive treats await.
            </p>
            <div className="flex justify-center my-8">
              <img src="./images/Login-bro.png" alt="Shopping illustration" className="w-72 h-72 object-contain" />
            </div>
          </div>

          {/* Login Form */}
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Login</h2>
            <p className="text-center text-gray-500 mb-8">Welcome back! Please enter your details.</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                <div className={`flex items-center border rounded-xl px-4 transition-all duration-200 ${errors.email ? 'border-red-400 ring-2 ring-red-100' : 'border-gray-300 focus-within:border-purple-400 focus-within:ring-2 focus-within:ring-purple-100'}`}>
                  <FaEnvelope className={`text-gray-400 mr-3 ${errors.email ? 'text-red-400' : ''}`} />
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

              {/* Password field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                <div className={`flex items-center border rounded-xl px-4 transition-all duration-200 ${errors.password ? 'border-red-400 ring-2 ring-red-100' : 'border-gray-300 focus-within:border-purple-400 focus-within:ring-2 focus-within:ring-purple-100'}`}>
                  <FaLock className={`text-gray-400 mr-3 ${errors.password ? 'text-red-400' : ''}`} />
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

              {/* Remember me & Forgot password */}
              <div className="flex justify-between items-center text-sm">
                <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500 cursor-pointer"
                    disabled={loading}
                  />
                  <span>Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-purple-600 hover:text-purple-700 font-medium transition-colors">
                  Forgot password?
                </Link>
              </div>

              {/* Login button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3.5 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-pink-600 transform hover:-translate-y-0.5 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {loading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <FaSignInAlt />
                )}
                <span className="cursor-pointer">Login</span>
              </button>

              {/* Sign up link */}
              <p className="text-center text-gray-600 pt-2">
                Don't have an account?{" "}
                <Link to="/signup" className="text-purple-600 font-semibold hover:text-purple-700 hover:underline transition-colors">
                  Sign up now
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
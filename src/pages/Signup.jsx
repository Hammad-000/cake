import React, { useState } from "react";
import axios from "axios"; 
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import FooterContent from "../components/FooterContent";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false, 
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
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
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!formData.agreeTerms) {
      newErrors.terms = "You must agree to the terms and conditions";
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
  setMessage("");

  try {
    const response = await axios.post(
      "https://cakes-backend-gamma.vercel.app/api/auth/register",
      formData
    );

    // ✅ API returns: { message, token, role }
    const { token, role } = response.data;

    // Store authentication data (so user stays logged in)
    localStorage.setItem("token", token);
    localStorage.setItem("userRole", role);
    // Optionally store user email/name if needed

    setMessage("Account created successfully! Please check your email to verify.");

    // Redirect based on role (should be "user" for normal signup)
    if (role === "admin") {
      navigate("/dashboard");
    } else {
      navigate("/"); // or "/login" or "/user-home"
    }
  } catch (error) {
    setMessage(error.response?.data?.message || "Registration failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 px-4 py-8 relative overflow-hidden">
      {/* Main content container with bottom margin */}
      <div className="relative w-full max-w-6xl mx-auto z-10 mb-8">
        <div className="grid md:grid-cols-2 gap-8 items-center bg-white/40 backdrop-blur-lg rounded-3xl shadow-2xl p-6 md:p-8 border border-white/50">
          {/* Left side */}
          <div className="hidden md:block space-y-6">
            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent leading-tight">
              Join Cake Villa!
            </h1>
            <p className="text-gray-700 text-lg">
              Create an account to unlock a world of sweet delights. Get personalized recommendations and exclusive offers.
            </p>
            <div className="flex justify-center my-8">
              <img 
                src="./images/signup.png" 
                alt="Celebration illustration"
                className="w-72 h-90 object-contain "
              />
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/60">
              <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <span className="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-400 rounded-full"></span>
                Member Benefits
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center gap-3">
                  <span className="text-2xl">🎁</span>
                  <span>Welcome discount on first order</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-2xl">⭐</span>
                  <span>Earn loyalty points with every purchase</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-2xl">📦</span>
                  <span>Free delivery on orders over $50</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right side - Signup Form */}
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
              Create Account
            </h2>
            <p className="text-center text-gray-500 mb-8">
              Join us today! It takes only a few steps.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Full Name
                </label>
                <div className={`flex items-center border rounded-xl px-4 transition-all duration-200 ${
                  errors.name 
                    ? 'border-red-400 ring-2 ring-red-100' 
                    : 'border-gray-300 focus-within:border-purple-400 focus-within:ring-2 focus-within:ring-purple-100'
                }`}>
                  <FaUser className={`text-gray-400 mr-3 ${errors.name ? 'text-red-400' : ''}`} />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full py-3 outline-none bg-transparent text-gray-700 placeholder-gray-400"
                    disabled={loading}
                  />
                </div>
                {errors.name && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email Address
                </label>
                <div className={`flex items-center border rounded-xl px-4 transition-all duration-200 ${
                  errors.email 
                    ? 'border-red-400 ring-2 ring-red-100' 
                    : 'border-gray-300 focus-within:border-purple-400 focus-within:ring-2 focus-within:ring-purple-100'
                }`}>
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

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Password
                </label>
                <div className={`flex items-center border rounded-xl px-4 transition-all duration-200 ${
                  errors.password 
                    ? 'border-red-400 ring-2 ring-red-100' 
                    : 'border-gray-300 focus-within:border-purple-400 focus-within:ring-2 focus-within:ring-purple-100'
                }`}>
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

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Confirm Password
                </label>
                <div className={`flex items-center border rounded-xl px-4 transition-all duration-200 ${
                  errors.confirmPassword 
                    ? 'border-red-400 ring-2 ring-red-100' 
                    : 'border-gray-300 focus-within:border-purple-400 focus-within:ring-2 focus-within:ring-purple-100'
                }`}>
                  <FaLock className={`text-gray-400 mr-3 ${errors.confirmPassword ? 'text-red-400' : ''}`} />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full py-3 outline-none bg-transparent text-gray-700 placeholder-gray-400"
                    disabled={loading}
                  />
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.confirmPassword}</p>}
              </div>

              {/* Terms and conditions */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 text-purple-600 cursor-pointer rounded border-gray-300 focus:ring-purple-500"
                  disabled={loading}
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the{" "}
                  <a href="#" className="text-purple-600 hover:underline">Terms of Service</a>{" "}
                  and{" "}
                  <a href="#" className="text-purple-600 hover:underline">Privacy Policy</a>
                </label>
              </div>
              {errors.terms && <p className="text-red-500 text-xs -mt-2">{errors.terms}</p>}

 {message && (
        <div className="max-w-6xl mx-auto mb-4">
          <div className={`p-3 rounded-lg text-center ${message.includes("success") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
            {message}
          </div>
        </div>
      )}
              {/* Signup button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r cursor-pointer from-purple-600 to-pink-500 text-white py-3.5 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-pink-600 transform hover:-translate-y-0.5 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 mt-6"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Creating account...</span>
                  </>
                ) : (
                  <span className="cursor-pointer">Sign Up</span>
                )}
              </button>

              {/* Login link */}
              <p className="text-center text-gray-600 pt-2">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-purple-600 font-semibold  hover:text-purple-700 hover:underline transition-colors"
                >
                  Log in
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

export default Signup;
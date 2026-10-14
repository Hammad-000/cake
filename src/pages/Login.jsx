import React, { useState } from "react";
import axios from "axios";
import { motion, MotionConfig } from "framer-motion";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import FooterContent from "../components/FooterContent";
import { useAuth } from "../context/AuthContext";

const fieldWrap = (hasError) =>
  `flex items-center rounded-xl border bg-gray-50 dark:bg-zinc-900/60 px-4 transition-all duration-200 ${
    hasError
      ? "border-red-400 ring-2 ring-red-100 dark:ring-red-900/40"
      : "border-gray-200 dark:border-zinc-700 focus-within:border-pink-500 focus-within:ring-2 focus-within:ring-pink-200 dark:focus-within:ring-pink-900/50"
  }`;

const inputClass =
  "w-full bg-transparent py-3 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none disabled:opacity-60";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (serverError) setServerError("");
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Enter your email address.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!formData.password) {
      newErrors.password = "Enter your password.";
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
    setServerError("");

    try {
      const response = await axios.post(
        "https://cakes-backend-gamma.vercel.app/api/auth/login",
        formData
      );

      // Destructure both token and role from response
      const { token, role } = response.data;

      // Store token & role via AuthContext (handles localStorage)
      login(token, role);

      // Redirect based on role
      if (role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      setServerError(
        error.response?.data?.message ||
          "We could not log you in. Check your details and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-gradient-to-b from-rose-50/60 via-orange-50/30 to-white dark:bg-[#1c0d0a] dark:bg-none dark:text-[#f3e5d8] px-4 py-8 relative overflow-hidden">
        {/* soft background glows, same as the Projects/Menu pages */}
        <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden="true">
          <div className="absolute left-1/4 top-0 h-64 w-64 rounded-full bg-pink-500/10 blur-[80px] md:h-96 md:w-96 md:blur-[128px]" />
          <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-orange-400/10 blur-[80px] md:h-96 md:w-96 md:blur-[128px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative z-10 mx-auto mb-8 w-full max-w-6xl"
        >
          <div className="grid items-center gap-8 rounded-3xl border border-gray-100 dark:border-zinc-800 bg-white/60 dark:bg-[#26120e]/60 p-6 shadow-xl shadow-gray-100/60 dark:shadow-none backdrop-blur-lg md:grid-cols-2 md:p-8">
            {/* Left side */}
            <div className="hidden space-y-6 md:block">
              <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white">
                Welcome back to{" "}
                <span className="bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400 bg-clip-text text-transparent">
                  Cakes Villa
                </span>
              </h1>
              <p className="max-w-md text-lg text-gray-600 dark:text-gray-400">
                Log in to track your orders and check out faster.
              </p>
              <div className="my-8 flex justify-center">
                <img
                  src="/images/Login-bro.png"
                  alt=""
                  className="h-72 w-72 object-contain"
                />
              </div>
            </div>

            {/* Right side: form */}
            <div className="rounded-3xl border border-gray-100 dark:border-zinc-800 bg-white dark:bg-[#1c0d0a] p-8 shadow-lg md:p-10">
              <h2 className="mb-2 text-center text-3xl font-bold text-gray-900 dark:text-white">
                Log in
              </h2>
              <p className="mb-8 text-center text-gray-500 dark:text-gray-400">
                Enter your details to access your account.
              </p>

              <div role="alert" aria-live="assertive">
                {serverError && (
                  <p className="mb-5 rounded-xl bg-red-50 dark:bg-red-950/30 px-4 py-3 text-sm font-medium text-red-600 dark:text-red-300">
                    {serverError}
                  </p>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-300"
                  >
                    Email address
                  </label>
                  <div className={fieldWrap(errors.email)}>
                    <FaEnvelope
                      className={`mr-3 shrink-0 ${errors.email ? "text-red-400" : "text-gray-400"}`}
                      aria-hidden="true"
                    />
                    <input
                      id="email"
                      type="email"
                      name="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className={inputClass}
                      disabled={loading}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                  </div>
                  {errors.email && (
                    <p id="email-error" className="ml-1 mt-1.5 text-xs text-red-500">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-300"
                  >
                    Password
                  </label>
                  <div className={fieldWrap(errors.password)}>
                    <FaLock
                      className={`mr-3 shrink-0 ${errors.password ? "text-red-400" : "text-gray-400"}`}
                      aria-hidden="true"
                    />
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      autoComplete="current-password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Your password"
                      className={inputClass}
                      disabled={loading}
                      aria-invalid={Boolean(errors.password)}
                      aria-describedby={errors.password ? "password-error" : undefined}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="ml-2 shrink-0 rounded-md p-1 text-gray-400 transition-colors hover:text-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-pink-500"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.password && (
                    <p id="password-error" className="ml-1 mt-1.5 text-xs text-red-500">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-6 flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 py-3.5 text-lg font-semibold text-white shadow-lg shadow-pink-500/25 transition-shadow hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <svg
                        className="h-5 w-5 animate-spin text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      <span>Logging in...</span>
                    </>
                  ) : (
                    <span>Log in</span>
                  )}
                </button>

                <p className="pt-2 text-center text-gray-600 dark:text-gray-400">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="font-semibold text-pink-600 dark:text-pink-400 transition-colors hover:underline"
                  >
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </motion.div>

      </div>
    </MotionConfig>
  );
}

export default Login;
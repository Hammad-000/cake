import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, MotionConfig } from "framer-motion";
import { FiLogOut, FiCheckCircle } from "react-icons/fi";
import FooterContent from "../components/FooterContent";
import { useAuth } from "../context/AuthContext";

function Logout() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [alreadyLoggedOut] = useState(() => !localStorage.getItem("authToken"));
  const timers = useRef([]);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  const handleLogout = () => {
    setLoading(true);

    timers.current.push(
      setTimeout(() => {
        // Clear the app's auth state if the context provides logout(),
        // and always clear the stored token as a fallback.
        auth?.logout?.();
        localStorage.removeItem("authToken");

        setDone(true);
        setLoading(false);

        timers.current.push(setTimeout(() => navigate("/"), 1500));
      }, 500)
    );
  };

  const handleCancel = () => navigate(-1);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-gradient-to-b from-rose-50/60 via-orange-50/30 to-white dark:bg-[#1c0d0a] dark:bg-none dark:text-[#f3e5d8] px-4 py-8 relative overflow-hidden">
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
                See you{" "}
                <span className="bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400 bg-clip-text text-transparent">
                  soon
                </span>
              </h1>
              <p className="max-w-md text-lg text-gray-600 dark:text-gray-400">
                Thanks for visiting Cakes Villa. Your cart and orders will be here when you log back in.
              </p>
              <div className="my-8 flex justify-center" aria-hidden="true">
                <div className="flex h-56 w-56 items-center justify-center rounded-full bg-gradient-to-br from-pink-100 to-orange-100 dark:from-pink-950/50 dark:to-orange-950/30">
                  <FiLogOut className="text-7xl text-pink-500" />
                </div>
              </div>
            </div>

            {/* Right side: confirmation card */}
            <div className="rounded-3xl border border-gray-100 dark:border-zinc-800 bg-white dark:bg-[#1c0d0a] p-8 shadow-lg md:p-10">
              <h2 className="mb-2 text-center text-3xl font-bold text-gray-900 dark:text-white">
                Log out
              </h2>

              <div role="status" aria-live="polite">
                {done ? (
                  <p className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 px-4 py-3 text-sm font-medium text-emerald-700 dark:text-emerald-300">
                    <FiCheckCircle className="shrink-0" aria-hidden="true" />
                    You are logged out. Taking you to the home page.
                  </p>
                ) : alreadyLoggedOut ? (
                  <div className="mt-6 space-y-5 text-center">
                    <p className="text-gray-500 dark:text-gray-400">
                      You are already logged out.
                    </p>
                    <Link
                      to="/login"
                      className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 py-3.5 text-lg font-semibold text-white shadow-lg shadow-pink-500/25 transition-shadow hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500"
                    >
                      Go to log in
                    </Link>
                  </div>
                ) : (
                  <p className="mb-8 text-center text-gray-500 dark:text-gray-400">
                    Are you sure you want to log out of your account?
                  </p>
                )}
              </div>

              {!done && !alreadyLoggedOut && (
                <div className="space-y-4">
                  <button
                    type="button"
                    onClick={handleLogout}
                    disabled={loading}
                    className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 py-3.5 text-lg font-semibold text-white shadow-lg shadow-pink-500/25 transition-shadow hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500 disabled:cursor-not-allowed disabled:opacity-70"
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
                        <span>Logging out...</span>
                      </>
                    ) : (
                      <span>Yes, log me out</span>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={loading}
                    className="flex w-full cursor-pointer items-center justify-center rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-900/60 py-3.5 text-lg font-semibold text-gray-700 dark:text-gray-200 transition-colors hover:bg-gray-100 dark:hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500 disabled:opacity-50"
                  >
                    Cancel
                  </button>

                  <p className="pt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                    You can log back in anytime from the{" "}
                    <Link
                      to="/login"
                      className="font-semibold text-pink-600 dark:text-pink-400 hover:underline"
                    >
                      login page
                    </Link>
                    .
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>

      </div>
    </MotionConfig>
  );
}

export default Logout;
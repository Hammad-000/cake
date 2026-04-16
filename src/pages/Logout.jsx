// Logout.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FooterContent from "../components/FooterContent";

function Logout() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setMessage("You are already logged out.");
    }
  }, []);

  const handleLogout = () => {
    setLoading(true);
    setMessage("");

    setTimeout(() => {
      localStorage.removeItem("authToken");
      setMessage("Logout successful! Redirecting...");
      setLoading(false);

      setTimeout(() => {
        navigate("/");
      }, 1500);
    }, 500);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 px-4 py-8 relative overflow-hidden">
      <div className="relative w-full max-w-6xl mx-auto z-10 mb-8">
        <div className="grid md:grid-cols-2 gap-8 items-center bg-white/40 backdrop-blur-lg rounded-3xl shadow-2xl p-6 md:p-8 border border-white/50">
          {/* Left side - Illustration */}
          <div className="hidden md:block space-y-6">
            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent leading-tight">
              See You Soon!
            </h1>
            <p className="text-gray-700 text-lg">
              You have been successfully logged out. Thank you for visiting Cake Villa. We hope to see you again soon!
            </p>
            <div className="flex justify-center my-8">
              <img
                src="https://blush.design/api/download?shareUri=69wYJDyZa4pTHhdv&c=Hair_0%7E4d33a2-0.4%7E150656-0.5%7E150656_Skin_0%7Efeb1cd-0.4%7Eef9e89-0.5%7Ed46b55&w=800&h=800&fm=png"
                alt="Logout illustration"
                className="w-72 h-90 object-contain"
              />
            </div>
          </div>

          {/* Right side - Logout confirmation card */}
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
              Log Out
            </h2>
            <p className="text-center text-gray-500 mb-8">
              Are you sure you want to log out of your account?
            </p>

            {message && (
              <div
                className={`text-center ${message.includes("successful") ? "text-green-500" : "text-red-500"
                  } mb-4`}
              >
                {message}
              </div>
            )}

            <div className="space-y-5">
              {/* Logout button */}
              <button
                onClick={handleLogout}
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3.5 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-pink-600 transform hover:-translate-y-0.5 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {loading ? (
                  <>
                    {/* Fixed SVG spinner */}
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
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
                  <span className="cursor-pointer">Yes, Log me out</span>
                )}
              </button>

              {/* Cancel button */}
              <button
                onClick={handleCancel}
                disabled={loading}
                className="w-full bg-gray-200 text-gray-700 py-3.5 rounded-xl font-semibold text-lg hover:bg-gray-300 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 cursor-pointer"
              >
                Cancel
              </button>

              <p className="text-center text-gray-600 pt-2 text-sm">
                You can always log back in from the{" "}
                <button
                  onClick={() => navigate("/login")}
                  className="text-purple-600 font-semibold hover:text-purple-700 hover:underline transition-colors cursor-pointer"
                >
                  Login page
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>

      <FooterContent />
    </div>
  );
}

export default Logout;
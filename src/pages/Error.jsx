import React from 'react';
import { FaHome, FaExclamationTriangle, FaArrowLeft, FaSadTear } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import FooterContent from '../components/FooterContent';

function Error() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <div className="inline-block relative mb-6">
            <div className="text-9xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              404
            </div>
            <FaExclamationTriangle className="absolute -top-4 -right-4 text-4xl text-yellow-500 animate-pulse" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">
            Page Not Found
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Oops! The page you're looking for seems to have wandered off into the digital wilderness.
            <FaSadTear className="inline-block ml-2 text-yellow-500" />
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <button
              onClick={handleGoHome}
              className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-4 px-8 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-pink-600 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
            >
              <FaHome />
              Back to Home
            </button>
            
            <button
              onClick={handleGoBack}
              className="bg-white text-gray-800 border-2 border-purple-200 py-4 px-8 rounded-xl font-semibold text-lg hover:bg-purple-50 hover:border-purple-300 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
            >
              <FaArrowLeft />
              Go Back
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl shadow-2xl p-8 transform transition-all duration-300 hover:shadow-3xl">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 pb-3 border-b-2 border-purple-100">
                What might have happened?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-purple-100 p-3 rounded-xl">
                    <span className="text-purple-600 font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Page moved or deleted</h3>
                    <p className="text-gray-600">The page might have been moved to a new location or removed entirely.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-pink-100 p-3 rounded-xl">
                    <span className="text-pink-600 font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Typo in the URL</h3>
                    <p className="text-gray-600">There might be a typo in the web address you entered.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 p-3 rounded-xl">
                    <span className="text-blue-600 font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Broken link</h3>
                    <p className="text-gray-600">The link you followed might be outdated or incorrect.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-600 to-pink-500 rounded-3xl shadow-2xl p-8 text-white">
              <h2 className="text-3xl font-bold mb-6 pb-3 border-b-2 border-white/20">
                What you can do
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-white/20 p-3 rounded-xl">
                    <FaHome className="text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Go to Homepage</h3>
                    <p className="text-white/80">Return to our main page and navigate from there</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-white/20 p-3 rounded-xl">
                    <FaArrowLeft className="text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Go Back</h3>
                    <p className="text-white/80">Return to the previous page you were viewing</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-white/20 p-3 rounded-xl">
                    <span className="text-xl font-bold">?</span>
                  </div>
                  <div >
                    <h3 className="text-lg font-semibold ">Contact Support</h3>
                    <p className="text-white/80">If the problem persists, feel free to contact our support team</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-white/20">
                <p className="text-center text-white/80">
                  We're here to help! Explore our delicious cakes while you're here.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                While you're here...
              </h3>
              <p className="text-gray-600 text-lg mb-6">
                Even though this page is missing, our delicious cakes aren't! Why not check out our menu?
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-4">
                  <div className="text-purple-600 font-bold text-lg mb-2">🎂 Fresh Cakes</div>
                  <p className="text-gray-600">Explore our freshly baked cakes available daily</p>
                </div>
                <div className="p-4">
                  <div className="text-purple-600 font-bold text-lg mb-2">✨ Custom Orders</div>
                  <p className="text-gray-600">Design your dream cake for any occasion</p>
                </div>
                <div className="p-4">
                  <div className="text-purple-600 font-bold text-lg mb-2">🚚 Fast Delivery</div>
                  <p className="text-gray-600">Get your cakes delivered fresh to your doorstep</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterContent />
    </div>
  );
}

export default Error;
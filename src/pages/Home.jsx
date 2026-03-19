import React, { useState, useEffect, useRef } from "react";
import { AiOutlineArrowRight, AiOutlineStar, AiOutlineFire, AiOutlineHeart, AiOutlineClockCircle } from "react-icons/ai";
import { FiClock, FiPackage, FiHeadphones, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { motion } from "framer-motion";
import FooterContent from "../components/FooterContent";
import { Link } from 'react-router-dom'
import { products } from "../data/products";


function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [favorites, setFavorites] = useState([]);
  const sliderRef = useRef(null);

  const images = [
    {
      src: "/images/slider 2.jfif",
      title: "Contact us",
      subtitle: "Sweet, indulgent perfection"
    },
    {
      src: "/images/slider 3.jfif",
      title: "Premium Quality Meats",
      subtitle: "Savor the rich, sweet flavor"
    },
    {
      src: "/images/cake13.webp",
      title: "Artisanal Creations",
      subtitle: "Crafted with sweet love"
    },
    {
      src: "/images/cake10.webp",
      title: "Family Feast",
      subtitle: "Sweet moments, shared with love"
    },
    {
      src: "/images/cake4.webp",
      title: "Signature Recipes",
      subtitle: "Sweetened with tradition"
    },
    {
      src: "/images/cake1.jpg",
      title: "Slow-Baked Delights",
      subtitle: "Sweetly tender, always irresistible"
    }
  ];

  const specialties = products.sort((a,b)=>{
    return a.someProterty =b.someProperty
  })
.slice(0,12)

  const categories = [
    { id: "all", name: "All", count: "" },
    { id: "Chocolate Cake", name: " Chocolate Cake", count: 3 },
    { id: "Birthday Cake", name: "Birthday Cake", count: 3 },
    { id: "Vanilla Cake", name: "Vanilla Cake",  count: 1 },
  ];

  const nextImage = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const prevImage = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const goToImage = (index) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const goToMenu = () => {
    window.location.href = "/menu";
  };

  const toggleFavorite = (index) => {
    setFavorites(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const filteredSpecialties = activeCategory === "all" 
    ? specialties 
    : specialties.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-orange-50/20 to-white flex flex-col overflow-x-hidden">
      <main className="container mx-auto px-4 sm:px-6 py-8 grow">
        {/* Hero Section with Particles */}
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-amber-400 rounded-full"
                initial={{ y: -100, x: Math.random() * 100 }}
                animate={{ 
                  y: typeof window !== 'undefined' ? window.innerHeight : 500,
                  x: Math.random() * 100 - 50,
                  rotate: 360
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative inline-block"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              <span className="  bg-gradient-to-r from-pink-500 via-orange-500 to-purple-500 bg-clip-text text-transparent animate-gradient">
                WELCOME TO
              </span>
              <br />
              <span className="text-5xl sm:text-6xl md:text-7xl bg-gradient-to-r from-pink-600 via-orange-500 to-purple-500 bg-clip-text text-transparent">
                CAKES VILLA
              </span>
            </h1>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-48 h-2 bg-gradient-to-r from-pink-400 via-orange-500 to-purple-500 rounded-full blur-sm"></div>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-purple-400 via-orange-500 to-pink-500 rounded-full"></div>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl text-gray-700 max-w-3xl mx-auto mt-8 px-4 font-light leading-relaxed"
          >
          </motion.p>
        </div>

        {/* Premium Image Slider */}
        <div className="relative w-full max-w-7xl mx-auto mb-20">
          <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden rounded shadow-2xl group">
            {/* Animated Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10 z-10"></div>
            
            {/* Floating Elements */}
            <div className="absolute top-4 left-4 md:top-8 md:left-8 z-20">
              <div className="bg-pink-500 backdrop-blur-md px-4 py-2 md:px-6 md:py-3 rounded-2xl shadow-2xl">
                <span className="font-bold text-white text-base md:text-lg">
                  {images[currentIndex].title}
                </span>
              </div>
              <div className="mt-2 bg-black/50 backdrop-blur-sm px-3 py-1 md:px-4 md:py-2 rounded-xl inline-block">
                <span className="text-white/90 font-medium text-sm md:text-base">
                  {images[currentIndex].subtitle}
                </span>
              </div>
            </div>

            {/* Image Slides */}
            <div className="relative w-full h-full justify-center">
              {images.map((imgObj, index) => (
                <motion.div
                  key={index}
                  initial={false}
                  animate={{
                    opacity: index === currentIndex ? 1 : 0,
                    scale: index === currentIndex ? 1 : 1.1,
                    x: index === currentIndex ? 0 : (index > currentIndex ? 100 : -100)
                  }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full"
                >
                  <img
                    src={imgObj.src}
                    alt={imgObj.title}
                    className="w-full h-full object-cover justify-center"
                  />
                </motion.div>
              ))}
            </div>

            {/* Enhanced Navigation Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-2 sm:left-6 top-1/2 transform -translate-y-1/2 text-white text-3xl cursor-pointer bg-gradient-to-r from-black/60 to-black/40 hover:from-black/80 hover:to-black/60 w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110 z-20 backdrop-blur-md border border-white/20 disabled:opacity-30 group"
              disabled={isTransitioning}
            >
              <FiChevronLeft className="group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 sm:right-6 top-1/2 transform -translate-y-1/2 text-white text-3xl cursor-pointer bg-gradient-to-r from-black/60 to-black/40 hover:from-black/80 hover:to-black/60 w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110 z-20 backdrop-blur-md border border-white/20 disabled:opacity-30 group"
              disabled={isTransitioning}
            >
              <FiChevronRight className="group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Progress Indicator */}
            <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20">
              <div className="flex gap-2 sm:gap-3">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`transition-all duration-300 relative ${
                      index === currentIndex
                        ? "w-8 sm:w-10 h-1.5 sm:h-2"
                        : "w-1.5 sm:w-2 h-1.5 sm:h-2"
                    }`}
                    disabled={isTransitioning}
                  >
                    <div className={`absolute inset-0 rounded-full cursor-pointer ${
                      index === currentIndex
                        ? "bg-gradient-to-r from-pink-500 to-orange-500"
                        : "bg-white/50 hover:bg-white"
                    }`}></div>
                    {index === currentIndex && (
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 blur-sm"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Animated Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto mb-20">
          {[
            {
              icon: <AiOutlineClockCircle className="text-3xl" />,
              title: "Lightning Fast",
              description: "30-min delivery guaranteed or 50% off",
              color: "from-emerald-400 to-green-500",
              delay: 0
            },
            {
              icon: <AiOutlineStar className="text-3xl" />,
              title: "Premium Quality",
              description: "Fresh ingredients from local farms",
              color: "from-blue-400 to-indigo-500",
              delay: 0.1
            },
            {
              icon: <FiHeadphones className="text-3xl" />,
              title: "24/7 Support",
              description: "Always here to assist you",
              color: "from-purple-400 to-pink-500",
              delay: 0.2
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: feature.delay }}
              viewport={{ once: true }}
              className="relative group"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="absolute  inset-0 bg-gradient-to-br from-gray-100 via-white to-gray-50 rounded-3xl transform group-hover:scale-105 transition-all duration-500 shadow-lg group-hover:shadow-2xl"></div>
              <div className="relative cursor-pointer p-6 sm:p-8 bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-100 overflow-hidden">
                {/* Animated Background */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-gray-100 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
                
                <div className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-6 transform group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-6">{feature.description}</p>
                <div className="flex items-center text-amber-600 font-medium group-hover:text-orange-600 transition-colors">
                  <AiOutlineArrowRight className="mr-2 transform group-hover:translate-x-1 transition-transform" />
                  Learn more
                </div>
              </div>
            </motion.div>
          ))}
        </div>

 <section className="max-w-6xl mx-auto mb-20">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
    {[
      {
        img: "/images/cake2.jpg",
        name: "Quarter Sweet Cake",
        description: "Crispy, spicy, and perfectly seasoned - our house specialty",
        price: "2800",
        time: "15-20 min",
        popular: true,
      },
      {
        img: "/images/cake8.jpg",
        name: "Chocolate Cake",
        description: "Slow-baked to perfection with secret sweets and chocolate",
        price: "3500",
        time: "25-30 min",
        popular: false,
      },
      {
        img: "/images/cake20.jpg",
        name: "Hazelnut Cake",
        description: "Rich hazelnut cake with creamy frosting and chopped hazelnuts",
        price: "4000",
        time: "20-25 min",
        popular: true,
      }
    ].map((dish, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
        className="group relative"
      >
        <div className="absolute  inset-0 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-red-500/10 rounded-3xl transform group-hover:scale-105 transition-all duration-500"></div>
        <div className="relative bg-white cursor-pointer rounded-3xl overflow-hidden shadow-xl hover:shadow-3xl transition-all duration-300 transform group-hover:-translate-y-2">
          {/* Image Container */}
          <div className="relative h-56 sm:h-72 overflow-hidden">
            <img
              src={dish.img}
              alt={dish.name}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
            
            {/* Badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              {dish.popular && (
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 shadow-lg">
                  <AiOutlineFire /> Popular
                </div>
              )}
            </div>
          </div>
          
          <div className="p-4 sm:p-6">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800">{dish.name}</h3>
              <span className="text-xl sm:text-2xl font-bold text-amber-600">Rs.{dish.price}</span>
            </div>
            <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">{dish.description}</p>
            
            <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-3">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <AiOutlineStar key={i} className="fill-current text-sm sm:text-base" />
                ))}
                <span className="text-gray-600 ml-2 text-xs sm:text-sm">(4.8)</span>
              </div>
              
              <Link
                to="/menu"
                className="w-full xs:w-auto px-4 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-center text-sm sm:text-base whitespace-nowrap"
              >
                Go To Menu
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    ))}
  </div>
</section>

        {/* Specialties Gallery with Category Filter */}
        <div className="relative py-12 sm:py-16 px-4 bg-gradient-to-br from-gray-50 via-white to-gray-50 rounded-3xl mb-20 overflow-hidden">
          {/* Animated Background Elements */}
          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <div className="inline-block relative">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 relative">
                  <span className="bg-gradient-to-r from-pink-400 via-orange-500 to-purple-500 bg-clip-text text-transparent">
                    OUR SPECIALTIES
                  </span>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 sm:w-32 h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"></div>
                </h1>
              </div>
              <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg">
                Discover our chef's special selection of culinary masterpieces, each with its own unique story
              </p>
            </div>

            {/* Category Filter */}
            <div className="flex cursor-pointer flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 cursor-pointer">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full transition-all cursor-pointer duration-300 flex items-center gap-2 whitespace-nowrap ${
                    activeCategory === category.id
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg transform scale-105'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  <span className="text-base sm:text-lg cursor-pointer  ">{category.icon}</span>
                  <span className="font-semibold text-sm sm:text-base">{category.name}</span>
                  {category.count && ( 
                    <span className={`text-xs sm:text-sm px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full ${
                      activeCategory === category.id
                        ? 'bg-white/20'
                        : 'bg-gray-100'
                    }`}>
                      {category.count}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Specialties Grid */}
            <div className="grid grid-cols-2  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
              {filteredSpecialties.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  viewport={{ once: true }}
                  className="relative group"
                >
                  <div className="relative aspect-square cursor-pointer overflow-hidden rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="absolute inset-0 p-2 sm:p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h3 className="text-white font-bold text-xs sm:text-sm md:text-base lg:text-lg mb-1 sm:mb-2">{item.name}</h3>
                      <div className="flex justify-between items-center">
                        <span className="text-amber-300 font-bold text-xs sm:text-sm md:text-base">Rs.{item.price}</span>
                        <div className="flex items-center gap-0.5 sm:gap-1">
                          <AiOutlineStar className="text-yellow-400 text-xs sm:text-sm" />
                          <span className="text-white text-xs sm:text-sm">{item.rating}</span>
                        </div>
                      </div>
                      <Link 
                        to="/menu"
                        className="mt-2 sm:mt-3 w-full p-1 text-center sm:py-2 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 text-xs sm:text-sm"
                      >
                        Go To Menu
                      </Link>
                    </div>
                    
                    <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-black/70 backdrop-blur-sm text-white px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-lg text-xs">
                      {item.category}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Enhanced CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-gray-200/50"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4 sm:mb-6">
                Ready to Ignite Your Taste Buds?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto mb-6 sm:mb-8 text-base sm:text-lg">
                Join thousands of satisfied customers who have experienced the Cakes Villas difference
              </p>
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                <Link
                  to="/menu"
                  className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 md:px-10 py-3 sm:py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-full hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
                >
                  Go To Menu
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 md:px-10 py-3 sm:py-4 bg-white text-gray-800 font-bold rounded-full border-2 border-pink-400 hover:border-purple-500 hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
                >
                  Book a Table
                  <span className="text-pink-500">✨</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <FooterContent />
    </div>
  );
}

export default Home;
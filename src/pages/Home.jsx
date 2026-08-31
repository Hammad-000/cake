import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { AiOutlineArrowRight, AiOutlineStar, AiOutlineFire, AiOutlineClockCircle } from "react-icons/ai";
import { FiHeadphones, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { motion } from "framer-motion";
import FooterContent from "../components/FooterContent";
import { Link } from 'react-router-dom';

function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const images = [
    { src: "/images/slider 2.jfif", title: "Contact Us", subtitle: "Sweet, indulgent perfection" },
    { src: "/images/slider 3.jfif", title: "Premium Quality Meats", subtitle: "Savor the rich, sweet flavor" },
    { src: "/images/cake13.webp", title: "Artisanal Creations", subtitle: "Crafted with sweet love" },
    { src: "/images/cake10.webp", title: "Family Feast", subtitle: "Sweet moments, shared with love" },
    { src: "/images/cake4.webp", title: "Signature Recipes", subtitle: "Sweetened with tradition" },
    { src: "/images/cake1.jpg", title: "Slow-Baked Delights", subtitle: "Sweetly tender, always irresistible" }
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://cakes-backend-gamma.vercel.app/api/products");
        if (response.data?.products && Array.isArray(response.data.products)) {
          setAllProducts(response.data.products);
        } else {
          console.error("Invalid response format");
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const specialties = allProducts.slice(0, 12);

  const categories = [
    { id: "all", name: "All", count: specialties.length },
    ...Array.from(new Set(specialties.map(p => p.category)))
      .filter(cat => cat)
      .map(cat => ({
        id: cat,
        name: cat,
        count: specialties.filter(p => p.category === cat).length
      }))
  ];

  const filteredSpecialties = activeCategory === "all" 
    ? specialties 
    : specialties.filter(item => item.category === activeCategory);

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

  useEffect(() => {
    const interval = setInterval(() => nextImage(), 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-orange-50/10 to-white flex flex-col overflow-x-hidden text-gray-800">
      <main className="container mx-auto px-4 sm:px-6 py-8 grow">
        
        {/* Hero Header Section */}
        <div className="text-center mb-14 relative">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative inline-block"
          >
            <span className="text-xs sm:text-sm uppercase tracking-widest font-bold px-4 py-1.5 bg-pink-100 text-pink-600 rounded-full mb-4 inline-block shadow-sm">
              ✨ Welcome to Bakery Paradise
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mt-2 mb-4">
              <span className="bg-gradient-to-r from-pink-500 via-orange-500 to-purple-600 bg-clip-text text-transparent">
                CAKES VILLA
              </span>
            </h1>
            <div className="w-24 h-1.5 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto rounded-full mt-2"></div>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto mt-4 font-normal"
          >
            Indulge your senses with freshly baked artisanal cakes, pastries, and sweet moments crafted with love.
          </motion.p>
        </div>

        {/* Premium Image Slider */}
        <div className="relative w-full max-w-6xl mx-auto mb-20">
          <div className="relative w-full h-[380px] sm:h-[480px] md:h-[550px] overflow-hidden rounded-3xl shadow-2xl group border border-white/40">
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10"></div>
            
            <div className="absolute top-6 left-6 md:top-8 md:left-8 z-20">
              <div className="bg-pink-600/90 backdrop-blur-md px-4 py-1.5 md:px-5 md:py-2.5 rounded-2xl shadow-lg inline-block">
                <span className="font-bold text-white text-sm md:text-base tracking-wide">
                  {images[currentIndex].title}
                </span>
              </div>
              <div className="mt-2 bg-black/40 backdrop-blur-md px-3 py-1 md:px-4 md:py-1.5 rounded-xl inline-block border border-white/10">
                <span className="text-white/90 font-medium text-xs md:text-sm">
                  {images[currentIndex].subtitle}
                </span>
              </div>
            </div>

            <div className="relative w-full h-full">
              {images.map((imgObj, index) => (
                <motion.div
                  key={index}
                  initial={false}
                  animate={{
                    opacity: index === currentIndex ? 1 : 0,
                    scale: index === currentIndex ? 1 : 1.05,
                  }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full"
                >
                  <img
                    src={imgObj.src}
                    alt={imgObj.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </div>

            <button
              onClick={prevImage}
              className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 text-white bg-black/40 hover:bg-black/70 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-105 z-20 backdrop-blur-md border border-white/20 disabled:opacity-30 shadow-lg"
              disabled={isTransitioning}
            >
              <FiChevronLeft size={24} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 text-white bg-black/40 hover:bg-black/70 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-105 z-20 backdrop-blur-md border border-white/20 disabled:opacity-30 shadow-lg"
              disabled={isTransitioning}
            >
              <FiChevronRight size={24} />
            </button>

            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20">
              <div className="flex gap-2 bg-black/30 backdrop-blur-md px-3 py-2 rounded-full border border-white/10">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`transition-all duration-300 rounded-full cursor-pointer ${
                      index === currentIndex
                        ? "w-6 h-2 bg-gradient-to-r from-pink-500 to-orange-400"
                        : "w-2 h-2 bg-white/50 hover:bg-white"
                    }`}
                    disabled={isTransitioning}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-20">
          {[
            {
              icon: <AiOutlineClockCircle className="text-2xl sm:text-3xl" />,
              title: "Lightning Fast Delivery",
              description: "30-minute delivery guaranteed or get 50% off your order.",
              color: "from-emerald-400 to-green-600"
            },
            {
              icon: <AiOutlineStar className="text-2xl sm:text-3xl" />,
              title: "100% Premium Quality",
              description: "Baked fresh daily using high-grade, local ingredients.",
              color: "from-blue-400 to-indigo-600"
            },
            {
              icon: <FiHeadphones className="text-2xl sm:text-3xl" />,
              title: "Dedicated Support",
              description: "Our friendly team is always here to assist your orders.",
              color: "from-purple-400 to-pink-600"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/90 backdrop-blur-sm p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 group hover:-translate-y-1"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-5 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">{feature.description}</p>
              <div className="flex items-center text-pink-600 font-semibold text-sm group-hover:text-purple-600 transition-colors">
                <span className="mr-1">Explore perks</span>
                <AiOutlineArrowRight className="transform group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Featured Dishes Showcase */}
        <section className="max-w-6xl mx-auto mb-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Featured Creations</h2>
            <p className="text-gray-600 text-sm sm:text-base mt-2">Handcrafted favorites loved by our customers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                img: "/images/cake2.jpg",
                name: "Quarter Sweet Cake",
                description: "Crispy outer layer with a rich, velvety center - our ultimate signature item.",
                price: "2800",
                popular: true,
              },
              {
                img: "/images/cake8.jpg",
                name: "Classic Chocolate Cake",
                description: "Slow-baked to perfection with premium Belgian cocoa and smooth ganache.",
                price: "3500",
                popular: false,
              },
              {
                img: "/images/cake20.jpg",
                name: "Hazelnut Supreme",
                description: "Rich hazelnut layers topped with creamy frosting and roasted nuts crunch.",
                price: "4000",
                popular: true,
              }
            ].map((dish, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col group"
              >
                <div className="relative h-56 sm:h-64 overflow-hidden">
                  <img
                    src={dish.img}
                    alt={dish.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  {dish.popular && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-md">
                      <AiOutlineFire /> Popular
                    </div>
                  )}
                </div>
                <div className="p-5 sm:p-6 flex flex-col grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{dish.name}</h3>
                    <span className="text-lg font-bold text-pink-600">Rs.{dish.price}</span>
                  </div>
                  <p className="text-gray-600 text-xs sm:text-sm mb-6 grow leading-relaxed">{dish.description}</p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center text-amber-400 gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <AiOutlineStar key={i} className="fill-current text-sm" />
                      ))}
                      <span className="text-gray-500 ml-1.5 text-xs font-medium">(4.8)</span>
                    </div>
                    <Link
                      to="/menu"
                      className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs sm:text-sm font-semibold rounded-xl hover:opacity-90 shadow-md transition-all"
                    >
                      Order Now
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Specialties Gallery with Dynamic Categories */}
        <div className="py-12 sm:py-16 px-4 bg-gradient-to-br from-gray-50 via-white to-gray-50 rounded-3xl mb-20 border border-gray-100 shadow-sm">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
                <span className="bg-gradient-to-r from-pink-500 via-orange-500 to-purple-600 bg-clip-text text-transparent">
                  OUR SPECIALTIES
                </span>
              </h2>
              <p className="text-gray-600 max-w-xl mx-auto text-sm sm:text-base">
                Browse through our wide assortment of freshly prepared baked goods tailored for your celebrations.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 sm:px-5 py-2 rounded-2xl transition-all duration-300 flex items-center gap-2 cursor-pointer font-medium text-xs sm:text-sm ${
                    activeCategory === category.id
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg scale-105'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  <span>{category.name}</span>
                  {category.count !== undefined && (
                    <span className={`text-[10px] sm:text-xs px-2 py-0.5 rounded-full ${
                      activeCategory === category.id ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {category.count}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Products Grid */}
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
              </div>
            ) : filteredSpecialties.length === 0 ? (
              <div className="text-center py-16 text-gray-500">No specialties found in this category.</div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {filteredSpecialties.map((item, index) => {
                  const rawImage = item.imageUrl || item.image || item.picture;
                  let imageSrc = "/placeholder.jpg";
                  if (rawImage) {
                    imageSrc = rawImage.startsWith("http") ? rawImage : `https://cakes-backend-gamma.vercel.app${rawImage}`;
                  }

                  return (
                    <motion.div
                      key={item._id || index}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      viewport={{ once: true }}
                      className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col"
                    >
                      <div className="relative aspect-square overflow-hidden bg-gray-100">
                        <img
                          src={imageSrc}
                          alt={item.name}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => { e.target.src = "/placeholder.jpg"; }}
                        />
                        <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-white px-2 py-0.5 rounded-lg text-[10px] font-medium">
                          {item.category}
                        </div>
                      </div>
                      
                      <div className="p-3 flex flex-col grow justify-between">
                        <div>
                          <h3 className="text-gray-900 font-bold text-xs sm:text-sm line-clamp-1 mb-1">{item.name}</h3>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-pink-600 font-extrabold text-xs sm:text-sm">Rs.{item.price}</span>
                            <div className="flex items-center gap-1 text-amber-500 text-xs">
                              <AiOutlineStar className="fill-current" />
                              <span className="text-gray-600 font-semibold">{item.rating || "4.5"}</span>
                            </div>
                          </div>
                        </div>
                        <Link
                          to="/menu"
                          className="w-full py-1.5 bg-gray-900 hover:bg-pink-600 text-white rounded-xl font-medium text-center text-xs transition-colors shadow-sm"
                        >
                          View Item
                        </Link>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}

            {/* Bottom Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="text-center mt-16 pt-10 border-t border-gray-200"
            >
              <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3">
                Ready to Taste the Magic?
              </h3>
              <p className="text-gray-600 max-w-xl mx-auto mb-6 text-sm sm:text-base">
                Join thousands of sweet-tooth lovers who make Cakes Villa their go-to destination.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/menu"
                  className="px-8 py-3.5 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105 text-sm"
                >
                  Explore Full Menu
                </Link>
                <Link
                  to="/contact"
                  className="px-8 py-3.5 bg-white text-gray-800 font-bold rounded-full border-2 border-pink-400 hover:border-purple-600 shadow-md hover:shadow-xl transition-all transform hover:scale-105 text-sm"
                >
                  Book a Table ✨
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
import { motion } from "framer-motion";
import {
  FaBirthdayCake,
  FaHeart,
  FaStar,
  FaUsers,
  FaAward,
  FaLeaf,
  FaQuoteLeft,
  FaCrown,
  FaGlobe,
  FaHandsHelping,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
import { GiCakeSlice } from "react-icons/gi";
import FooterContent from "../components/FooterContent";
import { Link } from "react-router-dom";

function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const floatingAnimation = {
    y: [0, -12, 0],
    transition: {
      duration: 3.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  const rotateAnimation = {
    rotate: [0, 360],
    transition: {
      duration: 25,
      repeat: Infinity,
      ease: "linear",
    },
  };

  // Timeline data
  const timelineEvents = [
    {
      year: "2010",
      title: "The Humble Beginning",
      description:
        "Started in a small home kitchen with a single oven, baking for friends and family.",
      icon: <GiCakeSlice className="text-pink-500 text-xl" />,
    },
    {
      year: "2013",
      title: "First Storefront",
      description:
        "Opened our first bakery shop in downtown, quickly becoming a local favorite.",
      icon: <FaBirthdayCake className="text-pink-500 text-xl" />,
    },
    {
      year: "2016",
      title: "Award Winning",
      description:
        "Won 'Best Bakery' award at the National Dessert Competition.",
      icon: <FaAward className="text-pink-500 text-xl" />,
    },
    {
      year: "2019",
      title: "Expansion & Innovation",
      description:
        "Launched our signature 'CakeVilla Collection' and expanded to two more locations.",
      icon: <FaStar className="text-pink-500 text-xl" />,
    },
    {
      year: "2024",
      title: "Today",
      description:
        "Serving thousands of happy customers with over 50 dessert varieties and 24/7 online support.",
      icon: <FaHeart className="text-pink-500 text-xl" />,
    },
  ];

  const bakers = [
    {
      name: "Chef Maria Chen",
      role: "Head Pastry Chef",
      image: "https://www.unicesumar.edu.br/blog/wp-content/uploads/2017/03/confeitaria-profissional.jpg",
      description:
        "With over 15 years of experience in Parisian patisseries, Maria brings elegance and artistry to every creation.",
    },
    {
      name: "Chef Zain Ahmed",
      role: "Bread & Cake Specialist",
      image: "https://media.istockphoto.com/id/874492906/photo/a-confectioner-with-a-cake-in-the-bakery.jpg?s=612x612&w=0&k=20&c=ExhrkrrP26f3aBLplxyruHxp2YWZPn_CDJ19YM7pSg4=",
      description:
        "Zain's passion for traditional baking methods and innovative flavors makes our cakes unforgettable.",
    },
    {
      name: "Chef Sofia Rodriguez",
      role: "Sugar Artist",
      image: "https://t4.ftcdn.net/jpg/04/00/73/47/360_F_400734737_CXuxJirdrY6zUrm4C9jxQ6JA1Kui03A2.jpg",
      description:
        "Sofia’s intricate sugar flowers and custom designs turn every cake into a masterpiece.",
    },
  ];

  const testimonials = [
    {
      text: "The cake was not only beautiful but also the most delicious we've ever tasted. CakeVilla made our wedding day extra special!",
      name: "Emily & James",
      role: "Wedding Clients",
    },
    {
      text: "I've ordered birthday cakes here for three years straight. Always fresh, creative, and delivered with a smile.",
      name: "Priya S.",
      role: "Regular Customer",
    },
    {
      text: "Their attention to detail and use of natural ingredients sets them apart. Highly recommended!",
      name: "Rahul M.",
      role: "Food Blogger",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/60 via-orange-50/40 to-white px-4 sm:px-6 py-10 overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14 md:mb-20 pt-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100/80 text-pink-600 text-sm font-medium mb-6 backdrop-blur-sm border border-pink-200">
            <HiSparkles className="text-xs" />
            <span>Discover Our Story</span>
          </div>

          <div className="flex justify-center mb-4 md:mb-6">
            <motion.div animate={floatingAnimation} className="relative">
              <GiCakeSlice className="text-5xl md:text-6xl text-pink-500 drop-shadow-md" />
              <motion.div
                animate={{ scale: [1, 1.25, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-1 -right-1 md:-top-2 md:-right-2"
              >
                <FaHeart className="text-lg md:text-xl text-red-500 drop-shadow" />
              </motion.div>
            </motion.div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-4 px-2">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400">Sweet</span> Story
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4 leading-relaxed">
            Where every dessert is crafted with passion, premium ingredients, and a touch of modern magic.
          </p>
        </motion.div>

        {/* Story Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 gap-10 md:gap-14 items-center mb-20 md:mb-28"
        >
          <motion.div variants={itemVariants} className="space-y-5 px-2 md:px-0">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              Baking Happiness Since 2010
            </h2>
            <div className="space-y-4 text-gray-600 text-base sm:text-lg leading-relaxed">
              <p>
                At CakeVilla, we believe that desserts are more than just sweet treats—they are
                moments of pure joy, celebrations of life, and expressions of love. Our journey began
                in a small home kitchen with a single dream: to spread happiness through extraordinary desserts.
              </p>
              <p>
                Today, we honor that dream using only the finest organic eggs, European butter, and 
                locally sourced fruits. Every single creation is carefully handcrafted from scratch.
              </p>
            </div>

            <div className="pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-7 py-3.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium rounded-full shadow-lg shadow-pink-500/25 hover:shadow-xl hover:shadow-pink-500/45 transition-all duration-300 transform hover:-translate-y-0.5 text-sm sm:text-base"
              >
                Visit Our Bakery
              </Link>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="relative">
            <motion.div
              animate={floatingAnimation}
              className="w-full h-72 sm:h-80 md:h-[420px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white"
            >
              <img
                src="./images/cake20.jpg"
                alt="Artisan Cake"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
            </motion.div>

            <motion.div
              animate={rotateAnimation}
              className="hidden sm:block absolute -top-6 -left-6 w-32 h-32 bg-pink-200/50 rounded-full blur-xl pointer-events-none"
            />
            
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -bottom-4 -right-4 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-pink-100 flex items-center gap-3"
            >
              <FaAward className="text-2xl md:text-3xl text-yellow-500" />
              <div>
                <p className="text-xs text-gray-500 font-medium">Awarded</p>
                <p className="text-sm font-bold text-gray-800">Best Desserts</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Timeline Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20 md:mb-28 px-2"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12 md:mb-16 tracking-tight">
            Our Sweet Journey
          </h2>
          <div className="relative">
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-pink-300 via-rose-300 to-transparent"></div>
            <div className="space-y-8 md:space-y-12">
              {timelineEvents.map((event, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative flex flex-col md:flex-row ${
                    idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  } items-center`}
                >
                  <div className={`md:w-1/2 flex justify-center ${idx % 2 === 0 ? "md:justify-end md:pr-12" : "md:justify-start md:pl-12"} w-full px-2`}>
                    <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-pink-100/60 max-w-sm w-full hover:shadow-2xl transition-shadow duration-300">
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-xs font-bold tracking-wide">
                          {event.year}
                        </span>
                        <div className="p-2 bg-pink-50 rounded-xl">{event.icon}</div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{event.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{event.description}</p>
                    </div>
                  </div>
                  <div className="md:w-1/2"></div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full ring-4 ring-pink-100 hidden md:block shadow-md"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20 md:mb-28 px-2"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12 tracking-tight">
            Our Core Values
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: <FaHeart className="text-3xl" />,
                title: "Passion",
                description: "Every creation is infused with love and true dedication.",
                color: "text-rose-500",
                bgColor: "bg-rose-50/70 border-rose-100",
              },
              {
                icon: <FaLeaf className="text-3xl" />,
                title: "Quality",
                description: "Sourcing only the finest, freshest natural ingredients.",
                color: "text-emerald-500",
                bgColor: "bg-emerald-50/70 border-emerald-100",
              },
              {
                icon: <FaUsers className="text-3xl" />,
                title: "Community",
                description: "Building sweet, unforgettable memories together.",
                color: "text-sky-500",
                bgColor: "bg-sky-50/70 border-sky-100",
              },
              {
                icon: <FaCrown className="text-3xl" />,
                title: "Excellence",
                description: "Striving for absolute perfection in every intricate detail.",
                color: "text-amber-500",
                bgColor: "bg-amber-50/70 border-amber-100",
              },
              {
                icon: <FaGlobe className="text-3xl" />,
                title: "Sustainability",
                description: "Eco-friendly packaging and responsible local sourcing.",
                color: "text-teal-600",
                bgColor: "bg-teal-50/70 border-teal-100",
              },
              {
                icon: <FaHandsHelping className="text-3xl" />,
                title: "Customer First",
                description: "Your absolute happiness is always our top priority.",
                color: "text-purple-500",
                bgColor: "bg-purple-50/70 border-purple-100",
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className={`${value.bgColor} backdrop-blur-sm p-7 rounded-3xl border shadow-lg shadow-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer`}
              >
                <div className={`${value.color} mb-4 inline-block p-3 rounded-2xl bg-white shadow-sm`}>
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Meet the Bakers */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20 md:mb-28"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12 tracking-tight">
            Meet Our Master Bakers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-2">
            {bakers.map((baker, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="bg-white/80 backdrop-blur-md rounded-3xl overflow-hidden shadow-xl border border-pink-100/60 hover:shadow-2xl transition-all duration-300"
              >
                <div className="h-72 overflow-hidden relative">
                  <img
                    src={baker.image}
                    alt={baker.name}
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900">{baker.name}</h3>
                  <p className="text-pink-500 font-semibold text-sm mb-3">{baker.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{baker.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20 md:mb-28 px-2"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12 tracking-tight">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white/80 backdrop-blur-md p-7 rounded-3xl shadow-xl border border-pink-100/60 relative flex flex-col justify-between"
              >
                <div>
                  <FaQuoteLeft className="text-pink-200 text-3xl mb-4" />
                  <p className="text-gray-600 italic mb-6 text-sm sm:text-base leading-relaxed">"{testimonial.text}"</p>
                </div>
                <div>
                  <div className="font-bold text-gray-900">{testimonial.name}</div>
                  <div className="text-xs text-pink-500 font-medium">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400 rounded-3xl p-8 md:p-12 text-white mb-20 md:mb-28 shadow-xl shadow-pink-500/20 mx-2 md:mx-0"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
            {[
              { number: "10K+", label: "Happy Customers" },
              { number: "5K+", label: "Cakes Baked" },
              { number: "50+", label: "Dessert Varieties" },
              { number: "24/7", label: "Support" },
              { number: "15+", label: "Years Experience" },
              { number: "100%", label: "Natural Quality" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="space-y-1 p-2"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
                  {stat.number}
                </div>
                <div className="text-xs sm:text-sm opacity-90 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Sustainability Commitment */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20 md:mb-28 px-2"
        >
          <div className="bg-emerald-50/70 backdrop-blur-md border border-emerald-100 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 shadow-lg">
            <motion.div
              animate={{ rotate: [0, 8, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-emerald-600 text-6xl p-4 bg-white rounded-2xl shadow-sm"
            >
              <FaLeaf />
            </motion.div>
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                Our Commitment to Sustainability
              </h3>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                We believe in caring for our planet just as much as we care for our baking. 
                Using eco-friendly packaging, local ingredient sourcing, and minimizing food waste ensures 
                every single cake contributes toward a greener, sweeter future.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center px-2 pb-12"
        >
          <motion.div animate={floatingAnimation} className="mb-6">
            <FaBirthdayCake className="text-5xl md:text-6xl text-pink-500 mx-auto drop-shadow-sm" />
          </motion.div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Ready to Taste the Magic?
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-xl mx-auto leading-relaxed">
            Visit us today or place an order online to experience our fresh, handcrafted creations.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center w-full sm:w-auto bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-3.5 rounded-full font-semibold text-base shadow-lg shadow-pink-500/25 hover:shadow-xl hover:shadow-pink-500/40 transition-all duration-300"
              >
                Order Online
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center w-full sm:w-auto border-2 border-pink-400 text-pink-600 px-8 py-3.5 rounded-full font-semibold text-base hover:bg-pink-50 transition-all duration-300"
              >
                Book a Consultation
              </Link>
            </motion.div>
          </div>
        </motion.div>

      </div>
      <FooterContent />
    </div>
  );
}

export default About;
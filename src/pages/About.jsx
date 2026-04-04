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
      transition: { duration: 0.6 },
    },
  };

  const floatingAnimation = {
    y: [0, -15, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  const rotateAnimation = {
    rotate: [0, 360],
    transition: {
      duration: 20,
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
      icon: <GiCakeSlice className="text-pink-500" />,
    },
    {
      year: "2013",
      title: "First Storefront",
      description:
        "Opened our first bakery shop in downtown, quickly becoming a local favorite.",
      icon: <FaBirthdayCake className="text-pink-500" />,
    },
    {
      year: "2016",
      title: "Award Winning",
      description:
        "Won 'Best Bakery' award at the National Dessert Competition.",
      icon: <FaAward className="text-pink-500" />,
    },
    {
      year: "2019",
      title: "Expansion & Innovation",
      description:
        "Launched our signature 'CakeVilla Collection' and expanded to two more locations.",
      icon: <FaStar className="text-pink-500" />,
    },
    {
      year: "2024",
      title: "Today",
      description:
        "Serving thousands of happy customers with over 50 dessert varieties and 24/7 online support.",
      icon: <FaHeart className="text-pink-500" />,
    },
  ];

  // Bakers data
  const bakers = [
    {
      name: "Chef Maria Chen",
      role: "Head Pastry Chef",
      image: "./images/chef1.jpg", // Placeholder path; replace with actual
      description:
        "With over 15 years of experience in Parisian patisseries, Maria brings elegance and artistry to every creation.",
    },
    {
      name: "Chef David Kumar",
      role: "Bread & Cake Specialist",
      image: "./images/chef2.jpg",
      description:
        "David's passion for traditional baking methods and innovative flavors makes our cakes unforgettable.",
    },
    {
      name: "Chef Sofia Rodriguez",
      role: "Sugar Artist",
      image: "./images/chef3.jpg",
      description:
        "Sofia’s intricate sugar flowers and custom designs turn every cake into a masterpiece.",
    },
  ];

  // Testimonials data
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
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-orange-50 px-4 sm:px-5 md:px-6 py-6">
      <div className="container mx-auto max-w-6xl">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 md:mb-16 pt-4"
        >
          <div className="flex justify-center mb-4 md:mb-6">
            <motion.div animate={floatingAnimation} className="relative">
              <GiCakeSlice className="text-5xl md:text-6xl text-pink-500" />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-1 -right-1 md:-top-2 md:-right-2"
              >
                <FaHeart className="text-lg md:text-xl text-red-500" />
              </motion.div>
            </motion.div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-3 md:mb-4 px-2">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-400">Sweet</span> Story
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl md:max-w-3xl mx-auto px-4">
            Where every dessert is crafted with passion, quality ingredients, and a touch of magic.
          </p>
        </motion.div>

        {/* Story Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-16 md:mb-20"
        >
          <motion.div variants={itemVariants} className="space-y-4 md:space-y-6 px-2 md:px-0">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">Baking Happiness Since 2010</h2>
            <div className="space-y-4">
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                At CakeVilla, we believe that desserts are more than just sweet treats - they're
                moments of joy, celebrations of life, and expressions of love. Our journey began
                in a small home kitchen with a single dream: to spread happiness through
                extraordinary desserts.
              </p>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                Today, we continue to honor that dream by using only the finest ingredients,
                traditional baking methods, and innovative recipes that delight both the eyes
                and the taste buds. Every cake is made from scratch, using organic eggs,
                European butter, and locally sourced fruits whenever possible.
              </p>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                Our commitment to quality and creativity has earned us a loyal community of
                dessert lovers who trust us to make their special moments even sweeter.
              </p>
            </div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block mt-4">
              <Link
                to="/contact"
                className="inline-block px-6 py-3 sm:px-8 sm:py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
              >
                Visit Our Bakery
              </Link>
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants} className="relative mt-8 md:mt-0">
            <motion.div
              animate={floatingAnimation}
              className="w-full h-64 sm:h-72 md:h-96 rounded-2xl md:rounded-3xl overflow-hidden shadow-xl md:shadow-2xl"
            >
              <img
                src="./images/cake20.jpg"
                alt="Artisan Cake"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              animate={rotateAnimation}
              className="hidden sm:block absolute -top-4 -left-4 w-24 h-24 md:-top-6 md:-left-6 md:w-32 md:h-32 bg-pink-200 rounded-full opacity-20"
            />
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 180, 360],
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 bg-white p-2 sm:p-3 md:p-4 rounded-xl sm:rounded-2xl shadow-lg"
            >
              <FaAward className="text-xl sm:text-2xl md:text-3xl text-yellow-500" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Timeline Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 md:mb-20 px-2"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8 md:mb-12">
            Our Sweet Journey
          </h2>
          <div className="relative">
            {/* Vertical timeline line (hidden on mobile) */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-pink-200"></div>
            <div className="space-y-8 md:space-y-0">
              {timelineEvents.map((event, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative flex flex-col md:flex-row ${
                    idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  } items-center mb-8 md:mb-12`}
                >
                  <div className="md:w-1/2 flex justify-center md:justify-end px-4">
                    <div className="bg-white p-6 rounded-2xl shadow-lg max-w-sm">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl font-bold text-pink-500">{event.year}</span>
                        {event.icon}
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">{event.title}</h3>
                      <p className="text-gray-600 mt-2">{event.description}</p>
                    </div>
                  </div>
                  <div className="md:w-1/2"></div>
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-pink-500 rounded-full hidden md:block"></div>
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
          className="mb-16 md:mb-20 px-2"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8 md:mb-12">
            Our Core Values
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 cursor-pointer ">
            {[
              {
                icon: <FaHeart className="text-3xl md:text-4xl" />,
                title: "Passion",
                description: "Every creation is infused with love and dedication",
                color: "text-red-500",
                bgColor: "bg-red-50",
              },
              {
                icon: <FaLeaf className="text-3xl md:text-4xl" />,
                title: "Quality",
                description: "Only the finest natural ingredients",
                color: "text-green-500",
                bgColor: "bg-green-50",
              },
              {
                icon: <FaUsers className="text-3xl md:text-4xl" />,
                title: "Community",
                description: "Building sweet memories together",
                color: "text-blue-500",
                bgColor: "bg-blue-50",
              },
              {
                icon: <FaCrown className="text-3xl md:text-4xl" />,
                title: "Excellence",
                description: "Striving for perfection in every detail",
                color: "text-yellow-500",
                bgColor: "bg-yellow-50",
              },
              {
                icon: <FaGlobe className="text-3xl md:text-4xl" />,
                title: "Sustainability",
                description: "Eco-friendly packaging and sourcing",
                color: "text-green-600",
                bgColor: "bg-green-50",
              },
              {
                icon: <FaHandsHelping className="text-3xl md:text-4xl" />,
                title: "Customer First",
                description: "Your happiness is our priority",
                color: "text-purple-500",
                bgColor: "bg-purple-50",
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className={`${value.bgColor} p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300`}
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className={`${value.color} mb-4 md:mb-6`}
                >
                  {value.icon}
                </motion.div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 md:mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm md:text-base">{value.description}</p>
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
          className="mb-16 md:mb-20"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8 md:mb-12">
            Meet Our Master Bakers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3   gap-8 px-2">
            {bakers.map((baker, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl  cursor-pointer overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={baker.image}
                    alt={baker.name}
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800">{baker.name}</h3>
                  <p className="text-pink-500 font-medium mb-3">{baker.role}</p>
                  <p className="text-gray-600">{baker.description}</p>
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
          className="mb-16 md:mb-20 px-2"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8 md:mb-12">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-2xl shadow-lg relative"
              >
                <FaQuoteLeft className="text-pink-200 text-3xl mb-4" />
                <p className="text-gray-600 italic mb-4">"{testimonial.text}"</p>
                <div className="font-semibold text-gray-800">{testimonial.name}</div>
                <div className="text-sm text-gray-500">{testimonial.role}</div>
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
          className="bg-gradient-to-r from-pink-500 to-orange-400 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 text-white mb-16 md:mb-20 mx-2 md:mx-0"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-center">
            {[
              { number: "10K+", label: "Happy Customers" },
              { number: "5K+", label: "Cakes Baked" },
              { number: "50+", label: "Dessert Varieties" },
              { number: "24/7", label: "Support" },
              { number: "15+", label: "Years of Excellence" },
              { number: "100%", label: "Natural Ingredients" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="space-y-1 md:space-y-2 p-2"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
                  {stat.number}
                </div>
                <div className="text-xs sm:text-sm md:text-base lg:text-lg opacity-90">
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
          className="mb-16 md:mb-20 px-2"
        >
          <div className="bg-green-50 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-8">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-green-600 text-6xl"
            >
              <FaLeaf />
            </motion.div>
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                Our Commitment to Sustainability
              </h3>
              <p className="text-gray-600 text-base md:text-lg">
                We believe in caring for our planet. That's why we use eco-friendly packaging,
                source ingredients locally, and minimize food waste. Every cake we make
                is a step toward a sweeter, greener future.
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
          className="text-center px-2 pb-8"
        >
          <motion.div animate={floatingAnimation} className="mb-6 md:mb-8">
            <FaBirthdayCake className="text-5xl md:text-6xl text-pink-500 mx-auto" />
          </motion.div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4 md:mb-6">
            Ready to Taste the Magic?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 md:mb-8 max-w-xl md:max-w-2xl mx-auto">
            Visit us today or order online to experience our sweet creations.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
              <Link
                to="/contact"
                className="inline-block w-full sm:w-auto bg-gradient-to-r from-pink-500 to-orange-400 text-white px-6 py-3 sm:px-8 sm:py-3 rounded-full font-semibold text-sm sm:text-base md:text-lg hover:shadow-xl transition-all duration-300 text-center"
              >
                Order Online
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
              <Link
                to="/contact"
                className="inline-block w-full sm:w-auto border-2 border-pink-500 text-pink-600 px-6 py-3 sm:px-8 sm:py-3 rounded-full font-semibold text-sm sm:text-base md:text-lg hover:bg-pink-50 transition-all duration-300 text-center"
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
import { motion } from "framer-motion";
import { FaBirthdayCake, FaHeart, FaStar, FaUsers, FaAward, FaLeaf } from "react-icons/fa";
import { GiCakeSlice } from "react-icons/gi";
import FooterContent from "../components/FooterContent";
import { Link } from "react-router-dom"

function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  const floatingAnimation = {
    y: [0, -15, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const rotateAnimation = {
    rotate: [0, 360],
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: "linear"
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-orange-50 px-4 sm:px-5 md:px-6 py-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 md:mb-16 pt-4"
        >
          <div className="flex justify-center mb-4 md:mb-6">
            <motion.div
              animate={floatingAnimation}
              className="relative"
            >
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
                and the taste buds.
              </p>
            </div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block mt-4"
            >
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
                rotate: [0, 180, 360]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 bg-white p-2 sm:p-3 md:p-4 rounded-xl sm:rounded-2xl shadow-lg"
            >
              <FaAward className="text-xl sm:text-2xl md:text-3xl text-yellow-500" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 md:mb-20 px-2"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8 md:mb-12">Our Core Values</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: <FaHeart className="text-3xl md:text-4xl" />,
                title: "Passion",
                description: "Every creation is infused with love and dedication",
                color: "text-red-500",
                bgColor: "bg-red-50"
              },
              {
                icon: <FaLeaf className="text-3xl md:text-4xl" />,
                title: "Quality",
                description: "Only the finest natural ingredients",
                color: "text-green-500",
                bgColor: "bg-green-50"
              },
              {
                icon: <FaUsers className="text-3xl md:text-4xl" />,
                title: "Community",
                description: "Building sweet memories together",
                color: "text-blue-500",
                bgColor: "bg-blue-50"
              }
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
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 md:mb-4">{value.title}</h3>
                <p className="text-gray-600 text-sm md:text-base">{value.description}</p>
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
              { number: "24/7", label: "Support" }
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
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">{stat.number}</div>
                <div className="text-xs sm:text-sm md:text-base lg:text-lg opacity-90">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center px-2 pb-8"
        >
          <motion.div
            animate={floatingAnimation}
            className="mb-6 md:mb-8"
          >
            <FaBirthdayCake className="text-5xl md:text-6xl text-pink-500 mx-auto" />
          </motion.div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4 md:mb-6">
            Ready to Taste the Magic?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 md:mb-8 max-w-xl md:max-w-2xl mx-auto">
            Visit us today or order online to experience our sweet creations.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto"
            >
              <Link
                to="/contact"
                className="inline-block w-full sm:w-auto bg-gradient-to-r from-pink-500 to-orange-400 text-white px-6 py-3 sm:px-8 sm:py-3 rounded-full font-semibold text-sm sm:text-base md:text-lg hover:shadow-xl transition-all duration-300 text-center"
              >
                Order Online
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto"
            >
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
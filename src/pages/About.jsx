import React from "react";
import { motion, MotionConfig } from "motion/react";
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
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import FooterContent from "../components/FooterContent";

const serif = "font-[Fraunces,Georgia,serif]";
const container = "mx-auto w-full max-w-6xl px-4 sm:px-6";
const muted = "text-[#2B1511]/65 dark:text-[#f3e5d8]/65";
const line = "border-[#2B1511]/10 dark:border-[#C9A66B]/20";
const focus =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8A5A1E] dark:focus-visible:outline-[#D4B27A]";

const timelineEvents = [
  {
    year: "2010",
    title: "The Humble Beginning",
    description:
      "Started in a small home kitchen with a single oven, baking for friends and family.",
    icon: GiCakeSlice,
  },
  {
    year: "2013",
    title: "Our First Storefront",
    description:
      "Opened our first bakery shop and began sharing our favourite bakes with the wider community.",
    icon: FaBirthdayCake,
  },
  {
    year: "2016",
    title: "A Milestone Moment",
    description:
      "Our commitment to thoughtful recipes and beautiful desserts helped us earn local recognition.",
    icon: FaAward,
  },
  {
    year: "2019",
    title: "New Creations",
    description:
      "Introduced signature cakes and more custom options for life's most memorable celebrations.",
    icon: FaStar,
  },
  {
    year: "Today",
    title: "Still Baking with Love",
    description:
      "We continue to create fresh treats and meaningful moments, one celebration at a time.",
    icon: FaHeart,
  },
];

const values = [
  {
    icon: FaHeart,
    title: "Made with passion",
    description: "Every cake is prepared with care, creativity and a genuine love for baking.",
  },
  {
    icon: FaLeaf,
    title: "Quality ingredients",
    description: "We focus on fresh ingredients and flavour you can savour in every bite.",
  },
  {
    icon: FaUsers,
    title: "Made for sharing",
    description: "From family gatherings to big milestones, our bakes bring people together.",
  },
  {
    icon: FaCrown,
    title: "Thoughtful details",
    description: "We pay attention to the little details that make each order feel special.",
  },
  {
    icon: FaGlobe,
    title: "Mindful choices",
    description: "We aim to make thoughtful choices in how we source, bake and package.",
  },
  {
    icon: FaHandsHelping,
    title: "Customer first",
    description: "We listen, help you choose and work to make every order a lovely experience.",
  },
];

const bakers = [
  {
    name: "Chef Maria Chen",
    role: "Head Pastry Chef",
    image:
      "https://www.unicesumar.edu.br/blog/wp-content/uploads/2017/03/confeitaria-profissional.jpg",
    description:
      "Maria brings a careful eye for detail and a love of elegant, beautifully balanced desserts.",
  },
  {
    name: "Chef Zain Ahmed",
    role: "Cake & Bread Specialist",
    image:
      "https://media.istockphoto.com/id/874492906/photo/a-confectioner-with-a-cake-in-the-bakery.jpg?s=612x612&w=0&k=20&c=ExhrkrrP26f3aBLplxyruHxp2YWZPn_CDJ19YM7pSg4=",
    description:
      "Zain combines familiar baking traditions with exciting flavours to create memorable favourites.",
  },
  {
    name: "Chef Sofia Rodriguez",
    role: "Cake Decorator",
    image:
      "https://t4.ftcdn.net/jpg/04/00/73/47/360_F_400734737_CXuxJirdrY6zUrm4C9jxQ6JA1Kui03A2.jpg",
    description:
      "Sofia loves transforming ideas into thoughtful designs, delicate decorations and celebration cakes.",
  },
];

const testimonials = [
  {
    text: "The cake was beautiful and delicious. It made our special day feel even more memorable!",
    name: "Emily & James",
    role: "Celebration customers",
  },
  {
    text: "I keep coming back for birthday cakes. They are fresh, creative and always beautifully presented.",
    name: "Priya S.",
    role: "Regular customer",
  },
  {
    text: "The care in the details and the flavours really stand out. A lovely bakery experience.",
    name: "Rahul M.",
    role: "Happy customer",
  },
];

const stats = [
  { number: "10K+", label: "Happy customers" },
  { number: "5K+", label: "Cakes baked" },
  { number: "50+", label: "Dessert varieties" },
  { number: "15+", label: "Years of baking" },
];

const rise = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

function SectionHeading({ eyebrow, title, description, centered = true }) {
  return (
    <div className={`${centered ? "text-center" : ""} mb-10 sm:mb-12`}>
      {eyebrow && (
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#8A5A1E] dark:text-[#D4B27A]">
          {eyebrow}
        </p>
      )}
      <h2 className={`${serif} text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl`}>
        {title}
      </h2>
      {description && (
        <p className={`mx-auto mt-4 max-w-2xl text-base leading-relaxed sm:text-lg ${muted}`}>
          {description}
        </p>
      )}
    </div>
  );
}

function About() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="flex min-h-screen flex-col overflow-x-hidden bg-[#F7F0E6] text-[#2B1511] dark:bg-[#140A07] dark:text-[#f3e5d8]">
        <main className={`${container} grow`}>
          {/* Hero */}
          <section className="grid items-center gap-10 pb-16 pt-10 sm:pt-14 lg:grid-cols-2 lg:gap-16 lg:pb-24">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65 }}
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#C9A66B]/40 bg-[#C9A66B]/10 px-4 py-2 text-sm font-medium text-[#8A5A1E] dark:text-[#D4B27A]">
                <HiSparkles />
                A little about CakeVilla
              </div>
              <h1 className={`${serif} max-w-xl text-5xl font-medium leading-[1.06] tracking-tight sm:text-6xl xl:text-7xl`}>
                Our story is baked with <span className="text-[#8A5A1E] dark:text-[#D4B27A]">love.</span>
              </h1>
              <p className={`mt-6 max-w-xl text-lg leading-relaxed ${muted}`}>
                We believe the best desserts do more than taste wonderful. They bring people
                together, make milestones sweeter and turn everyday moments into memories.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/menu"
                  className={`inline-flex items-center gap-2 rounded-full bg-[#2B1511] px-7 py-3.5 text-sm font-semibold text-[#F7F0E6] transition hover:bg-[#4a251b] dark:bg-[#C9A66B] dark:text-[#1a0d09] dark:hover:bg-[#d8b87d] ${focus}`}
                >
                  Explore our cakes <FiArrowRight />
                </Link>
                <Link
                  to="/contact"
                  className={`inline-flex items-center rounded-full border border-[#2B1511]/20 px-7 py-3.5 text-sm font-semibold transition hover:border-[#8A5A1E] hover:text-[#8A5A1E] dark:border-white/20 dark:hover:border-[#D4B27A] dark:hover:text-[#D4B27A] ${focus}`}
                >
                  Get in touch
                </Link>
              </div>
              <div className={`mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t pt-6 text-sm ${line}`}>
                <span className="flex items-center gap-2"><FaHeart className="text-[#8A5A1E] dark:text-[#D4B27A]" /> Baked with care</span>
                <span className="flex items-center gap-2"><FaStar className="text-[#8A5A1E] dark:text-[#D4B27A]" /> Made for moments</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.75, delay: 0.1 }}
              className="relative mx-auto w-full max-w-lg lg:max-w-none"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-3xl bg-[#2B1511]/10 shadow-2xl shadow-[#2B1511]/15">
                <img
                  src="/images/cake20.jpg"
                  alt="A handcrafted CakeVilla celebration cake"
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/placeholder.jpg"; }}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B1511]/55 via-transparent to-transparent" />
              </div>
              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className={`absolute bottom-7 -left-2 flex items-center gap-3 rounded-2xl border ${line} bg-[#F7F0E6]/95 p-4 shadow-xl backdrop-blur dark:bg-[#20100b]/95 sm:-left-6`}
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#C9A66B]/20 text-2xl text-[#8A5A1E] dark:text-[#D4B27A]"><FaAward /></span>
                <div>
                  <p className={`text-xs ${muted}`}>Our promise</p>
                  <p className="font-semibold">Every bite, made special</p>
                </div>
              </motion.div>
              <div className="absolute -right-3 -top-3 -z-10 h-28 w-28 rounded-full border border-[#C9A66B]/50 sm:-right-5 sm:-top-5 sm:h-36 sm:w-36" />
            </motion.div>
          </section>

          {/* Story */}
          <section className={`grid items-center gap-10 border-t py-16 sm:py-20 lg:grid-cols-2 lg:gap-16 ${line}`}>
            <motion.div variants={rise} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#8A5A1E] dark:text-[#D4B27A]">The heart of our bakery</p>
              <h2 className={`${serif} text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl`}>
                Baking happiness, one slice at a time.
              </h2>
              <div className={`mt-6 space-y-4 text-base leading-relaxed sm:text-lg ${muted}`}>
                <p>
                  At CakeVilla, desserts are more than sweet treats — they are expressions of
                  affection, reasons to gather and little moments of joy. Our journey began in a
                  home kitchen with a simple dream: to make celebrations taste unforgettable.
                </p>
                <p>
                  That same spirit guides us today. We focus on thoughtful recipes, fresh flavours
                  and handcrafted details, whether you are choosing a family favourite or dreaming
                  up a cake made just for your occasion.
                </p>
              </div>
              <Link to="/contact" className={`mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#8A5A1E] transition hover:gap-3 dark:text-[#D4B27A] ${focus}`}>
                Let’s plan something sweet <FiArrowRight />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <img src="/images/cake2.jpg" alt="CakeVilla signature cake" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/placeholder.jpg"; }} className="mt-8 h-56 w-full rounded-2xl object-cover shadow-lg sm:h-72" />
              <img src="/images/cake10.webp" alt="Cake for a special celebration" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/placeholder.jpg"; }} className="h-56 w-full rounded-2xl object-cover shadow-lg sm:h-72" />
            </motion.div>
          </section>

          {/* Timeline */}
          <section className="py-16 sm:py-20">
            <SectionHeading
              eyebrow="From our kitchen to yours"
              title="Our sweet journey"
              description="Every chapter has been shaped by a love of baking and the people who share our cakes."
            />
            <div className="relative mx-auto max-w-4xl">
              <div className="absolute bottom-4 left-[19px] top-4 w-px bg-[#C9A66B]/60 md:left-1/2 md:-translate-x-1/2" />
              <div className="space-y-6 md:space-y-8">
                {timelineEvents.map((event, index) => {
                  const Icon = event.icon;
                  return (
                    <motion.div
                      key={event.year}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45, delay: index * 0.06 }}
                      viewport={{ once: true }}
                      className={`relative flex pl-12 md:w-1/2 md:pl-0 ${index % 2 === 0 ? "md:mr-auto md:pr-10" : "md:ml-auto md:flex-row-reverse md:pl-10"}`}
                    >
                      <span className="absolute left-[11px] top-7 z-10 flex h-4 w-4 items-center justify-center rounded-full border-4 border-[#F7F0E6] bg-[#8A5A1E] dark:border-[#140A07] dark:bg-[#C9A66B] md:left-auto md:right-[-8px]">
                        <span className="h-1 w-1 rounded-full bg-white" />
                      </span>
                      {index % 2 !== 0 && <span className="hidden md:block md:flex-1" />}
                      <article className={`w-full rounded-2xl border ${line} bg-white/50 p-6 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-[#2B1511]/5 dark:bg-white/[0.03]`}>
                        <div className="mb-4 flex items-center justify-between">
                          <span className="rounded-full bg-[#C9A66B]/20 px-3 py-1 text-xs font-bold tracking-wide text-[#8A5A1E] dark:text-[#D4B27A]">{event.year}</span>
                          <Icon className="text-xl text-[#8A5A1E] dark:text-[#D4B27A]" />
                        </div>
                        <h3 className={`${serif} text-xl font-semibold`}>{event.title}</h3>
                        <p className={`mt-2 text-sm leading-relaxed ${muted}`}>{event.description}</p>
                      </article>
                      {index % 2 === 0 && <span className="hidden md:block md:flex-1" />}
                      {index % 2 !== 0 && <span className="absolute left-[-8px] top-7 hidden h-4 w-4 rounded-full bg-[#8A5A1E] ring-4 ring-[#C9A66B]/20 md:block" />}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Values */}
          <section className={`border-t py-16 sm:py-20 ${line}`}>
            <SectionHeading
              eyebrow="What matters to us"
              title="The values behind every bake"
              description="A few simple principles guide the way we create, serve and celebrate with you."
            />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <motion.article
                    key={value.title}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                    className={`rounded-2xl border ${line} bg-white/50 p-6 sm:p-7 dark:bg-white/[0.03]`}
                  >
                    <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#C9A66B]/20 text-xl text-[#8A5A1E] dark:text-[#D4B27A]"><Icon /></span>
                    <h3 className={`${serif} text-xl font-semibold`}>{value.title}</h3>
                    <p className={`mt-2 text-sm leading-relaxed ${muted}`}>{value.description}</p>
                  </motion.article>
                );
              })}
            </div>
          </section>

          {/* Bakers */}
          <section className="py-16 sm:py-20">
            <SectionHeading
              eyebrow="The people behind the magic"
              title="Meet our baking team"
              description="Creative hands, curious minds and a shared passion for making something delicious."
            />
            <div className="grid gap-6 md:grid-cols-3">
              {bakers.map((baker, index) => (
                <motion.article
                  key={baker.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -6 }}
                  className={`group overflow-hidden rounded-2xl border ${line} bg-white/50 dark:bg-white/[0.03]`}
                >
                  <div className="aspect-[4/3] overflow-hidden bg-[#2B1511]/10">
                    <img src={baker.image} alt={baker.name} loading="lazy" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/placeholder.jpg"; }} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-6">
                    <h3 className={`${serif} text-xl font-semibold`}>{baker.name}</h3>
                    <p className="mt-1 text-sm font-semibold text-[#8A5A1E] dark:text-[#D4B27A]">{baker.role}</p>
                    <p className={`mt-3 text-sm leading-relaxed ${muted}`}>{baker.description}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>

          {/* Testimonials */}
          <section className={`border-t py-16 sm:py-20 ${line}`}>
            <SectionHeading
              eyebrow="Kind words, sweeter memories"
              title="What our customers say"
              description="The most rewarding part of what we do is being invited into your special moments."
            />
            <div className="grid gap-5 md:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <motion.article
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  viewport={{ once: true }}
                  className={`flex flex-col justify-between rounded-2xl border ${line} bg-white/50 p-7 dark:bg-white/[0.03]`}
                >
                  <div>
                    <FaQuoteLeft className="mb-5 text-2xl text-[#C9A66B]" />
                    <p className={`text-sm leading-relaxed sm:text-base ${muted}`}>&ldquo;{testimonial.text}&rdquo;</p>
                  </div>
                  <div className="mt-7 border-t border-[#2B1511]/10 pt-4 dark:border-[#C9A66B]/20">
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="mt-1 text-xs text-[#8A5A1E] dark:text-[#D4B27A]">{testimonial.role}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>

          {/* Stats */}
          <motion.section
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            viewport={{ once: true }}
            className="my-8 grid grid-cols-2 gap-6 rounded-3xl bg-[#2B1511] px-6 py-10 text-center text-[#F7F0E6] sm:my-12 sm:grid-cols-4 sm:px-10 sm:py-12 dark:bg-[#2B1511]"
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className={`${serif} text-3xl font-semibold text-[#D4B27A] sm:text-4xl`}>{stat.number}</p>
                <p className="mt-2 text-xs text-[#f3e5d8]/75 sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </motion.section>

          {/* Sustainability */}
          <section className="py-16 sm:py-20">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              viewport={{ once: true }}
              className={`flex flex-col items-start gap-6 rounded-3xl border ${line} bg-[#C9A66B]/10 p-7 sm:p-10 md:flex-row md:items-center md:gap-8`}
            >
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#C9A66B]/20 text-3xl text-[#8A5A1E] dark:text-[#D4B27A]"><FaLeaf /></span>
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#8A5A1E] dark:text-[#D4B27A]">A thoughtful approach</p>
                <h2 className={`${serif} text-2xl font-semibold sm:text-3xl`}>A little care goes a long way.</h2>
                <p className={`mt-3 max-w-3xl leading-relaxed ${muted}`}>
                  We believe caring for our community includes making mindful choices. We aim to
                  source thoughtfully, reduce avoidable waste and choose packaging with care wherever possible.
                </p>
              </div>
            </motion.div>
          </section>

          {/* Final CTA */}
          <section className="pb-20 pt-4 sm:pb-24">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              viewport={{ once: true }}
              className="rounded-3xl bg-[#2B1511] px-6 py-12 text-center text-[#F7F0E6] sm:px-12 sm:py-16 dark:bg-[#2B1511]"
            >
              <FaBirthdayCake className="mx-auto mb-5 text-4xl text-[#D4B27A]" />
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#D4B27A]">Let’s make it memorable</p>
              <h2 className={`${serif} mx-auto max-w-2xl text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl`}>
                Ready to make your next celebration a little sweeter?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#f3e5d8]/75 sm:text-base">
                Explore our cakes or tell us about the special creation you have in mind.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link to="/menu" className={`inline-flex items-center justify-center gap-2 rounded-full bg-[#C9A66B] px-7 py-3.5 text-sm font-semibold text-[#1a0d09] transition hover:bg-[#d8b87d] ${focus}`}>
                  Explore the menu <FiArrowRight />
                </Link>
                <Link to="/contact" className={`inline-flex items-center justify-center rounded-full border border-[#f3e5d8]/30 px-7 py-3.5 text-sm font-semibold transition hover:border-[#D4B27A] hover:text-[#D4B27A] ${focus}`}>
                  Contact us
                </Link>
              </div>
            </motion.div>
          </section>
        </main>
        <FooterContent />
      </div>
    </MotionConfig>
  );
}

export default About;

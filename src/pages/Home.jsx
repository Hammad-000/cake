import React, { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import API from "../services/api";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, MotionConfig } from "motion/react";
import { AiOutlineClockCircle, AiOutlineStar, AiFillStar, AiOutlineFire } from "react-icons/ai";
import { FiHeadphones, FiChevronLeft, FiChevronRight, FiArrowRight } from "react-icons/fi";
import FooterContent from "../components/FooterContent";
const API_BASE = (API.defaults.baseURL || "").replace(/\/api\/?$/, "");
const serif = "font-[Fraunces,Georgia,serif]";
const focus =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8A5A1E] dark:focus-visible:outline-[#D4B27A]";
const muted = "text-[#2B1511]/65 dark:text-[#f3e5d8]/65";
const line = "border-[#2B1511]/10 dark:border-[#C9A66B]/20";
const container = "mx-auto w-full max-w-6xl px-4 sm:px-6";

const SLIDES = [
  { src: "/images/slider 2.jfif", title: "Made for birthdays", subtitle: "Sweet, indulgent perfection" },
  { src: "/images/slider 3.jfif", title: "Fresh from the oven", subtitle: "Rich, sweet flavour in every slice" },
  { src: "/images/cake13.webp", title: "Artisanal creations", subtitle: "Crafted with sweet love" },
  { src: "/images/cake10.webp", title: "Family celebrations", subtitle: "Sweet moments, shared with love" },
  { src: "/images/cake4.webp", title: "Signature recipes", subtitle: "Sweetened with tradition" },
  { src: "/images/cake1.jpg", title: "Slow-baked delights", subtitle: "Tender, soft and always irresistible" },
];

const FEATURED = [
  {
    img: "/images/cake2.jpg",
    name: "Quarter Sweet Cake",
    description: "Crispy outer layer with a rich, velvety center. Our ultimate signature.",
    price: "2800",
    popular: true,
  },
  {
    img: "/images/cake8.jpg",
    name: "Classic Chocolate Cake",
    description: "Slow-baked with premium Belgian cocoa and smooth ganache.",
    price: "3500",
  },
  {
    img: "/images/cake20.jpg",
    name: "Hazelnut Supreme",
    description: "Rich hazelnut layers, creamy frosting and a roasted nut crunch.",
    price: "4000",
    popular: true,
  },
];

const PERKS = [
  { Icon: AiOutlineClockCircle, title: "Fast delivery", text: "30-minute delivery, or 50% off your order." },
  { Icon: AiOutlineStar, title: "Baked fresh daily", text: "High-grade, local ingredients in every cake." },
  { Icon: FiHeadphones, title: "Friendly support", text: "Our team helps you with every order." },
];

const STEPS = [
  "Pick a cake from the menu, or describe your idea.",
  "We confirm the flavour, size and price with you.",
  "Pick it up or get it delivered, fresh.",
];

const imageFor = (item) => {
  const raw = item.imageUrl || item.image || item.picture;
  if (!raw) return "/placeholder.jpg";
  return raw.startsWith("http") ? raw : `${API_BASE}${raw}`;
};

const formatPrice = (p) => {
  const n = Number(p);
  return Number.isNaN(n) ? `Rs. ${p}` : `Rs. ${n.toLocaleString("en-PK")}`;
};

const showPlaceholder = (e) => {
  e.currentTarget.onerror = null;
  e.currentTarget.src = "/placeholder.jpg";
};

/* ---------- Hero ---------- */
function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setIndex((i) => (i + 1) % SLIDES.length), []);
  const prev = useCallback(() => setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length), []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, paused, index]);

  const slide = SLIDES[index];
  const arrow = `flex h-11 w-11 items-center justify-center rounded-full border ${line} transition hover:bg-[#2B1511] hover:text-[#F7F0E6] dark:hover:bg-[#C9A66B] dark:hover:text-[#1a0d09] ${focus}`;

  return (
    <section className="grid items-center gap-12 pb-16 pt-8 lg:grid-cols-2 lg:gap-16 lg:pt-14">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <h1 className={`${serif} text-5xl font-medium leading-[1.05] tracking-tight sm:text-6xl xl:text-7xl`}>
          Cakes made for the moments worth celebrating.
        </h1>
        <p className={`mt-6 max-w-md text-lg leading-relaxed ${muted}`}>
          Freshly baked cakes, pastries and custom orders, made with local ingredients and a lot of love.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/menu"
            className={`inline-flex items-center gap-2 rounded-full bg-[#2B1511] text-[#F7F0E6] hover:bg-[#4a251b] dark:bg-[#C9A66B] dark:text-[#1a0d09] dark:hover:bg-[#d8b87d] px-7 py-3.5 text-sm font-semibold transition ${focus}`}
          >
            Order a cake <FiArrowRight />
          </Link>
          <Link
            to="/contact"
            className={`inline-flex items-center rounded-full border-2 border-[#2B1511]/20 px-7 py-3.5 text-sm font-semibold transition hover:border-[#8A5A1E] hover:text-[#8A5A1E] dark:hover:border-[#D4B27A] dark:hover:text-[#D4B27A] dark:border-white/20 ${focus}`}
          >
            Custom order
          </Link>
        </div>
      </motion.div>

      <div
        className="mx-auto w-full max-w-md lg:max-w-none"
        role="region"
        aria-roledescription="carousel"
        aria-label="Featured cakes"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-3xl bg-[#2B1511]/10 shadow-2xl shadow-[#2B1511]/20">
          <AnimatePresence initial={false}>
            <motion.img
              key={index}
              src={slide.src}
              alt={slide.title}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              onError={showPlaceholder}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#2B1511]/85 to-transparent px-6 pb-6 pt-24 text-white">
            <p aria-live="polite" className={`${serif} text-2xl font-semibold`}>{slide.title}</p>
            <p className="mt-1 text-sm text-white/80">{slide.subtitle}</p>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <div className="flex gap-2">
            {SLIDES.map((s, i) => (
              <button
                key={s.title}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index}
                className={`h-2 rounded-full transition-all duration-300 ${focus} ${
                  i === index ? "w-7 bg-[#8A5A1E] dark:bg-[#D4B27A]" : "w-2 bg-[#2B1511]/25 hover:bg-[#2B1511]/50 dark:bg-white/30"
                }`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={prev} aria-label="Previous slide" className={arrow}><FiChevronLeft size={20} /></button>
            <button onClick={next} aria-label="Next slide" className={arrow}><FiChevronRight size={20} /></button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Perks ---------- */
function Perks() {
  return (
    <ul className={`grid gap-8 border-y py-8 md:grid-cols-3 md:gap-0 md:divide-x ${line} md:divide-[#2B1511]/10 dark:md:divide-[#C9A66B]/20`}>
      {PERKS.map(({ Icon, title, text }) => (
        <li key={title} className="flex items-start gap-4 md:px-8 md:first:pl-0 md:last:pr-0">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#8A5A1E]/10 dark:bg-[#D4B27A]/15 text-xl text-[#8A5A1E] dark:text-[#D4B27A]">
            <Icon />
          </span>
          <div>
            <h3 className="font-semibold">{title}</h3>
            <p className={`mt-1 text-sm leading-relaxed ${muted}`}>{text}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

/* ---------- Featured ---------- */
function FeaturedCard({ dish, large }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className={`group relative isolate flex flex-col justify-end overflow-hidden rounded-3xl text-white ${
        large ? "min-h-[420px] md:col-span-3 md:row-span-2" : "min-h-[240px] md:col-span-2"
      }`}
    >
      <img
        src={dish.img}
        alt={dish.name}
        loading="lazy"
        onError={showPlaceholder}
        className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#2B1511]/90 via-[#2B1511]/25 to-transparent" />
      {dish.popular && (
        <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-[#C9A66B] px-3 py-1 text-xs font-semibold text-[#2B1511]">
          <AiOutlineFire /> Popular
        </span>
      )}
      <div className="p-6">
        <h3 className={`${serif} font-semibold ${large ? "text-3xl" : "text-xl"}`}>{dish.name}</h3>
        <p className="mt-2 line-clamp-2 max-w-md text-sm text-white/80">{dish.description}</p>
        <div className="mt-4 flex items-center justify-between gap-4">
          <span className="text-lg font-semibold">{formatPrice(dish.price)}</span>
          <Link
            to="/menu"
            className={`rounded-full bg-white px-5 py-2 text-sm font-semibold text-[#2B1511] transition hover:bg-[#2B1511] hover:text-[#F7F0E6] dark:hover:bg-[#C9A66B] dark:hover:text-[#1a0d09] ${focus}`}
          >
            Order now
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

function Featured() {
  return (
    <section className="py-16 sm:py-20">
      <h2 className={`${serif} text-3xl font-semibold sm:text-4xl`}>Signature cakes</h2>
      <p className={`mt-2 max-w-md ${muted}`}>Handcrafted favourites our customers keep coming back for.</p>
      <div className="mt-10 grid gap-5 md:grid-cols-5">
        {FEATURED.map((dish, i) => (
          <FeaturedCard key={dish.name} dish={dish} large={i === 0} />
        ))}
      </div>
    </section>
  );
}

/* ---------- Specialties (API) ---------- */
function ProductCard({ item }) {
  return (
    <Link to="/menu" className={`group block rounded-2xl ${focus}`}>
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#2B1511]/5 dark:bg-white/5">
        <img
          src={imageFor(item)}
          alt={item.name}
          loading="lazy"
          onError={showPlaceholder}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {item.category && (
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-[#2B1511]">
            {item.category}
          </span>
        )}
      </div>
      <div className="mt-3 flex items-start justify-between gap-3">
        <h3 className="line-clamp-1 font-medium">{item.name}</h3>
        <span className="shrink-0 font-semibold text-[#8A5A1E] dark:text-[#D4B27A]">{formatPrice(item.price)}</span>
      </div>
      {item.rating ? (
        <p className={`mt-1 flex items-center gap-1 text-sm ${muted}`}>
          <AiFillStar className="text-[#C9A66B]" /> {item.rating}
        </p>
      ) : null}
    </Link>
  );
}

function Specialties() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading"); 
  const [active, setActive] = useState("all");

  const load = useCallback(
    (signal) =>
      API.get("/products", { signal })
        .then(({ data }) => {
          setProducts(Array.isArray(data?.products) ? data.products.slice(0, 12) : []);
          setStatus("ready");
        })
        .catch((err) => {
          if (!axios.isCancel(err)) setStatus("error");
        }),
    []
  );

  useEffect(() => {
    const controller = new AbortController();
    load(controller.signal);
    return () => controller.abort();
  }, [load]);

  const retry = () => {
    setStatus("loading");
    load();
  };

  const categories = useMemo(() => {
    const names = [...new Set(products.map((p) => p.category).filter(Boolean))];
    return [
      { id: "all", count: products.length },
      ...names.map((n) => ({ id: n, count: products.filter((p) => p.category === n).length })),
    ];
  }, [products]);

  const visible = useMemo(
    () => (active === "all" ? products : products.filter((p) => p.category === active)),
    [products, active]
  );

  return (
    <section className={`border-t py-16 sm:py-20 ${line}`}>
      <h2 className={`${serif} text-3xl font-semibold sm:text-4xl`}>Our specialties</h2>
      <p className={`mt-2 max-w-md ${muted}`}>Freshly prepared bakes for every celebration, big or small.</p>

      {categories.length > 1 && (
        <div className="-mx-4 mt-8 flex gap-6 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          {categories.map(({ id, count }) => (
            <button
              key={id}
              onClick={() => setActive(id)}
              aria-pressed={active === id}
              className={`shrink-0 border-b-2 pb-2 text-sm font-medium capitalize transition ${focus} ${
                active === id
                  ? "border-[#8A5A1E] text-[#8A5A1E] dark:border-[#D4B27A] dark:text-[#D4B27A]"
                  : `border-transparent ${muted} hover:text-[#8A5A1E] dark:hover:text-[#D4B27A]`
              }`}
            >
              {id === "all" ? "All" : id} <span className="ml-1 text-xs opacity-70">{count}</span>
            </button>
          ))}
        </div>
      )}

      <div className="mt-8">
        {status === "loading" && (
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4" aria-busy="true">
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i}>
                <div className="aspect-[4/5] animate-pulse rounded-2xl bg-[#2B1511]/10 dark:bg-white/10" />
                <div className="mt-3 h-4 w-2/3 animate-pulse rounded bg-[#2B1511]/10 dark:bg-white/10" />
              </div>
            ))}
          </div>
        )}

        {status === "error" && (
          <div className={`rounded-2xl border px-6 py-14 text-center ${line}`} role="alert">
            <p className="font-medium">We couldn't load the cakes right now.</p>
            <p className={`mt-1 text-sm ${muted}`}>Check your connection and try again.</p>
            <button
              onClick={retry}
              className={`mt-5 rounded-full bg-[#2B1511] text-[#F7F0E6] hover:bg-[#4a251b] dark:bg-[#C9A66B] dark:text-[#1a0d09] dark:hover:bg-[#d8b87d] px-6 py-2.5 text-sm font-semibold transition ${focus}`}
            >
              Try again
            </button>
          </div>
        )}

        {status === "ready" && visible.length === 0 && (
          <p className={`py-16 text-center ${muted}`}>No cakes in this category yet.</p>
        )}

        {status === "ready" && visible.length > 0 && (
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-3 lg:grid-cols-4"
          >
            {visible.map((item, i) => (
              <ProductCard key={item._id || i} item={item} />
            ))}
          </motion.div>
        )}
      </div>

      <div className="mt-12 text-center">
        <Link
          to="/menu"
          className={`inline-flex items-center gap-2 rounded-full border-2 border-[#2B1511]/20 px-7 py-3 text-sm font-semibold transition hover:border-[#8A5A1E] hover:text-[#8A5A1E] dark:hover:border-[#D4B27A] dark:hover:text-[#D4B27A] dark:border-white/20 ${focus}`}
        >
          See the full menu <FiArrowRight />
        </Link>
      </div>
    </section>
  );
}

/* ---------- Custom order ---------- */
function CustomOrder() {
  return (
    <section className="pb-20">
      <div className="grid gap-12 rounded-3xl bg-[#2B1511] p-8 text-[#f3e5d8] sm:p-12 lg:grid-cols-2 lg:gap-16 dark:bg-[#2B1511]">
        <div>
          <h2 className={`${serif} text-3xl font-semibold leading-tight sm:text-4xl`}>
            Have a special cake in mind?
          </h2>
          <p className="mt-4 max-w-md text-[#f3e5d8]/70">
            Tell us about the occasion and we'll bake something made just for it.
          </p>
          <Link
            to="/contact"
            className={`mt-8 inline-flex items-center gap-2 rounded-full bg-[#C9A66B] px-7 py-3.5 text-sm font-semibold text-[#1a0d09] transition hover:bg-[#d8b87d] ${focus}`}
          >
            Start a custom order <FiArrowRight />
          </Link>
        </div>
        <ol className="space-y-6 self-center">
          {STEPS.map((step, i) => (
            <li key={step} className="flex items-start gap-4">
              <span className={`${serif} flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#f3e5d8]/30 text-lg`}>
                {i + 1}
              </span>
              <p className="pt-2 text-[#f3e5d8]/85">{step}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------- Page ---------- */
function Home() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="flex min-h-screen flex-col overflow-x-hidden bg-[#F7F0E6] text-[#2B1511] dark:bg-[#140A07] dark:text-[#f3e5d8]">
        <main className={`${container} grow`}>
          <Hero />
          <Perks />
          <Featured />
          <Specialties />
          <CustomOrder />
        </main>
        <FooterContent />
      </div>
    </MotionConfig>
  );
}

export default Home;
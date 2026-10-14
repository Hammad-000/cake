import React, { useState, useRef, useEffect } from 'react';
import { motion, MotionConfig } from 'framer-motion';
import {
  FaInstagram,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaClock,
  FaBirthdayCake,
  FaMagic,
  FaTruck,
} from 'react-icons/fa';
import { FiCheckCircle } from 'react-icons/fi';
import FooterContent from '../components/FooterContent';

const inputClass =
  'w-full rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-900/60 px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200 dark:focus:ring-pink-900/50';

const cardClass =
  'rounded-3xl border border-gray-100 dark:border-zinc-800 bg-white dark:bg-[#26120e] shadow-xl shadow-gray-100/60 dark:shadow-none';

const contactItems = [
  {
    icon: FaEnvelope,
    title: 'Email',
    value: 'info@cakesvilla.com',
    note: "We'll reply within 24 hours",
    href: 'mailto:info@cakesvilla.com',
  },
  {
    icon: FaPhone,
    title: 'Phone',
    value: '+1 (555) 123-4567',
    note: 'Mon to Fri, 8am to 8pm',
    href: 'tel:+15551234567',
  },
  {
    icon: FaMapMarkerAlt,
    title: 'Location',
    value: '123 Bakery Street, Sweet City',
    note: 'Visit our bakery',
  },
  {
    icon: FaInstagram,
    title: 'Instagram',
    value: '@cakes_villa002',
    note: 'See our latest cake creations',
    href: 'https://www.instagram.com/cakes_villa002',
    external: true,
  },
];

const hours = [
  { day: 'Monday to Friday', time: '10:00 AM - 10:00 PM' },
  { day: 'Saturday', time: '10:00 AM - 12:00 PM' },
  { day: 'Sunday', time: '3:00 PM - 11:00 PM' },
];

const reasons = [
  {
    icon: FaBirthdayCake,
    title: 'Baked fresh daily',
    text: 'Every cake is baked the same day with premium ingredients.',
  },
  {
    icon: FaMagic,
    title: 'Custom designs',
    text: 'Tell us your idea and we will design the cake around it.',
  },
  {
    icon: FaTruck,
    title: 'Free delivery',
    text: 'Free delivery within city limits.',
  },
];

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: send formData to your backend (e.g. API.post('/contact', formData))
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', message: '' });
    setSent(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setSent(false), 5000);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-gradient-to-b from-rose-50/60 via-orange-50/30 to-white dark:bg-[#1c0d0a] dark:bg-none dark:text-[#f3e5d8]">
        <div className="container mx-auto px-4 py-12 sm:py-16">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-12 max-w-2xl text-center"
          >
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
              Contact{' '}
              <span className="bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400 bg-clip-text text-transparent">
                Cakes Villa
              </span>
            </h1>
            <p className="mt-4 text-base text-gray-600 dark:text-gray-400 sm:text-lg">
              Have a question or a custom cake in mind? Send us a message and we will get back to you.
            </p>
          </motion.div>

          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Form */}
              <motion.section
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className={`${cardClass} p-6 sm:p-8`}
                aria-labelledby="form-heading"
              >
                <h2
                  id="form-heading"
                  className="mb-6 border-b border-gray-100 dark:border-zinc-800 pb-4 text-2xl font-bold text-gray-900 dark:text-white"
                >
                  Send us a message
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300"
                    >
                      Full name
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      autoComplete="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="Your name"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300"
                    >
                      Email address
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="you@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300"
                    >
                      Your message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="5"
                      className={`${inputClass} resize-y`}
                      placeholder="Tell us about your order or question"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-4 text-lg font-semibold text-white shadow-lg shadow-pink-500/25 transition-shadow hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500 active:scale-[0.99]"
                  >
                    <FaPaperPlane aria-hidden="true" />
                    Send message
                  </button>

                  <div role="status" aria-live="polite">
                    {sent && (
                      <p className="flex items-center gap-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 px-4 py-3 text-sm font-medium text-emerald-700 dark:text-emerald-300">
                        <FiCheckCircle className="shrink-0" aria-hidden="true" />
                        Message sent. We will reply within 24 hours.
                      </p>
                    )}
                  </div>
                </form>
              </motion.section>

              {/* Info column */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.12 }}
                className="space-y-8"
              >
                <section className={`${cardClass} p-6 sm:p-8`} aria-labelledby="touch-heading">
                  <h2
                    id="touch-heading"
                    className="mb-6 border-b border-gray-100 dark:border-zinc-800 pb-4 text-2xl font-bold text-gray-900 dark:text-white"
                  >
                    Get in touch
                  </h2>

                  <ul className="space-y-5">
                    {contactItems.map(({ icon: Icon, title, value, note, href, external }) => (
                      <li key={title} className="flex items-start gap-4">
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-pink-100 dark:bg-pink-950/50 text-pink-600 dark:text-pink-400">
                          <Icon className="text-xl" aria-hidden="true" />
                        </span>
                        <div className="min-w-0">
                          <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
                          {href ? (
                            <a
                              href={href}
                              {...(external
                                ? { target: '_blank', rel: 'noopener noreferrer' }
                                : {})}
                              className="break-words text-gray-700 dark:text-gray-300 underline-offset-2 transition-colors hover:text-pink-600 dark:hover:text-pink-400 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-pink-500"
                            >
                              {value}
                            </a>
                          ) : (
                            <p className="text-gray-700 dark:text-gray-300">{value}</p>
                          )}
                          <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">{note}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>

                <section
                  className="rounded-3xl bg-gradient-to-br from-pink-500 to-rose-500 p-6 text-white shadow-xl shadow-pink-500/20 sm:p-8"
                  aria-labelledby="hours-heading"
                >
                  <div className="mb-6 flex items-center gap-3">
                    <FaClock className="text-xl" aria-hidden="true" />
                    <h2 id="hours-heading" className="text-2xl font-bold">
                      Business hours
                    </h2>
                  </div>
                  <dl className="space-y-3">
                    {hours.map(({ day, time }, i) => (
                      <div
                        key={day}
                        className={`flex items-center justify-between gap-4 ${
                          i < hours.length - 1 ? 'border-b border-white/25 pb-3' : ''
                        }`}
                      >
                        <dt className="font-medium">{day}</dt>
                        <dd className="text-right font-semibold">{time}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="mt-6 border-t border-white/25 pt-5 text-center text-sm text-white/90">
                    Walk-ins welcome. Pre-orders are recommended for custom cakes.
                  </p>
                </section>
              </motion.div>
            </div>

            {/* Why choose us */}
            <section
              className={`${cardClass} mt-12 p-6 sm:p-8`}
              aria-labelledby="why-heading"
            >
              <h2
                id="why-heading"
                className="mb-6 text-center text-2xl font-bold text-gray-900 dark:text-white"
              >
                Why choose Cakes Villa
              </h2>
              <ul className="grid gap-6 md:grid-cols-3">
                {reasons.map(({ icon: Icon, title, text }) => (
                  <li key={title} className="flex items-start gap-4 md:flex-col md:items-center md:text-center">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-pink-100 dark:bg-pink-950/50 text-pink-600 dark:text-pink-400">
                      <Icon className="text-xl" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
        <FooterContent />
      </div>
    </MotionConfig>
  );
}

export default Contact;
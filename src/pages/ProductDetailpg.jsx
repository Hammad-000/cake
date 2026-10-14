import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import {
  FiMinus,
  FiPlus,
  FiCheck,
  FiTruck,
  FiLock,
  FiCheckCircle,
  FiArrowLeft,
  FiShoppingBag,
} from 'react-icons/fi';
import API from '../services/api';
import { useCart } from '../components/CartContext';

const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'https://cakes-backend-gamma.vercel.app';

const getImageUrl = (imagePath) => {
  if (!imagePath) return '/placeholder.jpg';
  if (imagePath.startsWith('http')) return imagePath;
  return `${API_BASE_URL}${imagePath.startsWith('/') ? imagePath : `/${imagePath}`}`;
};

const extractProduct = (data) =>
  data?.product || data?.data || (data?._id ? data : null);

const extractProducts = (data) => {
  if (Array.isArray(data?.products)) return data.products;
  if (Array.isArray(data)) return data;
  return [];
};

const getGallery = (product) => {
  if (!product) return [];
  const list = Array.isArray(product.images)
    ? product.images
        .map((img) => (typeof img === 'string' ? img : img?.url))
        .filter(Boolean)
    : [];
  const single = product.imageUrl || product.image;
  if (single && !list.includes(single)) list.unshift(single);
  return list;
};

const fallbackOnError = (e) => {
  e.target.onerror = null;
  e.target.src = '/placeholder.jpg';
};

function ProductDetailpg() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { addToCart } = useCart();

  // Fetch product
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      setQuantity(1);
      setActiveImage(0);
      try {
        const response = await API.get(`/products/${id}`);
        const found = extractProduct(response.data);
        if (found) {
          setProduct(found);
        } else {
          setProduct(null);
          setError('We could not find this product. It may have been removed.');
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setProduct(null);
        setError(
          err.response?.data?.message ||
            'The product could not be loaded. Check your connection and try again.'
        );
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (!product) return;
    const fetchRelated = async () => {
      try {
        const response = await API.get('/products');
        const products = extractProducts(response.data);
        const related = products
          .filter(
            (p) =>
              p.category === product.category &&
              String(p._id) !== String(product._id)
          )
          .slice(0, 3);
        setRelatedProducts(related);
      } catch (err) {
        console.error('Error fetching related products:', err);
        setRelatedProducts([]);
      }
    };
    fetchRelated();
  }, [product]);

  const gallery = useMemo(() => getGallery(product), [product]);

  const handleAddToCart = useCallback(() => {
    if (!product) return;
    addToCart({
      id: product._id,
      title: product.name || product.title,
      image: getImageUrl(gallery[0]),
      price: product.price,
      description: product.description,
      category: product.category,
      quantity: quantity,
    });
    setQuantity(1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }, [product, quantity, addToCart, gallery]);

  const totalPrice = useMemo(() => {
    return product ? (Number(product.price) * quantity).toFixed(2) : '0.00';
  }, [product, quantity]);

  /* ---------- Loading skeleton ---------- */
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-rose-50/60 via-orange-50/30 to-white dark:bg-[#1c0d0a] dark:bg-none py-8">
        <div className="container mx-auto px-4">
          <div className="h-4 w-48 rounded-full bg-gray-200 dark:bg-zinc-800 animate-pulse mb-6" />
          <div className="grid gap-8 lg:grid-cols-2 bg-white dark:bg-[#26120e] rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-xl p-5 sm:p-8 animate-pulse">
            <div>
              <div className="aspect-square w-full rounded-2xl bg-gray-200 dark:bg-zinc-800" />
              <div className="mt-4 flex gap-3">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="h-16 w-16 rounded-xl bg-gray-200 dark:bg-zinc-800" />
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="h-6 w-24 rounded-full bg-gray-200 dark:bg-zinc-800" />
              <div className="h-10 w-3/4 rounded-xl bg-gray-200 dark:bg-zinc-800" />
              <div className="h-8 w-32 rounded-xl bg-gray-200 dark:bg-zinc-800" />
              <div className="h-24 w-full rounded-xl bg-gray-200 dark:bg-zinc-800" />
              <div className="h-14 w-full rounded-2xl bg-gray-200 dark:bg-zinc-800" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ---------- Error state ---------- */
  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-rose-50/60 via-orange-50/30 to-white dark:bg-[#1c0d0a] dark:bg-none px-4">
        <div className="bg-white dark:bg-[#26120e] p-8 rounded-3xl shadow-xl border border-red-100 dark:border-red-900/30 text-center max-w-md w-full">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            Product unavailable
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
            {error || 'We could not find this product.'}
          </p>
          <Link
            to="/menu"
            className="inline-flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-shadow"
          >
            <FiArrowLeft /> Back to menu
          </Link>
        </div>
      </div>
    );
  }

  const { name, description, category, price, rating } = product;
  const ratingValue = Number(rating);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-gradient-to-b from-rose-50/60 via-orange-50/30 to-white dark:bg-[#1c0d0a] dark:bg-none dark:text-[#f3e5d8] py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav
            className="mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400"
            aria-label="Breadcrumb"
          >
            <Link to="/" className="hover:text-pink-500 transition-colors">Home</Link>
            <span aria-hidden="true">/</span>
            <Link to="/menu" className="hover:text-pink-500 transition-colors">Menu</Link>
            <span aria-hidden="true">/</span>
            <span className="text-gray-900 dark:text-white font-medium" aria-current="page">
              {name}
            </span>
          </nav>

          {/* Main card */}
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 bg-white dark:bg-[#26120e] rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-xl shadow-gray-100/60 dark:shadow-none p-5 sm:p-8">
            {/* Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-900">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={gallery[activeImage] || 'placeholder'}
                    src={getImageUrl(gallery[activeImage])}
                    alt={name}
                    onError={fallbackOnError}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </AnimatePresence>
              </div>

              {gallery.length > 1 && (
                <div className="mt-4 flex gap-3 overflow-x-auto pb-1" role="list" aria-label="Product images">
                  {gallery.map((img, i) => (
                    <button
                      key={img + i}
                      type="button"
                      role="listitem"
                      onClick={() => setActiveImage(i)}
                      aria-label={`Show image ${i + 1} of ${gallery.length}`}
                      aria-current={i === activeImage}
                      className={`h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500 ${
                        i === activeImage
                          ? 'border-pink-500 shadow-md shadow-pink-500/20'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={getImageUrl(img)}
                        alt=""
                        onError={fallbackOnError}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08, ease: 'easeOut' }}
              className="flex flex-col"
            >
              {category && (
                <span className="mb-3 inline-flex w-fit rounded-full bg-pink-100/80 dark:bg-pink-950/50 px-3.5 py-1 text-xs font-semibold text-pink-600 dark:text-pink-400">
                  {category}
                </span>
              )}

              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                {name}
              </h1>

              {ratingValue > 0 && (
                <div className="mt-3 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <FaStar className="text-yellow-400" aria-hidden="true" />
                  <span className="font-semibold">{ratingValue.toFixed(1)}</span>
                  <span className="text-gray-400">out of 5</span>
                </div>
              )}

              <p className="mt-5 text-3xl font-extrabold bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400 bg-clip-text text-transparent">
                Rs {price}
              </p>

              <div className="mt-6">
                <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-2">
                  About this item
                </h2>
                <p className="max-w-prose leading-relaxed text-gray-600 dark:text-gray-400">
                  {description || 'No description available yet.'}
                </p>
              </div>

              {/* Quantity */}
              <div className="mt-8">
                <span
                  id="quantity-label"
                  className="block text-sm font-bold text-gray-800 dark:text-gray-200 mb-2"
                >
                  Quantity
                </span>
                <div
                  className="inline-flex items-center gap-1 rounded-full border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-900/60 p-1"
                  role="group"
                  aria-labelledby="quantity-label"
                >
                  <button
                    type="button"
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    disabled={quantity === 1}
                    className="flex h-10 w-10 items-center justify-center rounded-full text-gray-700 dark:text-gray-200 hover:bg-pink-100 dark:hover:bg-pink-950/50 disabled:opacity-40 disabled:hover:bg-transparent transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-pink-500"
                    aria-label="Decrease quantity"
                  >
                    <FiMinus />
                  </button>
                  <span
                    className="w-10 text-center text-lg font-bold tabular-nums"
                    aria-live="polite"
                  >
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((prev) => prev + 1)}
                    className="flex h-10 w-10 items-center justify-center rounded-full text-gray-700 dark:text-gray-200 hover:bg-pink-100 dark:hover:bg-pink-950/50 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-pink-500"
                    aria-label="Increase quantity"
                  >
                    <FiPlus />
                  </button>
                </div>
              </div>

              {/* Add to cart */}
              <motion.button
                type="button"
                onClick={handleAddToCart}
                whileTap={{ scale: 0.98 }}
                className={`mt-6 flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-lg font-semibold text-white shadow-lg transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500 ${
                  added
                    ? 'bg-emerald-500 shadow-emerald-500/20'
                    : 'bg-gradient-to-r from-pink-500 to-rose-500 shadow-pink-500/25 hover:shadow-xl'
                }`}
              >
                {added ? (
                  <>
                    <FiCheck aria-hidden="true" /> Added to cart
                  </>
                ) : (
                  <>
                    <FiShoppingBag aria-hidden="true" /> Add to cart · Rs {totalPrice}
                  </>
                )}
              </motion.button>
              <span className="sr-only" role="status">
                {added ? 'Item added to cart' : ''}
              </span>

              {/* Trust row */}
              <ul className="mt-6 grid grid-cols-1 gap-3 border-t border-gray-100 dark:border-zinc-800 pt-5 text-sm text-gray-600 dark:text-gray-400 sm:grid-cols-3">
                <li className="flex items-center gap-2">
                  <FiCheckCircle className="text-emerald-500 shrink-0" aria-hidden="true" />
                  In stock
                </li>
                <li className="flex items-center gap-2">
                  <FiTruck className="text-pink-500 shrink-0" aria-hidden="true" />
                  Free delivery
                </li>
                <li className="flex items-center gap-2">
                  <FiLock className="text-pink-500 shrink-0" aria-hidden="true" />
                  Secure checkout
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Related products */}
          {relatedProducts.length > 0 && (
            <section className="mt-14" aria-labelledby="related-heading">
              <h2
                id="related-heading"
                className="mb-6 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white"
              >
                You might also like
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedProducts.map((related) => (
                  <Link
                    key={related._id}
                    to={`/product/${related._id}`}
                    className="group block overflow-hidden rounded-3xl border border-gray-100 dark:border-zinc-800 bg-white dark:bg-[#26120e] shadow-sm transition-shadow hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500"
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-zinc-900">
                      <img
                        src={getImageUrl(related.imageUrl || related.image)}
                        alt={related.name}
                        onError={fallbackOnError}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex items-center justify-between gap-3 p-4">
                      <h3 className="line-clamp-1 font-semibold text-gray-900 dark:text-white">
                        {related.name}
                      </h3>
                      <p className="shrink-0 font-bold text-pink-600 dark:text-pink-400">
                        Rs {related.price}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </MotionConfig>
  );
}

export default ProductDetailpg;
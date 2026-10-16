import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { FiShoppingBag, FiCheck } from "react-icons/fi";
import API from "../services/api";
import { useCart } from "../components/CartContext";

/* Palette: ivory #F7F0E6 / espresso #140A07 / chocolate #2B1511 / gold #C9A66B (bronze #8A5A1E on light) */
const serif = "font-[Fraunces,Georgia,serif]";

// Same base as the rest of the app (services/api.js), without the trailing /api
const API_ORIGIN = (API.defaults.baseURL || "").replace(/\/api\/?$/, "");

const resolveImage = (product) => {
  const raw = product.imageUrl || product.image || product.picture;
  if (!raw) return "/placeholder.jpg";
  return raw.startsWith("http") ? raw : `${API_ORIGIN}${raw}`;
};

const formatPrice = (n) => `Rs. ${Number(n || 0).toLocaleString("en-PK", { maximumFractionDigits: 2 })}`;

const showPlaceholder = (e) => {
  e.currentTarget.onerror = null;
  e.currentTarget.src = "/placeholder.jpg";
};

function ProductsCard({ product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const { _id, description, category } = product;
  // API me naam ki field alag ho sakti hai, isliye kai options check karte hain
  const rawName =
    product.name || product.title || product.productName || product.cakeName || product.itemName || "";
  const name = rawName || category || "Cake";
  const price = Number(product.price) || 0;
  const rating = Number(product.rating) || 0;
  const imageSrc = resolveImage(product);

  // Dev me warning: agar naam ki koi field nahi mili to console me keys dikha do
  useEffect(() => {
    if (import.meta.env.DEV && !rawName) {
      console.warn("ProductsCard: no name field found. Product keys:", Object.keys(product));
    }
  }, [rawName, product]);

  // "Added" feedback goes back to normal after a moment
  useEffect(() => {
    if (!added) return;
    const timer = setTimeout(() => setAdded(false), 1600);
    return () => clearTimeout(timer);
  }, [added]);

  const handleAdd = () => {
    addToCart({
      id: _id,
      title: name,
      image: imageSrc,
      price,
      description,
      category,
      quantity: 1,
    });
    setAdded(true);
  };

  return (
    <article className="group relative flex h-full flex-col rounded-2xl border text-[#2B1511] dark:text-[#f3e5d8] border-[#2B1511]/10 bg-white transition duration-300 hover:-translate-y-1 hover:border-[#8A5A1E]/50 hover:shadow-xl hover:shadow-[#2B1511]/10 dark:border-[#C9A66B]/20 dark:bg-white/5 dark:hover:border-[#D4B27A]/60 dark:hover:shadow-black/40">
      {/* Image */}
      <div className="relative aspect-[5/4] overflow-hidden rounded-t-2xl bg-[#2B1511]/5 dark:bg-white/5">
        <img
          src={imageSrc}
          alt={name}
          loading="lazy"
          onError={showPlaceholder}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {category && (
          <span className="absolute left-3 top-3 rounded-full bg-[#F7F0E6]/90 px-2.5 py-1 text-xs font-medium text-[#2B1511] backdrop-blur">
            {category}
          </span>
        )}
        {rating > 0 && (
          <span
            className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-[#2B1511]/80 px-2.5 py-1 text-xs font-medium text-[#f3e5d8] backdrop-blur"
            aria-label={`Rated ${rating.toFixed(1)} out of 5`}
          >
            <FaStar className="text-[#C9A66B]" aria-hidden="true" /> {rating.toFixed(1)}
          </span>
        )}
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col p-4">
        <div className="grow pb-4">
          <h3 className={`${serif} line-clamp-2 text-lg font-semibold leading-snug text-[#2B1511] md:text-xl dark:text-[#f3e5d8]`}>
            {/* Stretched link: the whole card is clickable, the cart button stays separate */}
            <Link
              to={`/product/${_id}`}
              className="block text-[#2B1511] no-underline transition-colors hover:text-[#8A5A1E] dark:text-[#f3e5d8] dark:hover:text-[#D4B27A] after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-[#8A5A1E] dark:focus-visible:after:outline-[#D4B27A]"
            >
              {name}
            </Link>
          </h3>
          {description && (
            <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-[#2B1511]/65 dark:text-[#f3e5d8]/65">
              {description}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-[#2B1511]/10 pt-4 dark:border-[#C9A66B]/20">
          <span className="text-lg font-semibold text-[#8A5A1E] dark:text-[#D4B27A]">{formatPrice(price)}</span>
          <button
            type="button"
            onClick={handleAdd}
            aria-label={`Add ${name} to cart`}
            className="relative z-10 inline-flex items-center gap-1.5 rounded-full bg-[#2B1511] px-4 py-2 text-sm font-semibold text-[#F7F0E6] transition hover:bg-[#4a251b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8A5A1E] active:scale-95 dark:bg-[#C9A66B] dark:text-[#1a0d09] dark:hover:bg-[#d8b87d] dark:focus-visible:outline-[#D4B27A]"
          >
            <span aria-live="polite" className="inline-flex items-center gap-1.5">
              {added ? (
                <>
                  <FiCheck aria-hidden="true" /> Added
                </>
              ) : (
                <>
                  <FiShoppingBag aria-hidden="true" /> Add
                </>
              )}
            </span>
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductsCard;
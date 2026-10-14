import { useState, useMemo, useEffect } from "react";
import API from "../services/api";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import CategoryFilter from "../components/CategoryFilter";
import RatingFilter from "../components/RatingFilter";
import PriceRange from "../components/PriceRange";
import SearchBox from "../components/SearchBox";
import SortingFilter from "../components/SortingFilter";
import FooterContent from "../components/FooterContent";
import ProductsCard from "../components/ProductsCard";
import { AiOutlineFilter } from "react-icons/ai";
import { IoCloseCircleOutline } from "react-icons/io5";
import { FaSortAmountDown } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";

const SORT_OPTIONS = [
  { value: "", label: "Default Order", icon: "🔄" },
  { value: "price-low", label: "Price: Low to High", icon: "📈" },
  { value: "price-high", label: "Price: High to Low", icon: "📉" },
  { value: "rating", label: "Highest Rated", icon: "⭐" },
];

const toNumber = (value) => {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
};

function Menu() {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRating, setSelectedRating] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0, isApplied: false });
  const [searchTerm, setSearchTerm] = useState("");
  const [sorting, setSorting] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.get("/products");
        let products = [];
        if (response.data?.products && Array.isArray(response.data.products)) {
          products = response.data.products;
        } else if (Array.isArray(response.data)) {
          products = response.data;
        } else {
          throw new Error("Invalid API response format");
        }
        setAllProducts(products);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Mobile panels: close on Escape and stop the page behind from scrolling
  const panelOpen = isFilterOpen || isSortOpen;
  useEffect(() => {
    if (!panelOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsFilterOpen(false);
        setIsSortOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [panelOpen]);

  const initPriceFilter = useMemo(() => {
    if (!allProducts.length) return { min: 0, max: 0, isApplied: false };
    const prices = allProducts
      .map((p) => Number(p.price))
      .filter((p) => Number.isFinite(p));
    if (prices.length === 0) return { min: 0, max: 0, isApplied: false };
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
      isApplied: false,
    };
  }, [allProducts]);

  useEffect(() => {
    if (allProducts.length && !priceRange.max) {
      setPriceRange(initPriceFilter);
    }
  }, [allProducts, initPriceFilter, priceRange.max]);

  const filterProducts = useMemo(() => {
    if (!allProducts.length) return [];

    let filtered = [...allProducts];

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) => selectedCategories.includes(p.category));
    }

    if (selectedRating) {
      const minRating = parseFloat(selectedRating);
      filtered = filtered.filter((p) => toNumber(p.rating) >= minRating);
    }

    if (priceRange.isApplied) {
      filtered = filtered.filter((p) => {
        const price = toNumber(p.price);
        return price >= priceRange.min && price <= priceRange.max;
      });
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          (p.name || p.title || "").toLowerCase().includes(term) ||
          (p.description || "").toLowerCase().includes(term)
      );
    }

    switch (sorting) {
      case "price-low":
        filtered.sort((a, b) => toNumber(a.price) - toNumber(b.price));
        break;
      case "price-high":
        filtered.sort((a, b) => toNumber(b.price) - toNumber(a.price));
        break;
      case "rating":
        filtered.sort((a, b) => toNumber(b.rating) - toNumber(a.rating));
        break;
      default:
        break;
    }
    return filtered;
  }, [allProducts, selectedCategories, selectedRating, priceRange, searchTerm, sorting]);

  const onChangeCategoryHandler = (category, isChecked) => {
    setSelectedCategories((prev) =>
      isChecked ? [...prev, category] : prev.filter((c) => c !== category)
    );
  };

  const onChangeRatingHandler = (rating) => {
    setSelectedRating(rating);
  };

  const handlePriceRangeChange = (newPriceRange) => {
    setPriceRange(newPriceRange);
  };

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  const handleSorting = (sort) => {
    setSorting(sort);
    setIsSortOpen(false);
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedRating("");
    setPriceRange(initPriceFilter);
    setSearchTerm("");
    setSorting("");
  };

  const hasActiveFilters =
    selectedCategories.length > 0 || selectedRating || priceRange.isApplied;

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-rose-50/60 via-orange-50/30 to-white dark:bg-[#1c0d0a] dark:bg-none px-4">
        <div className="bg-white dark:bg-[#26120e] p-8 rounded-3xl shadow-xl border border-red-100 dark:border-red-900/30 text-center max-w-md w-full">
          <div className="text-red-500 text-5xl mb-4" aria-hidden="true">⚠️</div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <MotionConfig reducedMotion="user">
      {/* dark:bg-none removes the light gradient so the dark colour shows in dark mode */}
      <div className="min-h-screen bg-gradient-to-b from-rose-50/60 via-orange-50/30 to-white dark:bg-[#1c0d0a] dark:bg-none dark:text-[#f3e5d8]">

        {/* Mobile Sticky Header */}
        <div className="sticky top-0 z-40 bg-white/90 dark:bg-[#1c0d0a]/90 backdrop-blur-md shadow-sm border-b border-gray-100 dark:border-gray-800 lg:hidden">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-extrabold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                Our Menu
              </h1>
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => setIsSortOpen(true)}
                  aria-haspopup="dialog"
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-pink-50 dark:bg-zinc-800 text-pink-600 dark:text-pink-400 rounded-xl hover:bg-pink-100 transition-colors text-xs font-semibold"
                >
                  <FaSortAmountDown aria-hidden="true" />
                  <span>Sort</span>
                </button>
                <button
                  onClick={() => setIsFilterOpen(true)}
                  aria-haspopup="dialog"
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition-colors text-xs font-semibold shadow-sm"
                >
                  <AiOutlineFilter aria-hidden="true" />
                  <span>Filter</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">

          {/* Desktop Header Banner */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden lg:flex justify-between items-center mb-10 pb-6 border-b border-gray-200/60 dark:border-zinc-800"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-100/80 dark:bg-pink-950/50 text-pink-600 dark:text-pink-400 text-xs font-semibold mb-3">
                <HiSparkles className="text-xs" aria-hidden="true" />
                <span>Freshly Baked Daily</span>
              </div>
              <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400">Sweet Menu</span>
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                Handcrafted cakes, pastries, and desserts made with premium ingredients.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <SearchBox onSearchChange={handleSearchChange} />
              <SortingFilter handleSorting={handleSorting} currentSort={sorting} />
            </div>
          </motion.div>

          {/* Mobile Search Bar */}
          <div className="lg:hidden mb-6">
            <SearchBox onSearchChange={handleSearchChange} />
          </div>

          {/* Mobile Sorting Bottom Sheet */}
          <AnimatePresence>
            {isSortOpen && (
              <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Sort products">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                  onClick={() => setIsSortOpen(false)}
                />
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  className="absolute bottom-0 left-0 right-0 bg-white dark:bg-[#26120e] rounded-t-3xl shadow-2xl max-h-[70vh] overflow-y-auto"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-5">
                      <h2 className="text-lg font-bold text-gray-900 dark:text-white">Sort By</h2>
                      <button
                        onClick={() => setIsSortOpen(false)}
                        aria-label="Close sort options"
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                      >
                        <IoCloseCircleOutline size={26} />
                      </button>
                    </div>
                    <div className="space-y-2.5">
                      {SORT_OPTIONS.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => handleSorting(option.value)}
                          aria-pressed={sorting === option.value}
                          className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all text-sm font-medium ${
                            sorting === option.value
                              ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md shadow-pink-500/20"
                              : "bg-gray-50 dark:bg-zinc-800/60 hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-700 dark:text-gray-200 border border-gray-100 dark:border-zinc-800"
                          }`}
                        >
                          <span className="text-lg" aria-hidden="true">{option.icon}</span>
                          <span>{option.label}</span>
                          {sorting === option.value && <span className="ml-auto font-bold" aria-hidden="true">✓</span>}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Mobile Filter Fullscreen Overlay */}
          <AnimatePresence>
            {isFilterOpen && (
              <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Filter products">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                  onClick={() => setIsFilterOpen(false)}
                />
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 250 }}
                  className="absolute top-0 right-0 bottom-0 w-full max-w-sm bg-white dark:bg-[#1c0d0a] overflow-y-auto flex flex-col justify-between shadow-2xl"
                >
                  <div>
                    <div className="sticky top-0 bg-white/90 dark:bg-[#1c0d0a]/90 backdrop-blur-md border-b border-gray-100 dark:border-zinc-800 z-10 p-4 flex justify-between items-center">
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">Filters</h2>
                      <button
                        onClick={() => setIsFilterOpen(false)}
                        aria-label="Close filters"
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                      >
                        <IoCloseCircleOutline size={28} />
                      </button>
                    </div>
                    <div className="p-5 space-y-6">
                      <div className="bg-gray-50/60 dark:bg-zinc-900/40 rounded-2xl p-4 border border-gray-100 dark:border-zinc-800">
                        <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3">Categories</h3>
                        <CategoryFilter
                          products={allProducts}
                          selectedCategories={selectedCategories}
                          onChangeCategory={onChangeCategoryHandler}
                          isMobile={true}
                        />
                      </div>
                      <div className="bg-gray-50/60 dark:bg-zinc-900/40 rounded-2xl p-4 border border-gray-100 dark:border-zinc-800">
                        <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3">Price Range</h3>
                        <PriceRange
                          priceRange={priceRange}
                          initPriceRange={initPriceFilter}
                          setPriceRange={handlePriceRangeChange}
                          isMobile={true}
                        />
                      </div>
                      <div className="bg-gray-50/60 dark:bg-zinc-900/40 rounded-2xl p-4 border border-gray-100 dark:border-zinc-800">
                        <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3">Rating</h3>
                        <RatingFilter
                          onChangeRating={onChangeRatingHandler}
                          selectedRating={selectedRating}
                          isMobile={true}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="sticky bottom-0 bg-white dark:bg-[#1c0d0a] border-t border-gray-100 dark:border-zinc-800 p-4 shadow-lg">
                    <div className="flex gap-3">
                      <button onClick={clearAllFilters} className="flex-1 py-3 px-4 bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 font-semibold rounded-xl text-sm transition-colors">
                        Clear All
                      </button>
                      <button onClick={() => setIsFilterOpen(false)} className="flex-1 py-3 px-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-xl text-sm shadow-md shadow-pink-500/20 transition-all">
                        Show {filterProducts.length} Items
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          <div className="flex flex-col lg:grid lg:grid-cols-4 gap-8">

            {/* Desktop Sidebar Filters */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-6 space-y-6">
                <div className="bg-white/80 dark:bg-[#26120e]/80 backdrop-blur-md rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-xl shadow-gray-100/50 dark:shadow-none p-6">
                  <div className="flex justify-between items-center mb-6 pb-3 border-b border-gray-100 dark:border-zinc-800">
                    <h2 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <AiOutlineFilter className="text-pink-500 text-lg" aria-hidden="true" /> Filters
                    </h2>
                    <button onClick={clearAllFilters} className="text-xs text-pink-600 dark:text-pink-400 font-semibold hover:underline">
                      Clear all
                    </button>
                  </div>
                  <div className="space-y-6">
                    <CategoryFilter
                      products={allProducts}
                      selectedCategories={selectedCategories}
                      onChangeCategory={onChangeCategoryHandler}
                    />
                    <PriceRange
                      priceRange={priceRange}
                      initPriceRange={initPriceFilter}
                      setPriceRange={handlePriceRangeChange}
                    />
                    <RatingFilter
                      onChangeRating={onChangeRatingHandler}
                      selectedRating={selectedRating}
                    />
                  </div>
                </div>

                {/* Active Filter Badges Box */}
                {hasActiveFilters && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rounded-3xl border border-pink-200 dark:border-pink-900/40 bg-pink-50/50 dark:bg-pink-950/20 p-5 shadow-sm"
                  >
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-sm mb-3">Active filters</h3>
                    <div className="space-y-1.5 text-xs text-gray-600 dark:text-gray-300">
                      {selectedCategories.length > 0 && (
                        <p>• Categories: <span className="font-semibold text-pink-600 dark:text-pink-400">{selectedCategories.join(", ")}</span></p>
                      )}
                      {selectedRating && (
                        <p>• Rating: <span className="font-semibold text-pink-600 dark:text-pink-400">{selectedRating}★ & up</span></p>
                      )}
                      {priceRange.isApplied && (
                        <p>• Price: <span className="font-semibold text-pink-600 dark:text-pink-400">Rs.{priceRange.min} - Rs.{priceRange.max}</span></p>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Main Products Area */}
            <div className="lg:col-span-3">

              {/* Mobile Active Filter Chips */}
              <div className="lg:hidden mb-5">
                <div className="flex flex-wrap items-center gap-2">
                  {selectedCategories.map((cat) => (
                    <span key={cat} className="px-3 py-1 bg-pink-100 dark:bg-pink-950 text-pink-600 dark:text-pink-300 rounded-full text-xs font-medium">
                      {cat}
                    </span>
                  ))}
                  {selectedRating && (
                    <span className="px-3 py-1 bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-300 rounded-full text-xs font-medium">
                      {selectedRating}★ & up
                    </span>
                  )}
                  {priceRange.isApplied && (
                    <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-300 rounded-full text-xs font-medium">
                      Rs.{priceRange.min}-{priceRange.max}
                    </span>
                  )}
                  {hasActiveFilters && (
                    <button onClick={clearAllFilters} className="px-3 py-1 bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-300 rounded-full text-xs font-medium">
                      Clear all
                    </button>
                  )}
                </div>
              </div>

              {/* Results Counter Bar */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white" aria-live="polite">
                  {loading ? "Loading items..." : `${filterProducts.length} Items Found`}
                </h2>
                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium hidden sm:inline-block">
                  {sorting ? `Sorted by: ${sorting.replace("-", " ")}` : "Default sorting"}
                </span>
              </div>

              {/* SKELETON LOADING GRID */}
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <div key={n} className="bg-white dark:bg-[#26120e] rounded-3xl p-4 shadow-md border border-gray-100 dark:border-zinc-800 animate-pulse">
                      <div className="w-full h-48 bg-gray-200 dark:bg-zinc-800 rounded-2xl mb-4"></div>
                      <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded-full w-3/4 mb-2.5"></div>
                      <div className="h-3 bg-gray-200 dark:bg-zinc-800 rounded-full w-1/2 mb-4"></div>
                      <div className="flex justify-between items-center mt-4">
                        <div className="h-5 bg-gray-200 dark:bg-zinc-800 rounded-full w-1/4"></div>
                        <div className="h-9 bg-gray-200 dark:bg-zinc-800 rounded-xl w-1/3"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* PRODUCTS GRID */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filterProducts.length === 0 ? (
                    <div className="col-span-full text-center py-16 bg-white dark:bg-[#26120e] rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-sm">
                      <span className="text-4xl mb-3 block" aria-hidden="true">🎂</span>
                      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-1">No products found</h3>
                      <p className="text-gray-500 dark:text-gray-400 text-xs mb-4">Try adjusting your search or filters to find what you're looking for.</p>
                      <button
                        onClick={clearAllFilters}
                        className="px-5 py-2.5 bg-pink-500 text-white rounded-xl text-xs font-semibold shadow-sm hover:bg-pink-600 transition-colors"
                      >
                        Reset Filters
                      </button>
                    </div>
                  ) : (
                    filterProducts.map((product, idx) => (
                      <motion.div
                        key={product._id || product.id}
                        className="h-full"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: Math.min(idx, 8) * 0.05 }}
                      >
                        <ProductsCard product={product} />
                      </motion.div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <FooterContent />
      </div>
    </MotionConfig>
  );
}

export default Menu;
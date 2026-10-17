import { useState, useMemo, useEffect } from "react";
import API from "../services/api";
import { motion, AnimatePresence, MotionConfig } from "motion/react";
import CategoryFilter from "../components/CategoryFilter";
import RatingFilter from "../components/RatingFilter";
import PriceRange from "../components/PriceRange";
import SearchBox from "../components/SearchBox";
import SortingFilter from "../components/SortingFilter";
import FooterContent from "../components/FooterContent";
import ProductsCard from "../components/ProductsCard";
import { FiFilter, FiX } from "react-icons/fi";
import { FaSortAmountDown } from "react-icons/fa";

const serif = "font-[Fraunces,Georgia,serif]";
const focus = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8A5A1E] dark:focus-visible:outline-[#D4B27A]";
const muted = "text-[#2B1511]/65 dark:text-[#f3e5d8]/65";
const line = "border-[#2B1511]/10 dark:border-[#C9A66B]/20";
const accent = "text-[#8A5A1E] dark:text-[#D4B27A]";
const btn = "bg-[#2B1511] text-[#F7F0E6] hover:bg-[#4a251b] dark:bg-[#C9A66B] dark:text-[#1a0d09] dark:hover:bg-[#d8b87d]";

const toNumber = (val) => {
  const n = Number(val);
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

        // API returns { products: [...] }
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
        setError(err.message || "Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
    const prices = allProducts.map((p) => toNumber(p.price)).filter((p) => p > 0);
    if (prices.length === 0) return { min: 0, max: 0, isApplied: false };
    return { min: Math.min(...prices), max: Math.max(...prices), isApplied: false };
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
          (p.title || p.name || "").toLowerCase().includes(term) ||
          (p.description || "").toLowerCase().includes(term)
      );
    }

    // Sorting
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

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedRating("");
    setPriceRange(initPriceFilter);
    setSearchTerm("");
    setSorting("");
  };

  const hasActiveFilters = selectedCategories.length > 0 || selectedRating || priceRange.isApplied;

  /* Error state */
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F7F0E6] px-4 dark:bg-[#140A07]">
        <div className={`w-full max-w-md rounded-3xl border ${line} bg-white p-8 text-center shadow-xl dark:bg-[#2B1511]`}>
          <div className="mb-4 text-5xl" aria-hidden="true">
            ⚠️
          </div>
          <h2 className="mb-2 text-xl font-bold text-[#2B1511] dark:text-[#f3e5d8]">Something went wrong</h2>
          <p className={`mb-6 text-sm ${muted}`}>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className={`w-full rounded-xl px-6 py-3 text-sm font-semibold ${btn} ${focus}`}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex min-h-screen flex-col bg-[#F7F0E6] text-[#2B1511] dark:bg-[#140A07] dark:text-[#f3e5d8]">
        
        {/* Mobile sticky header */}
        <div className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur-md dark:border-[#C9A66B]/20 dark:bg-[#140A07]/90 lg:hidden">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <h1 className={`${serif} text-2xl font-medium`}>Our Menu</h1>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsSortOpen(true)}
                aria-haspopup="dialog"
                className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold transition ${focus} ${accent} hover:bg-[#8A5A1E]/10 dark:hover:bg-[#D4B27A]/15`}
              >
                <FaSortAmountDown aria-hidden="true" /> Sort
              </button>
              <button
                onClick={() => setIsFilterOpen(true)}
                aria-haspopup="dialog"
                className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold transition ${focus} ${btn}`}
              >
                <FiFilter aria-hidden="true" /> Filter
              </button>
            </div>
          </div>
        </div>

        <main className="mx-auto w-full grow px-4 py-8 lg:max-w-7xl">

          {/* Desktop header */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10 hidden flex-col justify-between gap-8 border-b pb-6 lg:flex w-full"
          >
            <div>
              <p className={`mb-3 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold ${accent} bg-[#8A5A1E]/10 dark:bg-[#D4B27A]/15`}>
                ✓ Freshly Baked Daily
              </p>
              <h1 className={`${serif} text-5xl font-medium leading-tight`}>
                Explore our <span className={accent}>sweet menu</span>
              </h1>
              <p className={`mt-3 max-w-2xl text-sm ${muted}`}>
                Handcrafted cakes, pastries, and desserts made with premium ingredients and a lot of love.
              </p>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <SearchBox onSearchChange={setSearchTerm} />
              </div>
              <div className="shrink-0 pt-0">
                <SortingFilter handleSorting={setSorting} currentSort={sorting} />
              </div>
            </div>
          </motion.div>

          {/* Mobile search */}
          <div className="mb-6 lg:hidden">
            <SearchBox onSearchChange={setSearchTerm} />
          </div>

          {/* Mobile sort panel */}
          <AnimatePresence>
            {isSortOpen && (
              <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                  onClick={() => setIsSortOpen(false)}
                />
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  className="absolute bottom-0 left-0 right-0 max-h-[70vh] overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl dark:bg-[#2B1511]"
                >
                  <div className="mb-5 flex items-center justify-between">
                    <h2 className={`${serif} text-xl font-medium`}>Sort By</h2>
                    <button onClick={() => setIsSortOpen(false)} aria-label="Close" className={`text-lg ${focus}`}>
                      <FiX />
                    </button>
                  </div>
                  <SortingFilter handleSorting={(v) => { setSorting(v); setIsSortOpen(false); }} currentSort={sorting} />
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Mobile filter panel */}
          <AnimatePresence>
            {isFilterOpen && (
              <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                  onClick={() => setIsFilterOpen(false)}
                />
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 250 }}
                  className="absolute right-0 top-0 bottom-0 flex w-full max-w-sm flex-col justify-between overflow-y-auto bg-white shadow-2xl dark:bg-[#140A07]"
                >
                  <div>
                    <div className={`sticky top-0 border-b ${line} bg-white/90 p-4 backdrop-blur-md dark:bg-[#140A07]/90`}>
                      <div className="flex items-center justify-between">
                        <h2 className={`${serif} text-xl font-medium`}>Filters</h2>
                        <button onClick={() => setIsFilterOpen(false)} aria-label="Close" className={`text-xl ${focus}`}>
                          <FiX />
                        </button>
                      </div>
                    </div>
                    <div className="space-y-6 p-5">
                      <div className={`rounded-2xl border ${line} bg-[#2B1511]/5 p-4 dark:bg-white/5`}>
                        <h3 className="mb-3 text-sm font-bold">Categories</h3>
                        <CategoryFilter
                          products={allProducts}
                          selectedCategories={selectedCategories}
                          onChangeCategory={(cat, checked) => setSelectedCategories(checked ? [...selectedCategories, cat] : selectedCategories.filter((c) => c !== cat))}
                          isMobile
                        />
                      </div>
                      <div className={`rounded-2xl border ${line} bg-[#2B1511]/5 p-4 dark:bg-white/5`}>
                        <h3 className="mb-3 text-sm font-bold">Price Range</h3>
                        <PriceRange
                          priceRange={priceRange}
                          initPriceRange={initPriceFilter}
                          setPriceRange={setPriceRange}
                          isMobile
                        />
                      </div>
                      <div className={`rounded-2xl border ${line} bg-[#2B1511]/5 p-4 dark:bg-white/5`}>
                        <h3 className="mb-3 text-sm font-bold">Rating</h3>
                        <RatingFilter
                          onChangeRating={setSelectedRating}
                          selectedRating={selectedRating}
                          isMobile
                        />
                      </div>
                    </div>
                  </div>
                  <div className={`border-t ${line} bg-white/90 p-4 shadow-lg backdrop-blur-md dark:bg-[#1c0d0a]/90`}>
                    <div className="flex gap-3">
                      <button
                        onClick={clearAllFilters}
                        className={`flex-1 rounded-xl border px-4 py-3 text-sm font-semibold transition ${line} hover:bg-[#2B1511]/5 dark:hover:bg-white/5`}
                      >
                        Clear all
                      </button>
                      <button
                        onClick={() => setIsFilterOpen(false)}
                        className={`flex-1 rounded-xl px-4 py-3 text-sm font-semibold transition ${btn}`}
                      >
                        Show {filterProducts.length}
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          <div className="flex flex-col gap-8 lg:grid lg:grid-cols-4">

            {/* Desktop sidebar filters */}
            <aside className="hidden lg:block">
              <div className="sticky top-6 space-y-6">
                <div className={`rounded-3xl border ${line} bg-white/70 p-6 shadow-lg backdrop-blur-sm dark:bg-white/5`}>
                  <div className={`mb-6 flex items-center justify-between border-b pb-4 ${line}`}>
                    <h2 className="flex items-center gap-2 font-bold">
                      <FiFilter className={accent} /> Filters
                    </h2>
                    <button onClick={clearAllFilters} className={`text-xs font-semibold ${accent} hover:underline`}>
                      Clear all
                    </button>
                  </div>
                  <div className="space-y-6">
                    <CategoryFilter
                      products={allProducts}
                      selectedCategories={selectedCategories}
                      onChangeCategory={(cat, checked) => setSelectedCategories(checked ? [...selectedCategories, cat] : selectedCategories.filter((c) => c !== cat))}
                    />
                    <PriceRange
                      priceRange={priceRange}
                      initPriceRange={initPriceFilter}
                      setPriceRange={setPriceRange}
                    />
                    <RatingFilter
                      onChangeRating={setSelectedRating}
                      selectedRating={selectedRating}
                    />
                  </div>
                </div>

                {/* Active filters */}
                {hasActiveFilters && (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className={`rounded-3xl border ${line} bg-[#8A5A1E]/10 p-5 dark:bg-[#D4B27A]/10`}>
                    <h3 className="mb-3 font-bold text-sm">Active filters</h3>
                    <div className="space-y-1.5 text-xs">
                      {selectedCategories.length > 0 && <p>• Categories: <span className={`font-semibold ${accent}`}>{selectedCategories.join(", ")}</span></p>}
                      {selectedRating && <p>• Rating: <span className={`font-semibold ${accent}`}>{selectedRating}★ & up</span></p>}
                      {priceRange.isApplied && <p>• Price: <span className={`font-semibold ${accent}`}>Rs. {toNumber(priceRange.min)} - {toNumber(priceRange.max)}</span></p>}
                    </div>
                  </motion.div>
                )}
              </div>
            </aside>

            {/* Products area */}
            <section className="lg:col-span-3">

              {/* Mobile filter chips */}
              {hasActiveFilters && (
                <div className="mb-5 flex flex-wrap gap-2 lg:hidden">
                  {selectedCategories.map((cat) => (
                    <span key={cat} className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${accent} bg-[#8A5A1E]/10 dark:bg-[#D4B27A]/15`}>
                      {cat}
                    </span>
                  ))}
                  {selectedRating && <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${accent} bg-[#8A5A1E]/10 dark:bg-[#D4B27A]/15`}>{selectedRating}★ & up</span>}
                  {priceRange.isApplied && <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${accent} bg-[#8A5A1E]/10 dark:bg-[#D4B27A]/15`}>Rs. {toNumber(priceRange.min)}-{toNumber(priceRange.max)}</span>}
                  <button onClick={clearAllFilters} className={`rounded-full px-3 py-1 text-xs font-medium transition ${line} hover:bg-[#2B1511]/10 dark:hover:bg-white/10`}>
                    Clear all
                  </button>
                </div>
              )}

              {/* Results counter */}
              <div className="mb-6 flex items-center justify-between">
                <h2 className={`${serif} text-2xl font-medium`} aria-live="polite">
                  {loading ? "Loading..." : `${filterProducts.length} cakes found`}
                </h2>
              </div>

              {/* Loading skeleton */}
              {loading && (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className={`animate-pulse rounded-2xl border ${line} bg-white p-4 dark:bg-white/5`}>
                      <div className="mb-4 aspect-[5/4] rounded-xl bg-[#2B1511]/10 dark:bg-white/10" />
                      <div className="mb-2 h-4 w-2/3 rounded-full bg-[#2B1511]/10 dark:bg-white/10" />
                      <div className="h-3 w-1/2 rounded-full bg-[#2B1511]/10 dark:bg-white/10" />
                    </div>
                  ))}
                </div>
              )}

              {/* Products grid */}
              {!loading && (
                <>
                  {filterProducts.length === 0 ? (
                    <div className={`rounded-3xl border ${line} bg-white/70 p-12 text-center dark:bg-white/5`}>
                      <p className="text-3xl mb-3">🎂</p>
                      <h3 className="mb-2 text-lg font-bold">No cakes found</h3>
                      <p className={`mb-6 text-sm ${muted}`}>Try adjusting your filters.</p>
                      <button onClick={clearAllFilters} className={`rounded-xl px-6 py-2.5 text-sm font-semibold ${btn} ${focus}`}>
                        Reset filters
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {filterProducts.map((product, idx) => (
                        <motion.div
                          key={product._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: Math.min(idx, 8) * 0.05 }}
                          className="h-full"
                        >
                          <ProductsCard product={product} />
                        </motion.div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </section>
          </div>
        </main>
        <FooterContent />
      </div>
    </MotionConfig>
  );
}

export default Menu;
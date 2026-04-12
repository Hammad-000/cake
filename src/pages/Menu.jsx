import { useState, useMemo, useEffect } from "react";
import axios from "axios";
import CategoryFilter from "../components/CategoryFilter";
import Products from "../components/Products";
import { getVisibleProducts } from "../../src/data/product-filter";
import RatingFilter from "../components/RatingFilter";
import PriceRange from "../components/PriceRange";
import SearchBox from "../components/SearchBox";
import { AiOutlineFilter } from "react-icons/ai";
import { IoCloseCircleOutline } from "react-icons/io5";
import { FaSortAmountDown } from "react-icons/fa";
import FooterContent from "../components/FooterContent";
import SortingFilter from "../components/SortingFilter";
import { useCart } from "../components/CartContext";

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
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://cakes-backend-gamma.vercel.app/api/products");
        if (response.data?.products && Array.isArray(response.data.products)) {
          setAllProducts(response.data.products);
        } else {
          setError("Invalid response format");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Compute min/max price from actual products
  const initPriceFilter = useMemo(() => {
    if (!allProducts.length) return { min: 0, max: 0, isApplied: false };
    const prices = allProducts.map(p => p.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
      isApplied: false,
    };
  }, [allProducts]);

  // Set initial price range when products load
  useEffect(() => {
    if (allProducts.length && !priceRange.max) {
      setPriceRange(initPriceFilter);
    }
  }, [allProducts, initPriceFilter, priceRange.max]);

  // Filter + Sort products
  const filterProducts = useMemo(() => {
    if (!allProducts.length) return [];
    
    let visibleProducts = getVisibleProducts(
      selectedCategories,
      selectedRating,
      priceRange,
      searchTerm,
      allProducts 
    );
    
    switch (sorting) {
      case "price-low":
        visibleProducts = [...visibleProducts].sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        visibleProducts = [...visibleProducts].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        visibleProducts = [...visibleProducts].sort((a, b) => b.rating - a.rating);
        break;
      case "popular":
        visibleProducts = [...visibleProducts].sort((a, b) => b.popular - a.popular);
        break;
      default:
        break;
    }
    return visibleProducts;
  }, [selectedCategories, selectedRating, priceRange, searchTerm, sorting, allProducts]);

  const onChangeCategoryHandler = (category, isChecked) => {
    setSelectedCategories(prev =>
      isChecked ? [...prev, category] : prev.filter(c => c !== category)
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

  if (loading) return <div className="p-8 text-center">Loading products...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  const handleAddToCart = (product, e) => {
  e.stopPropagation(); // Prevent event bubbling if needed
  // Normalize to cart format
  const cartProduct = {
    id: product._id,
    title: product.name,
    image: product.imageUrl || product.image,
    price: product.price,
    description: product.description,
    category: product.category,
    quantity: 1
  };
  addToCart(cartProduct);
};
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Mobile Header */}
      <div className="sticky top-0 z-40 bg-white shadow-md lg:hidden">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-800">Menu</h1>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <FaSortAmountDown />
                <span className="text-sm font-medium">Sort</span>
              </button>
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <AiOutlineFilter />
                <span className="text-sm font-medium">Filter</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Desktop Header */}
        <div className="hidden lg:flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold text-gray-800">Our Menu</h1>
            <span className="text-gray-500 text-lg">
              {filterProducts.length} items available
            </span>
          </div>
          <div className="flex items-center pt-8 gap-6">
            <SearchBox onSearchChange={handleSearchChange} />
            <SortingFilter handleSorting={handleSorting} currentSort={sorting} />
          </div>
        </div>

        {/* Mobile Search */}
        <div className="lg:hidden mb-6">
          <SearchBox onSearchChange={handleSearchChange} />
        </div>

        {/* Mobile Sorting Dropdown */}
        {isSortOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setIsSortOpen(false)}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl max-h-[70vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-800">Sort By</h3>
                  <button
                    onClick={() => setIsSortOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <IoCloseCircleOutline size={24} />
                  </button>
                </div>
                <div className="space-y-2">
                  {[
                    { value: "", label: "Default", icon: "🔄" },
                    { value: "price-low", label: "Price: Low to High", icon: "💰" },
                    { value: "price-high", label: "Price: High to Low", icon: "💰" },
                    { value: "rating", label: "Highest Rated", icon: "⭐" },
                    { value: "popular", label: "Most Popular", icon: "🔥" }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleSorting(option.value)}
                      className={`w-full flex items-center gap-3 px-4 py-4 rounded-xl transition-all ${
                        sorting === option.value
                          ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg"
                          : "hover:bg-gray-100 text-gray-700 border border-gray-200"
                      }`}
                    >
                      <span className="text-xl">{option.icon}</span>
                      <span className="font-medium">{option.label}</span>
                      {sorting === option.value && <span className="ml-auto">✓</span>}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Filter Overlay */}
        {isFilterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setIsFilterOpen(false)}
            />
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-white overflow-y-auto">
              <div className="min-h-screen pb-20">
                <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
                  <div className="flex justify-between items-center p-4">
                    <h2 className="text-2xl font-bold text-gray-800">Filters</h2>
                    <button
                      onClick={() => setIsFilterOpen(false)}
                      className="text-gray-500 hover:text-gray-700 p-2"
                    >
                      <IoCloseCircleOutline size={28} />
                    </button>
                  </div>
                </div>
                <div className="p-4 space-y-6">
                  <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Categories</h3>
                    <CategoryFilter
                      products={allProducts}
                      selectedCategories={selectedCategories}
                      onChangeCategory={onChangeCategoryHandler}
                      isMobile={true}
                    />
                  </div>
                  <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Price Range</h3>
                    <PriceRange
                      priceRange={priceRange}
                      initPriceRange={initPriceFilter}
                      setPriceRange={handlePriceRangeChange}
                      isMobile={true}
                    />
                  </div>
                  <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Rating</h3>
                    <RatingFilter
                      onChangeRating={onChangeRatingHandler}
                      selectedRating={selectedRating}
                      isMobile={true}
                    />
                  </div>
                  {(selectedCategories.length > 0 || selectedRating || priceRange.isApplied) && (
                    <div className="bg-gradient-to-r from-pink-500 to-pink-500 rounded-xl border border-pink-500 p-5">
                      <h3 className="font-semibold text-gray-800 mb-3">Active Filters</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedCategories.map((cat) => (
                          <span key={cat} className="px-3 py-1 bg-pink-500 text-white rounded-full text-sm">
                            {cat}
                          </span>
                        ))}
                        {selectedRating && (
                          <span className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm">
                            {selectedRating}★ & up
                          </span>
                        )}
                        {priceRange.isApplied && (
                          <span className="px-3 py-1 bg-green-500 text-white rounded-full text-sm">
                            Rs.{priceRange.min}-{priceRange.max}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
                <div className="flex gap-3">
                  <button
                    onClick={clearAllFilters}
                    className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="flex-1 py-3 px-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium rounded-xl hover:shadow-lg transition-all shadow-md"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col lg:grid lg:grid-cols-4 gap-6">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-bold text-gray-800">Filters</h2>
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-pink-700 font-medium cursor-pointer"
                  >
                    Clear all
                  </button>
                </div>
                <div className="space-y-8">
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
              {(selectedCategories.length > 0 || selectedRating || priceRange.isApplied) && (
                <div className="rounded-2xl border border-pink-500 p-5">
                  <h3 className="font-semibold text-gray-800 mb-3">Active Filters</h3>
                  <div className="space-y-2">
                    {selectedCategories.length > 0 && (
                      <div className="text-sm text-gray-700">
                        Categories: <span className="font-medium">{selectedCategories.join(", ")}</span>
                      </div>
                    )}
                    {selectedRating && (
                      <div className="text-sm text-gray-700">
                        Rating: <span className="font-medium">{selectedRating} stars & up</span>
                      </div>
                    )}
                    {priceRange.isApplied && (
                      <div className="text-sm text-gray-700">
                        Price: <span className="font-medium">Rs.{priceRange.min} - Rs.{priceRange.max}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Mobile Filter Summary */}
            <div className="lg:hidden mb-6">
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedCategories.map((cat) => (
                  <span key={cat} className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm">
                    {cat}
                  </span>
                ))}
                {selectedRating && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    {selectedRating}★ & up
                  </span>
                )}
                {priceRange.isApplied && (
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    Rs.{priceRange.min}-{priceRange.max}
                  </span>
                )}
                {(selectedCategories.length > 0 || selectedRating || priceRange.isApplied) && (
                  <button
                    onClick={clearAllFilters}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 cursor-pointer"
                  >
                    Clear all
                  </button>
                )}
              </div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {filterProducts.length} {filterProducts.length === 1 ? "Item" : "Items"}
                </h2>
                <span className="text-sm text-gray-500">
                  {sorting ? `Sorted by: ${sorting.replace("-", " ")}` : "Default order"}
                </span>
              </div>
            </div>

            {/* Desktop Products Header */}
            <div className="hidden lg:flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">All Items</h2>
                <p className="text-gray-600 mt-1">Showing {filterProducts.length} delicious items</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full">
                  {selectedCategories.length > 0 ? `${selectedCategories.length} categories` : "All categories"}
                </span>
                {selectedRating && (
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                    {selectedRating}★ +
                  </span>
                )}
              </div>
            </div>

            

            {/* Products */}
<div className="space-y-4">
  {filterProducts.length === 0 ? (
    <div className="text-center py-8 text-gray-500">No products found.</div>
  ) : (
    filterProducts.map(product => {
      const productId = product._id || product.id;
      const displayName = product.title || product.name;
      const imageSrc = product.imageUrl || product.image || "/placeholder-cake.jpg";
      return (
        <div
          key={productId}
          className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100 gap-4 hover:shadow-md transition-shadow"
        >
          <img
            src={imageSrc}
            alt={displayName}
            className="w-20 h-20 object-cover rounded-xl"
            onError={(e) => { e.target.src = "/placeholder-cake.jpg"; }}
          />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800">{displayName}</h3>
            <p className="text-sm text-gray-500 line-clamp-1">{product.description}</p>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <span className="text-lg font-bold text-amber-600">
                Rs {typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
              </span>
              {product.category && (
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                  {product.category}
                </span>
              )}
            </div>
          </div>
          <button
            onClick={(e) => handleAddToCart(product, e)}
            className="px-4 py-2 bg-amber-500 text-white rounded-lg text-sm font-medium hover:bg-amber-600"
          >
            Add to Cart
          </button>
        </div>
      );
    })
  )}
</div>
            {/* No Results Message */}
            {filterProducts.length === 0 && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🍕</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No items found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters or search term</p>
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-2 bg-pink-500 text-white font-medium rounded-lg hover:shadow-lg transition-all"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <FooterContent />
    </div>
  );
}

export default Menu;

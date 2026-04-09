export const getVisibleProducts = (
  selectedCategories,
  selectedRating,
  priceRange,
  searchTerm,
  allProducts = []
) => {
  let products = [...allProducts];

  if (selectedCategories.length > 0) {
    products = products.filter((product) =>
      selectedCategories.includes(product.category)
    );
  }

  if (selectedRating) {
    const minRating = Number(selectedRating);
    products = products.filter(
      (product) => (product.rating || 0) >= minRating
    );
  }

  if (priceRange.isApplied) {
    products = products.filter(
      (product) =>
        product.price >= priceRange.min && product.price <= priceRange.max
    );
  }

  if (searchTerm) {
    const lowerTerm = searchTerm.toLowerCase();
    products = products.filter(
      (product) =>
        (product.name || "").toLowerCase().includes(lowerTerm) ||
        (product.description || "").toLowerCase().includes(lowerTerm)
    );
  }

  return products;
};
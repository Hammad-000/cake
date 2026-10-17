import React, { useMemo } from "react";
import Checkbox from "../components/Cheakbox";

function CategoryFilter({ products, selectedCategories, onChangeCategory, isMobile }) {
  const categories = useMemo(() => {
    if (!products || products.length === 0) return [];
    const unique = [...new Set(products.map((p) => p.category).filter(Boolean))];
    return unique.sort();
  }, [products]);

  const handleCheckboxChange = (category, isChecked) => {
    onChangeCategory(category, isChecked);
  };

  if (categories.length === 0) {
    return <p className="text-sm text-[#2B1511]/60 dark:text-[#f3e5d8]/60">No categories available.</p>;
  }

  return (
    <div className={`space-y-3 ${isMobile ? "px-1" : ""}`}>
      {categories.map((category) => (
        <Checkbox
          key={category}
          id={`category-${category}`}
          text={category}
          checked={selectedCategories.includes(category)}
          onChange={(e) => handleCheckboxChange(category, e.target.checked)}
          labelClassName="text-[#2B1511] dark:text-[#f3e5d8] group-hover:text-[#8A5A1E] dark:group-hover:text-[#D4B27A] transition-colors"
        />
      ))}
    </div>
  );
}

export default CategoryFilter;
// CategoryFilter.jsx
import { useMemo } from 'react';
import Checkbox from "./Cheakbox";

const CategoryFilter = ({ products, selectedCategories, onChangeCategory, isMobile }) => {
  const categories = useMemo(() => {
    if (!products || products.length === 0) return [];
    return [...new Set(products.map(p => p.category))];
  }, [products]);

  const handleCheckboxChange = (category, isChecked) => {
    onChangeCategory(category, isChecked);
  };

  return (
    <div className={`space-y-3 ${isMobile ? 'px-1' : ''}`}>
      {categories.map((category) => (
        <Checkbox
          key={category}
          id={`category-${category}`}
          text={category}
          checked={selectedCategories.includes(category)}
          onChange={(e) => handleCheckboxChange(category, e.target.checked)}
          className="mb-2"
          labelClassName="text-gray-700"
        />
      ))}
    </div>
  );
};

export default CategoryFilter;
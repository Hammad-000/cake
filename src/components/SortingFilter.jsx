import React, { useState } from "react";
import { FaSortAmountDown } from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5";

function SortingFilter({ handleSorting, currentSort }) {
  const [isOpen, setIsOpen] = useState(false);

  const sortOptions = [
    { value: "", label: "Default", icon: "🔄" },
    { value: "price-low", label: "Price: Low to High", icon: "💰" },
    { value: "price-high", label: "Price: High to Low", icon: "💰" },
    { value: "rating", label: "Highest Rated", icon: "⭐" },
    { value: "popular", label: "Most Popular", icon: "🔥" },
  ];

  const handleSortChange = (value) => {
    handleSorting(value);
    setIsOpen(false);
  };

  const currentLabel =
    sortOptions.find((opt) => opt.value === currentSort)?.label || "Sort by";

  return (
    <div className="relative">
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hidden lg:flex items-center gap-3 cursor-pointer px-5 py-3 bg-white border border-gray-200 rounded-xl hover:border-pink-300 hover:shadow-md transition-all duration-200 min-w-[200px] group"
      >
        <FaSortAmountDown className="text-gray-500 group-hover:text-pink-500 transition-colors" />
        <span className="text-gray-700 font-medium flex-1 text-left">
          {currentLabel}
        </span>
        <IoChevronDown
          className={`text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180 " : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop for mobile */}
          <div
            className="fixed inset-0 z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown Panel */}
          <div className="absolute top-full left-0 mt-2 w-full  bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden py-2 animate-fadeIn">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSortChange(option.value)}
                className={`w-full flex items-center gap-3 px-5 py-3 cursor-pointer hover:border rounded border-pink-500 transition-colors ${
                  currentSort === option.value
                    ? "bg-pink-50 text-pink-600 font-medium"
                    : "text-gray-700"
                }`}
              >
                <span className="text-lg">{option.icon}</span>
                <span className="flex-1 text-left">{option.label}</span>
                {currentSort === option.value && (
                  <span className="text-pink-500 text-lg">✓</span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default SortingFilter;
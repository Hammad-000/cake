import React, { useState, useRef, useEffect } from "react";
import { FaSortAmountDown } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";

const focus = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8A5A1E] dark:focus-visible:outline-[#D4B27A]";

const SORT_OPTIONS = [
  { value: "", label: "Default", icon: "↻" },
  { value: "price-low", label: "Price: Low to High", icon: "↑" },
  { value: "price-high", label: "Price: High to Low", icon: "↓" },
  { value: "rating", label: "Highest Rated", icon: "★" },
  { value: "popular", label: "Most Popular", icon: "⚡" },
];

function SortingFilter({ handleSorting, currentSort = "" }) {
  const [isOpen, setIsOpen] = useState(false);
  const btnRef = useRef(null);
  const menuRef = useRef(null);

  const currentLabel = SORT_OPTIONS.find((opt) => opt.value === currentSort)?.label || "Sort by";

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isOpen &&
        btnRef.current &&
        !btnRef.current.contains(e.target) &&
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleSelect = (value) => {
    handleSorting(value);
    setIsOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        ref={btnRef}
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label="Sort products"
        onKeyDown={handleKeyDown}
        className={`hidden lg:flex items-center gap-2 px-3 py-3 rounded-xl border transition-all ${focus}
          bg-white dark:bg-white/5
          border-[#2B1511]/10 dark:border-[#C9A66B]/20
          text-[#2B1511] dark:text-[#f3e5d8]
          hover:border-[#8A5A1E]/50 dark:hover:border-[#D4B27A]/60
          hover:shadow-md dark:hover:shadow-[#2B1511]/40`}
      >
        <FaSortAmountDown className="text-[#8A5A1E] dark:text-[#D4B27A]" />
        <span className="flex-1 text-left font-medium">{currentLabel}</span>
        <FiChevronDown className={`text-[#2B1511]/60 dark:text-[#f3e5d8]/60 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setIsOpen(false)} />
          <div
            ref={menuRef}
            role="menu"
            className="absolute top-full left-0 z-50 mt-2 w-full rounded-xl shadow-xl
              border border-[#2B1511]/10 dark:border-[#C9A66B]/20
              bg-white dark:bg-[#2B1511]
              overflow-hidden"
          >
            {SORT_OPTIONS.map((option) => (
              <button
                key={option.value}
                role="menuitem"
                onClick={() => handleSelect(option.value)}
                className={`w-full flex items-center gap-3 px-5 text-left transition-colors ${focus} ${
                  currentSort === option.value
                    ? "bg-[#8A5A1E]/10 dark:bg-[#D4B27A]/15 text-[#8A5A1E] dark:text-[#D4B27A] font-medium"
                    : "text-[#2B1511] dark:text-[#f3e5d8] hover:bg-[#2B1511]/5 dark:hover:bg-white/5"
                }`}
              >
                <span className="text-base">{option.icon}</span>
                <span className="flex-1">{option.label}</span>
                {currentSort === option.value && <span className="text-[#8A5A1E] dark:text-[#D4B27A]">✓</span>}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default SortingFilter;
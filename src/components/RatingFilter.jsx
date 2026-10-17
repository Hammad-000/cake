import React from "react";
import { FaStar } from "react-icons/fa";

const focus = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8A5A1E] dark:focus-visible:outline-[#D4B27A]";

const RATING_OPTIONS = [
  { value: "", label: "All ratings" },
  { value: "4", label: "4★ & up" },
  { value: "3", label: "3★ & up" },
  { value: "2", label: "2★ & up" },
  { value: "1", label: "1★ & up" },
];

function RatingFilter({ onChangeRating, selectedRating, isMobile }) {
  return (
    <div className="space-y-2.5">
      {RATING_OPTIONS.map((option) => (
        <button
          key={option.value}
          onClick={() => onChangeRating(option.value)}
          className={`group flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-left text-sm transition ${focus}
            ${
              selectedRating === option.value
                ? "bg-[#8A5A1E]/15 text-[#8A5A1E] dark:bg-[#D4B27A]/20 dark:text-[#D4B27A]"
                : "text-[#2B1511] dark:text-[#f3e5d8] hover:bg-[#2B1511]/5 dark:hover:bg-white/5"
            }`}
        >
          {option.value && (
            <div className="flex items-center gap-0.5">
              {[...Array(Math.floor(Number(option.value)))].map((_, i) => (
                <FaStar key={i} className={selectedRating === option.value ? "text-[#8A5A1E] dark:text-[#D4B27A]" : "text-amber-400"} size={12} />
              ))}
            </div>
          )}
          <span className="flex-1">{option.label}</span>
          {selectedRating === option.value && <span className="text-[#8A5A1E] dark:text-[#D4B27A]">✓</span>}
        </button>
      ))}
    </div>
  );
}

export default RatingFilter;
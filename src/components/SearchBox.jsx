import { useState, useEffect, useRef } from "react";
import { FiSearch, FiX } from "react-icons/fi";

const focus = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8A5A1E] dark:focus-visible:outline-[#D4B27A]";
const muted = "text-[#2B1511]/60 dark:text-[#f3e5d8]/60";

const QUICK_SEARCHES = ["Chocolate Cake", "Ice Cake", "Vanilla Cake", "Hazelnut Cake", "Oreo Cake"];

function SearchBox({ onSearchChange }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearchChange(searchTerm);
    }, 300); 
    return () => clearTimeout(handler);
  }, [searchTerm, onSearchChange]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
    inputRef.current?.focus();
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <div className="w-full">
      <div className="relative group">
        <FiSearch
          aria-hidden="true"
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2B1511]/40 dark:text-[#f3e5d8]/40 transition-colors group-focus-within:text-[#8A5A1E] dark:group-focus-within:text-[#D4B27A]"
        />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search cakes..."
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full rounded-2xl border bg-white px-4 py-3 pl-8 pr-12 text-[#2B1511] placeholder-[#2B1511]/40 shadow-sm transition-all dark:bg-[#2B1511] dark:text-[#f3e5d8] dark:placeholder-[#f3e5d8]/40 lg:py-4 lg:pr-14 lg:text-base ${
            isFocused
              ? "border-[#8A5A1E] shadow-lg ring-2 ring-[#8A5A1E]/20 dark:border-[#D4B27A] dark:ring-[#D4B27A]/20"
              : "border-[#2B1511]/10 hover:border-[#8A5A1E]/50 dark:border-[#C9A66B]/20 dark:hover:border-[#D4B27A]/60"
          } ${focus}`}
        />

        {/* Clear button or keyboard hint */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {searchTerm && (
            <button
              onClick={clearSearch}
              aria-label="Clear search"
              className={`p-1 transition-colors ${focus} text-[#2B1511]/60 hover:text-[#8A5A1E] dark:text-[#f3e5d8]/60 dark:hover:text-[#D4B27A]`}
            >
              <FiX />
            </button>
          )}
          {!searchTerm && (
            <div className="hidden items-center gap-1 rounded-lg border border-[#2B1511]/15 bg-white/90 px-2 py-1 text-xs font-medium dark:border-[#C9A66B]/20 dark:bg-[#2B1511]/50 lg:flex">
              <kbd className="rounded bg-[#8A5A1E]/10 px-1.5 py-0.5 font-mono text-[#8A5A1E] dark:bg-[#D4B27A]/15 dark:text-[#D4B27A]">
                ⌘K
              </kbd>
            </div>
          )}
        </div>
      </div>

      {/* Quick search suggestions */}
      {!searchTerm && (
        <div className="hidden flex-col gap-3  lg:flex">
          <p className={`text-xs font-medium ${muted}`}>Quick search:</p>
          <div className="flex flex-wrap gap-2">
            {QUICK_SEARCHES.map((term) => (
              <button
                key={term}
                onClick={() => setSearchTerm(term)}
                className={`inline-flex rounded-full px-4 py-2 text-xs font-medium transition ${focus}
                  bg-[#8A5A1E]/10 text-[#8A5A1E] hover:bg-[#8A5A1E]/20
                  dark:bg-[#D4B27A]/15 dark:text-[#D4B27A] dark:hover:bg-[#D4B27A]/25`}
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchBox;
import React, { useState, useEffect } from "react";

const focus = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8A5A1E] dark:focus-visible:outline-[#D4B27A]";
const muted = "text-[#2B1511]/65 dark:text-[#f3e5d8]/65";
const line = "border-[#2B1511]/10 dark:border-[#C9A66B]/20";

function PriceRange({ priceRange, initPriceRange, setPriceRange, isMobile }) {
  const [localMin, setLocalMin] = useState(priceRange.min || 0);
  const [localMax, setLocalMax] = useState(priceRange.max || 0);

  useEffect(() => {
    setLocalMin(priceRange.min || 0);
    setLocalMax(priceRange.max || 0);
  }, [priceRange]);

  const handleMinChange = (e) => {
    const val = Number(e.target.value);
    if (val <= localMax) {
      setLocalMin(val);
    }
  };

  const handleMaxChange = (e) => {
    const val = Number(e.target.value);
    if (val >= localMin) {
      setLocalMax(val);
    }
  };

  const handleApply = () => {
    setPriceRange({
      min: localMin,
      max: localMax,
      isApplied: true,
    });
  };

  const handleReset = () => {
    setPriceRange(initPriceRange);
    setLocalMin(initPriceRange.min);
    setLocalMax(initPriceRange.max);
  };

  const minPercent = initPriceRange.max > 0 ? ((localMin - initPriceRange.min) / (initPriceRange.max - initPriceRange.min)) * 100 : 0;
  const maxPercent = initPriceRange.max > 0 ? ((localMax - initPriceRange.min) / (initPriceRange.max - initPriceRange.min)) * 100 : 100;

  return (
    <div className="space-y-4">
      {/* Range slider visual */}
      <div className="space-y-2">
        <div className="relative h-1 rounded-full bg-[#2B1511]/10 dark:bg-[#C9A66B]/20">
          <div
            className="absolute h-full rounded-full bg-gradient-to-r from-[#8A5A1E] to-[#C9A66B] dark:from-[#D4B27A] dark:to-[#C9A66B]"
            style={{
              left: `${minPercent}%`,
              right: `${100 - maxPercent}%`,
            }}
          />
        </div>

        {/* Min slider */}
        <input
          type="range"
          min={initPriceRange.min || 0}
          max={initPriceRange.max || 10000}
          value={localMin}
          onChange={handleMinChange}
          className="pointer-events-none absolute -top-1 left-0 h-2 w-full appearance-none bg-transparent"
          aria-label="Minimum price"
        />

        {/* Max slider */}
        <input
          type="range"
          min={initPriceRange.min || 0}
          max={initPriceRange.max || 10000}
          value={localMax}
          onChange={handleMaxChange}
          className="pointer-events-none absolute -top-1 left-0 h-2 w-full appearance-none bg-transparent"
          aria-label="Maximum price"
        />
      </div>

      {/* Price inputs */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="min-price" className={`block text-xs font-medium mb-1.5 ${muted}`}>
            Min
          </label>
          <input
            id="min-price"
            type="number"
            value={localMin}
            onChange={handleMinChange}
            className={`w-full rounded-lg border bg-white px-3 py-2 text-sm text-[#2B1511] dark:bg-[#140A07] dark:text-[#f3e5d8] ${line} ${focus}`}
          />
        </div>
        <div>
          <label htmlFor="max-price" className={`block text-xs font-medium mb-1.5 ${muted}`}>
            Max
          </label>
          <input
            id="max-price"
            type="number"
            value={localMax}
            onChange={handleMaxChange}
            className={`w-full rounded-lg border bg-white px-3 py-2 text-sm text-[#2B1511] dark:bg-[#140A07] dark:text-[#f3e5d8] ${line} ${focus}`}
          />
        </div>
      </div>

      {/* Display range */}
      <p className={`text-sm font-semibold text-center ${muted}`}>
        Rs. {localMin} - Rs. {localMax}
      </p>

      {/* Buttons */}
      <div className={`flex gap-2 pt-2 ${isMobile ? "" : ""}`}>
        <button
          onClick={handleApply}
          className={`flex-1 rounded-lg py-2 text-sm font-semibold transition ${focus}
            bg-[#8A5A1E] text-white hover:bg-[#a26a2a]
            dark:bg-[#D4B27A] dark:text-[#1a0d09] dark:hover:bg-[#e0c18c]`}
        >
          Apply
        </button>
        <button
          onClick={handleReset}
          className={`flex-1 rounded-lg border py-2 text-sm font-semibold transition ${focus} ${line}
            text-[#2B1511] hover:bg-[#2B1511]/5
            dark:text-[#f3e5d8] dark:hover:bg-white/5`}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default PriceRange;
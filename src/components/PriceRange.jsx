// PriceRange.jsx
function PriceRange({ priceRange, initPriceRange, setPriceRange, isMobile }) {
  const handleMinChange = (value) => {
    const newMin = parseInt(value);
    // Prevent min from exceeding max
    const finalMin = Math.min(newMin, priceRange.max);
    setPriceRange({
      ...priceRange,
      min: finalMin,
      isApplied: true
    });
  };

  const handleMaxChange = (value) => {
    const newMax = parseInt(value);
    // Prevent max from going below min
    const finalMax = Math.max(newMax, priceRange.min);
    setPriceRange({
      ...priceRange,
      max: finalMax,
      isApplied: true
    });
  };

  const resetPrice = () => {
    setPriceRange(initPriceFilter); // make sure initPriceFilter is passed correctly
  };

  return (
    <div className={isMobile ? 'p-2' : ''}>
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <span className={`font-medium ${isMobile ? 'text-lg' : 'text-sm'}`}>
            Price Range: Rs.{priceRange.min} - Rs.{priceRange.max}
          </span>
          {priceRange.isApplied && (
            <button
              onClick={resetPrice}
              className={`text-pink-600 hover:text-pink-700 ${isMobile ? 'text-base' : 'text-sm'}`}
            >
              Reset
            </button>
          )}
        </div>

        <div className={`flex items-center gap-4 ${isMobile ? 'py-2' : 'py-1'}`}>
          {/* Min Slider */}
          <div className="flex-1">
            <input
              type="range"
              min={initPriceRange.min}
              max={initPriceRange.max}
              value={priceRange.min}
              onChange={(e) => handleMinChange(e.target.value)}
              className={`w-full ${isMobile ? 'h-3' : 'h-2'} bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-pink-500 [&::-webkit-slider-thumb]:shadow-lg`}
            />
          </div>
          {/* Max Slider */}
          <div className="flex-1">
            <input
              type="range"
              min={initPriceRange.min}
              max={initPriceRange.max}
              value={priceRange.max}
              onChange={(e) => handleMaxChange(e.target.value)}
              className={`w-full ${isMobile ? 'h-3' : 'h-2'} bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-pink-500 [&::-webkit-slider-thumb]:shadow-lg`}
            />
          </div>
        </div>

        <div className="flex justify-between text-gray-500 text-sm mt-2">
          <span>Rs.{initPriceRange.min}</span>
          <span>Rs.{initPriceRange.max}</span>
        </div>
      </div>
    </div>
  );
}
export default PriceRange;
import { useState, useEffect, useRef } from 'react';
import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';

function SearchBox({ onSearchChange }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  // Notify parent whenever searchTerm changes
  useEffect(() => {
    onSearchChange(searchTerm);
  }, [searchTerm, onSearchChange]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
    inputRef.current?.focus();
  };

  // Keyboard shortcut (Ctrl+K)
  useEffect(() => {
    const handleKeyPress = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const showSearchTips = searchTerm === '';

  return (
    <div className="w-full">
      <div className="relative group">
        <AiOutlineSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search for delicious cakes, Ice Cake, Chocolate Cake, Birthday Cake, sides..."
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full pl-12 pr-12 py-3 bg-white border 
            ${isFocused ? 'border-pink-400 ring-2 ring-pink-200 shadow-lg' : 'border-gray-300'} 
            rounded-2xl focus:outline-none transition-all duration-300 placeholder:text-gray-400 text-gray-800 shadow-sm 
            hover:shadow-md hover:border-pink-300 lg:py-4 lg:pl-12 lg:pr-14 lg:text-lg lg:placeholder:text-base lg:hover:shadow-xl`}
        />
        {searchTerm && (
          <button
            onClick={clearSearch}
            className="lg:hidden absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
          >
            <AiOutlineClose className="text-lg" />
          </button>
        )}
        <div className="hidden lg:flex absolute right-4 top-1/2 transform -translate-y-1/2 items-center gap-1">
          {searchTerm ? (
            <button onClick={clearSearch} className="text-gray-400 hover:text-gray-600 transition-colors p-1">
              <AiOutlineClose className="text-xl" />
            </button>
          ) : (
            <div className="flex items-center gap-1 text-xs font-medium text-gray-500 border border-gray-300 rounded-lg px-2 py-1 bg-white/90">
              <span className="font-mono bg-pink-100 px-1 py-0.5 rounded">Ctrl</span>
              <span>+</span>
              <span className="font-mono bg-gray-100 px-1 py-0.5 rounded">K</span>
            </div>
          )}
        </div>
      </div>
      
      {showSearchTips && (
        <div className="hidden lg:flex items-center justify-between mt-4 px-2">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-500">Quick search:</span>
            <div className="flex gap-2">
              {['Chocolate Cake', 'Ice Cake', 'Vanilla Cake', 'Hazelnut Cake', 'Birthday Cake'].map((term) => (
                <button
                  key={term}
                  onClick={() => setSearchTerm(term)}
                  className="px-4 py-2 bg-pink-500 text-white cursor-pointer hover:bg-pink-600 rounded-xl transition-all duration-300 hover:scale-105"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchBox;
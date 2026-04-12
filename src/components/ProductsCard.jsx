import React from "react";
import { useCart } from "../components/CartContext";
import { useNavigate } from "react-router-dom";
import { GiMeal } from "react-icons/gi";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const StarRating = ({ rating, size = 16 }) => {
  const rate = typeof rating === "object" ? rating?.rate || 0 : rating || 0;
  const count = typeof rating === "object" ? rating?.count || 0 : null;

  const stars = [];
  const fullStars = Math.floor(rate);
  const hasHalfStar = rate % 1 >= 0.5;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={`full-${i}`} size={size} className="text-yellow-500" />);
  }
  if (hasHalfStar) {
    stars.push(<FaStarHalfAlt key="half" size={size} className="text-yellow-500" />);
  }
  const emptyStars = 5 - stars.length;
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<FaRegStar key={`empty-${i}`} size={size} className="text-gray-300" />);
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">{stars}</div>
      <span className="text-gray-600 text-sm font-medium ml-1">{rate.toFixed(1)}</span>
      {count !== null && (
        <span className="text-gray-400 text-xs ml-1">
          ({count} {count === 1 ? "review" : "reviews"})
        </span>
      )}
    </div>
  );
};

function ProductsCard({ product }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Destructure API fields
  const { _id, name, imageUrl, description, category, price, rating } = product;

  // Normalize image: use a local placeholder if missing
  const imageSrc = imageUrl || "/placeholder-cake.jpg";

  // Normalize product to cart format
  const cartProduct = {
    id: _id,
    title: name,
    image: imageUrl,         // may be undefined, but cart will fallback
    price: price,
    description: description,
    category: category,
    quantity: 1
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(cartProduct);   // ✅ now uses correct shape
  };

  const handleCardClick = () => {
    navigate(`/product/${_id}`);
  };

  return (
    <div className="p-4 cursor-pointer h-full" onClick={handleCardClick}>
      <div className="border rounded-xl shadow-md hover:shadow-xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300 ease-in-out bg-white h-full flex flex-col">
        {/* Image */}
        <div className="relative w-full h-48 overflow-hidden shrink-0">
          <img
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
            src={imageSrc}
            alt={name}
            onError={(e) => {
              e.target.src = "/placeholder-cake.jpg";
            }}
          />
        </div>

        <div className="p-4 sm:p-6 flex-1 flex flex-col">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-2 hover:text-blue-600 transition-colors">
            {name}
          </h3>

          {category && (
            <p className="text-sm text-purple-600 font-medium mb-2">
              {category}
            </p>
          )}

          <div className="flex-1 mb-3">
            <p className="text-gray-600 text-sm line-clamp-3">
              {description}
            </p>
          </div>

          {rating > 0 && (
            <div className="mb-4">
              <StarRating rating={rating} size={18} />
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
            <div>
              <h4 className="text-xl font-bold text-gray-900">
                Rs.{price}
              </h4>
            </div>
            <button
              onClick={handleAddToCart}
              className="p-3 gap-2 border flex rounded-full bg-amber-50 hover:bg-pink-500 cursor-pointer hover:text-white transition-all duration-300 transform hover:scale-110"
            >
              <p>Order Now</p>
              <GiMeal className="text-2xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsCard;
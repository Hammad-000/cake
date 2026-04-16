import React from "react";
import { useCart } from "../components/CartContext";
import { useNavigate } from "react-router-dom";
import { GiMeal } from "react-icons/gi";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const StarRating = ({ rating, size = 16 }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-0.5">
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={`full-${i}`} size={size} className="text-yellow-400" />
      ))}
      {halfStar && <FaStarHalfAlt size={size} className="text-yellow-400" />}
      {[...Array(emptyStars)].map((_, i) => (
        <FaRegStar key={`empty-${i}`} size={size} className="text-gray-300" />
      ))}
    </div>
  );
};

function ProductsCard({ product }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const { _id, name, description, category, price, rating = 0 } = product;

  const rawImage = product.imageUrl || product.image || product.picture;
  let imageSrc = "/placeholder-cake.jpg";

  if (rawImage) {
    if (rawImage.startsWith("http")) {
      imageSrc = rawImage;
    } else {
      imageSrc = `https://cakes-backend-gamma.vercel.app${rawImage}`;
    }
  }

  const cartProduct = {
    id: product._id,
    title: name,
    image: imageSrc,
    price: price,
    description: description,
    category: category,
    quantity: 1,
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(cartProduct);
  };

  const handleCardClick = () => {
    navigate(`/product/${_id}`);
  };

  return (
    <div className="p-3 md:p-4 cursor-pointer h-full" onClick={handleCardClick}>
      <div className="border rounded-xl shadow-md hover:shadow-xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300 ease-in-out bg-white h-full flex flex-col min-h-[480px] md:min-h-[520px]">
        {/* Responsive image container */}
        <div className="relative w-full h-48 md:h-64 lg:h-72 overflow-hidden shrink-0 bg-gray-100">
          <img
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
            src={imageSrc}
            alt={name}
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/600x400?text=No+Image";
            }}
          />
        </div>

        <div className="p-4 sm:p-5 md:p-6 flex-1 flex flex-col">
          <h3 className="text-base md:text-lg font-semibold text-gray-800 line-clamp-2 mb-2 hover:text-blue-600 transition-colors">
            {name}
          </h3>
          {category && (
            <p className="text-xs md:text-sm text-purple-600 font-medium mb-3">
              {category}
            </p>
          )}

          <div className="flex-1 mb-3">
            <p className="text-gray-600 text-xs md:text-sm line-clamp-3">
              {description}
            </p>
          </div>

          {/* Always show rating (even 0) for consistent spacing */}
          <div className="mb-4">
            <StarRating rating={rating} size={18} />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
            <div>
              <h4 className="text-lg md:text-xl font-bold text-gray-900">
                Rs.{price}
              </h4>
            </div>
            <button
              onClick={handleAddToCart}
              className="px-3 py-2 md:px-4 md:py-2 gap-2 border flex items-center rounded-full bg-amber-50 hover:bg-pink-500 cursor-pointer hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              <span className="text-sm md:text-base whitespace-nowrap">Order Now</span>
              <GiMeal className="text-xl md:text-2xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsCard;
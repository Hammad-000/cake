import React from "react";
import { useCart } from "../components/CartContext";
import { useNavigate } from "react-router-dom";
import { GiMeal } from "react-icons/gi";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const StarRating = ({ rating, size = 16 }) => {
  // ... (keep your existing StarRating function unchanged)
};

function ProductsCard({ product }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const { _id, name, description, category, price, rating } = product;

  // ---- FIX: Get image URL from multiple possible fields ----
  const rawImage = product.imageUrl || product.image || product.picture;
  let imageSrc = "/placeholder-cake.jpg";
  
  if (rawImage) {
    // If it's a relative path, prepend backend URL
    if (rawImage.startsWith("http")) {
      imageSrc = rawImage;
    } else {
      imageSrc = `https://cakes-backend-gamma.vercel.app${rawImage}`;
    }
  }

  // Normalize product for cart
  const cartProduct = {
    id: _id,
    title: name,
    image: imageSrc,
    price: price,
    description: description,
    category: category,
    quantity: 1
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(cartProduct);
  };

  const handleCardClick = () => {
    navigate(`/product/${_id}`);
  };

  return (
    <div className="p-4 cursor-pointer h-full" onClick={handleCardClick}>
      <div className="border rounded-xl shadow-md hover:shadow-xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300 ease-in-out bg-white h-full flex flex-col">
        <div className="relative w-full h-48 overflow-hidden shrink-0">
          <img
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
            src={imageSrc}
            alt={name}
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/400x300?text=No+Image";
            }}
          />
        </div>
        <div className="p-4 sm:p-6 flex-1 flex flex-col">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-2 hover:text-blue-600 transition-colors">
            {name}
          </h3>
          {category && (
            <p className="text-sm text-purple-600 font-medium mb-2">{category}</p>
          )}
          <div className="flex-1 mb-3">
            <p className="text-gray-600 text-sm line-clamp-3">{description}</p>
          </div>
          {rating > 0 && (
            <div className="mb-4">
              <StarRating rating={rating} size={18} />
            </div>
          )}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
            <div>
              <h4 className="text-xl font-bold text-gray-900">Rs.{price}</h4>
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
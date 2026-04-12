import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://cakes-backend-gamma.vercel.app/api/products');
        if (response.data && Array.isArray(response.data.products)) {
          setProducts(response.data.products);
        } else {
          setError('Failed to fetch products. Invalid response format.');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to fetch products.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <div className="p-8 text-center">Loading products...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!products.length) return <div className="p-8 text-center">No products available</div>;

  // Admin‑style list (horizontal rows)
  return (
    <div className="space-y-4">
      {products.map((product) => {
        const productId = product._id || product.id;
        const displayName = product.title || product.name;
        const imageUrl = product.imageUrl || product.image || '/placeholder-cake.jpg';

        return (
          <div
            key={productId}
            className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100 gap-4 hover:shadow-md transition-shadow"
          >
            {/* Product Image */}
            <img
              src={imageUrl}
              alt={displayName}
              className="w-20 h-20 object-cover rounded-xl"
              onError={(e) => { e.target.src = '/placeholder-cake.jpg'; }}
            />
            {/* Product Info */}
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">{displayName}</h3>
              <p className="text-sm text-gray-500 line-clamp-1">{product.description}</p>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <span className="text-lg font-bold text-amber-600">
                  Rs {typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
                </span>
                {product.category && (
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    {product.category}
                  </span>
                )}
              </div>
            </div>
            {/* Optional: Add to Cart button */}
            <button className="px-4 py-2 bg-amber-500 text-white rounded-lg text-sm font-medium hover:bg-amber-600">
              Add to Cart
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Products;
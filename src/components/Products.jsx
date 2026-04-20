import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  // Function to fetch a specific page
  const fetchProductsPage = async (page) => {
    try {
      const response = await axios.get(
        `https://cakes-backend-gamma.vercel.app/api/products?page=${page}&limit=10`
      );
      
      if (response.data && Array.isArray(response.data.products)) {
        return {
          products: response.data.products,
          pagination: response.data.pagination
        };
      }
      return null;
    } catch (err) {
      console.error('Error fetching products:', err);
      throw err;
    }
  };

  // Initial load - fetch first page
  useEffect(() => {
    const loadInitialProducts = async () => {
      setLoading(true);
      try {
        const result = await fetchProductsPage(1);
        if (result) {
          setProducts(result.products);
          setTotalPages(result.pagination.totalPages);
          setCurrentPage(1);
        } else {
          setError('Failed to fetch products. Invalid response format.');
        }
      } catch (error) {
        setError('Failed to fetch products.');
      } finally {
        setLoading(false);
      }
    };
    loadInitialProducts();
  }, []);

  // Load more products (next page)
  const loadMoreProducts = async () => {
    if (currentPage >= totalPages || loadingMore) return;
    
    setLoadingMore(true);
    const nextPage = currentPage + 1;
    
    try {
      const result = await fetchProductsPage(nextPage);
      if (result) {
        setProducts(prev => [...prev, ...result.products]);
        setCurrentPage(nextPage);
      }
    } catch (error) {
      console.error('Error loading more products:', error);
    } finally {
      setLoadingMore(false);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading products...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!products.length) return <div className="p-8 text-center">No products available</div>;

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
            <img
              src={imageUrl}
              alt={displayName}
              className="w-20 h-20 object-cover rounded-xl"
              onError={(e) => { e.target.src = '/placeholder-cake.jpg'; }}
            />
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
            <button className="px-4 py-2 bg-amber-500 text-white rounded-lg text-sm font-medium hover:bg-amber-600">
              Add to Cart
            </button>
          </div>
        );
      })}
      
      {/* Load More Button */}
      {currentPage < totalPages && (
        <div className="text-center py-4">
          <button
            onClick={loadMoreProducts}
            disabled={loadingMore}
            className="px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50"
          >
            {loadingMore ? 'Loading...' : `Load More (${currentPage}/${totalPages})`}
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;
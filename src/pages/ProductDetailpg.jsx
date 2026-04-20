import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../components/CartContext';


const API_BASE_URL = import.meta.env.VITE_API_URL;

const getImageUrl = (imagePath) => {
  if (!imagePath) return '/placeholder.jpg';
  if (imagePath.startsWith('http')) return imagePath;
  // If relative, prepend backend base
  return `${API_BASE_URL}${imagePath.startsWith('/') ? imagePath : `/${imagePath}`}`;
};

function ProductDetailpg() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { addToCart } = useCart();

  // Fetch product
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${API_BASE_URL}/api/products/${id}`);
        if (response.data?.product) {
          setProduct(response.data.product);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(err.response?.data?.message || 'Failed to load product');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // Fetch related products
  useEffect(() => {
    if (!product) return;
    const fetchRelated = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/products`);
        let products = [];
        if (response.data?.products && Array.isArray(response.data.products)) {
          products = response.data.products;
        } else if (Array.isArray(response.data)) {
          products = response.data;
        }
        const related = products
          .filter(p => p.category === product.category && p._id !== product._id)
          .slice(0, 3);
        setRelatedProducts(related);
      } catch (err) {
        console.error('Error fetching related products:', err);
      }
    };
    fetchRelated();
  }, [product]);

  const handleAddToCart = useCallback(() => {
    if (!product) return;
    const cartProduct = {
      id: product._id,
      title: product.name || product.title,
      image: product.imageUrl || product.image || '/placeholder.jpg',
      price: product.price,
      description: product.description,
      category: product.category,
      quantity: quantity,
    };
    addToCart(cartProduct);
    setQuantity(1);
  }, [product, quantity, addToCart]);

  const totalPrice = useMemo(() => {
    return product ? (product.price * quantity).toFixed(2) : '0.00';
  }, [product, quantity]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-pink-500 border-r-transparent"></div>
        <p className="mt-2 text-gray-600">Loading product...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="text-2xl font-bold text-red-600">{error || 'Product not found'}</div>
        <Link to="/menu" className="mt-4 inline-block text-pink-500 hover:underline">
          Back to Menu
        </Link>
      </div>
    );
  }

  const imageUrl = product.imageUrl || product.image;
  const { _id, name, description, category, price, rating } = product;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-gray-600" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-pink-500">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/menu" className="hover:text-pink-500">Menu</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900" aria-current="page">{name}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8 bg-white rounded-2xl shadow-lg p-6">
          {/* Product Image */}
          <div className="lg:w-1/2">
            <img
              src={getImageUrl(imageUrl)}
              alt={name}
              className="w-full h-96 object-cover rounded-lg shadow-md"
              onError={(e) => {
                e.target.src = '/placeholder.jpg';
                e.target.onerror = null;
              }}
            />
          </div>

          {/* Product Details */}
          <div className="lg:w-1/2">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{name}</h1>
            <p className="text-2xl font-bold text-pink-600 mb-6">Rs {price}</p>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-700 leading-relaxed">{description || 'No description available.'}</p>
            </div>
            {category && (
              <div className="mb-4">
                <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">{category}</span>
              </div>
            )}
            {rating && (
              <div className="mb-4 flex items-center gap-2">
                <span className="text-yellow-500">★</span>
                <span>{rating.toFixed(1)} / 5</span>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="mb-6">
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="w-10 h-10 rounded-full border border-gray-300 cursor-pointer hover:bg-pink-100 flex items-center justify-center transition"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span id="quantity" className="text-lg font-semibold w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(prev => prev + 1)}
                  className="w-10 h-10 rounded-full border border-gray-300 cursor-pointer hover:bg-pink-100 flex items-center justify-center transition"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full py-4 bg-pink-500 hover:bg-pink-600 cursor-pointer text-white rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg mb-4"
            >
              Add to Cart - Rs {totalPrice}
            </button>

            <div className="border-t pt-4">
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <span>✅ In Stock</span>
                <span>🚚 Free Delivery</span>
                <span>🔒 Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map(related => {
                const relatedImage = related.imageUrl || related.image;
                return (
                  <Link
                    key={related._id}
                    to={`/product/${related._id}`}
                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 block"
                  >
                    <img
                      src={getImageUrl(relatedImage)}
                      alt={related.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                      onError={(e) => {
                        e.target.src = '/placeholder.jpg';
                        e.target.onerror = null;
                      }}
                    />
                    <div className="p-4">
                      <h3 className="font-semibold mb-2">{related.name}</h3>
                      <p className="font-bold text-pink-600">Rs {related.price}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetailpg;
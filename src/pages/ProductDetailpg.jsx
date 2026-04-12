import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../components/CartContext';

function ProductDetailpg() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://cakes-backend-gamma.vercel.app/api/products/${id}`);
        if (response.data && response.data.product) {
          setProduct(response.data.product);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (!product) return;
    const fetchRelated = async () => {
      try {
        const response = await axios.get('https://cakes-backend-gamma.vercel.app/api/products');
        if (response.data && Array.isArray(response.data.products)) {
          const related = response.data.products
            .filter(p => p.category === product.category && p._id !== product._id)
            .slice(0, 3);
          setRelatedProducts(related);
        }
      } catch (err) {
        console.error('Error fetching related products:', err);
      }
    };
    fetchRelated();
  }, [product]);

  const handleAddToCart = () => {
    if (!product) return;
    // Normalize to cart format
    const cartProduct = {
      id: product._id,
      title: product.name,
      image: product.imageUrl,
      price: product.price,
      description: product.description,
      category: product.category,
      quantity: 1
    };
    for (let i = 0; i < quantity; i++) {
      addToCart(cartProduct);
    }
    setQuantity(1);
  };

  if (loading) return <div className="container mx-auto px-4 py-8 text-center">Loading product...</div>;
  if (error || !product) return (
    <div className="container mx-auto px-4 py-8 text-center">
      <div className="text-2xl font-bold text-red-600">{error || 'Product not found'}</div>
      <Link to="/menu" className="mt-4 inline-block text-pink-500 hover:underline">Back to Menu</Link>
    </div>
  );

  const { _id, name, imageUrl, description, category, price, rating } = product;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-gray-600">
          <Link to="/" className="hover:text-pink-500">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/menu" className="hover:text-pink-500">Menu</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{name}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8 bg-white rounded-2xl shadow-lg p-6">
          {/* Product Image */}
          <div className="lg:w-1/2">
            <img
              src={imageUrl || '/placeholder-cake.jpg'}
              alt={name}
              className="w-full h-96 object-cover rounded-lg shadow-md"
              onError={(e) => { e.target.src = 'https://via.placeholder.com/400x400?text=No+Image'; }}
            />
          </div>

          {/* Product Details */}
          <div className="lg:w-1/2">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{name}</h1>
            <p className="text-2xl font-bold text-pink-600 mb-6">Rs {price}</p>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-700 leading-relaxed">{description}</p>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
              <div className="flex items-center gap-3">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 rounded-full border border-gray-300 cursor-pointer hover:bg-pink-100 flex items-center justify-center">-</button>
                <span className="text-lg font-semibold w-8 text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 rounded-full border border-gray-300 cursor-pointer hover:bg-pink-100 flex items-center justify-center">+</button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button onClick={handleAddToCart} className="w-full py-4 bg-pink-500 hover:bg-pink-600 cursor-pointer text-white rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg mb-4">
              Add to Cart - Rs {(price * quantity).toFixed(2)}
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
              {relatedProducts.map(related => (
                <Link key={related._id} to={`/product/${related._id}`} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 block">
                  <img
                    src={related.imageUrl || '/placeholder-cake.jpg'}
                    alt={related.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300?text=No+Image'; }}
                  />
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">{related.name}</h3>
                    <p className="font-bold text-pink-600">Rs {related.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetailpg;
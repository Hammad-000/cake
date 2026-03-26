import React, { useState, useEffect } from 'react';
import ProductsCard from './ProductsCard';
import { Link } from 'react-router-dom';
import axios from 'axios'; // To make API calls

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(''); // Added for error handling

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/products'); // Make sure your endpoint matches
        if (response.data && Array.isArray(response.data.products)) {
          setProducts(response.data.products); // Safe check for array
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

  // Render loading state if the products are being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  // Handle error if there's any issue with the fetch
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
      {products.length > 0 ? (
        products.map((product) => (
          <ProductsCard key={product._id} product={product} />
        ))
      ) : (
        <div>No products available</div>
      )}
    </div>
  );
};

export default Products;
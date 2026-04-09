import React, { useState, useEffect } from 'react';
import ProductsCard from './ProductsCard';
import { Link } from 'react-router-dom';
import axios from 'axios'; 

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(''); 

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
       const response = await axios.get('https://cakes-backend-gamma.vercel.app/api/products')
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


  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!products.length) return <div>No products available</div>;

  return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
      {products.map((product) => (
        <ProductsCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default Products;
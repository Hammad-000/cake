import React, { useState } from 'react';
import axios from 'axios';

function UploadProduct() {
  // State to store form data
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null); // For storing selected image
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'productName') setProductName(value);
    if (name === 'price') setPrice(value);
    if (name === 'description') setDescription(value);
  };

  // Handle file input change (image)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  // Handle form submission (product details + image)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productName || !price || !description || !image) {
      setMessage('Please fill all fields and upload an image.');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);
    formData.append('productName', productName);
    formData.append('price', price);
    formData.append('description', description);

    try {
      setUploading(true);
      const response = await axios.post('http://localhost:3000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.file) {
        // Handle the successful upload and save product to the database
        const productData = {
          name: productName,
          price: parseFloat(price),
          description,
          imageUrl: response.data.file.cloudinaryUrl, // Image URL from Cloudinary
        };

        // Assuming you have another API to save the product to the database
        const saveProductResponse = await axios.post('http://localhost:3000/api/products', productData);
        if (saveProductResponse.status === 200) {
          setMessage('Product added successfully!');
        } else {
          setMessage('Error adding product.');
        }
      }
    } catch (error) {
      console.error('Error uploading product:', error);
      setMessage('Error uploading the product. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="upload-product-container">
      <h2>Add New Product</h2>
      {message && <div className="message">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name:</label>
          <input
            type="text"
            name="productName"
            value={productName}
            onChange={handleInputChange}
            placeholder="Enter product name"
          />
        </div>

        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={price}
            onChange={handleInputChange}
            placeholder="Enter product price"
          />
        </div>

        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={description}
            onChange={handleInputChange}
            placeholder="Enter product description"
          />
        </div>

        <div>
          <label>Product Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        <button type="submit" disabled={uploading}>
          {uploading ? 'Uploading...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
}

export default UploadProduct;
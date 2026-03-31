import React, { useState } from "react";
import axios from "axios";

const ProductUploads = () => {
  const [image, setImage] = useState(null);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [rating, setRating] = useState(0);
  const [isAvailable, setIsAvailable] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !image ||
      !productName ||
      !productDescription ||
      !productPrice ||
      !productCategory
    ) {
      setError("Please fill in all fields and select an image.");
      return;
    }

    // Validate Price and Rating
    if (isNaN(productPrice) || productPrice <= 0) {
      setError("Please enter a valid price.");
      return;
    }
    if (isNaN(originalPrice) || originalPrice < 0) {
      setError("Please enter a valid original price.");
      return;
    }
    if (isNaN(rating) || rating < 1 || rating > 5) {
      setError("Please provide a rating between 1 and 5.");
      return;
    }

    setUploading(true); // Start uploading
    setError(""); // Clear previous error messages

    try {
      // Step 1: Upload the image
      const formDataImage = new FormData();
      formDataImage.append("image", image);

      const imageUploadResponse = await axios.post("/api/upload", formDataImage, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const imageUrl = imageUploadResponse.data.file.cloudinaryUrl;

      // Step 2: Upload product data
      const productData = {
        name: productName,
        description: productDescription,
        price: productPrice,
        category: productCategory,
        originalPrice,
        rating,
        isAvailable,
        imageUrl,
      };

      const response = await axios.post("/api/products", productData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response.data);
      setSuccess("Product uploaded successfully!");

      // Reset form on success
      setProductName("");
      setProductDescription("");
      setProductPrice("");
      setProductCategory("");
      setOriginalPrice("");
      setRating(0);
      setIsAvailable(true);
      setImage(null);
    } catch (error) {
      console.error("Error uploading product:", error);
      setError("Failed to upload product. Please try again.");
    } finally {
      setUploading(false); // Reset uploading state
    }
  };

  return (
    <div className="product-upload max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <textarea
            placeholder="Product Description"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            placeholder="Product Price"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Product Category"
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            placeholder="Original Price (Optional)"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            placeholder="Rating (1-5)"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            min="1"
            max="5"
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="inline-flex items-center">
            Available
            <input
              type="checkbox"
              checked={isAvailable}
              onChange={(e) => setIsAvailable(e.target.checked)}
              className="ml-2"
            />
          </label>
        </div>
        <div className="mb-4">
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {uploading ? (
          <p className="text-blue-500">Uploading...</p>
        ) : (
          <button type="submit" className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all">
            Upload Product
          </button>
        )}

        {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && <p className="text-green-500 mt-2">{success}</p>}
      </form>
    </div>
  );
};

export default ProductUploads;
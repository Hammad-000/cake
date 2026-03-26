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

    setUploading(true); // Start uploading

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
      alert("Product uploaded successfully!");

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
    <div className="product-upload">
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div>
          <textarea
            placeholder="Product Description"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Product Price"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Product Category"
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Original Price (Optional)"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Rating (1-5)"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            min="1"
            max="5"
          />
        </div>
        <div>
          <label>
            Available
            <input
              type="checkbox"
              checked={isAvailable}
              onChange={(e) => setIsAvailable(e.target.checked)}
            />
          </label>
        </div>
        <div>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        {uploading ? (
          <p>Uploading...</p>
        ) : (
          <button type="submit">Upload Product</button>
        )}

        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default ProductUploads;
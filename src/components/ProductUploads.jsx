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

    // First upload the image to Cloudinary (or your image hosting service)
    const formDataImage = new FormData();
    formDataImage.append("image", image);

    try {
      // Upload image
      const imageUploadResponse = await axios.post("/api/upload", formDataImage, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const imageUrl = imageUploadResponse.data.file.cloudinaryUrl;

      // Now create the product with all other fields
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
    } catch (error) {
      console.error("Error uploading product:", error);
      setError("Failed to upload product");
    } finally {
      setUploading(false);
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
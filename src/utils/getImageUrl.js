const BASE_URL = (import.meta.env.VITE_API_URL || "")
  .replace(/\/$/, "")
  .replace(/\/api$/, "");
 
export const getImageUrl = (imagePath, fallback = "/placeholder.jpg") => {
  if (!imagePath) return fallback;
  if (/^https?:\/\//i.test(imagePath)) return imagePath;
  return `${BASE_URL}${imagePath.startsWith("/") ? imagePath : `/${imagePath}`}`;
};
 
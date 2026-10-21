# 🎂 Cakes Villa

> Full-stack e-commerce web application for a bakery — browse signature cakes, place custom orders, and manage products through an admin role.

**Live Demo:** [cakevillaa.vercel.app](https://cakevillaa.vercel.app/)

---

## ✨ Features

- 🔐 **JWT Authentication** — secure register/login with hashed passwords (bcrypt)
- 👥 **Role-Based Access Control** — separate `user` and `admin` roles with protected routes
- 🛍️ **Product Catalog** — browse signature cakes & specialties
- 📦 **Order System** — customers can place custom cake orders
- 🖼️ **Image Upload** — product images uploaded to Cloudinary with file-type & size validation
- 🌙 **Dark / Light Theme** — theme toggle with Context API
- 📱 **Responsive UI** — built mobile-first
- 🔒 **Protected API Routes** — middleware-based auth & authorization

## 🛠️ Tech Stack

| Layer | Technologies |
| --- | --- |
| Frontend | React, Vite, React Router, Axios, Context API |
| Backend | Node.js, Express |
| Database | MongoDB (Mongoose) |
| Auth | JWT, bcrypt |
| Storage | Cloudinary, Multer |

## 📁 Project Structure

```javascript
src/
├── assets/       # Images & static files
├── components/   # Reusable UI components
├── context/      # AuthContext, ThemeContext
├── data/         # Static data
├── pages/        # Route pages
├── services/     # API layer (Axios instance)
├── utils/        # Helper functions
├── App.jsx
└── main.jsx
```

## 🚀 Getting Started

**Prerequisites:** Node.js 18+

```bash
# 1. Clone the repo
git clone https://github.com/Hammad-000/cake.git
cd cake

# 2. Install dependencies
npm install

# 3. Set up environment variables
# Create a .env file in the root:
echo "VITE_API_URL=http://localhost:3000" > .env

# 4. Start the dev server
npm run dev
```

The app runs at `http://localhost:5173` (make sure the [backend](https://github.com/Hammad-000/cakes-backend) is running too).

## 🔑 Environment Variables

| Variable | Description |
| --- | --- |
| `VITE_API_URL` | Backend API base URL |

## 🌐 API Overview

Base URL: `https://cakes-backend-gamma.vercel.app`

| Route | Description |
| --- | --- |
| `POST /api/auth/*` | Register, login, profile |
| `GET /api/products` | Fetch product catalog |
| `POST /api/orders` | Place an order |
| `POST /api/upload` | Image upload (Cloudinary) |

> Full endpoint documentation: [cakes-backend repo](https://github.com/Hammad-000/cakes-backend)

## 📸 Screenshots
<img width="1753" height="931" alt="Screenshot 2026-10-16 234348" src="https://github.com/user-attachments/assets/77102294-99b8-476a-976e-25121300ecb0" />
<img width="1765" height="940" alt="Screenshot 2026-10-16 234330" src="https://github.com/user-attachments/assets/f96c9030-a04c-4195-9d55-49cc765719f3" />
<img width="1713" height="917" alt="Screenshot 2026-10-16 234626" src="https://github.com/user-attachments/assets/4a676db4-5efb-40bd-a71c-aec99cb52da8" />
<img width="1785" height="931" alt="Screenshot 2026-10-16 234542" src="https://github.com/user-attachments/assets/15f91e28-d5de-4602-b532-f27ee06bba8a" />
<img width="1748" height="937" alt="Screenshot 2026-10-16 234411" src="https://github.com/user-attachments/assets/9d50dbaa-9cc3-46d6-a665-cda8938de1c3" />




## 🔮 Future Improvements

- 💳 Payment gateway integration (Stripe)
- 📧 Order confirmation emails
- 🔁 Refresh-token based sessions
- ⭐ Reviews & ratings

## 🔗 Links

- Backend Repository: [Hammad-000/cakes-backend](https://github.com/Hammad-000/cakes-backend)
- Live API: [cakes-backend-gamma.vercel.app](https://cakes-backend-gamma.vercel.app)

---

Made with ❤️ by [Hammad-000](https://github.com/Hammad-000)

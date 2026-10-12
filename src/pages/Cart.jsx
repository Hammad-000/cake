import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoLogInOutline } from "react-icons/io5";
import { FiArrowRight, FiCheck, FiMinus, FiPlus } from "react-icons/fi";
import API from "../services/api";
import { useCart } from "../components/CartContext";
import FooterContent from "../components/FooterContent";
const serif = "font-[Fraunces,Georgia,serif]";
const focus =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8A5A1E] dark:focus-visible:outline-[#D4B27A]";
const muted = "text-[#2B1511]/65 dark:text-[#f3e5d8]/65";
const line = "border-[#2B1511]/10 dark:border-[#C9A66B]/20";
const divide = "divide-[#2B1511]/10 dark:divide-[#C9A66B]/20";
const panel = `rounded-2xl border ${line} bg-white/70 dark:bg-white/5`;
const accent = "text-[#8A5A1E] dark:text-[#D4B27A]";
const btn =
  "bg-[#2B1511] text-[#F7F0E6] hover:bg-[#4a251b] dark:bg-[#C9A66B] dark:text-[#1a0d09] dark:hover:bg-[#d8b87d]";

const EMPTY = { fullName: "", email: "", phone: "", address: "", city: "" };
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const rs = (n) =>
  `Rs. ${Number(n || 0).toLocaleString("en-PK", { maximumFractionDigits: 2 })}`;

const getToken = () => {
  try {
    return localStorage.getItem("authToken");
  } catch {
    return null;
  }
};

const cleanPhone = (v) => v.replace(/[\s\-()]/g, "").replace(/^\+/, "");

const placeholder = (e) => {
  e.currentTarget.onerror = null;
  e.currentTarget.src = "/placeholder.jpg";
};

function validate(info) {
  const errors = {};
  if (!info.fullName.trim()) errors.fullName = "Enter your full name.";
  if (!EMAIL.test(info.email.trim())) errors.email = "Enter a valid email address.";
  if (!/^\d{10,15}$/.test(cleanPhone(info.phone))) errors.phone = "Enter a valid phone number (10 to 15 digits).";
  if (!info.address.trim()) errors.address = "Enter your delivery address.";
  return errors;
}

function Shell({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#F7F0E6] text-[#2B1511] dark:bg-[#140A07] dark:text-[#f3e5d8]">
      <main className="mx-auto w-full max-w-6xl grow px-4 py-10 sm:px-6">{children}</main>
      <FooterContent />
    </div>
  );
}

function Field({ label, name, value, onChange, error, required, ...rest }) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium">
        {label}
        {required && " *"}
      </label>
      <input
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`w-full rounded-xl border bg-white px-4 py-3 text-[#2B1511] dark:bg-[#140A07] dark:text-[#f3e5d8] ${
          error ? "border-red-500" : line
        } ${focus}`}
        {...rest}
      />
      {error && (
        <p id={`${name}-error`} className="mt-1 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

function CartRow({ product, onInc, onDec, onRemove }) {
  const price = Number(product.price) || 0;
  const step = `flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-[#2B1511]/10 dark:hover:bg-white/10 ${focus}`;
  return (
    <li className="flex flex-col items-center gap-5 p-5 sm:flex-row sm:p-6">
      <img
        src={product.image}
        alt={product.title}
        onError={placeholder}
        className="h-24 w-24 shrink-0 rounded-xl object-cover"
      />
      <div className="grow text-center sm:text-left">
        <h4 className={`${serif} line-clamp-2 text-lg font-medium`}>{product.title}</h4>
        <p className={`mt-1 font-semibold ${accent}`}>{rs(price)}</p>
      </div>
      <div className={`flex items-center rounded-full border ${line}`}>
        <button type="button" onClick={onDec} aria-label={`Decrease quantity of ${product.title}`} className={step}>
          <FiMinus />
        </button>
        <span className="w-8 text-center font-semibold" aria-live="polite">
          {product.quantity}
        </span>
        <button type="button" onClick={onInc} aria-label={`Increase quantity of ${product.title}`} className={step}>
          <FiPlus />
        </button>
      </div>
      <div className="text-center sm:w-36 sm:text-right">
        <p className="text-lg font-semibold">{rs(price * product.quantity)}</p>
        <button
          type="button"
          onClick={onRemove}
          className={`mt-1 inline-flex items-center gap-1.5 text-sm text-red-600 hover:underline dark:text-red-400 ${focus}`}
        >
          <FaRegTrashCan /> Remove
        </button>
      </div>
    </li>
  );
}

function Cart() {
  const { cart, removeFromCart, incrementQuantity, decrementQuantity, calculateTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [info, setInfo] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [orderError, setOrderError] = useState("");
  const [placed, setPlaced] = useState(null);

  const isLoggedIn = Boolean(getToken());
  const total = calculateTotalPrice();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const goToLogin = () => navigate("/login", { state: { from: "/cart" } });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting || cart.length === 0) return;

    const found = validate(info);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    const token = getToken();
    if (!token) return goToLogin();

    setSubmitting(true);
    setOrderError("");
    try {
      const { data } = await API.post(
        "/orders",
        {
          items: cart.map((item) => ({ product: item.id, quantity: item.quantity })),
          customer: {
            fullName: info.fullName.trim(),
            email: info.email.trim(),
            phone: cleanPhone(info.phone),
            address: info.address.trim(),
            city: info.city.trim(),
          },
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPlaced({ ref: data?.order?._id || data?._id || null });
      clearCart();
      setInfo(EMPTY);
    } catch (err) {
      if (err.response?.status === 401) {
        try {
          localStorage.removeItem("authToken");
        } catch {
          /* ignore */
        }
        setOrderError("Your session has expired. Please log in again.");
      } else {
        setOrderError(
          err.response?.data?.message || err.message || "We couldn't place your order. Please try again."
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  /* ---- Order placed ---- */
  if (placed) {
    return (
      <Shell>
        <div className="mx-auto max-w-md py-16 text-center">
          <span className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full text-3xl ${btn}`}>
            <FiCheck />
          </span>
          <h2 className={`${serif} mt-6 text-3xl font-medium`}>Order placed</h2>
          <p className={`mt-3 ${muted}`}>Thank you! We've received your order and will contact you shortly.</p>
          {placed.ref && <p className={`mt-2 text-sm ${muted}`}>Reference: {placed.ref}</p>}
          <Link to="/menu" className={`mt-8 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold ${btn} ${focus}`}>
            Back to menu <FiArrowRight />
          </Link>
        </div>
      </Shell>
    );
  }

  /* ---- Empty cart ---- */
  if (cart.length === 0) {
    return (
      <Shell>
        <div className="mx-auto max-w-md py-16 text-center">
          <h2 className={`${serif} text-3xl font-medium`}>Your cart is empty</h2>
          <p className={`mt-3 ${muted}`}>You haven't added any cakes yet.</p>
          <Link to="/menu" className={`group mt-8 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold ${btn} ${focus}`}>
            Explore the menu <FiArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </Shell>
    );
  }

  /* ---- Cart + checkout ---- */
  return (
    <Shell>
      <h2 className={`${serif} text-4xl font-medium`}>Your cart</h2>
      <p className={`mt-2 ${muted}`}>Review your items and complete your order.</p>

      {orderError && (
        <div role="alert" className="mt-6 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-red-800 dark:border-red-500/40 dark:bg-red-500/10 dark:text-red-200">
          {orderError}
        </div>
      )}

      <section className={`mt-8 overflow-hidden ${panel}`}>
        <h3 className={`border-b px-6 py-4 font-semibold ${line}`}>Cart items ({cart.length})</h3>
        <ul className={`divide-y ${divide}`}>
          {cart.map((product) => (
            <CartRow
              key={product.id}
              product={product}
              onInc={() => incrementQuantity(product.id)}
              onDec={() => decrementQuantity(product.id)}
              onRemove={() => removeFromCart(product.id)}
            />
          ))}
        </ul>
      </section>

      {!isLoggedIn ? (
        <div className={`mx-auto mt-8 max-w-md p-8 text-center ${panel}`}>
          <p className={`${serif} text-xl font-medium`}>Log in to confirm your order</p>
          <p className={`mt-2 text-sm ${muted}`}>Your cart will be waiting for you.</p>
          <button
            type="button"
            onClick={goToLogin}
            className={`mt-6 inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold ${btn} ${focus}`}
          >
            Log in <IoLogInOutline className="text-lg" />
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="mt-8 grid gap-8 lg:grid-cols-3">
          <section className={`p-6 lg:col-span-2 ${panel}`}>
            <h3 className={`${serif} mb-6 text-xl font-medium`}>Delivery information</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Full name" name="fullName" required autoComplete="name" value={info.fullName} onChange={handleChange} error={errors.fullName} />
              <Field label="Email" name="email" type="email" required autoComplete="email" value={info.email} onChange={handleChange} error={errors.email} />
              <Field label="Phone number" name="phone" type="tel" inputMode="tel" required autoComplete="tel" placeholder="0300 1234567" value={info.phone} onChange={handleChange} error={errors.phone} />
              <Field label="Address" name="address" required autoComplete="street-address" value={info.address} onChange={handleChange} error={errors.address} />
              <Field label="City (optional)" name="city" autoComplete="address-level2" value={info.city} onChange={handleChange} />
            </div>
          </section>

          <aside className={`h-fit p-6 ${panel}`}>
            <h3 className={`${serif} border-b pb-4 text-xl font-medium ${line}`}>Order summary</h3>
            <dl className="mt-4 space-y-3">
              <div className="flex justify-between">
                <dt className={muted}>Subtotal</dt>
                <dd className="font-semibold">{rs(total)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className={muted}>Delivery</dt>
                <dd className={`font-semibold ${accent}`}>Free</dd>
              </div>
              <div className={`flex items-end justify-between border-t pt-4 ${line}`}>
                <dt className="font-semibold">Total</dt>
                <dd className="text-right">
                  <p className="text-2xl font-semibold">{rs(total)}</p>
                  <p className={`text-xs ${muted}`}>Inclusive of all taxes</p>
                </dd>
              </div>
            </dl>
            <button
              type="submit"
              disabled={submitting}
              className={`mt-6 w-full rounded-full py-3.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${btn} ${focus}`}
            >
              {submitting ? "Placing order..." : "Confirm order"}
            </button>
          </aside>
        </form>
      )}
    </Shell>
  );
}

export default Cart;
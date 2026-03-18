import React, { useState } from 'react';
import {
  FaBoxOpen, FaShoppingCart, FaUsers, FaCog, FaPlus,
  FaEdit, FaTrash, FaBars, FaTimes, FaCloudUploadAlt,
  FaChevronLeft, FaChevronRight
} from 'react-icons/fa';
import { BiLogOut } from "react-icons/bi";

// ---------- Mock Data (replace with real API calls) ----------
const initialProducts = [
  { id: 1, name: 'Red Velvet Cake', price: 29.99, description: 'Classic red velvet with cream cheese frosting' },
  { id: 2, name: 'Chocolate Fudge', price: 34.99, description: 'Rich chocolate cake with fudge icing' },
  { id: 3, name: 'Vanilla Bean', price: 24.99, description: 'Light vanilla sponge with buttercream' },
];

const initialOrders = [
  { id: '#1001', customer: 'John Doe', date: '2024-03-15', total: 59.98, status: 'Delivered' },
  { id: '#1002', customer: 'Jane Smith', date: '2024-03-16', total: 34.99, status: 'Processing' },
  { id: '#1003', customer: 'Bob Johnson', date: '2024-03-17', total: 89.97, status: 'Shipped' },
];

const initialCustomers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', orders: 5, spent: 249.95 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', orders: 3, spent: 124.50 },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', orders: 8, spent: 399.20 },
];

// ---------- Page Components (unchanged) ----------
function ProductsPage({ products, setProducts }) {
  const [formData, setFormData] = useState({ name: '', price: '', description: '', image: null });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setFormData(prev => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      id: Date.now(),
      name: formData.name,
      price: parseFloat(formData.price),
      description: formData.description,
    };
    setProducts([...products, newProduct]);
    alert('Product added!');
    setFormData({ name: '', price: '', description: '', image: null });
    e.target.reset();
  };

  const handleDelete = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div className="space-y-8">
      {/* Add Product Form */}
      <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-3 border-b-2 border-purple-100">
          Add New Product
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                placeholder="e.g., Hazelnut Cake"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
              <input
                type="number"
                step="0.01"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                placeholder="00.00"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
              placeholder="Describe your cake..."
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
            <div className="border-2 border-dashed border-purple-200 rounded-xl p-6 text-center hover:border-purple-400 transition">
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="image-upload" />
              <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center gap-2">
                <FaCloudUploadAlt className="text-4xl text-purple-400" />
                <span className="text-gray-600 font-medium">Click to upload or drag and drop</span>
                <span className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</span>
              </label>
              {formData.image && <p className="mt-2 text-sm text-purple-600">Selected: {formData.image.name}</p>}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-pink-600 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
          >
            <FaPlus /> Add Product
          </button>
        </form>
      </div>

      {/* Product List */}
      <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-3 border-b-2 border-purple-100">
          Current Products
        </h2>
        <div className="space-y-4">
          {products.map(product => (
            <div key={product.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <h3 className="font-semibold text-gray-800">{product.name}</h3>
                <p className="text-sm text-gray-600">${product.price.toFixed(2)} - {product.description}</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">
                  <FaEdit />
                </button>
                <button onClick={() => handleDelete(product.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition">
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function OrdersPage({ orders }) {
  return (
    <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-3 border-b-2 border-purple-100">
        Orders
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Order ID</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Customer</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Date</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Total</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-800">{order.id}</td>
                <td className="px-4 py-3 text-gray-800">{order.customer}</td>
                <td className="px-4 py-3 text-gray-600">{order.date}</td>
                <td className="px-4 py-3 text-gray-800">${order.total.toFixed(2)}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                    order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CustomersPage({ customers }) {
  return (
    <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-3 border-b-2 border-purple-100">
        Customers
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Name</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Email</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Orders</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Total Spent</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(customer => (
              <tr key={customer.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-800">{customer.name}</td>
                <td className="px-4 py-3 text-gray-600">{customer.email}</td>
                <td className="px-4 py-3 text-gray-800">{customer.orders}</td>
                <td className="px-4 py-3 text-gray-800">${customer.spent.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SettingsPage() {
  return (
    <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-3 border-b-2 border-purple-100">
        Site Settings
      </h2>
      <form className="space-y-6 max-w-lg">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Store Name</label>
          <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-300" placeholder="Cake Villa" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
          <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-300" placeholder="admin@cakevilla.com" />
        </div>
        <button className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-600 transition">
          Save Settings
        </button>
      </form>
    </div>
  );
}

// ---------- Main Dashboard Component ----------
function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarMinimized, setSidebarMinimized] = useState(false); // new state for desktop minimize
  const [currentPage, setCurrentPage] = useState('products');
  const [products, setProducts] = useState(initialProducts);
  const [orders] = useState(initialOrders);
  const [customers] = useState(initialCustomers);

  const renderPage = () => {
    switch (currentPage) {
      case 'products':
        return <ProductsPage products={products} setProducts={setProducts} />;
      case 'orders':
        return <OrdersPage orders={orders} />;
      case 'customers':
        return <CustomersPage customers={customers} />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <ProductsPage products={products} setProducts={setProducts} />;
    }
  };

  // Toggle minimize on desktop
  const toggleMinimize = () => setSidebarMinimized(!sidebarMinimized);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex">
      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 bg-white/90 backdrop-blur-sm shadow-2xl
          transform transition-all duration-300 ease-in-out
          lg:static lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          ${sidebarMinimized ? 'w-20' : 'w-64'}
        `}
      >
        <div className="flex items-center justify-between p-6 border-b border-purple-100">
          {/* Logo / Title - hide when minimized on desktop */}
          <h1 className={`text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent transition-opacity duration-300 ${sidebarMinimized ? 'lg:hidden' : ''}`}>
            Admin Panel
          </h1>
          {/* Minimize button (desktop only) */}
          <button
            onClick={toggleMinimize}
            className="hidden lg:block text-gray-600 hover:text-purple-600"
          >
            {sidebarMinimized ? <FaChevronRight size={20} /> : <FaChevronLeft size={20} />}
          </button>
          {/* Close button (mobile only) */}
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-600 hover:text-purple-600">
            <FaTimes size={24} />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          <MenuItem
            icon={<FaBoxOpen />}
            label="Products"
            active={currentPage === 'products'}
            minimized={sidebarMinimized}
            onClick={() => { setCurrentPage('products'); setSidebarOpen(false); }}
          />
          <MenuItem
            icon={<FaShoppingCart />}
            label="Orders"
            active={currentPage === 'orders'}
            minimized={sidebarMinimized}
            onClick={() => { setCurrentPage('orders'); setSidebarOpen(false); }}
          />
          <MenuItem
            icon={<FaUsers />}
            label="Customers"
            active={currentPage === 'customers'}
            minimized={sidebarMinimized}
            onClick={() => { setCurrentPage('customers'); setSidebarOpen(false); }}
          />
          <MenuItem
            icon={<FaCog />}
            label="Settings"
            active={currentPage === 'settings'}
            minimized={sidebarMinimized}
            onClick={() => { setCurrentPage('settings'); setSidebarOpen(false); }}
          />
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white p-4 rounded-xl flex items-center justify-center space-x-2 cursor-pointer hover:opacity-80 transition-all">
            {/* Hide text when minimized on desktop */}
            <p className={`text-sm font-medium transition-opacity duration-300 ${sidebarMinimized ? 'lg:hidden' : ''}`}>
              Logout
            </p>
            <BiLogOut size={20} />
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content */}
      <main className="flex-1 p-4 lg:p-8">
        {/* Mobile header */}
        <div className="flex items-center justify-between lg:hidden mb-6">
          <button onClick={() => setSidebarOpen(true)} className="text-gray-600 hover:text-purple-600">
            <FaBars size={24} />
          </button>
          <h2 className="text-xl font-bold text-gray-800 capitalize">{currentPage}</h2>
          <div className="w-6" />
        </div>

        {renderPage()}
      </main>
    </div>
  );
}

function MenuItem({ icon, label, active, minimized, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
        ${active
          ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg'
          : 'text-gray-600 hover:bg-purple-50 hover:text-purple-600'
        }
      `}
    >
      <span className="text-xl ">{icon}</span>
      {/* Label visibility based on minimized state */}
      <span className={`font-medium transition-opacity duration-300 ${minimized ? 'lg:hidden' : ''}`}>
        {label}
      </span>
    </button>
  );
}

export default Dashboard;
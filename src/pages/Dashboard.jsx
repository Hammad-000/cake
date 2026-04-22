import { useState ,useEffect } from 'react';
import { 
  FaBoxOpen, FaShoppingCart, FaUsers, FaCog, FaPlus, FaEdit, FaTrash, FaBars,
  FaTimes, FaCloudUploadAlt, FaChevronLeft, FaChevronRight
} from 'react-icons/fa';
import { BiLogOut } from "react-icons/bi";





const initialCustomers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', orders: 5, spent: 249.95 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', orders: 3, spent: 124.50 },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', orders: 8, spent: 399.20 },
];



function ProductsPage({ products, setProducts }) {
  const [formData, setFormData] = useState({ 
    name: '', price: '', description: '', category: '', image: null 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('all');

  const categoryOptions = [
    'Chocolate cake',
    'Ice Cake',
    'Hazelnut Cake',
    'Vanilla Cake',
    'Oreo Cake'
  ];

  const categories = ['all', ...new Set(products.map(p => p.category).filter(Boolean))];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setFormData(prev => ({ ...prev, image: e.target.files[0] }));
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`https://cakes-backend-gamma.vercel.app/api/products/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      
      if (!response.ok) throw new Error('Delete failed');
      
      setProducts(products.filter(p => (p._id || p.id) !== id));
      alert('Product deleted successfully');
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete product');
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.title || product.name,
      price: product.price,
      description: product.description,
      category: product.category,
      image: null,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingProduct) return;
    
    setIsSubmitting(true);
    const token = localStorage.getItem("authToken");
    
    try {
      let imageUrl = editingProduct.image;
      
      if (formData.image) {
        const imageFormData = new FormData();
        imageFormData.append("image", formData.image);
        
        const uploadRes = await fetch("https://cakes-backend-gamma.vercel.app/api/upload", {
          method: "POST",
          headers: { "Authorization": `Bearer ${token}` },
          body: imageFormData,
        });
        
        if (!uploadRes.ok) throw new Error("Image upload failed");
        const uploadData = await uploadRes.json();
        imageUrl = uploadData.file.cloudinaryUrl;
      }
      
      const productData = {
        name: formData.name,
        price: parseFloat(formData.price),
        description: formData.description,
        category: formData.category,
        imageUrl: imageUrl,
        isAvailable: true,
      };
      
      const updateRes = await fetch(`https://cakes-backend-gamma.vercel.app/api/products/${editingProduct._id || editingProduct.id}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });
      
      if (!updateRes.ok) throw new Error("Update failed");
      
      const updatedProductData = await updateRes.json();
      const updatedProduct = updatedProductData.product;
      
      setProducts(products.map(p => 
        (p._id || p.id) === (editingProduct._id || editingProduct.id)
          ? { ...updatedProduct, title: updatedProduct.title || updatedProduct.name }
          : p
      ));
      
      alert("Product updated successfully!");
      resetForm();
    } catch (error) {
      console.error("Update error:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image) {
      alert('Please select an image');
      return;
    }
    setIsSubmitting(true);
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("No auth token found. Please log in.");
      setIsSubmitting(false);
      return;
    }
    try {
      const imageFormData = new FormData();
      imageFormData.append("image", formData.image);
      const uploadRes = await fetch("https://cakes-backend-gamma.vercel.app/api/upload", {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
        body: imageFormData,
      });
      if (!uploadRes.ok) throw new Error("Image upload failed");
      const uploadData = await uploadRes.json();
      const imageUrl = uploadData.file.cloudinaryUrl;
      
      const productData = {
        name: formData.name,
        price: parseFloat(formData.price),
        description: formData.description,
        category: formData.category,
        imageUrl: imageUrl,
        isAvailable: true,
      };
      
      const productRes = await fetch("https://cakes-backend-gamma.vercel.app/api/products", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });
      if (!productRes.ok) throw new Error("Failed to add product");
      
      const savedProduct = await productRes.json();
      setProducts([...products, savedProduct.product]);
      alert("Product added successfully!");
      resetForm();
      e.target.reset();
    } catch (error) {
      console.error("Error adding product:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: "", price: "", description: "", category: "", image: null });
    setEditingProduct(null);
  };

  const cancelEdit = () => resetForm();

  // Filter products based on selected category
  const filteredProducts = categoryFilter === 'all'
    ? products
    : products.filter(p => p.category === categoryFilter);

  return (
    <div className="space-y-8">
      {/* Add/Edit Product Form */}
      <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-3 border-b-2 border-purple-100">
          {editingProduct ? "Edit Product" : "Add New Product"}
        </h2>
        <form onSubmit={editingProduct ? handleUpdate : handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300"
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
                className="w-full px-4 py-3 rounded-xl border border-gray-300"
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
              className="w-full px-4 py-3 rounded-xl border border-gray-300"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl border cursor-pointer  border-gray-300 bg-white"
              required
            >
              <option  value="" disabled   >Select a category</option>
              {categoryOptions.map(cat => (
                <option   key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
            <div className="border-2 border-dashed border-purple-200 rounded-xl p-6 text-center">
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="image-upload" />
              <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center gap-2">
                <FaCloudUploadAlt className="text-4xl text-purple-400" />
                <span className="text-gray-600">Click to upload {editingProduct && "(leave empty to keep current)"}</span>
              </label>
              {formData.image && <p className="mt-2 text-sm text-purple-600">Selected: {formData.image.name}</p>}
            </div>
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-600 disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : (editingProduct ? 'Update Product' : 'Add Product')}
            </button>
            {editingProduct && (
              <button
                type="button"
                onClick={cancelEdit}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
      
      {/* Product List with Category Filter */}
      <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-3 border-b-2 border-purple-100">
          <h2 className="text-2xl font-bold text-gray-800">Current Products</h2>
          
          {/* Category Filter Dropdown */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Filter by category:</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2  rounded-lg border border-gray-300 bg-white text-gray-800 focus:ring-purple-500 focus:border-purple-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="space-y-4">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No products found in this category.</div>
          ) : (
            filteredProducts.map(product => {
              const productId = product._id || product.id;
              const displayName = product.title || product.name;
              return (
                <div key={productId} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl gap-4">
                  {product.image && (
                    <img src={product.image} alt={displayName} className="w-20 h-20 object-cover rounded-xl" />
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{displayName}</h3>
                    <p className="text-sm text-gray-600">
                      Rs {typeof product.price === 'number' ? product.price.toFixed(2) : product.price} 
                      {product.category && ` - ${product.category}`}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEditClick(product)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(productId)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                      <FaTrash />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

function OrdersPage({ orders, loading, error }) {
  if (loading) return <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8">Loading orders...</div>;
  if (error) return <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 text-red-600">Error: {error}</div>;

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
            {orders.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-8 text-gray-500">No orders found.</td>
              </tr>
            ) : (
              orders.map(order => {
              
                const orderId = order._id || order.id;
                const customerName = order.customerName || order.customer?.fullName || order.customer?.name || 'N/A';
                const orderDate = order.createdAt ? new Date(order.createdAt).toLocaleDateString() : order.date;
                const totalAmount = order.totalAmount || order.total;
                const orderStatus = order.orderStatus || order.status;

                return (
                  <tr key={orderId} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-800">{orderId}</td>
                    <td className="px-4 py-3 text-gray-800">{customerName}</td>
                    <td className="px-4 py-3 text-gray-600">{orderDate}</td>
                    <td className="px-4 py-3 text-gray-800">Rs {Number(totalAmount).toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        orderStatus === 'Delivered' ? 'bg-green-100 text-green-800' :
                        orderStatus === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {orderStatus || 'Pending'}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
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
                <td className="px-4 py-3 text-gray-800">Rs {customer.spent.toFixed(2)}</td>
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
  const [sidebarState, setSidebarState] = useState({ open: false, minimized: false });
  const [currentPage, setCurrentPage] = useState('products');
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [productError, setProductError] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [ordersError, setOrdersError] = useState(null);
  const [customers] = useState(initialCustomers); 

  // Fetch products (public)
  const fetchProducts = async () => {
    setLoadingProducts(true);
    try {
      const response = await fetch('https://cakes-backend-gamma.vercel.app/api/products');
      const data = await response.json();
      if (data && Array.isArray(data.products)) {
        setProducts(data.products);
      } else {
        setProductError('Invalid response format.');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setProductError('Failed to fetch products.');
    } finally {
      setLoadingProducts(false);
    }
  };

  // Fetch orders (requires auth)
  const fetchOrders = async () => {
    setLoadingOrders(true);
    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("No auth token found. Please log in.");
      const response = await fetch("https://cakes-backend-gamma.vercel.app/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to fetch orders");
      const data = await response.json();
      // Adjust based on your API response structure
      setOrders(data.orders || data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrdersError(error.message);
    } finally {
      setLoadingOrders(false);
    }
  };

  // Fetch both on mount
  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  const renderPage = () => {
    if (currentPage === 'products') {
      if (loadingProducts) return <div>Loading products...</div>;
      if (productError) return <div>{productError}</div>;
      return <ProductsPage products={products} setProducts={setProducts} />;
    }
    switch (currentPage) {
      case 'orders':
        return <OrdersPage orders={orders} loading={loadingOrders} error={ordersError} />;
      case 'customers':
        return <CustomersPage customers={customers} />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <ProductsPage products={products} setProducts={setProducts} />;
    }
  };

  const toggleSidebarState = (type) => {
    setSidebarState(prevState => ({
      ...prevState,
      [type]: !prevState[type],
    }));
  };

  const toggleMinimize = () => toggleSidebarState('minimized');
  const toggleSidebar = () => toggleSidebarState('open');
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 bg-white/90 backdrop-blur-sm shadow-2xl
        transform transition-all duration-300 ease-in-out lg:static lg:translate-x-0
        ${sidebarState.open ? 'translate-x-0' : '-translate-x-full'} 
        ${sidebarState.minimized ? 'w-20' : 'w-64'}`}>
        
        <div className="flex items-center justify-between p-6 border-b border-purple-100">
          <h1 className={`text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent transition-opacity duration-300 ${sidebarState.minimized ? 'lg:hidden' : ''}`}>
            Admin Panel
          </h1>
          
          <button onClick={toggleMinimize} className="hidden lg:block text-gray-600 hover:text-purple-600 cursor-pointer">
            {sidebarState.minimized ? <FaChevronRight size={20} /> : <FaChevronLeft size={20} />}
          </button>
          
          <button onClick={toggleSidebar} className="lg:hidden text-gray-600 hover:text-purple-600">
            <FaTimes size={24} />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          <MenuItem icon={<FaBoxOpen />} label="Products" active={currentPage === 'products'} minimized={sidebarState.minimized} onClick={() => { setCurrentPage('products'); toggleSidebar(); }} />
          <MenuItem icon={<FaShoppingCart />} label="Orders" active={currentPage === 'orders'} minimized={sidebarState.minimized} onClick={() => { setCurrentPage('orders'); toggleSidebar(); }} />
          <MenuItem icon={<FaUsers />} label="Customers" active={currentPage === 'customers'} minimized={sidebarState.minimized} onClick={() => { setCurrentPage('customers'); toggleSidebar(); }} />
          <MenuItem icon={<FaCog />} label="Settings" active={currentPage === 'settings'} minimized={sidebarState.minimized} onClick={() => { setCurrentPage('settings'); toggleSidebar(); }} />
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white p-4 rounded-xl flex items-center justify-center space-x-2 cursor-pointer hover:opacity-80 transition-all">
            <p className={`text-sm font-medium transition-opacity duration-300 ${sidebarState.minimized ? 'lg:hidden' : ''}`}>Logout</p>
            <BiLogOut size={20} />
          </div>
        </div>
      </aside>

      {sidebarState.open && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={toggleSidebar} />}

      <main className="flex-1 p-4 lg:p-8">
        <div className="flex items-center justify-between lg:hidden mb-6">
          <button onClick={toggleSidebar} className="text-gray-600 hover:text-purple-600">
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
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 
        ${active ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg cursor-pointer' 
        : 'text-gray-600 hover:bg-purple-50 hover:text-purple-600 cursor-pointer'}`}
    >
      <span className="text-xl">{icon}</span>
      {!minimized && (
        <span className="font-medium transition-opacity duration-300">
          {label}
        </span>
      )}
    </button>
  );
}

export default Dashboard;
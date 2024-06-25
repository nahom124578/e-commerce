import React, { useState } from 'react';
import axios from 'axios'

const VendorHomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProductIndex, setCurrentProductIndex] = useState(null);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', stock: '', category: '', id: '', image: null });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };
  
  const handleImageChange = (e) => {
    setNewProduct({ ...newProduct, image: e.target.files[0] });
  };

  const handleAddProduct = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', newProduct.name);
    formData.append('price', newProduct.price);
    formData.append('stock', newProduct.stock);
    formData.append('category', newProduct.category);
    formData.append('image', newProduct.image);

    if (isEditing) {
      const updatedProducts = products.map((product, index) =>
        index === currentProductIndex ? newProduct : product
      );
      setProducts(updatedProducts);
      setIsEditing(false);
      setCurrentProductIndex(null);
    } else {
      axios.post("http://localhost:3001/api/product", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((res) => {
        console.log(res);
        console.log(res.data.insertId);
        const productWithId = { ...newProduct, id: res.data.insertId };
        setProducts([...products, productWithId]);
      })
      .catch(err => console.log(err));
    }
    setNewProduct({ name: '', price: '', stock: '', id: '', category: '', image: null });
    setShowModal(false);
  };

  const handleEditProduct = (index) => {
    setNewProduct(products[index]);
    setCurrentProductIndex(index);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDeleteProduct = (index) => {
    const id = products[index].id;
  
    axios.delete(`http://localhost:3001/api/deleteProduct/${id}`)
      .then((res) => {
        console.log(res);
        // Update the state only after the API call succeeds
        setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
      })
      .catch((err) => {
        console.error(err);
      });
      setProducts(products.filter((_, i) => i !== index));
  };
  
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Add/Edit Product Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">{isEditing ? 'Edit Product' : 'Add New Product'}</h3>
            <div className="mb-4">
              <label className="block text-gray-700">Product Name</label>
              <input
                type="text"
                name="name"
                value={newProduct.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Price</label>
              <input
                type="text"
                name="price"
                value={newProduct.price}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Stock</label>
              <input
                type="text"
                name="stock"
                value={newProduct.stock}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Category</label>
              <select
                name="category"
                value={newProduct.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="">Select Category</option>
                <option value="Dress">Dress</option>
                <option value="Shoes">Shoes</option>
              </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Image</label>
                <input
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />
            </div>
            <button
              onClick={handleAddProduct}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
            >
              {isEditing ? 'Save Changes' : 'Add Product'}
            </button>
            <button
              onClick={() => {
                setShowModal(false);
                setIsEditing(false);
              }}
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <section id="dashboard" className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white shadow p-4 rounded-lg">
            <h3 className="text-xl font-semibold">Total Sales</h3>
            <p className="text-gray-600">$12,345</p>
          </div>
          <div className="bg-white shadow p-4 rounded-lg">
            <h3 className="text-xl font-semibold">Products</h3>
            <p className="text-gray-600">50</p>
          </div>
          <div className="bg-white shadow p-4 rounded-lg">
            <h3 className="text-xl font-semibold">Pending Orders</h3>
            <p className="text-gray-600">5</p>
          </div>
        </div>
      </section>

      <section id="products" className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Product Management</h2>
        <div className="bg-white shadow p-4 rounded-lg">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4"
            onClick={() => setShowModal(true)}
          >
            Add New Product
          </button>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2">Product ID</th>
                <th className="py-2">Product Name</th>
                <th className="py-2">Price</th>
                <th className="py-2">Stock</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {products.map((product, index) => (
                <tr key={index}>
                  <td className="py-2">{product.id}</td>
                  <td className="py-2">{product.name}</td>
                  <td className="py-2">{product.price}</td>
                  <td className="py-2">{product.stock}</td>
                  <td className="py-2">
                    <button
                      onClick={() => handleEditProduct(index)}
                      className="bg-green-500 text-white px-2 py-1 rounded-lg mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(index)}
                      className="bg-red-500 text-white px-2 py-1 rounded-lg"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="orders" className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Order Management</h2>
        <div className="bg-white shadow p-4 rounded-lg">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2">Order ID</th>
                <th className="py-2">Customer</th>
                <th className="py-2">Total</th>
                <th className="py-2">Status</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="text-center">
              <tr>
                <td className="py-2">12345</td>
                <td className="py-2">John Doe</td>
                <td className="py-2">$150</td>
                <td className="py-2">Pending</td>
                <td className="py-2">
                  <button className="bg-green-500 text-white px-2 py-1 rounded-lg mr-2">View</button>
                  <button className="bg-blue-500 text-white px-2 py-1 rounded-lg">Update</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="profile" className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Profile Settings</h2>
        <div className="bg-white shadow p-4 rounded-lg">
          <form>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Vendor Name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Vendor Email"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="New Password"
              />
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Save Changes</button>
          </form>
        </div>
      </section>
      </div>
  );
};

export default VendorHomePage;

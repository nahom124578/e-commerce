import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import { useCart } from '../component/CartContext';

const BuyingPage = () => {
  const { cartItems, updateCartItemQuantity, totalAmount } = useCart();
  const [form, setForm] = useState({
    email: '',
    firstName: '',
    lastName: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleRemoveFromCart = (itemId) => {
    const item = cartItems[itemId];
    if (item.quantity > 1) {
      updateCartItemQuantity(itemId, item.quantity - 1);
    } else {
      updateCartItemQuantity(itemId, 0); // This would remove the item
    }
  };

  const handleBuyNow = async () => {
    const carts = Object.values(cartItems);
    let amount = 0;

    // Calculate the total amount
    carts.forEach(item => {
      amount += item.price * item.quantity;
    });

    try {
      const response = await axios.post('http://localhost:3001/buy', {
        order: {
          status: 'processing',
          totalAmount: amount,
          shippingMethodID: 2
        },
        orderItem: carts.map(item => ({
          productID: item.id,
          price: item.price,
          quantity: item.quantity
        }))
      });

      if (response.status === 200) {
        console.log('Order placed successfully:', response.data);
        navigate('/ordertrackingpage');
      } else {
        console.error('Error placing order:', response.data.message);
        navigate('/ordertrackingpage');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 border rounded-lg shadow-md bg-gray-200">
          <h2 className="text-2xl font-bold mb-4">Personal Information</h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
                placeholder='aklilu@gmail.com'
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">First Name</label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
                placeholder='Aklilu'
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
                placeholder='Beyero'
              />
            </div>
          </form>
        </div>
        <div className="p-4 border rounded-lg shadow-md bg-gray-200">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          <div className="flex justify-between mb-2 font-semibold">
            <span className="text-black w-1/3">Product Name</span>
            <span className="text-black w-1/3 text-center">Quantity</span>
            <span className="text-black w-1/3 text-center">Total Price</span>
            <span className="text-black w-1/6 text-right">Remove</span>
          </div>
          <ul>
            {Object.values(cartItems).map((item) => (
              <li key={item.id} className="flex justify-between items-center mb-2">
                <div className="text-black w-1/3">{item.productName}</div>
                <div className="text-black w-1/3 text-center">{item.quantity}</div>
                <div className="text-black w-1/3 text-center">Birr {(item.price * item.quantity).toFixed(2)}</div>
                <button onClick={() => handleRemoveFromCart(item.id)} className="text-red-500 hover:text-red-700 w-1/6 text-right">
                  &#10005;
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <p className="text-xl font-bold text-black">Total: Birr {totalAmount().toFixed(2)}</p>
          </div>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 mb-2">Payment Method</label>
          <select className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
            <option>Credit Card</option>
            <option>PayPal</option>
            <option>Bank Transfer</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Shipping Method</label>
          <select className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
            <option>Standard Shipping</option>
            <option>Express Shipping</option>
            <option>Overnight Shipping</option>
          </select>
        </div>
      </div>
      <div className="mt-8 text-center">
        <button onClick={handleBuyNow} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <Link to="/ordertrackingpage">Buy Now</Link>
        </button>
      </div>
    </div>
  );
};

export default BuyingPage;

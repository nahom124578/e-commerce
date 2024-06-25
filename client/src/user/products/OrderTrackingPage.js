import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'tailwindcss/tailwind.css';


const OrderTrackingPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [orderStatus, setOrderStatus] = useState('Processing');
  const location = useLocation();

  const fetchOrderItems = async () => {
    const id = 32; // Change this ID to a dynamic value as needed
    try {
      const response = await axios.get(`http://localhost:3001/orders/${id}`);
      if (response.status === 200) {
        const order = response.data;
        if (order && order.items) {
          setCartItems(order.items);
        }
      } else {
        console.error('Error fetching order:', response.statusText);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchOrderItems();
    };
    fetchData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOrderStatus('Shipped');
    }, 10000); // Change order status to 'Shipped' after 10 seconds

    return () => clearTimeout(timer); // Clean up timer on unmount
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="p-4 border rounded-lg shadow-md bg-gray-200">
        <h2 className="text-2xl font-bold mb-4">Order Tracking</h2>
        <p className="text-xl">Order Status: {orderStatus}</p>
        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              <p>Product Name: Your Products {item.productName}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Total Price: Birr {(item.price * item.quantity).toFixed(2)}</p>
            </li>
          ))}
        </ul>
      </div>
      <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"   
          >
           <Link to="/PaymentDetails">Pay Bill</Link> 
          </button>
    </div>
  );
};

export default OrderTrackingPage;

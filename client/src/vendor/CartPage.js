import React from 'react';
import { useCart } from '../component/CartContext';

const CartPage = () => {
  const { cartItems, removeFromCart, totalAmount } = useCart();

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6">Your Cart</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        {Object.keys(cartItems).length > 0 ? (
          <>
            <div className="grid grid-cols-6 gap-4 font-semibold text-gray-700 border-b pb-2 mb-4">
              <span className="col-span-1">Image</span>
              <span className="col-span-2">Product Name</span>
              <span className="col-span-1 text-center">Quantity</span>
              <span className="col-span-1 text-right">Price</span>
              <span className="col-span-1 text-right">Remove</span>
            </div>
            <ul>
              {Object.values(cartItems).map((item) => (
                <li key={item.id} className="grid grid-cols-6 gap-4 items-center mb-4">
                  <div className="col-span-1">
                    <img className="w-20 h-20 object-contain" src={item.productImage} alt={item.productName} />
                  </div>
                  <div className="col-span-2">{item.productName}</div>
                  <div className="col-span-1 text-center">{item.quantity}</div>
                  <div className="col-span-1 text-right">Birr {(item.price * item.quantity).toFixed(2)}</div>
                  <div className="col-span-1 text-right">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      &#10005;
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 border-t pt-4 font-semibold text-gray-700">
              <div className="flex justify-between">
                <span>Total Amount</span>
                <span>Birr {totalAmount().toFixed(2)}</span>
              </div>
            </div>
          </>
        ) : (
          <p className="text-gray-700">Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default CartPage;

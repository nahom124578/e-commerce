import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});

  const addToCart = (product) => {
    setCartItems((prevCartItems) => {
      const newCartItems = { ...prevCartItems };
      if (newCartItems[product.id]) {
        newCartItems[product.id].quantity += 1;
      } else {
        newCartItems[product.id] = { ...product, quantity: 1 };
      }
      return newCartItems;
    });
  };

  const subFromCart = (itemId) => {
    setCartItems((prevCartItems) => {
      const newCartItems = { ...prevCartItems };
      if (newCartItems[itemId] && newCartItems[itemId].quantity > 0) {
        newCartItems[itemId].quantity -= 1;
        if (newCartItems[itemId].quantity === 0) {
          delete newCartItems[itemId];
        }
      }
      return newCartItems;
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevCartItems) => {
      const newCartItems = { ...prevCartItems };
      delete newCartItems[itemId];
      return newCartItems;
    });
  };

  const updateCartItemQuantity = (itemId, quantity) => {
    setCartItems((prevCartItems) => {
      const newCartItems = { ...prevCartItems };
      if (quantity > 0) {
        newCartItems[itemId].quantity = quantity;
      } else {
        delete newCartItems[itemId];
      }
      return newCartItems;
    });
  };

  const totalAmount = () => {
    return Object.values(cartItems).reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, subFromCart, removeFromCart, updateCartItemQuantity, totalAmount }}>
      {children}
    </CartContext.Provider>
  );
};

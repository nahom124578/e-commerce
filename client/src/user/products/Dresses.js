import React from 'react';
import { useState, useEffect } from 'react';
import { Link} from 'react-router-dom';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
import { useCart } from '../../component/CartContext';

function Dress() {
  const { addToCart, cartItems, subFromCart, removeFromCart, totalAmount } = useCart();


  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/productsDress')
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch(err => console.log(err));
  }, []);


  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const handleBuyNow = (product) => {
    addToCart(product);
    navigate('/buy');
  };

  return (
    <div className="text-grey-300 flex flex-wrap justify-center items-center gap-20 p-10 pr-96">
      {products.map((productDress) => (
        
        <div key={productDress.productID}>
          <img className="w-80 h-80 object-cover" src = {`http://localhost:3001/images/${productDress.image}`} alt={productDress.productName} />
          <p>{productDress.productName}</p>
          <p>Birr {productDress.price}</p>
          <button onClick={() => handleAddToCart(productDress)} className="border-2 drop-shadow-2xl p-2 rounded hover:bg-gray-300">
            Add to Cart
          </button>
          <br />
          <Link to="/buy"><button  className="border-2 drop-shadow-2xl p-2 rounded hover:bg-gray-300">
            Buy
          </button></Link>
        </div>
      ))}

      <div className="fixed p-4 right-0 top-0 bg-blue-100 h-screen w-80 overflow-y-scroll">
        <h1 className="text-white font-bold text-2xl">Your Cart</h1>
        <p className="text-3xl font-bold">Total: Birr {totalAmount()}</p>
        {Object.values(cartItems).map((item) => {
          const productDress = products.find((product) => product.productID === item.id);
          if (productDress) {
            return (
              <div key={item.id} className="mb-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <img className="w-20 h-20 my-4" src={productDress.productImage} alt={productDress.productName} />
                    <span className="text-2xl font-bold pl-2">X {item.stock}</span>
                  </div>
                  <div className="flex flex-col gap-2 font-bold">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-black-500 bg-gray-200 hover:bg-blue-500 hover:text-white p-2 rounded"
                    >
                      Remove
                    </button>
                    <button
                      onClick={() => addToCart(productDress)}
                      className="text-black-500 text-2xl hover:text-green-800"
                    >
                      +
                    </button>
                    <button
                      onClick={() => subFromCart(item.id)}
                      className="text-black-500 text-2xl hover:text-green-800"
                    >
                      -
                    </button>
                  </div>
                </div>
                <div className="flex items-center space-x-4 italic">
                  <p>{productDress.productName}</p>
                  <p>-</p>
                  <p>Birr {productDress.price}</p>
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}

export default Dress;

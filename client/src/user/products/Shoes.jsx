import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../component/CartContext';
import axios from 'axios'
import { useState, useEffect} from 'react';

function Shoes() {
  const { addToCart, cartItems, subFromCart, removeFromCart, totalAmount } = useCart();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/productsShoes')
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="text-grey-300 flex flex-wrap justify-center items-center gap-20 p-10 pr-96">
      {products.map((productShoes) => (
        <div key={productShoes.productID}>
          <img className='w-80 h-80 object-contain' src={`http://localhost:3001/images/${productShoes.image}`} alt={productShoes.productName} />
          <p>{productShoes.productName}</p>
          <p>Birr {productShoes.price}</p>
          <button onClick={() => addToCart(productShoes)} className='border-2 drop-shadow-2xl p-2 rounded hover:bg-gray-300'>Add to Cart</button>
          <br />
          <Link to="/buy">
            <button className='border-2 drop-shadow-2xl p-2 rounded hover:bg-gray-300'>Buy</button>
          </Link>
        </div>
      ))}

      <div className='fixed p-4 right-0 top-0 bg-blue-100 h-screen w-80 overflow-y-scroll'>
        <h1 className='text-white font-bold text-2xl'>Your Cart</h1>
        <p className='text-3xl font-bold'>Total: Birr {totalAmount()}</p>
        {Object.values(cartItems).map((item) => (
          <div key={item.id}>
            <div className='flex justify-between items-center'>
              <div className='flex items-center'>
                <img className='w-20 h-20 my-4' src={item.productImage} alt={item.productName} />
                X <p className='text-2xl font-bold pl-2'>{item.quantity}</p>
              </div>
              <div className='flex flex-col gap-2 font-bold'>
                <button onClick={() => removeFromCart(item.id)} className='text-black-500 bg-gray-200 hover:bg-blue-500 hover:text-white p-2 rounded'>Remove</button>
                <button onClick={() => addToCart(item)} className='text-black-500 text-2xl hover:text-green-800'>+</button>
                <button onClick={() => subFromCart(item.id)} className='text-black-500 text-2xl hover:text-green-800'>-</button>
              </div>
            </div>
            <div className='flex items-center space-x-4 italic'>
              <p>{item.productName}</p>
              <p>-</p>
              <p>Birr {item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shoes;

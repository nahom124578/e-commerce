import React, { useState, useEffect } from 'react';
import cloth1 from "../../images/main_products/cloth_1.webp";
import cloth2 from "../../images/main_products/shoes1.jpg";
import cloth3 from "../../images/main_products/main.jpg";

const images = [
  {
    id: 0,
    productName: "habesha",
    productImage: cloth1,
  },
  {
    id: 1,
    productName: "habesha",
    productImage: cloth2,
  },
  {
    id: 2,
    productName: "habesha",
    productImage: cloth3,
  }
];

const Imageslider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full  max-w-2xl mx-auto h-[70vh] overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
          style={{ backgroundImage: `url(${image.productImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <div className="absolute bottom-0 left-0 bg-gray-800 bg-opacity-50 text-white p-2">
            {image.productName}
          </div>
        </div>
      ))}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full cursor-pointer ${index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'}`}
            onClick={() => goToSlide(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Imageslider;

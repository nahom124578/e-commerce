import React from "react";
import { Link } from "react-router-dom";
import Footer from "../landingpage/Footer";
import Imageslider from "./ImageSlider";
import { MAIN_PRODUCTS, MAIN_PRODUCTS1 } from "./main_products";



const HomePage = () => {
  return (
    <div class="px-10 py-6 bg-gray-100">
  <div>
    <div class="flex justify-end h-6 w-15 ">
      <div class= "btn flex justify-around h-6 w-15 ">
        <Link to="/feedback" class="text-2xl">
          <button>Feed back</button>
        </Link>  
      </div>  
      <div class="btn flex justify-around h-6 w-15a  ">
        <Link to="/" class="text-2xl" >
          <button>Log out</button>
        </Link>
      </div>
    </div>
                
    <div>
    <h1 class=" flex justify-center font-bold text-6xl text-blue-700 mb-4">Smart Cloth and Shoes</h1>
    <Imageslider/>
    </div>
    <div class=" rounded overflow-hidden flex justify-center shadow-md m-4 w-fit hover:bg-gray-200 transition duration-300">
  <div class="w-1/2 p-6 text-center">
     <p class=" font-sans text-4xl text-gray-800">
      Discover the ultimate destination for smart clothing and shoes shopping. Explore our curated collection featuring the latest trends and timeless classics. From sleek sneakers to sophisticated attire, find your perfect style with ease. Shop now and elevate your wardrobe effortlessly.
    </p>
    <p class="font-sans text-3xl text-yellow-700">
      "Welcome to our premier platform for clothing and shoes shopping. Browse through our carefully curated selection, where every click leads you to style and comfort. Click on the shoes to step into a world of footwear fashion or choose clothes to explore our latest apparel offerings. Elevate your wardrobe effortlessly and start your style journey today."
    </p>

  </div>
        </div> 
  </div>

  <div class="mt-2 grid grid-cols-2 gap-0 ">
 
    <div class="col-span-1 text-grey-300 flex flex-wrap justify-center items-center gap-5 pl-20 pr-20" >
      <Link to= "/Shoes" class= "flex justify-center font-bold text-4xl text-blue-500 mb-6">
        shoes
        </Link>  
        {MAIN_PRODUCTS.map(main_products => (
               
          
            <Link to= "/Shoes" class=" rounded overflow-hidden shadow-md m-16 w-30 h-fit">  
              <img src ={main_products.productImage} alt = {main_products.productName} />
            </Link>
        
       ))}
      
      </div>
      <div class="col-span-1 text-grey-300 flex flex-wrap justify-center items-center gap-5 pl-20 pr-20" >
    
    <Link to= "/Dresses" class= "flex justify-center font-bold text-4xl text-blue-500 mb-4">
                cloths
     </Link>
      {MAIN_PRODUCTS1.map(main_products => (
                 
   
        <Link to= "/Dresses" class=" rounded overflow-hidden shadow-md m-5 w-30 h-fit mb-4">
          <img src ={main_products.productImage1} alt = {main_products.productName1} />
        </Link>
      
         ))}
        
          </div>
 
      </div>
      <Footer />
      </div>
  )

}


export default HomePage;

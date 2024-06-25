import kemis from "../../images/main_products/kemis1.jpg"
import Shoes1 from "../../images/main_products/shoes1.jpg"
import cloth1 from "../../images/main_products/cloth_1.webp"
import cloth3 from "../../images/main_products/cloth_3.jpg"
import OnlineMarket from "./Images/OnlineMarket.jpg"
import Customer from "./Images/Customer.png"
import Delivery from "./Images/Delivery.png"
import sheild from "./Images/Secure.png"
import Footer from "./Footer"
import Typewriter from "./TypeWriter"
export default function Landing() {

    return (
        <div className = "text-center flex flex-col m-4 align-middle justify-center">

            <h1 className="sm:text-4xl md:text-5xl text-3xl font-bold m-4">Online Market</h1>
            <h2 className = "sm:text-2xl md:text-3.5xl font-bold m-4"><Typewriter text="Where Quality Meets Excellence" delay={100} infinite={false}/></h2>
            <div className = "max-w-[100%] h-[28rem] m-auto">
                <img src = {OnlineMarket} className = "rounded-2xl w-full h-full"></img>
            </div>
            <div className = "flex gap-x-6 gap-y-6 m-auto flex-wrap justify-center mt-8 max-w-[80%]">
                <div className = "w-[300px] p-4 border-r border-l transition-transform duration-300 ease-out transform hover:scale-[1.05]">
                    Upgrade your home entertainment setup or snag a powerful new laptop at incredible prices. 
                    Our electronics sale features up to 50% off on a wide selection of TVs, laptops, tablets, 
                    and more. Whether you're a gamer, a movie buff, or a productivity powerhouse, we have 
                    something for everyone. Don't miss out on these limited-time deals – shop now and 
                    start saving!
                </div>
                <div className = "w-[300px] p-4 border-r transition-transform duration-300 ease-out transform hover:scale-[1.05]">
                    Upgrade your home entertainment setup or snag a powerful new laptop at incredible prices. 
                    Our electronics sale features up to 50% off on a wide selection of TVs, laptops, tablets, 
                    and more. Whether you're a gamer, a movie buff, or a productivity powerhouse, we have 
                    something for everyone. Don't miss out on these limited-time deals – shop now and 
                    start saving!
                </div>
                <div className = "w-[300px] p-4 border-r transition-transform duration-300 ease-out transform hover:scale-[1.05]">
                    Upgrade your home entertainment setup or snag a powerful new laptop at incredible prices. 
                    Our electronics sale features up to 50% off on a wide selection of TVs, laptops, tablets, 
                    and more. Whether you're a gamer, a movie buff, or a productivity powerhouse, we have 
                    something for everyone. Don't miss out on these limited-time deals – shop now and 
                    start saving!
                </div>
            </div>
            <div className="w-[75%] mx-auto">
                <h2 className="sm:text-2xl md:text-3.5xl font-bold m-4">What's New?</h2>
                <div className="flex justify-center">
                    <img className = "w-[33%] h-auto" src = {kemis}></img>
                    <div className="flex-col justify-center">
                        <div className="flex justify-center">
                            <img className="pl-5 w-[50%]" src = {Shoes1}></img>
                            <img  className="pl-5 w-[50%]" src = {cloth1}></img>
                        </div>
                        <img  className="pl-5 mt-5 w-[100%] bottom-0" src = {cloth3}></img>
                    </div>
                </div>
            </div>
            <div className = "flex justify-center text-center mt-[30px]">
                <div  className = "text-center w-[33%]">
                    <img src = {Delivery} className="m-auto bg-black rounded-full transition-transform duration-300 ease-out transform hover:scale-[1.1]"></img>
                    <h5 className = "font-bold">Fast Delivery</h5>
                    <p>caring for your product as our own's</p>
                </div>
                <div  className = "text-center w-[33%]">
                    <img src = {Customer} className="m-auto bg-black rounded-full transition-transform duration-300 ease-out transform hover:scale-[1.1]"></img>
                    <h5 className = "font-bold">24/7 customer service</h5>
                    <p>Friendly 24/7 customer support</p>
                    </div>
                <div  className = "text-center w-[33%]">
                    <img src = {sheild} className="m-auto bg-black rounded-full transition-transform duration-300 ease-out transform hover:scale-[1.1]"></img>
                    <h5 className = "font-bold">Money Back Guarantee</h5>
                    <p>30 days return policy</p>
                </div>
            </div>
            <Footer />
            
        </div>
    )
}
import { NavLink } from "react-router-dom"
import Vector from "./Images/Vector.png"
export default function Footer() {
    return (
    <footer className = "mt-[40px] p-[10px] bg-black text-white w-[100%] h-auto flex jflex-wrap justify-between rounded-2xl">
        <div className="max-w-[25%]">
            <h5 className = "font-bold">Email us</h5>
            <p className="m-[20px]">Get 10% off your first order</p>
            <div className = "mx- flex active: border-2 relative items-center rounded-2xl mb-[20px]">
                <input type = "email" placeholder="Enter you email" className="bg-black mb-[10px] relative focus:outline-none px-4"></input>
                <img src = {Vector} className="w-4 h-4 absolute right-2"></img>
            </div>
        </div>
        <div className="max-w-[25%]">
            <h5 className = "font-bold">Support</h5>
            <p className="mt-[20px]">Addis Ababa Institute of Technology,</p>
            <p className="mb-[20px]">Addis Ababa, Ethiopia</p>
            <a href = "#" className="mb-[20px]">AbdullahFardi@gmail.com</a>
            <p>+251909551265</p>
        </div>
        <div className="max-w-[25%]">
            <h5 className = "font-bold">Account</h5>
            <p  className = "mt-[10px] hover:text-green-400"><NavLink to = "#">My Account</NavLink></p>
            <p  className = "mt-[10px] hover:text-green-400"><NavLink to = "#">Login/Register</NavLink></p>
            <p  className = "mt-[10px] hover:text-green-400"><NavLink to = "#">Cart</NavLink></p>
            <p  className = "mt-[10px] hover:text-green-400"><NavLink to = "#">Wishlist</NavLink></p>
            <p  className = "m-[10px] hover:text-green-400"><NavLink to = "#">Shop</NavLink></p>
        </div>
        <div className="max-w-[25%] mr-[25px]">
            <h5 className = "font-bold">Quick Link</h5>
            <p  className = "mt-[10px] hover:text-green-400"><NavLink to = "#">Privacy Policy</NavLink></p>
            <p  className = "mt-[10px] hover:text-green-400"><NavLink to = "#">Terms of use</NavLink></p>
            <p  className = "mt-[10px] hover:text-green-400"><NavLink to = "#">FAQ</NavLink></p>
            <p  className = "mt-[10px] hover:text-green-400"><NavLink to = "#">Contact</NavLink></p>
        </div>
    </footer>)
}
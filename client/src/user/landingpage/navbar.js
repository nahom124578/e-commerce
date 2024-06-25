import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import wish from "./Images/Wishlist.png";
import cart from "./Images/Cart1.png";
import search from "./Images/Component 2.png";

export default function NavBar({ logout }) {
    const [nav, setNav] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    const handleClick = () => {
        setNav(!nav);
    };

    const handleHomeClick = () => {
        if (user) {
            if (user.role === 'User') {
                navigate('/home');
            } else if (user.role === 'Vendor') {
                navigate('/vendorHomePage');
            }
        } else {
            navigate('/');
        }
    };

    return (
        <div className="flex justify-between m-auto max-w-[1240px] h-20 items-center px-4 bg-slate-100">
            <ul className="hidden sm:flex">
                <li className="p-4">
                    <span onClick={handleHomeClick} className="cursor-pointer">
                        Home
                    </span>
                </li>
                <li className="p-4"><NavLink to="/Contact" activeClassName="border-b-2">Contact</NavLink></li>
                <li className="p-4"><NavLink to="/About" activeClassName="border-b-2">About</NavLink></li>
                {!token ? (
                    <>
                        <li className="p-4"><NavLink to="/Signup" activeClassName="active:border-b-2">Sign Up</NavLink></li>
                        <li className="p-4"><NavLink to="/Login" activeClassName="active:border-b-2">Log in</NavLink></li>
                    </>
                ) : (
                    <li className="p-4">
                        <button onClick={logout}>Logout</button>
                    </li>
                )}
            </ul>
            <div className="hidden sm:flex items-center">
                <div className="mx-4 flex active:border-2 relative">
                    <input type="text" placeholder="Looking for?" className="px-4 focus:outline-none" />
                    <img src={search} className="hover:cursor-pointer absolute right-2" alt="search" />
                </div>
                <img src={wish} className="px-2 hover:cursor-pointer" alt="wishlist" />
                <NavLink to="/cart"><img src={cart} className="px-2 hover:cursor-pointer" alt="cart" /></NavLink>
            </div>
            <div onClick={handleClick} className="block sm:hidden ml-[97%]">
                {nav ? <AiOutlineClose /> : <AiOutlineMenu />}
            </div>
            <div className={nav ? "block sm:hidden fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] text-white ease-in-out duration-500" : "block sm:hidden fixed left-[-100%]"}>
                <ul className="pt-24 uppercase">
                    <li className="p-4 border-b border-gray-200 mx-4">
                        <span onClick={handleHomeClick} className="cursor-pointer">
                            Home
                        </span>
                    </li>
                    <li className="p-4 border-b border-gray-200 mx-4"><NavLink to="/Contact" activeClassName="border-b-2">Contact</NavLink></li>
                    <li className="p-4 border-b border-gray-200 mx-4"><NavLink to="/About" activeClassName="border-b-2">About</NavLink></li>
                    {!token ? (
                        <>
                            <li className="p-4 border-b border-gray-200 mx-4"><NavLink to="/Signup" activeClassName="active:border-b-2">Sign Up</NavLink></li>
                            <li className="p-4 border-b border-gray-200 mx-4"><NavLink to="/Login" activeClassName="active:border-b-2">Log in</NavLink></li>
                        </>
                    ) : (
                        <li className="p-4 border-b border-gray-200 mx-4">
                            <button onClick={logout}>Logout</button>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}

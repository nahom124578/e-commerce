import React from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { CartProvider } from "./component/CartContext";
import PrivateRoute from './PrivateRoute';
import Admin from "./user/AdminPage/Admin";
import ContactDetails from "./user/AdminPage/Conta";
import FeedbackDetails from "./user/AdminPage/Feed";
import Contact from "./user/Contact/Contact";
import HomePage from "./user/homepage/HomePage";
import HomeLanding from "./user/landingpage/HomeLanding";
import NavBar from "./user/landingpage/navbar";
import Dresses from "./user/products/Dresses";
import OrderTrackingPage from "./user/products/OrderTrackingPage";
import Shoes from "./user/products/Shoes";
import Login from "./user/signup/login";
import Signup from "./user/signup/signup";
import VendorHomePage from "./user/vendorPage/VendorHomePage";
import BuyingPage from "./vendor/BuyingPage";
import CartPage from "./vendor/CartPage";
import Feedback from "./vendor/Feedback";
import PaymentPage from "./vendor/PaymentDetail";
import AboutPage from "./user/landingpage/about";

function App() {
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.replace('/Login'); // Redirect to login after logout
  };

  return (
    <CartProvider>
      <Router>
        <NavBar logout={logout} />
        <Routes>
          <Route path="/" element={<HomeLanding />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Shoes" element={<Shoes />} />
          <Route path="/Dresses" element={<Dresses />} />
          <Route path="/PaymentDetails" element={<PaymentPage />} />
          <Route path="/OrderTracking" element={<  OrderTrackingPage />} />
          <Route path="/About" element={ < AboutPage />} />
        

          <Route element={<PrivateRoute requiredRole="User" />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/cart" element={<CartPage />} />
          </Route>

          <Route element={<PrivateRoute requiredRole="Vendor" />}>
            <Route path="/vendorHomePage" element={<VendorHomePage />} />
            <Route path="/buy" element={<BuyingPage />} />
            <Route path="/ordertrackingpage" element={<OrderTrackingPage />} />
            <Route path="/feedback" element={<Feedback />} />
          </Route>

          <Route element={<PrivateRoute requiredRole="Admin" />}>
            <Route path="/admin" element={<Admin />} />
            <Route path="/feedback12" element={<FeedbackDetails />} />
            <Route path="/contact12" element={<ContactDetails />} />
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;

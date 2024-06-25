import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [country, setCountry] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [role, setRole] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [accountNumber, setAccountNumber] = useState(''); // State for accountNumber
    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState('');

    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};

        if (!firstName) newErrors.firstName = '* This field is required';
        if (!lastName) newErrors.lastName = '* This field is required';
        if (!userName) newErrors.userName = '* This field is required';
        if (!country) newErrors.country = '* This field is required';
        if (!street) newErrors.street = '* This field is required';
        if (!city) newErrors.city = '* This field is required';
        if (!role) newErrors.role = '* This field is required';
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phoneNumber)) newErrors.phoneNumber = '* Invalid phone number';

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) newErrors.email = '* Invalid email address';

        if (password.length < 6) newErrors.password = '* Password must be at least 6 characters long';
        if (password !== confirmPassword) newErrors.confirmPassword = '* Passwords do not match';

        // Validate accountNumber if role is Vendor
        if (role === 'Vendor' && !accountNumber) {
            newErrors.accountNumber = '* Account number is required for vendors';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        axios.post('http://localhost:3001/register', {
            firstName,
            lastName,
            userName,
            country,
            street,
            city,
            role,
            phoneNumber,
            email,
            password,
            accountNumber, // Include accountNumber in the request
        })
        .then(result => {
            console.log(result);
            if (role === "User") {
                navigate('/Home'); // Navigate to the home page for users
            } else if (role === "Vendor") {
                navigate('/vendorHomePage'); // Navigate to the vendor home page
            }
        })
        .catch(err => {
            console.error(err);
            if (err.response && err.response.data) {
                setApiError(err.response.data.message || 'Registration failed');
            } else {
                setApiError('An error occurred. Please try again later.');
            }
        });
    }

    return (
        <section className="min-h-screen flex flex-col justify-center items-center bg-gray-800 pt-[20px]">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Create an Account</h1>
                <p className="text-center text-blue-500 mb-4">
                    Already have an account? <Link className="text-black font-bold" to="/login">Login</Link>
                </p>
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                    <label className="block">
                        <span className="block text-sm font-medium text-gray-700">First Name</span>
                        <input 
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200" 
                            type="text" 
                            name="firstName" 
                            value={firstName} 
                            onChange={(e) => setFirstName(e.target.value)} 
                        />
                        {errors.firstName && <div className="text-red-500 text-sm mt-1">{errors.firstName}</div>}
                    </label>
                    <label className="block">
                        <span className="block text-sm font-medium text-gray-700">Last Name</span>
                        <input 
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200" 
                            type="text" 
                            name="lastName" 
                            value={lastName} 
                            onChange={(e) => setLastName(e.target.value)} 
                        />
                        {errors.lastName && <div className="text-red-500 text-sm mt-1">{errors.lastName}</div>}
                    </label>
                    <label className="block">
                        <span className="block text-sm font-medium text-gray-700">User Name</span>
                        <input 
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200" 
                            type="text" 
                            name="userName" 
                            value={userName} 
                            onChange={(e) => setUserName(e.target.value)} 
                        />
                        {errors.userName && <div className="text-red-500 text-sm mt-1">{errors.userName}</div>}
                    </label>
                    <label className="block">
                        <span className="block text-sm font-medium text-gray-700">Country</span>
                        <input 
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200" 
                            type="text" 
                            name="country" 
                            value={country} 
                            onChange={(e) => setCountry(e.target.value)} 
                        />
                        {errors.country && <div className="text-red-500 text-sm mt-1">{errors.country}</div>}
                    </label>
                    <label className="block">
                        <span className="block text-sm font-medium text-gray-700">Street</span>
                        <input 
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200" 
                            type="text" 
                            name="street" 
                            value={street} 
                            onChange={(e) => setStreet(e.target.value)} 
                        />
                        {errors.street && <div className="text-red-500 text-sm mt-1">{errors.street}</div>}
                    </label>
                    <label className="block">
                        <span className="block text-sm font-medium text-gray-700">City</span>
                        <input 
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200" 
                            type="text" 
                            name="city" 
                            value={city} 
                            onChange={(e) => setCity(e.target.value)} 
                        />
                        {errors.city && <div className="text-red-500 text-sm mt-1">{errors.city}</div>}
                    </label>
                    <label className="block">
                        <span className="block text-sm font-medium text-gray-700">Role</span>
                        <select 
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200" 
                            name="role" 
                            value={role} 
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="">Select a role</option>
                            <option value="User">User</option>
                            <option value="Vendor">Vendor</option>
                        </select>
                        {errors.role && <div className="text-red-500 text-sm mt-1">{errors.role}</div>}
                    </label>

                    {role === 'Vendor' && (
                        <label className="mt-4 block">
                            <span className="block text-sm font-medium text-gray-700">Account Number</span>
                            <input 
                                type="text" 
                                className={`mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 ${errors.accountNumber ? 'border-red-500' : ''}`}
                                name="accountNumber" 
                                value={accountNumber} 
                                onChange={(e) => setAccountNumber(e.target.value)} 
                            />
                            {errors.accountNumber && <div className="text-red-500 text-sm mt-1">{errors.accountNumber}</div>}
                        </label>
                    )}

                    <label className="block">
                        <span className="block text-sm font-medium text-gray-700">Phone Number</span>
                        <input 
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200" 
                            type="tel" 
                            name="phoneNumber" 
                            value={phoneNumber} 
                            placeholder="ex: 0912345678" 
                            onChange={(e) => setPhoneNumber(e.target.value)} 
                        />
                        {errors.phoneNumber && <div className="text-red-500 text-sm mt-1">{errors.phoneNumber}</div>}
                    </label>
                    <label className="block">
                        <span className="block text-sm font-medium text-gray-700">Email</span>
                        <input 
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200" 
                            type="email" 
                            name="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                        {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
                    </label>
                    <label className="block">
                        <span className="block text-sm font-medium text-gray-700">Password</span>
                        <input 
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200" 
                            type="password" 
                            name="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                        {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
                    </label>
                    <label className="block">
                        <span className="block text-sm font-medium text-gray-700">Confirm Password</span>
                        <input 
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200" 
                            type="password" 
                            name="confirmPassword" 
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                        />
                        {errors.confirmPassword && <div className="text-red-500 text-sm mt-1">{errors.confirmPassword}</div>}
                    </label>
                    <div className="flex justify-center">
                        <button 
                            className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200" 
                            type="submit"
                        >
                            Signup
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default Signup;

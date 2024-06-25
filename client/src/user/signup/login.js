import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ closeModal }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState('');
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};
        if (!username) newErrors.username = '* Username is required';
        if (!password) newErrors.password = '* Password is required';
        if (!role) newErrors.role = '* Role is required';
       
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setApiError('');
        if (!validateForm()) return;
    
        try {
            const response = await axios.post('http://localhost:3001/login', { username, password, role });
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            if (role === 'User') {
                navigate('/home'); // Navigate to the home page for users

            } 
            else if (role === 'Vendor') {
                navigate('/vendorHomePage'); // Navigate to the vendor home page
            }
            else if (role === 'Admin'){
                navigate('/Admin')
            }
             else {
                setApiError('Invalid role'); // Handle unexpected roles
            }
        } catch (err) {
            if (err.response && err.response.data) {
                setApiError(err.response.data.message || 'Login failed');
            } else {
                setApiError('An error occurred. Please try again later.');
            }
        }
    };
    
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-800">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <div className="flex justify-end">
                    <span onClick={closeModal} className="text-gray-600 cursor-pointer">&times;</span>
                </div>
                <h2 className="text-2xl font-bold mb-6 text-center">Log In</h2>
                {apiError && <div className="text-red-500 text-center mb-4">{apiError}</div>}
                <form onSubmit={handleSubmit}>
                    <label className="block mb-4">
                        <span className="block text-sm font-medium text-gray-700">Username</span>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200" />
                        {errors.username && <div className="text-red-500 text-sm mt-1">{errors.username}</div>}
                    </label>
                    <label className="block mb-4">
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
                            <option value="Admin">Admin</option>
                        </select>
                        {errors.role && <div className="text-red-500 text-sm mt-1">{errors.role}</div>}
                    </label>
                    <label className="block mb-4">
                        <span className="block text-sm font-medium text-gray-700">Password</span>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200" />
                        {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
                    </label>
                    <div className="flex justify-center">
                        <button type="submit" className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;

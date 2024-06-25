import React from 'react';
import { Link } from 'react-router-dom';

const MainContent = () => (
  <div className="bg-gray-500 bg-opacity-80 p-10 rounded-lg shadow-lg text-center text-white max-w-50% h-full">
    <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
    <ul className="space-y-6">
      <li>
        <Link to="/" className="block py-2 px-4 bg-blue-600 rounded hover:bg-blue-700 transition duration-300">
          Dashboard
        </Link>
      </li>
      <li>
        <Link to="/feedback12" className="block py-2 px-4 bg-blue-600 rounded hover:bg-blue-700 transition duration-300">
          Feedback
        </Link>
      </li>
      <li>
        <Link to="/contact12" className="block py-2 px-4 bg-blue-600 rounded hover:bg-blue-700 transition duration-300">
          Contact
        </Link>
      </li>
    </ul>
  </div>
);

export default MainContent;

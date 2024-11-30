import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HomeIcon, UserCircleIcon, PlusCircleIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const { logout } = useAuth();

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold">Instamock</Link>
          <div className="flex space-x-4">
            <Link to="/" className="text-gray-700 hover:text-black">
              <HomeIcon className="h-6 w-6" />
            </Link>
            <button className="text-gray-700 hover:text-black">
              <PlusCircleIcon className="h-6 w-6" />
            </button>
            <Link to="/profile" className="text-gray-700 hover:text-black">
              <UserCircleIcon className="h-6 w-6" />
            </Link>
            <button
              onClick={logout}
              className="text-sm text-gray-700 hover:text-black"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
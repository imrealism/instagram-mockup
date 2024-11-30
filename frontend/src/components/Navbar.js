import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { HomeIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import CreatePostButton from './post/CreatePostButton';

const Navbar = ({ onPostCreated }) => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-10">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold">Instamock</Link>
          
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-gray-700 hover:text-black">
              <HomeIcon className="h-6 w-6" />
            </Link>
            
            <CreatePostButton onPostCreated={onPostCreated} />
            
            <Link to={`/profile/${user?.username}`} className="text-gray-700 hover:text-black">
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
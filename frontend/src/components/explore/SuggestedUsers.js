import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SuggestedUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSuggestedUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/explore/suggested-users');
        setUsers(response.data.users);
      } catch (error) {
        console.error('Error fetching suggested users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestedUsers();
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center space-x-4 mb-4">
            <div className="w-10 h-10 bg-gray-200 rounded-full" />
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-24 mb-2" />
              <div className="h-3 bg-gray-200 rounded w-32" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <h3 className="font-semibold text-gray-500 mb-4">Suggested For You</h3>
      {users.map(user => (
        <div key={user.id} className="flex items-center space-x-4 mb-4">
          <Link to={`/profile/${user.username}`}>
            <img
              src={user.profilePicture}
              alt={user.username}
              className="w-10 h-10 rounded-full"
            />
          </Link>
          <div className="flex-1 min-w-0">
            <Link
              to={`/profile/${user.username}`}
              className="font-semibold text-sm hover:underline truncate block"
            >
              {user.username}
            </Link>
            <p className="text-gray-500 text-sm truncate">
              {user.followers.toLocaleString()} followers
            </p>
          </div>
          <button className="text-blue-500 text-sm font-semibold hover:text-blue-700">
            Follow
          </button>
        </div>
      ))}
    </div>
  );
};

export default SuggestedUsers;
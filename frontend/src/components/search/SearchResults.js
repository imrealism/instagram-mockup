import React from 'react';
import { Link } from 'react-router-dom';
import { HashtagIcon, MapPinIcon, UserIcon } from '@heroicons/react/24/outline';

const SearchResults = ({ results, isSearching, query }) => {
  if (isSearching) {
    return (
      <div className="p-4 text-center text-gray-500">
        <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-500 border-t-transparent mx-auto"></div>
        <p className="mt-2">Searching...</p>
      </div>
    );
  }

  if (!query) {
    return (
      <div className="p-4 text-center text-gray-500">
        Try searching for people, hashtags, or places
      </div>
    );
  }

  if (!results) {
    return (
      <div className="p-4 text-center text-gray-500">
        No results found
      </div>
    );
  }

  const { users, tags, places } = results;

  return (
    <div className="max-h-96 overflow-y-auto">
      {/* Users */}
      {users.length > 0 && (
        <div className="py-2">
          <h3 className="px-4 text-sm font-semibold text-gray-500 mb-2">Users</h3>
          {users.map(user => (
            <Link
              key={user.id}
              to={`/profile/${user.username}`}
              className="px-4 py-2 flex items-center hover:bg-gray-50"
            >
              <img
                src={user.profilePicture}
                alt={user.username}
                className="w-10 h-10 rounded-full"
              />
              <div className="ml-3">
                <p className="font-semibold">{user.username}</p>
                <p className="text-sm text-gray-500">{user.name}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Tags */}
      {tags.length > 0 && (
        <div className="py-2 border-t">
          <h3 className="px-4 text-sm font-semibold text-gray-500 mb-2">Tags</h3>
          {tags.map(tag => (
            <Link
              key={tag}
              to={`/explore/tags/${tag.slice(1)}`}
              className="px-4 py-2 flex items-center hover:bg-gray-50"
            >
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <HashtagIcon className="h-5 w-5 text-gray-500" />
              </div>
              <div className="ml-3">
                <p className="font-semibold">{tag}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Places */}
      {places && places.length > 0 && (
        <div className="py-2 border-t">
          <h3 className="px-4 text-sm font-semibold text-gray-500 mb-2">Places</h3>
          {places.map(place => (
            <Link
              key={place.id}
              to={`/explore/locations/${place.id}`}
              className="px-4 py-2 flex items-center hover:bg-gray-50"
            >
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <MapPinIcon className="h-5 w-5 text-gray-500" />
              </div>
              <div className="ml-3">
                <p className="font-semibold">{place.name}</p>
                <p className="text-sm text-gray-500 capitalize">{place.type}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
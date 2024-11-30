import React from 'react';
import { Link } from 'react-router-dom';
import { HashtagIcon } from '@heroicons/react/24/outline';

const PopularTags = () => {
  // Mock popular tags
  const popularTags = [
    { tag: 'photography', posts: 1234 },
    { tag: 'nature', posts: 987 },
    { tag: 'travel', posts: 856 },
    { tag: 'food', posts: 743 },
    { tag: 'art', posts: 632 }
  ];

  return (
    <div>
      <h3 className="font-semibold text-gray-500 mb-4">Popular Tags</h3>
      {popularTags.map(({ tag, posts }) => (
        <Link
          key={tag}
          to={`/explore/tags/${tag}`}
          className="flex items-center space-x-3 mb-4 hover:bg-gray-50 p-2 rounded-md"
        >
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            <HashtagIcon className="h-5 w-5 text-gray-500" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm">#{tag}</p>
            <p className="text-gray-500 text-sm">
              {posts.toLocaleString()} posts
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PopularTags;
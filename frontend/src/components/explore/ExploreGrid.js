import React from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/solid';

const ExploreGrid = ({ posts }) => {
  return (
    <div className="grid grid-cols-3 gap-1">
      {posts.map(post => (
        <Link
          key={post.id}
          to={`/p/${post.id}`}
          className="relative aspect-square group cursor-pointer"
        >
          <img
            src={post.image}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center space-x-8 text-white">
            <div className="flex items-center space-x-2">
              <HeartIcon className="h-6 w-6" />
              <span className="font-semibold">{post.likes}</span>
            </div>
            <div className="flex items-center space-x-2">
              <ChatBubbleLeftIcon className="h-6 w-6" />
              <span className="font-semibold">{post.comments.length}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ExploreGrid;
import React from 'react';
import { HeartIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/solid';

const ProfilePosts = ({ posts }) => {
  if (!posts.length) {
    return (
      <div className="py-8 text-center text-gray-500">
        No posts yet
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-1 mt-4">
      {posts.map(post => (
        <div
          key={post.id}
          className="relative aspect-square group cursor-pointer"
        >
          <img
            src={post.image}
            alt=""
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center space-x-8 text-white">
            <div className="flex items-center space-x-1">
              <HeartIcon className="h-6 w-6" />
              <span className="font-semibold">{post.likes}</span>
            </div>
            <div className="flex items-center space-x-1">
              <ChatBubbleLeftIcon className="h-6 w-6" />
              <span className="font-semibold">{post.comments.length}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfilePosts;
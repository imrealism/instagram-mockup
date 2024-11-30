import React from 'react';

const StoryPreview = ({ story, onSelect }) => {
  const hasUnseenStories = story.stories.some(s => !s.seen);

  return (
    <button
      onClick={onSelect}
      className="flex flex-col items-center"
    >
      <div
        className={`w-16 h-16 rounded-full p-[2px] ${
          hasUnseenStories ? 'bg-gradient-to-tr from-yellow-400 to-fuchsia-600' : 'border-2 border-gray-200'
        }`}
      >
        <img
          src={story.user.profilePicture}
          alt={story.user.username}
          className="w-full h-full rounded-full object-cover border-2 border-white"
        />
      </div>
      <span className="text-xs mt-2 truncate w-16">{story.user.username}</span>
    </button>
  );
};

export default StoryPreview;
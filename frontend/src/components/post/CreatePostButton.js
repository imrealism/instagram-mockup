import React, { useState } from 'react';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import CreatePost from './CreatePost';

const CreatePostButton = ({ onPostCreated }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="text-gray-700 hover:text-black"
      >
        <PlusCircleIcon className="h-6 w-6" />
      </button>

      {isModalOpen && (
        <CreatePost
          onClose={() => setIsModalOpen(false)}
          onPostCreated={onPostCreated}
        />
      )}
    </>
  );
};

export default CreatePostButton;
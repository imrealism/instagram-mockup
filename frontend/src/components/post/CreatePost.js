import React, { useState } from 'react';
import { XMarkIcon, PhotoIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

const CreatePost = ({ onClose, onPostCreated }) => {
  const [step, setStep] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setStep(2);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      // In a real app, we would upload the image to a storage service
      // and get back a URL. Here we'll use a placeholder
      const response = await axios.post('http://localhost:3001/api/posts', {
        caption,
        imageUrl: `https://picsum.photos/600/600?random=${Date.now()}`
      });

      onPostCreated(response.data.post);
      onClose();
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full">
        {/* Header */}
        <div className="border-b p-4 flex items-center justify-between">
          <button onClick={onClose}>
            <XMarkIcon className="h-6 w-6" />
          </button>
          <h2 className="text-lg font-semibold">Create New Post</h2>
          {step === 2 && (
            <button
              className="text-blue-500 font-semibold disabled:opacity-50"
              disabled={loading || !caption.trim()}
              onClick={handleSubmit}
            >
              Share
            </button>
          )}
        </div>

        {/* Content */}
        {step === 1 ? (
          <div className="p-16 flex flex-col items-center justify-center">
            <PhotoIcon className="h-24 w-24 text-gray-400" />
            <p className="mt-4 text-xl">Drag photos and videos here</p>
            <label className="mt-4 bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
              Select from computer
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageSelect}
              />
            </label>
          </div>
        ) : (
          <div className="flex h-[600px]">
            {/* Image Preview */}
            <div className="flex-1 bg-black flex items-center justify-center">
              <img
                src={selectedImage}
                alt="Preview"
                className="max-h-full max-w-full object-contain"
              />
            </div>

            {/* Caption Input */}
            <div className="w-[340px] border-l">
              <textarea
                placeholder="Write a caption..."
                className="w-full p-4 h-40 resize-none focus:outline-none focus:ring-0 border-0"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatePost;
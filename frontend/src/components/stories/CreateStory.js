import React, { useState } from 'react';
import { XMarkIcon, PhotoIcon } from '@heroicons/react/24/outline';

const CreateStory = ({ onClose, onCreate }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!image) return;

    setLoading(true);
    try {
      // In a real app, we would upload the image to a storage service
      // Here we'll use a placeholder URL
      await onCreate({
        type: 'image',
        url: `https://picsum.photos/800/1200?random=${Date.now()}`
      });
    } catch (error) {
      console.error('Error creating story:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-white rounded-lg max-w-lg w-full">
        <div className="border-b p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Create Story</h2>
          <button onClick={onClose}>
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4">
          {image ? (
            <div className="relative aspect-[9/16] max-h-[60vh]">
              <img
                src={image}
                alt="Story preview"
                className="w-full h-full object-contain"
              />
              <button
                onClick={() => setImage(null)}
                className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-75"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="aspect-[9/16] bg-gray-100 flex flex-col items-center justify-center">
              <PhotoIcon className="w-16 h-16 text-gray-400" />
              <p className="mt-4 text-gray-600">Select a photo for your story</p>
              <label className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-600">
                Choose Photo
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageSelect}
                />
              </label>
            </div>
          )}
        </div>

        <div className="border-t p-4 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!image || loading}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Share Story'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateStory;
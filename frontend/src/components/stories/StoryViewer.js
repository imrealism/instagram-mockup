import React, { useState, useEffect } from 'react';
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { format } from 'date-fns';

const StoryViewer = ({ story, onClose, onNext }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (progress < 100) {
        setProgress(prev => prev + 1);
      } else {
        if (currentIndex < story.stories.length - 1) {
          setCurrentIndex(prev => prev + 1);
          setProgress(0);
        } else {
          onNext(story.id);
        }
      }
    }, 30);

    return () => clearInterval(timer);
  }, [progress, currentIndex, story.stories.length, story.id, onNext]);

  const currentStory = story.stories[currentIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
      <div className="relative max-w-screen-md w-full mx-4">
        {/* Progress Bars */}
        <div className="absolute top-4 left-4 right-4 flex space-x-1">
          {story.stories.map((s, index) => (
            <div
              key={s.id}
              className="h-0.5 bg-gray-600 flex-1 overflow-hidden"
            >
              <div
                className="h-full bg-white transition-all duration-100 ease-linear"
                style={{
                  width: `${index === currentIndex ? progress : index < currentIndex ? 100 : 0}%`
                }}
              />
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="absolute top-8 left-4 right-4 flex items-center text-white">
          <img
            src={story.user.profilePicture}
            alt={story.user.username}
            className="w-8 h-8 rounded-full"
          />
          <div className="ml-3">
            <span className="font-semibold">{story.user.username}</span>
            <span className="text-sm opacity-75 ml-2">
              {format(new Date(currentStory.createdAt), 'MM/dd/yyyy HH:mm')}
            </span>
          </div>
          <button
            onClick={onClose}
            className="ml-auto hover:opacity-75"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white opacity-75 hover:opacity-100"
          onClick={() => {
            if (currentIndex > 0) {
              setCurrentIndex(prev => prev - 1);
              setProgress(0);
            }
          }}
          disabled={currentIndex === 0}
        >
          <ChevronLeftIcon className="w-8 h-8" />
        </button>

        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white opacity-75 hover:opacity-100"
          onClick={() => {
            if (currentIndex < story.stories.length - 1) {
              setCurrentIndex(prev => prev + 1);
              setProgress(0);
            } else {
              onNext(story.id);
            }
          }}
          disabled={currentIndex === story.stories.length - 1}
        >
          <ChevronRightIcon className="w-8 h-8" />
        </button>

        {/* Story Content */}
        <img
          src={currentStory.url}
          alt=""
          className="max-h-[80vh] mx-auto"
        />
      </div>
    </div>
  );
};

export default StoryViewer;
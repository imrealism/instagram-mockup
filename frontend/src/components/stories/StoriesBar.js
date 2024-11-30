import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PlusIcon } from '@heroicons/react/24/solid';
import StoryPreview from './StoryPreview';
import StoryViewer from './StoryViewer';
import CreateStory from './CreateStory';
import { useAuth } from '../../contexts/AuthContext';

const StoriesBar = () => {
  const { user } = useAuth();
  const [stories, setStories] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null);
  const [showCreateStory, setShowCreateStory] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/stories');
        setStories(response.data.stories);
      } catch (error) {
        console.error('Error fetching stories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  const handleStoryCreate = async (story) => {
    try {
      const response = await axios.post('http://localhost:3001/api/stories', story);
      setStories(prev => [response.data.story, ...prev]);
      setShowCreateStory(false);
    } catch (error) {
      console.error('Error creating story:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-24">
        <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="bg-white border rounded-lg p-4 mb-6">
      <div className="flex space-x-4 overflow-x-auto">
        {/* Create Story Button */}
        <div className="flex flex-col items-center">
          <button
            onClick={() => setShowCreateStory(true)}
            className="w-16 h-16 rounded-full border-2 border-gray-200 flex items-center justify-center bg-gray-50"
          >
            <PlusIcon className="w-6 h-6 text-gray-600" />
          </button>
          <span className="text-xs mt-2">Add Story</span>
        </div>

        {/* Stories List */}
        {stories.map((story) => (
          <StoryPreview
            key={story.id}
            story={story}
            onSelect={() => setSelectedStory(story)}
          />
        ))}
      </div>

      {/* Story Viewer Modal */}
      {selectedStory && (
        <StoryViewer
          story={selectedStory}
          onClose={() => setSelectedStory(null)}
          onNext={(currentIndex) => {
            if (currentIndex < stories.length - 1) {
              setSelectedStory(stories[currentIndex + 1]);
            } else {
              setSelectedStory(null);
            }
          }}
        />
      )}

      {/* Create Story Modal */}
      {showCreateStory && (
        <CreateStory
          onClose={() => setShowCreateStory(false)}
          onCreate={handleStoryCreate}
        />
      )}
    </div>
  );
};

export default StoriesBar;
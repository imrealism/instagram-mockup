import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExploreGrid from './ExploreGrid';
import SuggestedUsers from './SuggestedUsers';
import PopularTags from './PopularTags';

const ExplorePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExplorePosts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/explore');
        setPosts(response.data.posts);
      } catch (error) {
        console.error('Error fetching explore posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExplorePosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex space-x-8">
        <div className="flex-1">
          <ExploreGrid posts={posts} />
        </div>
        <div className="w-80 hidden lg:block">
          <SuggestedUsers />
          <div className="mt-8">
            <PopularTags />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
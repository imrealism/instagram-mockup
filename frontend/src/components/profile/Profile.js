import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { GridIcon, BookmarkIcon } from '@heroicons/react/24/outline';
import ProfileHeader from './ProfileHeader';
import ProfilePosts from './ProfilePosts';

const Profile = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('posts');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const [profileRes, postsRes] = await Promise.all([
          axios.get(`http://localhost:3001/api/profile/${username}`),
          axios.get(`http://localhost:3001/api/profile/${username}/posts`)
        ]);

        setProfile(profileRes.data.profile);
        setPosts(postsRes.data.posts);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">User not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <ProfileHeader profile={profile} />

      {/* Tabs */}
      <div className="border-t mt-8">
        <div className="flex justify-center space-x-16">
          <button
            className={`flex items-center space-x-1 py-4 ${
              activeTab === 'posts' ? 'border-t border-black' : ''
            }`}
            onClick={() => setActiveTab('posts')}
          >
            <GridIcon className="h-4 w-4" />
            <span>Posts</span>
          </button>
          <button
            className={`flex items-center space-x-1 py-4 ${
              activeTab === 'saved' ? 'border-t border-black' : ''
            }`}
            onClick={() => setActiveTab('saved')}
          >
            <BookmarkIcon className="h-4 w-4" />
            <span>Saved</span>
          </button>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'posts' ? (
        <ProfilePosts posts={posts} />
      ) : (
        <div className="py-8 text-center text-gray-500">
          No saved posts yet
        </div>
      )}
    </div>
  );
};

export default Profile;
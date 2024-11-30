import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PlusIcon } from '@heroicons/react/24/outline';
import SavedPostsGrid from './SavedPostsGrid';
import CreateCollectionModal from './CreateCollectionModal';

const SavedPosts = () => {
  const [savedPosts, setSavedPosts] = useState([]);
  const [collections, setCollections] = useState([]);
  const [activeCollection, setActiveCollection] = useState('All Posts');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsRes, collectionsRes] = await Promise.all([
          axios.get('http://localhost:3001/api/saved'),
          axios.get('http://localhost:3001/api/saved/collections')
        ]);

        setSavedPosts(postsRes.data.savedPosts);
        setCollections(collectionsRes.data.collections);
      } catch (error) {
        console.error('Error fetching saved posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCreateCollection = async (name) => {
    try {
      const response = await axios.post('http://localhost:3001/api/saved/collections', { name });
      setCollections([...collections, response.data.collection]);
      setShowCreateModal(false);
    } catch (error) {
      console.error('Error creating collection:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  const filteredPosts = activeCollection === 'All Posts'
    ? savedPosts
    : savedPosts.filter(post => post.collectionName === activeCollection);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold">Saved</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2 text-blue-500 hover:text-blue-600"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Create Collection</span>
        </button>
      </div>

      {/* Collections tabs */}
      <div className="flex space-x-4 mb-8 overflow-x-auto pb-2">
        <button
          className={`px-4 py-2 rounded-full ${
            activeCollection === 'All Posts'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
          onClick={() => setActiveCollection('All Posts')}
        >
          All Posts
        </button>
        {collections.map(collection => (
          <button
            key={collection.name}
            className={`px-4 py-2 rounded-full ${
              activeCollection === collection.name
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
            onClick={() => setActiveCollection(collection.name)}
          >
            {collection.name} ({collection.count})
          </button>
        ))}
      </div>

      {/* Posts grid */}
      <SavedPostsGrid posts={filteredPosts} />

      {/* Create collection modal */}
      {showCreateModal && (
        <CreateCollectionModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateCollection}
        />
      )}
    </div>
  );
};

export default SavedPosts;
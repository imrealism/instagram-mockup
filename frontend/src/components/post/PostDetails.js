import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { HeartIcon, ChatBubbleLeftIcon, BookmarkIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

const PostDetails = () => {
  const { postId } = useParams();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/posts/${postId}`);
        setPost(response.data.post);
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  const handleLike = async () => {
    try {
      const response = await axios.post(`http://localhost:3001/api/posts/${postId}/like`);
      setPost(response.data.post);
      setLiked(true);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      const response = await axios.post(`http://localhost:3001/api/posts/${postId}/comments`, {
        text: comment
      });
      setPost({
        ...post,
        comments: [...post.comments, response.data.comment]
      });
      setComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`http://localhost:3001/api/posts/${postId}/comments/${commentId}`);
      setPost({
        ...post,
        comments: post.comments.filter(c => c.id !== commentId)
      });
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Post not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="flex md:flex-row flex-col h-full">
        {/* Image */}
        <div className="md:w-[500px] bg-black flex items-center">
          <img
            src={post.image}
            alt=""
            className="w-full h-full object-contain"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col w-full md:w-[400px]">
          {/* Header */}
          <div className="p-4 border-b flex items-center">
            <Link to={`/profile/${post.user.username}`} className="flex items-center">
              <img
                src={post.user.profilePicture}
                alt={post.user.username}
                className="w-8 h-8 rounded-full"
              />
              <span className="ml-3 font-semibold">{post.user.username}</span>
            </Link>
          </div>

          {/* Comments */}
          <div className="flex-1 overflow-y-auto p-4">
            {/* Caption */}
            <div className="flex items-start mb-4">
              <Link to={`/profile/${post.user.username}`}>
                <img
                  src={post.user.profilePicture}
                  alt={post.user.username}
                  className="w-8 h-8 rounded-full"
                />
              </Link>
              <div className="ml-3">
                <Link to={`/profile/${post.user.username}`} className="font-semibold mr-2">
                  {post.user.username}
                </Link>
                <span>{post.caption}</span>
                <p className="text-gray-500 text-xs mt-1">
                  {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                </p>
              </div>
            </div>

            {/* Comments list */}
            {post.comments.map(comment => (
              <div key={comment.id} className="flex items-start mb-4">
                <Link to={`/profile/${comment.user.username}`}>
                  <img
                    src={comment.user.profilePicture}
                    alt={comment.user.username}
                    className="w-8 h-8 rounded-full"
                  />
                </Link>
                <div className="ml-3 flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <Link to={`/profile/${comment.user.username}`} className="font-semibold mr-2">
                        {comment.user.username}
                      </Link>
                      <span>{comment.text}</span>
                      <p className="text-gray-500 text-xs mt-1">
                        {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                      </p>
                    </div>
                    {comment.user.id === user.id && (
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className="text-gray-500 text-sm hover:text-red-500"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="p-4 border-t">
            <div className="flex justify-between mb-4">
              <div className="flex space-x-4">
                <button onClick={handleLike}>
                  {liked ? (
                    <HeartSolid className="h-6 w-6 text-red-500" />
                  ) : (
                    <HeartIcon className="h-6 w-6" />
                  )}
                </button>
                <button>
                  <ChatBubbleLeftIcon className="h-6 w-6" />
                </button>
                <button>
                  <PaperAirplaneIcon className="h-6 w-6 rotate-90" />
                </button>
              </div>
              <button>
                <BookmarkIcon className="h-6 w-6" />
              </button>
            </div>

            <p className="font-semibold mb-2">{post.likes} likes</p>

            {/* Add comment */}
            <form onSubmit={handleComment} className="flex items-center mt-4">
              <input
                type="text"
                placeholder="Add a comment..."
                className="flex-1 border-none focus:ring-0"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                type="submit"
                disabled={!comment.trim()}
                className="text-blue-500 font-semibold disabled:text-blue-200 ml-2"
              >
                Post
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
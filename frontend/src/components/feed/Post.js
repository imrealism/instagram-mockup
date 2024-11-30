import React, { useState } from 'react';
import { HeartIcon as HeartOutline, ChatBubbleLeftIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import axios from 'axios';

const Post = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(post.comments);

  const handleLike = async () => {
    try {
      await axios.post(`http://localhost:3001/api/posts/${post.id}/like`);
      setLiked(!liked);
      setLikes(likes + 1);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      const response = await axios.post(`http://localhost:3001/api/posts/${post.id}/comment`, {
        text: comment
      });
      setComments([...comments, response.data.comment]);
      setComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className="bg-white border rounded-lg mb-8">
      {/* Post Header */}
      <div className="flex items-center p-4">
        <img
          src={post.user.profilePicture}
          alt={post.user.username}
          className="h-8 w-8 rounded-full"
        />
        <span className="ml-3 font-semibold">{post.user.username}</span>
      </div>

      {/* Post Image */}
      <img src={post.image} alt="" className="w-full" />

      {/* Post Actions */}
      <div className="p-4">
        <div className="flex space-x-4">
          <button onClick={handleLike}>
            {liked ? (
              <HeartSolid className="h-6 w-6 text-red-500" />
            ) : (
              <HeartOutline className="h-6 w-6" />
            )}
          </button>
          <ChatBubbleLeftIcon className="h-6 w-6" />
          <PaperAirplaneIcon className="h-6 w-6 rotate-90" />
        </div>

        {/* Likes */}
        <p className="font-semibold mt-2">{likes} likes</p>

        {/* Caption */}
        <p className="mt-2">
          <span className="font-semibold mr-2">{post.user.username}</span>
          {post.caption}
        </p>

        {/* Comments */}
        {comments.length > 0 && (
          <div className="mt-4">
            {comments.map(comment => (
              <p key={comment.id} className="mt-1">
                <span className="font-semibold mr-2">{comment.user.username}</span>
                {comment.text}
              </p>
            ))}
          </div>
        )}

        {/* Add Comment */}
        <form onSubmit={handleComment} className="mt-4">
          <div className="flex items-center">
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
              className="text-blue-500 font-semibold disabled:text-blue-200"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Post;
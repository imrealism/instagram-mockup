import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const ProfileHeader = ({ profile }) => {
  const { user } = useAuth();
  const isOwnProfile = user?.id === profile.id;

  return (
    <div className="flex items-start space-x-8">
      <img
        src={profile.profilePicture}
        alt={profile.username}
        className="w-32 h-32 rounded-full"
      />
      <div className="flex-1">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-light">{profile.username}</h1>
          {isOwnProfile ? (
            <button className="px-4 py-1 border rounded font-semibold">
              Edit Profile
            </button>
          ) : (
            <button
              className={`px-4 py-1 rounded font-semibold ${
                profile.isFollowing
                  ? 'border'
                  : 'bg-blue-500 text-white'
              }`}
            >
              {profile.isFollowing ? 'Following' : 'Follow'}
            </button>
          )}
        </div>

        {/* Stats */}
        <div className="flex space-x-8 my-4">
          <div>
            <span className="font-semibold">{profile.postsCount}</span>{' '}
            <span className="text-gray-500">posts</span>
          </div>
          <div>
            <span className="font-semibold">{profile.followersCount}</span>{' '}
            <span className="text-gray-500">followers</span>
          </div>
          <div>
            <span className="font-semibold">{profile.followingCount}</span>{' '}
            <span className="text-gray-500">following</span>
          </div>
        </div>

        {/* Bio */}
        <div>
          <h2 className="font-semibold">{profile.name}</h2>
          <p className="whitespace-pre-line">{profile.bio}</p>
          {profile.website && (
            <a
              href={profile.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-900 font-semibold"
            >
              {profile.website}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
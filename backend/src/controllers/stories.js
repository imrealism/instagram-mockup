const mockStories = require('../data/mockStories');

const storiesController = {
  getAllStories: (req, res) => {
    // Filter out expired stories
    const now = new Date().toISOString();
    const activeStories = mockStories
      .map(userStories => ({
        ...userStories,
        stories: userStories.stories.filter(story =>
          new Date(story.expiresAt) > new Date(now)
        )
      }))
      .filter(userStories => userStories.stories.length > 0);

    res.json({
      success: true,
      stories: activeStories
    });
  },

  getUserStories: (req, res) => {
    const { userId } = req.params;
    const userStories = mockStories.find(
      stories => stories.user.id === parseInt(userId)
    );

    if (!userStories) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Filter out expired stories
    const now = new Date().toISOString();
    const activeStories = {
      ...userStories,
      stories: userStories.stories.filter(
        story => new Date(story.expiresAt) > new Date(now)
      )
    };

    res.json({
      success: true,
      stories: activeStories
    });
  },

  createStory: (req, res) => {
    const userId = req.user.id;
    const { type, url } = req.body;

    let userStories = mockStories.find(stories => stories.user.id === userId);

    const newStory = {
      id: Date.now(),
      type,
      url,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    };

    if (userStories) {
      userStories.stories.push(newStory);
    } else {
      userStories = {
        id: userId,
        user: {
          id: userId,
          username: req.user.username,
          profilePicture: req.user.profilePicture
        },
        stories: [newStory]
      };
      mockStories.push(userStories);
    }

    res.status(201).json({
      success: true,
      story: newStory
    });
  },

  deleteStory: (req, res) => {
    const { storyId } = req.params;
    const userId = req.user.id;

    const userStories = mockStories.find(stories => stories.user.id === userId);

    if (!userStories) {
      return res.status(404).json({
        success: false,
        message: 'User stories not found'
      });
    }

    const storyIndex = userStories.stories.findIndex(
      story => story.id === parseInt(storyId)
    );

    if (storyIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Story not found'
      });
    }

    userStories.stories.splice(storyIndex, 1);

    res.json({
      success: true,
      message: 'Story deleted successfully'
    });
  }
};

module.exports = storiesController;
const express = require('express');
const router = express.Router();
const storiesController = require('../controllers/stories');
const { protected } = require('../middleware/auth');

router.use(protected);

router.get('/', storiesController.getAllStories);
router.get('/:userId', storiesController.getUserStories);
router.post('/', storiesController.createStory);
router.delete('/:storyId', storiesController.deleteStory);

module.exports = router;
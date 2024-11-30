const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts');
const { protected } = require('../middleware/auth');

// All post routes are protected
router.use(protected);

router.get('/', postsController.getFeedPosts);
router.post('/:postId/like', postsController.likePost);
router.post('/:postId/comment', postsController.addComment);

module.exports = router;
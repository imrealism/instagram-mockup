const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts');
const { protected } = require('../middleware/auth');

router.use(protected);

router.post('/', postsController.createPost);
router.get('/', postsController.getAllPosts);
router.post('/:postId/like', postsController.likePost);
router.post('/:postId/comment', postsController.addComment);

module.exports = router;
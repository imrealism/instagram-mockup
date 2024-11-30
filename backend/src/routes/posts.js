const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts');
const { protected } = require('../middleware/auth');

router.use(protected);

router.get('/:postId', postsController.getPost);
router.post('/', postsController.createPost);
router.post('/:postId/like', postsController.likePost);
router.post('/:postId/comments', postsController.addComment);
router.delete('/:postId/comments/:commentId', postsController.deleteComment);

module.exports = router;
const express = require('express');
const router = express.Router();
const exploreController = require('../controllers/explore');
const { protected } = require('../middleware/auth');

router.use(protected);

router.get('/', exploreController.getExplorePosts);
router.get('/tags/:tag', exploreController.getPostsByTag);
router.get('/popular', exploreController.getPopularPosts);
router.get('/suggested-users', exploreController.getSuggestedUsers);

module.exports = router;
const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile');
const { protected } = require('../middleware/auth');

router.use(protected);

router.get('/:username', profileController.getProfile);
router.get('/:username/posts', profileController.getUserPosts);
router.put('/edit', profileController.updateProfile);
router.post('/follow/:userId', profileController.followUser);
router.post('/unfollow/:userId', profileController.unfollowUser);

module.exports = router;
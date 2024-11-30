const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settings');
const { protected } = require('../middleware/auth');

router.use(protected);

router.get('/profile', settingsController.getProfile);
router.put('/profile', settingsController.updateProfile);
router.put('/password', settingsController.updatePassword);
router.put('/privacy', settingsController.updatePrivacySettings);
router.get('/notifications', settingsController.getNotificationSettings);
router.put('/notifications', settingsController.updateNotificationSettings);

module.exports = router;
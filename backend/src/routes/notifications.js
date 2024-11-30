const express = require('express');
const router = express.Router();
const notificationsController = require('../controllers/notifications');
const { protected } = require('../middleware/auth');

router.use(protected);

router.get('/', notificationsController.getNotifications);
router.post('/:notificationId/read', notificationsController.markAsRead);
router.post('/read-all', notificationsController.markAllAsRead);

module.exports = router;
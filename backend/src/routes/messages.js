const express = require('express');
const router = express.Router();
const messagesController = require('../controllers/messages');
const { protected } = require('../middleware/auth');

router.use(protected);

router.get('/', messagesController.getConversations);
router.get('/:conversationId', messagesController.getMessages);
router.post('/:conversationId', messagesController.sendMessage);
router.post('/new', messagesController.createConversation);

module.exports = router;
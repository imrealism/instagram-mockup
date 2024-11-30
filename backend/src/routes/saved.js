const express = require('express');
const router = express.Router();
const savedController = require('../controllers/saved');
const { protected } = require('../middleware/auth');

router.use(protected);

router.get('/', savedController.getSavedPosts);
router.post('/:postId', savedController.savePost);
router.delete('/:postId', savedController.unsavePost);
router.get('/collections', savedController.getCollections);
router.post('/collections', savedController.createCollection);

module.exports = router;
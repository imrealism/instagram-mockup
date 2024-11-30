const express = require('express');
const router = express.Router();
const searchController = require('../controllers/search');
const { protected } = require('../middleware/auth');

router.use(protected);

router.get('/', searchController.search);
router.get('/tags', searchController.searchTags);
router.get('/places', searchController.searchPlaces);

module.exports = router;
const express = require('express');

const router = express.Router();
const auth = require('../middlewares/auth');
const roleMiddleware = require('../middlewares/roleMiddleware');

const {
  getCategories,
  createCategory
} = require('../controllers/categoryController');

router.get('/', getCategories);

router.post('/', auth, roleMiddleware('ADMIN'), createCategory);

module.exports = router;

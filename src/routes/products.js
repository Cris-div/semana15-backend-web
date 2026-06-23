const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const auth = require('../middlewares/auth');
const roleMiddleware = require('../middlewares/roleMiddleware');

const onlyAdmin = [
  auth,
  roleMiddleware('ADMIN')
];

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', onlyAdmin, productController.createProduct);
router.put('/:id', onlyAdmin, productController.updateProduct);
router.delete('/:id', onlyAdmin, productController.deleteProduct);

module.exports = router;

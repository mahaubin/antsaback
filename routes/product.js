import express from 'express';
import {
  updateProduct,
  deleteProduct,
  getProduct,
  getProducts,
  createProduct,
} from '../controller/product.js';
import { upload } from '../utils/upload.js';

const router = express.Router();

router.post('/', upload.single('images'), createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.get('/find/:id', getProduct);
router.get('/', getProducts);

export default router;

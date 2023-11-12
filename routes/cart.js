import express from 'express';
import {
  createCart,
  updateCart,
  deleteCart,
  getCart,
  getCarts,
} from '../controller/cart.js';

const router = express.Router();

router.post('/', createCart);
router.put('/:id', updateCart);
router.delete('/:id', deleteCart);
router.get('/find/:id', getCart);
router.get('/', getCarts);

export default router;

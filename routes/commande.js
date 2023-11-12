import express from 'express';
import {
  createCommande,
  updateCommande,
  deleteCommande,
  getCommande,
  getCommandes,
} from '../controller/commande.js';

const router = express.Router();

router.post('/', createCommande);
router.put('/:id', updateCommande);
router.delete('/:id', deleteCommande);
router.get('/find/:id', getCommande);
router.get('/', getCommandes);

export default router;

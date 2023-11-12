import { createError } from '../utils/errors.js';
import Commande from '../model/Commande.js';

//CREATE

export const createCommande = async (req, res) => {
  const newCommande = new Commande(req.body);

  try {
    const savedCommande = await newCommande.save();
    res.status(200).json(savedCommande);
  } catch (err) {
    res.status(500).json(err);
  }
};

//UPDATE
export const updateCommande = async (req, res) => {
  try {
    const updatedCommand = await Commande.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCommand);
  } catch (err) {
    res.status(500).json(err);
  }
};

//DELETE
export const deleteCommande = async (req, res) => {
  try {
    await Commande.findByIdAndDelete(req.params.id);
    res.status(200).json('Commande has been deleted...');
  } catch (err) {
    res.status(500).json(err);
  }
};

//GET commande
export const getCommande = async (req, res) => {
  try {
    const commande = await Commande.findOne({ userId: req.params.userId });
    res.status(200).json(commande);
  } catch (err) {
    res.status(500).json(err);
  }
};

// //GET ALL commande

export const getCommandes = async (req, res) => {
  try {
    const commandes = await Commande.find();
    res.status(200).json(commandes);
  } catch (err) {
    res.status(500).json(err);
  }
};

import mongoose from 'mongoose';

const CommandeSchema = new mongoose.Schema(
  {
    email: { type: String },
    nom: { type: String },
    prenom: { type: String },
    telephone: { type: String },
    longueurEpaule: { type: Number },
    tourPoitrine: { type: Number },
    tourTaille: { type: Number },
    longueurHanche: { type: Number },
    longueurBras: { type: Number },
    tourBras: { type: Number },
    tourCoue: { type: Number },
    longueurJupe: { type: Number },
  },
  { timestamps: true }
);

export default mongoose.model('Commande', CommandeSchema);

import { model, Schema, Model, Document } from "mongoose";

interface IFichePaie extends Document {
  _id: string;
  salaire_brut: number;
  salaire_net: number;
  cession_salaire: number;
  saisie_salaire: number;
  acompte: number;
  heure_supplementaire: number;
  remboursement: number;
  agent: string;
  prime: number;
  allocation_familiale: string;
  nombre_enfants?: number;
  loyer?: number;
  impot?: number;
  cotisation_sociale?: number;
  createdAt: Date;
  updatedAt: Date;
}

const FichePaieSchema = new Schema({
  salaire_brut: {
    type: Number,
    required: true,
    default: 0,
  },

  salaire_net: {
    type: Number,
    required: true,
    default: 0,
  },

  cession_salaire: {
    type: Number,
    required: true,
    default: 0,
  },

  saisie_salaire: {
    type: Number,
    required: true,
    default: 0,
  },

  acompte: {
    type: Number,
    required: true,
    default: 0,
  },

  heure_supplementaire: {
    type: Number,
    required: true,
    default: 0,
  },

  remboursement: {
    type: Number,
    required: true,
    default: 0,
  },

  agent: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Agent',
  },

  prime: {
    type: Number,
    required: true,
    default: 0,
  },

  allocation_familiale: {
    type: String,
    required: true,
    // enum: ["Oui", "Non"],
  },

  nombre_enfants: {
    type: Number,
    required: false,
    default: 0,
  },

  loyer: {
    type: Number,
    required: false,
    default: 0,
  },

  impot: {
    type: Number,
    required: false,
    default: 0,
  },

  cotisation_sociale: {
    type: Number,
    required: false,
    default: 0,
  }

});

export const FichePaieEntity: Model<IFichePaie> = model('FichePaie', FichePaieSchema)

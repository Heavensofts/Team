import { model, Schema, Model, Document } from 'mongoose';

interface ITypeDemande extends Document{
  nom: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const TypeDemandeSchema = new Schema({

  nom: {
    type: String,
    required: true,
    unique: true,
    index: true
  },

  description: {
    type: String,
    required: false
  },

}, {timestamps: true});

export const TypeDemandeEntity: Model<ITypeDemande> = model('TypeDemande', TypeDemandeSchema);
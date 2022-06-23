import { model, Schema, Model, Document } from 'mongoose';

interface IEtatCivil extends Document{
  _id: string;
  nom: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const EtatCivilSchema = new Schema({

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

export const EtatCivilEntity: Model<IEtatCivil> = model('EtatCivil', EtatCivilSchema);
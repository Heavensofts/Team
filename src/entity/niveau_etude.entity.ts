import { model, Schema, Model, Document } from 'mongoose';

interface INiveauEtude extends Document{
  nom: String;
  description?: String;
  createdAt: Date;
  updatedAt: Date;
}

const NiveauEtudeSchema = new Schema({

  nom: {
    type: String,
    required: true,
    unique: true,
    index: true
  },

  description: {
    type: String,
    required: false
  }

}, {timestamps: true});

export const NiveauEtudeEntity: Model<INiveauEtude> = model('NiveauEtude', NiveauEtudeSchema);
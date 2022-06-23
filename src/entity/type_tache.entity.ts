import { model, Schema, Model, Document } from 'mongoose';

interface ITypeTache extends Document{
  nom: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const TypeTacheSchema = new Schema({

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

export const TypeTacheEntity: Model<ITypeTache> = model('TypeTache', TypeTacheSchema);
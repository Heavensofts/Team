import { model, Schema, Model, Document } from 'mongoose';

interface ITypeContrat extends Document{
  nom: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const TypeContratSchema = new Schema({

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

export const TypeContratEntity: Model<ITypeContrat> = model('TypeContrat', TypeContratSchema);
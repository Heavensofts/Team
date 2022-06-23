import { model, Schema, Model, Document } from "mongoose";

interface ILangue extends Document {
  nom: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const LangueSchema = new Schema({

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

export const LangueEntity: Model<ILangue> = model('Langue', LangueSchema);
import { model, Schema, Model, Document } from "mongoose";

interface ITypeConge extends Document {
  nom: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const TypecongeSchema = new Schema({

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

export const TypeCongeEntity: Model<ITypeConge> = model('TypeConge', TypecongeSchema);
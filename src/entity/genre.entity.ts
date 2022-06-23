import { model, Schema, Model, Document } from 'mongoose';

interface IGenre extends Document{
  nom: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const GenreSchema = new Schema({

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

export const GenreEntity: Model<IGenre> = model('Genre', GenreSchema);
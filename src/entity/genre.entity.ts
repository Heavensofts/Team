import { model, Schema, Model, Document } from 'mongoose';

interface IGenre extends Document{
  nom: string;
  description?: string;
  statut_deleted: string;
  date_deleted?: Date;
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
  },

  date_deleted: {
    type: Date,
    required: false
  },

  statut_deleted: {
    type: Schema.Types.String,
    required: true,
    ref: "Status",
  }

}, {timestamps: true});

export const GenreEntity: Model<IGenre> = model('Genre', GenreSchema);
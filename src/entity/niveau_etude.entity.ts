import { model, Schema, Model, Document } from 'mongoose';

interface INiveauEtude extends Document{
  nom: String;
  description?: String;
  statut_deleted: string;
  date_deleted?: Date;
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

export const NiveauEtudeEntity: Model<INiveauEtude> = model('NiveauEtude', NiveauEtudeSchema);
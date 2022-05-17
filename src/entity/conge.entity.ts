import { model, Schema, Model, Document } from "mongoose";

interface IConge extends Document {
  _id: string;
  date_debut: Date;
  date_fin: Date;
  status: string;
  type_conge: string;
  agent: string;
  statut_deleted: string;
  date_deleted?: Date;
}

const CongeSchema = new Schema({

  type_conge: {
    type: Schema.Types.String,
    required: true,
    ref: 'TypeConge'
  },

  status: {
    type: Schema.Types.String,
    required: true,
    ref: 'Status'
  },

  agent: {
    type: Schema.Types.String,
    required: true,
    ref: 'Agent'
  },

  date_debut: {
    type: Date,
    required: true
  },

  date_fin: {
    type: Date,
    required: true
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

});

export const CongeEntity: Model<IConge> = model('Conge', CongeSchema); 

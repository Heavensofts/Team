import { model, Schema, Model, Document } from "mongoose";

interface IConge extends Document {
  _id: string;
  date_debut: Date;
  date_fin: Date;
  status: string;
  type_conge: string;
  agent: string;
  createdAt: Date;
  updatedAt: Date;
}

const CongeSchema = new Schema({

  type_conge: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'TypeConge'
  },

  status: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Status'
  },

  agent: {
    type: Schema.Types.ObjectId,
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
  }

});

export const CongeEntity: Model<IConge> = model('Conge', CongeSchema); 

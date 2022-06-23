import { model, Schema, Model, Document } from "mongoose";

interface IDemande extends Document {
  _id: string;
  nom: string;
  agent: string;
  description: string;
  type_demande: string;
  documents: string[];
  createdAt: Date;
  updatedAt: Date;
}

const DemandeSchema = new Schema({

  nom:{
    type: String,
    required: true
  },

  agent:{
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Agent'
  },

  type_demande:{
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'TypeDemande'
  },

  description: {
    type: String,
    required: true
  },

  documents:[{
    type: String,
    required: false
  }],

});

export const DemandeEntity: Model<IDemande> = model('Demande', DemandeSchema);
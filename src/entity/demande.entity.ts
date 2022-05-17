import { model, Schema, Model, Document } from "mongoose";

interface IDemande extends Document {
  _id: string;
  nom: string;
  agent: string;
  description: string;
  type_demande: string;
  documents: string[];
  statut_deleted: string;
  date_deleted?: Date;
}

const DemandeSchema = new Schema({

  nom:{
    type: String,
    required: true,
    unique: true,
    index: true
  },

  agent:{
    type: Schema.Types.String,
    required: true,
    ref: 'Agent'
  },

  type_demande:{
    type: Schema.Types.String,
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

  statut_deleted:{
    type: Schema.Types.String,
    required: true,
    ref: 'Status'
  }

});

export const DemandeEntity: Model<IDemande> = model('Demande', DemandeSchema);
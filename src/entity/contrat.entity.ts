import { model, Schema, Model, Document } from "mongoose";

interface IContrat extends Document {
  _id: string;
  agent: string;
  description?: string;
  type_contrat: string;
  poste: string;
  salaire_base: number;
  volume_horaire: number;
  unite_horaire: string;
  date_debut_contrat: Date;
  date_fin_contrat: Date;
  statut_deleted: string;
  date_deleted?: Date;
}

const contratSchema = new Schema({

  agent:{
    type: Schema.Types.String,
    required: true,
    ref: 'Agent'
  },

  type_contrat: {
    type: Schema.Types.String,
    required: true,
    ref: 'TypeContrat'
  },

  description: {
    type: String,
    required: false
  },

  poste:{
    type: Schema.Types.String,
    required: true,
    ref: 'Poste'
  },

  salaire_base:{
    type: Number,
    required: true
  },

  volume_horaire: {
    type: Number,
    required: true
  },

  unite_horaire: {
    type: String,
    required: true
  },

  date_debut_contrat: {
    type: Date,
    required: true
  },

  date_fin_contrat:{
    type: Date,
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

});

export const ContratEntity: Model<IContrat> = model('Contrat', contratSchema);  
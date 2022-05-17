import { model, Schema, Model, Document } from "mongoose";

interface IRecrutement extends Document {
  job_description: string;
  type_contrat: string[];
  candidat: string[];
  debut_recrutement: Date;
  fin_recrutement: Date;
  poste: string;
  recruteur: string[];
  nombre_poste: Number;
  statut_deleted: string;
  date_deleted?: Date;
}

const RecrutementSchema = new Schema({

  job_description:{
    type: String,
    required: true
  },

  type_contrat:[{
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'TypeContrat'
  }],

  candidat:[{
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Candidat'
  }],

  poste:{
    type: String,
    required: true,
    ref: 'Poste'
  },

  recruteur:[{
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Agent'
  }],

  nombre_poste:{
    type: Number,
    required: true
  },

  debut_recrutement:{
    type: Date,
    required: true
  },

  fin_recrutement:{
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

export const RecrutementEntity: Model<IRecrutement> = model('Recrutement', RecrutementSchema);
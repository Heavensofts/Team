import { model, Schema, Model, Document } from "mongoose";

interface IPoste extends Document {
  nom: string;
  superviseur?: string;
  poste_hierarchique: string;
  disponibilite_poste: string;
  departement: string;
  job_description?: string;
  role: string;
  statut_deleted: string;
  date_deleted?: Date;
}

const PosteSchema = new Schema({

  nom:{
    type: String,
    required: true,
    unique: true,
    index: true
  },

  superviseur:{
    type: Schema.Types.String,
    required: false,
    ref: 'Agent'
  },

  poste_hierarchique:{
    type: String,
    required: true
  },

  disponibilite_poste:{
    type: String,
    required: true
  },

  departement:{
    type: Schema.Types.String,
    required: true,
    ref: 'Departement'
  },

  job_description:{
    type: String,
    required: false
  },

  role:{
    type: Schema.Types.String,
    required: true,
    ref: 'Role'
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

export const PosteEntity: Model<IPoste> = model('Poste', PosteSchema);
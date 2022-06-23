import { model, Schema, Model, Document } from "mongoose";

interface IPoste extends Document {
  nom: string;
  superviseur?: string;
  poste_hierarchique: string;
  disponibilite_poste: string;
  departement: string;
  job_description?: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

const PosteSchema = new Schema({

  nom:{
    type: String,
    required: true
  },

  superviseur:{
    type: Schema.Types.ObjectId,
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
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Departement'
  },

  job_description:{
    type: String,
    required: false
  },

  role:{
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Role'
  },

});

export const PosteEntity: Model<IPoste> = model('Poste', PosteSchema);
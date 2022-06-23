import { model, Schema, Model, Document } from "mongoose";

interface IDepartement extends Document{
  _id: string;
  nom: string;
  directeur?: string;
  directeur_adjoint?: string;
  departement_hierarchique: string;
  createdAt: Date;
  updatedAt: Date;
}

const DepartementSchema = new Schema({

  nom:{
    type: String,
    required: true
  },

  directeur:{
    type: Schema.Types.ObjectId,
    required: false,
    ref: 'Agent'
  },
  
  directeur_adjoint:{
    type: Schema.Types.ObjectId,
    required: false,
    ref: 'Agent'
  },

  departement_hierarchique:{
    type: String,
    required: false
  },

});

export const DepartementEntity: Model<IDepartement> = model('Departement', DepartementSchema);
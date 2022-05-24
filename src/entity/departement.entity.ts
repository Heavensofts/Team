import { model, Schema, Model, Document } from "mongoose";

interface IDepartement extends Document{
  _id: string;
  nom: string;
  directeur?: string;
  directeur_adjoint?: string;
  departement_hierarchique: string;
  statut_deleted: string;
  date_deleted?: Date;
}

const DepartementSchema = new Schema({

  nom:{
    type: String,
    required: true,
    unique: true,
    index: true
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

export const DepartementEntity: Model<IDepartement> = model('Departement', DepartementSchema);
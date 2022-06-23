import { model, Schema, Model, Document } from "mongoose";

interface IAgent extends Document{
  _id: string;
  matricule: string;
  nom: string;
  postnom?: string;
  prenom: string;
  date_naissance: Date;
  lieu_naissance: string;
  telephone: string;
  nationalite: string;
  poste: string;
  etat_civil: string;
  status_syndical: string;
  sexe: string;
  niveau_etude: string;
  avatar?: string;
  email: string;
  adresse: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const AgentSchema = new Schema({

  matricule: {
    type: String,
    required: true,
    unique: true,
    index: true
  },

  nom:{
    type: String,
    required: true
  },

  postnom: {
    type: String,
    required: false
  },

  prenom:{
    type: String,
    required: true
  },

  date_naissance:{
    type: Date,
    required: true
  },

  lieu_naissance:{
    type: String,
    required: true
  },

  telephone:{
    type: String,
    required: true
  },
  
  password:{
    type: String,
    required: true
  },

  nationalite:{
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Pays'
  },

  poste:{
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Poste'
  },

  etat_civil:{
    type: Schema.Types.ObjectId,
    required: true,
    ref:'EtatCivil'
  },

  status_syndical:{
    type: String,
    required: true,
    enum: ["Oui", "Non"]
  },

  sexe: {
    type: Schema.Types.ObjectId,
    required: true,
    ref:'Genre'
  },

  niveau_etude:{
    type: Schema.Types.ObjectId,
    required: true,
    ref:'NiveauEtude'
  },

  avatar:{
    type: String,
    required: false
  },

  email:{
    type: String,
    required: true,
    unique: true
  },

  adresse:{
    type: String,
    required: true
  }

});

export const AgentEntity: Model<IAgent> = model('Agent', AgentSchema);
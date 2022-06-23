import { model, Schema, Model, Document } from "mongoose";

interface ICandidat extends Document {
  _id: string;
  nom: string;
  postnom?: string;
  prenom: string;
  date_naissance: Date;
  lieu_naissance: string;
  telephone: string;
  nationalite: string;
  etat_civil: string;
  sexe: string;
  etudes_faites: Object[];
  avatar: string;
  experience_professionnelle: Object[];
  competences: string[];
  documents_joints: string[];
  motivation: string;
  langue: Object[];
  createdAt: Date;
  updatedAt: Date;
}

const CandidatSchema = new Schema({
  nom: {
    type: String,
    required: true,
    index: true
  },

  postnom: {
    type: String,
    required: false,
  },

  prenom: {
    type: String,
    required: true,
    index: true
  },

  date_naissance: {
    type: Date,
    required: true,
  },

  lieu_naissance: {
    type: String,
    required: true,
  },

  telephone: {
    type: String,
    required: true,
  },

  nationalite: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Pays",
  },

  etat_civil: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "EtatCivil",
  },

  sexe: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Sexe",
  },

  avatar: {
    type: String,
    required: false,
  },

  email: {
    type: String,
    required: true,
  },

  etudes_faites: [{
    date_debut: {
      type: Date,
      required: true,
    },

    date_fin: {
      type: Date,
      required: true,
    },

    etablissement: {
      type: String,
      required: true,
    },

    filiale: {
      type: String,
      required: true,
    },

    diplome_obtenu: {
      type: String,
      required: true,
    },
  }],

  experience_professionnelle: [{
    date_debut: {
      type: Date,
      required: true,
    },

    date_fin: {
      type: Date,
      required: true,
    },

    poste: {
      type: String,
      required: true,
    },

    entreprise: {
      type: String,
      required: true,
    },

    reference: [{
      nom:{
        type: String,
        required: true
      },
      telephone:{
        type: String,
        required: true
      }
    }],
  }],

  competences:[{
    type: String,
    required: true
  }],

  documents_joints:[{
    type: String,
    required: false
  }],

  motivation: {
    type: String,
    required: true
  },

  langue: [{

    nom:{
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Langue'
    },

    parlee:{
      type: String,
      required: true,
      enum: ["Maternelle", "Intermediaire", "Moyen", "Avancé"]
    },
    
    ecrit:{
      type: String,
      required: true,
      enum: ["Bon", "Intermediaire", "Moyen", "Avancé"]
    }
  }],

});

export const CandidatEntity: Model<ICandidat> = model('Candidat', CandidatSchema);
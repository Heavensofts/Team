import { model, Schema, Model, Document } from "mongoose";

interface IExperienceProfessionnelle extends Document {
  _id: string;
  date_debut: Date;
  date_fin: Date;
  poste: string;
  entreprise: string;
  reference: object;
  taches: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ExperienceProfessionnelleSchema = new Schema({

  date_debut:{
    type: Date,
    required: true
  },

  date_fin:{
    type: Date,
    required: true
  },

  poste:{
    type: String,
    required: true
  },

  entreprise:{
    type: String,
    required: true
  },

  reference:{
    nom:{
      type: String,
      required: true
    },
    telephone:{
      type: String,
      required: true
    }
  },
  
  taches:[{
    type: String,
    required: true
  }],


});

export const ExperienceProfessionnelleEntity: Model<IExperienceProfessionnelle> = model('ExperienceProfessionnelle', ExperienceProfessionnelleSchema);
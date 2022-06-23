import { model, Schema, Model, Document } from "mongoose";

interface IEtudeFaites extends Document {
  _id: string;
  annee_debut: Date;
  annee_fin: Date;
  etablissement: String;
  filiale: String;
  diplome_obtenu: String;
  createdAt: Date;
  updatedAt: Date;
}

const EtudeFaitesSchema = new Schema({

  annee_debut:{
    type: Date,
    required: true
  },

  annee_fin:{
    type: Date,
    required: true
  },

  etablissement:{
    type: String,
    required: true
  },

  filiale:{
    type: String,
    required: true
  },

  diplome_obtenu:{
    type: String,
    required: true
  },

});

export const EtudeFaitesEntity: Model<IEtudeFaites> = model('EtudeFaites', EtudeFaitesSchema);
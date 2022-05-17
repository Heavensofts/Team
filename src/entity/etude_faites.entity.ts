import { model, Schema, Model, Document } from "mongoose";

interface IEtudeFaites extends Document {
  _id: string;
  annee_debut: Date;
  annee_fin: Date;
  etablissement: String;
  filiale: String;
  diplome_obtenu: String;
  statut_deleted: string;
  date_deleted?: Date;
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

export const EtudeFaitesEntity: Model<IEtudeFaites> = model('EtudeFaites', EtudeFaitesSchema);
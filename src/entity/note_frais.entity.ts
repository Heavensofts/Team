import { model, Schema, Model, Document } from "mongoose";

interface INoteFrais extends Document {
  intitule_mission: string;
  agent: string;
  date_debut_mission: Date;
  date_fin_mission: Date;
  frais_mission: number;
  document_mission?: string[];
  devise: string
  createdAt: Date;
  updatedAt: Date;
}

const NoteFraisSchema = new Schema({

  intitule_mission:{
    type: String,
    required: true
  },

  agent:{
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Agent'
  },

  date_debut_mission:{
    type: Date,
    required: true
  },

  date_fin_mission:{
    type: Date,
    required: true
  },

  frais_mission:{
    type: Number,
    required: true,
    default: 0
  },

  devise:{
    type: String,
    required: true
  },

  document_mission: [{
    type: String,
    required: false
  }]

});

export const NoteFraisEntity: Model<INoteFrais> = model('NoteFrais', NoteFraisSchema);
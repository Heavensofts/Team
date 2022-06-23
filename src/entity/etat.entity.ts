import { model, Schema, Model, Document } from "mongoose";

interface IEtat extends Document {
  justification?: object;
  documents?: string[];
  status: string;
}

const EtatSchema = new Schema({

  justification: {
    raison:{
      type: String,
      required: false
    }
  },

  documents: [{
    type: String,
    required: false
  }],

  status: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Status'
  }

}, {timestamps: true});

export const EtatEntity: Model<IEtat> = model('Etat', EtatSchema);
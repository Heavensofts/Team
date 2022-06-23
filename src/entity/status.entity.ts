import { model, Schema, Model, Document } from "mongoose";

interface IStatus extends Document {
  nom: string;
  type_statut: number
  description?: String;
}

const StatusSchema = new Schema(
  {
    nom: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: false,
    },

    type_statut: {
      type: Number,
      required: true,
      default: 0
    },
    
  },
  { timestamps: true }
);

export const StatusEntity: Model<IStatus> = model(
  "Status",
  StatusSchema
);

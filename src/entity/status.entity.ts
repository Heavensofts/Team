import { model, Schema, Model, Document } from "mongoose";

interface IStatus extends Document {
  nom: String;
  description?: String;
  date_deleted?: Date;
}

const StatusSchema = new Schema(
  {
    nom: {
      type: String,
      required: true,
      index: true,
      unique: true
    },

    description: {
      type: String,
      required: false,
    },
    
    date_deleted: {
      type: Date,
      required: false,
    }
  },
  { timestamps: true }
);

export const StatusEntity: Model<IStatus> = model(
  "Status",
  StatusSchema
);

import { model, Schema, Model, Document } from "mongoose";

interface IAccess extends Document {
  _id: string;
  type_access: string[];
  composants: string[];
  actions: string[];
  statut_deleted: string;
  date_deleted?: Date;
}

const AccessSchema = new Schema({

  type_access: [{
    type: Schema.Types.String,
    required: true,
    ref: 'TypeAccess'
  }],

  composants: [{
    type: String,
    required: true
  }],

  actions: [{
    type: String,
    required: true
  }],

  date_deleted: {
    type: Date,
    required: false
  },

  statut_deleted: {
    type: Schema.Types.String,
    required: true,
    ref: "Status",
  }

}, {timestamps: true});

export const AccessEntity: Model<IAccess> = model('Access', AccessSchema);
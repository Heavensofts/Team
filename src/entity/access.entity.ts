import { model, Schema, Model, Document } from "mongoose";

interface IAccess extends Document {
  _id: string;
  type_access: string[];
  composants: string[];
  actions: string[];
  createdAt: Date;
  updatedAt: Date;
}

const AccessSchema = new Schema({

  type_access: [{
    type: Schema.Types.ObjectId,
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


}, {timestamps: true});

export const AccessEntity: Model<IAccess> = model('Access', AccessSchema);
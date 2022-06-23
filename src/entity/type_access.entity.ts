import { model, Schema, Model, Document } from 'mongoose';

interface ITypeAccess extends Document{
  nom: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const TypeAccessSchema = new Schema({

  nom: {
    type: String,
    required: true,
    unique: true,
    index: true
  },

  description: {
    type: String,
    required: false
  },
}, {timestamps: true});

export const TypeAccessEntity: Model<ITypeAccess> = model('TypeAccess', TypeAccessSchema);
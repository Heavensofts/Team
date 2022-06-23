import { model, Schema, Model, Document } from 'mongoose';

interface IRole extends Document{
  nom: string;
  description?: string;
  access: string;
  createdAt: Date;
  updatedAt: Date;
}

const RoleSchema = new Schema({

  nom: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: false
  },

  access: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Access'
  },  

}, {timestamps: true});

export const RoleEntity: Model<IRole> = model('Role', RoleSchema);
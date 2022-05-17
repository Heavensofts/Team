import { model, Schema, Model, Document } from 'mongoose';

interface IRole extends Document{
  nom: string;
  description?: string;
  access: string;
  statut_deleted: string;
  date_deleted?: Date;
}

const RoleSchema = new Schema({

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

  access: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Access'
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
  

}, {timestamps: true});

export const RoleEntity: Model<IRole> = model('Role', RoleSchema);
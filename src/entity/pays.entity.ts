import { model, Schema, Model, Document } from 'mongoose';

interface IPays extends Document{
  nom: string;
  code: string;
}

const PaysSchema = new Schema({

  nom:{
    type: String,
    required: true,
    unique: true,
    index: true
  },
  
  code:{
    type: String,
    required: true
  }

}, {timestamps: true});

export const PaysEntity: Model<IPays> = model('Pays', PaysSchema);
import { model, Schema, Model, Document } from "mongoose";

interface IPresence extends Document {
  status: string;
  date_heure_arriver?: Date;
  date_heure_depart?: Date;
  agent: string;
  createdAt: Date;
  updatedAt: Date;
}

const PresenceSchema = new Schema({

  status: {
    type: Schema.Types.String,
    required: true,
    ref: 'Status'
  },

  date_heure_arriver: {
    type: Date,
    required: false
  },

  date_heure_depart: {
    type: Date,
    required: false
  },

  agent: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Agent'
  },

}, {timestamps: true});

export const PresenceEntity: Model<IPresence> = model('Presence', PresenceSchema);

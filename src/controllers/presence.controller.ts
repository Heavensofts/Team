import { Request, Response, Handler } from "express";
import mongoose from "mongoose";
import { PresenceEntity } from "../entity/presence.entity";
import { AgentEntity } from "../entity/agent.entity";
import { StatusEntity } from "../entity/status.entity";

export const AddPresence: Handler = async (req: Request, res: Response) => {
  const {
    status,
    agent,
    date_heure_arriver,
    date_heure_depart
  } = req.body;

  if (
    typeof status === undefined || status === null || !status 
    || typeof agent === undefined || agent === null || !agent 
  ) {
    return res
      .status(400)
      .send({ errorMessage: "Veuillez remplir les champ requis" });
  }

  if (!mongoose.Types.ObjectId.isValid(status)) {
    return res.status(400).send({ errorMessage: "Id agent non valide" });
  }

  const checkStatusPresence = await StatusEntity.findById(status);

  if (!checkStatusPresence) {
    return res.status(404).send({
      errorMessage: "Aucun statut présence correspondant",
    });
  }

  if (!mongoose.Types.ObjectId.isValid(agent)) {
    return res.status(400).send({ errorMessage: "Id agent non valide" });
  }

  const checkMatriculeAgent = await AgentEntity.findById(agent);

  if (!checkMatriculeAgent) {
    return res.status(404).send({
      errorMessage: "Aucun agent correspondant",
    });
  }

  const presence = new PresenceEntity({
    status: checkStatusPresence._id,
    agent: checkMatriculeAgent._id,
    date_heure_arriver,
    date_heure_depart,
  });

  await presence
    .save()
    .then((result) => {
      res.status(200).send({ data: result, message: "Success" });
    })
    .catch((error) => {
      console.log(error.message);
      return res.status(500).send({
        errorMessage: "Une erreur s'est produite, veuillez réessayer",
      });
    });
};

export const GetPresences: Handler = async (req: Request, res: Response) => {
  const checkStatut = await StatusEntity.findOne({ nom: "Displayed" });

  await PresenceEntity.find({ statut_deleted: checkStatut.nom })
  .populate({ path: "status", select: "nom -_id" })
  .populate({ path: "agent", select: ["prenom", "nom", "postnom"] })
    .then((presence) => {
      if (!presence) {
        return res
          .status(404)
          .send({ errorMessage: "Aucune présence trouvée" });
      }
      res.status(200).send(presence);
    })
    .catch((error) => {
      return res.status(500).send({
        errorMessage: "Une erreur s'est produite, veuillez réessayer",
      });
    });
};

export const GetPresenceById: Handler = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ errorMessage: "Id invalid" });
  }

  await PresenceEntity.findById(id)
    .populate({ path: "status", select: "nom -_id" })
    .populate({ path: "agent", select: ["prenom", "nom", "postnom"] })
    .then((noteFrais) => {
      if (!noteFrais) {
        return res
          .status(404)
          .send({ errorMessage: "Aucune présence trouvée" });
      }
      res.status(200).send(noteFrais);
    })
    .catch((error) => {
      return res.status(500).send({
        errorMessage: "Une erreur s'est produite, veuillez réessayer",
      });
    });
};

export const UpdatePresence: Handler = async (req: Request, res: Response) => {
  const id = req.params.id;
  const update = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ errorMessage: "Id Invalid" });
  }

  if (
    typeof update.status === undefined || update.status === null || !update.status 
    || typeof update.agent === undefined || update.agent === null || !update.agent 
  ) {
    return res
      .status(400)
      .send({ errorMessage: "Veuillez remplir les champ requis" });
  }

  if (!mongoose.Types.ObjectId.isValid(update.status)) {
    return res.status(400).send({ errorMessage: "Id agent non valide" });
  }

  const checkStatusPresence = await StatusEntity.findById(update.status);

  if (!checkStatusPresence) {
    return res.status(404).send({
      errorMessage: "Aucun statut présence correspondant",
    });
  }

  if (!mongoose.Types.ObjectId.isValid(update.agent)) {
    return res.status(400).send({ errorMessage: "Id agent non valide" });
  }

  const checkMatriculeAgent = await AgentEntity.findById(update.agent);

  if (!checkMatriculeAgent) {
    return res.status(404).send({
      errorMessage: "Aucun agent correspondant",
    });
  }

  await PresenceEntity.findByIdAndUpdate(id, {
    status: checkStatusPresence._id,
    agent: checkMatriculeAgent._id,
    date_heure_arriver: update.date_heure_arriver,
    date_heure_depart: update.date_heure_depart
  })
    .then((result) => {
      if (!result) {
        return res
          .status(400)
          .send({ errorMessage: "Mise à jour non aboutie" });
      }

      return res.status(200).send({ message: "Mise à jour effectué" });
    })
    .catch((error) => {
      return res.status(500).send({
        errorMessage: "Une erreur s'est produite lors de la mise à jour ",
      });
    });
};

export const DeletePresence: Handler = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ errorMessage: "Id Invalid" });
  }

  await PresenceEntity.findByIdAndRemove(id)
    .then((result) => {
      if (!result) {
        return res
          .status(400)
          .send({ errorMessage: "Suppression non aboutie" });
      }

      return res.status(200).send({ message: "Suppression effectué" });
    })
    .catch((error) => {
      return res.status(500).send({
        errorMessage: "Une erreur s'est produite lors de la suppression",
      });
    });
};
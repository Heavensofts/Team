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

  let checkStatut = await StatusEntity.findOne({ nom: "Displayed" });

  if (!checkStatut) {

    const myStatut = new StatusEntity({
      nom: 'Displayed', description: "Le statut qui rend les éléments visibles", type_statut: 0
    });

    await myStatut.save().then((result) => {
      checkStatut = result;
    }).catch((error) => {
      return res.status(500).send({
        errorMessage: "Une erreur s'est produite, veuillez réessayer",
      });
    });
  }

  let checkStatut2 = await StatusEntity.findOne({nom: 'No-displayed'});
  if(!checkStatut2){
    const myStatut = new StatusEntity({
      nom: 'No-displayed', 
      description: "Le statut qui rend les éléments invisibles", 
      type_statut: 0
    });
  
    await myStatut.save().then((result) => {
      checkStatut = result;
    }).catch((error) => {
      console.log(error.message);
      return res.status(500).send({
        errorMessage: "Une erreur s'est produite, veuillez réessayer",
      });
    });
  }

  const checkStatusPresence = await StatusEntity.findOne({ nom: status });

  if (!checkStatusPresence) {
    return res.status(404).send({
      errorMessage: "Aucun statut présence correspondant",
    });
  }

  const checkMatriculeAgent = await AgentEntity.findOne({ matricule: agent });

  if (!checkMatriculeAgent) {
    return res.status(404).send({
      errorMessage: "Aucun agent correspondant",
    });
  }

  const presence = new PresenceEntity({
    status: checkStatusPresence.nom,
    agent: checkMatriculeAgent.matricule,
    date_heure_arriver,
    date_heure_depart,
    statut_deleted: checkStatut.nom,
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

  const checkStatut = await StatusEntity.findOne({ nom: "Displayed" });

  if (!checkStatut) {
    return res.status(404).send({
      errorMessage: "Aucun statut correspondant",
    });
  }

  const checkStatusPresence = await StatusEntity.findOne({ nom: update.status });

  if (!checkStatusPresence) {
    return res.status(404).send({
      errorMessage: "Aucun statut présence correspondant",
    });
  }

  const checkMatriculeAgent = await AgentEntity.findOne({ matricule: update.agent });

  if (!checkMatriculeAgent) {
    return res.status(404).send({
      errorMessage: "Aucun agent correspondant",
    });
  }

  await PresenceEntity.findByIdAndUpdate(id, {
    status: checkStatusPresence.nom,
    agent: checkMatriculeAgent.matricule,
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
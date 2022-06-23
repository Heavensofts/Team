import { Request, Response, Handler } from "express";
import mongoose from "mongoose";
import { DemandeEntity } from "../entity/demande.entity";
import { TypeDemandeEntity } from "../entity/type_demande.entity";
import { StatusEntity } from "../entity/status.entity";
import { AgentEntity } from "../entity/agent.entity";
import path from "path";
import mkdirp from "mkdirp";
import fs from "fs-extra";

export const AddDemande: Handler = async (req: Request, res: Response) => {
  const { nom, agent, type_demande, description, documents } = req.body;

  if (
    typeof nom === undefined ||
    nom === null ||
    !nom ||
    typeof agent === undefined ||
    agent === null ||
    !agent ||
    typeof type_demande === undefined ||
    type_demande === null ||
    !type_demande ||
    typeof description === undefined ||
    description === null ||
    !description
    
  ) {
    return res
      .status(400)
      .send({ errorMessage: "Veuillez remplir les champ requis" });
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

  if (!mongoose.Types.ObjectId.isValid(type_demande)) {
    return res.status(400).send({ errorMessage: "Id type demande non valide" });
  }

  const checkTypeDemande = await TypeDemandeEntity.findById(type_demande);

  if (!checkTypeDemande) {
    return res.status(404).send({
      errorMessage: "Aucun type demande correspondant",
    });
  }

  let myDocPath = [];
  const myUser: any = req['user'];

  const demande = new DemandeEntity({
    nom: nom.toUpperCase(),
    agent: checkMatriculeAgent._id,
    type_demande: checkTypeDemande._id,
    description
  });

  await demande
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

export const GetDemandes: Handler = async (req: Request, res: Response) => {
  const checkStatut = await StatusEntity.findOne({ nom: "Displayed" });

  await DemandeEntity.find({ statut_deleted: checkStatut.nom })
    .populate({ path: "type_demande", select: "nom -_id" })
    .populate({ path: "agent", select: ["prenom", "nom", "postnom"] })
    .then((demande) => {
      if (!demande) {
        return res.status(404).send({ errorMessage: "Aucune demande trouvée" });
      }
      res.status(200).send(demande);
    })
    .catch((error) => {
      return res.status(500).send({
        errorMessage: "Une erreur s'est produite, veuillez réessayer",
      });
    });
};

export const GetDemandeById: Handler = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ errorMessage: "Id invalid" });
  }

  await DemandeEntity.findById(id)
    .populate({ path: "type_demande", select: "nom -_id" })
    .populate({ path: "agent", select: ["prenom", "nom", "postnom"] })
    .then((demande) => {
      if (!demande) {
        return res.status(404).send({ errorMessage: "Aucune demande trouvée" });
      }
      res.status(200).send(demande);
    })
    .catch((error) => {
      return res.status(500).send({
        errorMessage: "Une erreur s'est produite, veuillez réessayer",
      });
    });
};

export const UpdateDemande: Handler = async (req: Request, res: Response) => {
  const id = req.params.id;
  const update = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .send({ errorMessage: "Id Invalid" });
  }

  if (
    typeof update.nom === undefined ||
    update.nom === null || !update.nom ||
    typeof update.agent === undefined ||
    update.agent === null || !update.agent ||
    typeof update.type_demande === undefined ||
    update.type_demande === null || !update.type_demande ||
    typeof update.description === undefined ||
    update.description === null || !update.description
    
  ) {
    return res
      .status(400)
      .send({ errorMessage: "Veuillez remplir les champ requis" });
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

  if (!mongoose.Types.ObjectId.isValid(update.type_demande)) {
    return res.status(400).send({ errorMessage: "Id type demande non valide" });
  }

  const checkTypeDemande = await TypeDemandeEntity.findById(update.type_demande);

  if (!checkTypeDemande) {
    return res.status(404).send({
      errorMessage: "Aucun type demande correspondant",
    });
  }

  await DemandeEntity.findByIdAndUpdate(id, {
    nom: update.nom.toUpperCase(),
    agent: checkMatriculeAgent._id,
    type_demande: checkTypeDemande._id,
    description: update.description
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

export const DeleteDemande: Handler = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .send({ errorMessage: "Id Invalid" });
  }
  await DemandeEntity.findByIdAndRemove(id)
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
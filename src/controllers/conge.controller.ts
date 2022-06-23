import { Request, Response, Handler } from "express";
import mongoose from "mongoose";
import { CongeEntity } from "../entity/conge.entity";
import { AgentEntity } from "../entity/agent.entity";
import { StatusEntity } from "../entity/status.entity";
import { TypeCongeEntity } from "../entity/type_conge.entity";


export const AddConge: Handler = async (req: Request, res: Response) => {
  const { date_debut, date_fin, status, type_conge, agent } = req.body;

  if (
    typeof date_debut === undefined ||
    typeof date_debut == null ||
    !date_debut ||
    typeof date_fin === undefined ||
    typeof date_fin == null ||
    !date_fin ||
    typeof status === undefined ||
    typeof status == null ||
    !status ||
    typeof type_conge === undefined ||
    typeof type_conge == null ||
    !type_conge ||
    typeof agent === undefined ||
    agent === null ||
    !agent
  ) {
    return res
      .status(400)
      .send({ errorMessage: "Veuillez remplir les champs requis" });
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

  if (!mongoose.Types.ObjectId.isValid(type_conge)) {
    return res.status(400).send({ errorMessage: "Id type congé non valide" });
  }

  const checkTypeConge = await TypeCongeEntity.findById(type_conge);

  if (!checkTypeConge) {
    return res.status(404).send({
      errorMessage: "Type congé non correspondant",
    });
  }

  if (!mongoose.Types.ObjectId.isValid(status)) {
    return res.status(400).send({ errorMessage: "Id status congé non valide" });
  }

  const checkStatusConge = await StatusEntity.findById(status);

  if (!checkStatusConge) {
    return res.status(404).send({
      errorMessage: "status congé non correspondant",
    });
  }

  const conge = new CongeEntity({
    date_debut,
    date_fin,
    status: checkStatusConge._id,
    type_conge: checkTypeConge._id,
    agent: checkMatriculeAgent._id,
  });

  await conge
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

export const GetConges: Handler = async (req: Request, res: Response) => {

  await CongeEntity.find()
  .populate({ path: "status", select: "nom -_id" })
  .populate({ path: "type_conge", select: "nom -_id" })
  .populate({ path: "agent", select: ["prenom", "nom", "postnom"] })
    .then((conge) => {
      if (!conge) {
        return res.status(404).send({ errorMessage: "Aucun congé trouvé" });
      }
      res.status(200).send(conge);
    })
    .catch((error) => {
      return res.status(500).send({
        errorMessage: "Une erreur s'est produite, veuillez réessayer",
      });
    });
};

export const GetCongeById: Handler = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ errorMessage: "Id invalid" });
  }

  await CongeEntity.findById(id)
    .populate({ path: "status", select: "nom -_id" })
    .populate({ path: "type_conge", select: "nom -_id" })
    .populate({ path: "agent", select: ["prenom", "nom", "postnom"] })
    .then((conge) => {
      if (!conge) {
        return res.status(404).send({ errorMessage: "Aucun congé trouvé" });
      }
      res.status(200).send(conge);
    })
    .catch((error) => {
      return res.status(500).send({
        errorMessage: "Une erreur s'est produite, veuillez réessayer",
      });
    });
};

export const UpdateConge: Handler = async (req: Request, res: Response) => {
  const id = req.params.id;
  const update = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ errorMessage: "Id Invalid" });
  }

  if (
    typeof update.date_debut === undefined ||
    typeof update.date_debut == null ||
    !update.date_debut ||
    typeof update.date_fin === undefined ||
    typeof update.date_fin == null ||
    !update.date_fin ||
    typeof update.status === undefined ||
    typeof update.status == null ||
    !update.status ||
    typeof update.type_conge === undefined ||
    typeof update.type_conge == null ||
    !update.type_conge ||
    typeof update.agent === undefined ||
    update.agent === null ||
    !update.agent
  ) {
    return res
      .status(400)
      .send({ errorMessage: "Veuillez remplir les champs requis" });
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

  if (!mongoose.Types.ObjectId.isValid(update.type_conge)) {
    return res.status(400).send({ errorMessage: "Id type congé non valide" });
  }

  const checkTypeConge = await TypeCongeEntity.findById(update.type_conge);

  if (!checkTypeConge) {
    return res.status(404).send({
      errorMessage: "Type congé non correspondant",
    });
  }

  if (!mongoose.Types.ObjectId.isValid(update.status)) {
    return res.status(400).send({ errorMessage: "Id status congé non valide" });
  }

  const checkStatusConge = await StatusEntity.findById(update.status);

  if (!checkStatusConge) {
    return res.status(404).send({
      errorMessage: "status congé non correspondant",
    });
  }

  await CongeEntity.findByIdAndUpdate(id, {
    date_debut: update.date_debut,
    date_fin: update.date_fin,
    status: checkStatusConge._id,
    type_conge: checkTypeConge._id,
    agent: checkMatriculeAgent._id,
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

export const DeleteConge: Handler = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ errorMessage: "Id Invalid" });
  }

  await CongeEntity.findByIdAndRemove(id)
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

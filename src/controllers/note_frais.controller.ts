import { Request, Response, Handler } from "express";
import mongoose from "mongoose";
import { NoteFraisEntity } from "../entity/note_frais.entity";
import { AgentEntity } from "../entity/agent.entity";
import { StatusEntity } from "../entity/status.entity";

export const AddNoteFrais: Handler = async (req: Request, res: Response) => {
  const {
    intitule_mission,
    agent,
    date_debut_mission,
    date_fin_mission,
    devise,
    frais_mission
  } = req.body;

  if (
    typeof intitule_mission === undefined ||
    intitule_mission === null ||
    !intitule_mission ||
    typeof agent === undefined ||
    agent === null ||
    !agent ||
    typeof date_debut_mission === undefined ||
    date_debut_mission === null ||
    !date_debut_mission ||
    typeof date_fin_mission === undefined ||
    date_fin_mission === null ||
    !date_fin_mission ||
    typeof frais_mission === undefined ||
    frais_mission === null ||
    !frais_mission ||
    typeof devise === undefined ||
    devise === null ||
    !devise
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

  const checkMatriculeAgent = await AgentEntity.findOne({ matricule: agent });

  if (!checkMatriculeAgent) {
    return res.status(404).send({
      errorMessage: "Aucun agent correspondant",
    });
  }

  const noteFrais = new NoteFraisEntity({
    intitule_mission,
    agent: checkMatriculeAgent.matricule,
    date_debut_mission,
    date_fin_mission,
    devise,
    frais_mission,
    statut_deleted: checkStatut.nom,
  });

  await noteFrais
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

export const GetNoteFrais: Handler = async (req: Request, res: Response) => {
  const checkStatut = await StatusEntity.findOne({ nom: "Displayed" });

  await NoteFraisEntity.find({ statut_deleted: checkStatut.nom })
    .then((noteFrais) => {
      if (!noteFrais) {
        return res
          .status(404)
          .send({ errorMessage: "Aucune note de frais trouvée" });
      }
      res.status(200).send(noteFrais);
    })
    .catch((error) => {
      return res.status(500).send({
        errorMessage: "Une erreur s'est produite, veuillez réessayer",
      });
    });
};

export const GetNoteFraisById: Handler = async (
  req: Request,
  res: Response
) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ errorMessage: "Id invalid" });
  }

  await NoteFraisEntity.findById(id)
    .then((noteFrais) => {
      if (!noteFrais) {
        return res
          .status(404)
          .send({ errorMessage: "Aucune note de frais trouvée" });
      }
      res.status(200).send(noteFrais);
    })
    .catch((error) => {
      return res.status(500).send({
        errorMessage: "Une erreur s'est produite, veuillez réessayer",
      });
    });
};

export const UpdateNoteFrais: Handler = async (req: Request, res: Response) => {
  const id = req.params.id;
  const update = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ errorMessage: "Id Invalid" });
  }

  if (
    typeof update.intitule_mission === undefined ||
    update.intitule_mission === null ||
    !update.intitule_mission ||
    typeof update.agent === undefined ||
    update.agent === null ||
    !update.agent ||
    typeof update.date_debut_mission === undefined ||
    update.date_debut_mission === null ||
    !update.date_debut_mission ||
    typeof update.date_fin_mission === undefined ||
    update.date_fin_mission === null ||
    !update.date_fin_mission ||
    typeof update.frais_mission === undefined ||
    update.frais_mission === null ||
    !update.frais_mission ||
    typeof update.devise === undefined ||
    update.devise === null ||
    !update.devise
  ) {
    return res
      .status(400)
      .send({ errorMessage: "Veuillez remplir les champ requis" });
  }

  const checkMatriculeAgent = await AgentEntity.findOne({
    matricule: update.agent,
  });

  if (!checkMatriculeAgent) {
    return res.status(404).send({
      errorMessage: "Aucun agent correspondant",
    });
  }

  await NoteFraisEntity.findByIdAndUpdate(id, {
    intitule_mission: update.intitule_mission,
    agent: checkMatriculeAgent.matricule,
    date_debut_mission: update.date_debut_mission,
    date_fin_mission: update.date_fin_mission,
    frais_mission: update.frais_mission,
    devise: update.devise,
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

export const DeleteNoteFrais: Handler = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ errorMessage: "Id Invalid" });
  }

  const checkStatut = await StatusEntity.findOne({ nom: "No-displayed" });

  await NoteFraisEntity.findByIdAndUpdate(id, {
    statut_deleted: checkStatut.nom,
    date_deleted: Date.now(),
  })
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

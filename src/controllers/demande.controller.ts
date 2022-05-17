import { Request, Response, Handler } from "express";
import mongoose from "mongoose";
import { DemandeEntity } from "../entity/demande.entity";
import { TypeDemandeEntity } from "../entity/type_demande.entity";
import { StatusEntity } from "../entity/status.entity";
import { AgentEntity } from "../entity/agent.entity";

export const AddDemande: Handler = async (req: Request, res: Response) => {
  const { nom, agent, type_demande, description } = req.body;

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

  const checkStatut = await StatusEntity.findOne({ nom: "Displayed" });

  if (!checkStatut) {
    return res.status(404).send({
      errorMessage: "Aucun statut correspondant",
    });
  }

  const checkMatriculeAgent = await AgentEntity.findOne({matricule: agent});

  if (!checkMatriculeAgent) {
    return res.status(404).send({
      errorMessage: "Aucun agent correspondant",
    });
  }

  const checkTypeDemande = await TypeDemandeEntity.findOne({nom: type_demande.toUpperCase()});

  if (!checkTypeDemande) {
    return res.status(404).send({
      errorMessage: "Aucun type demande correspondant",
    });
  }

  const demande = new DemandeEntity({
    nom: nom.toUpperCase(),
    agent: checkMatriculeAgent.matricule,
    type_demande: checkTypeDemande.nom,
    description,
    statut_deleted: checkStatut.nom,
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

  const checkMatriculeAgent = await AgentEntity.findOne({matricule: update.agent});

  if (!checkMatriculeAgent) {
    return res.status(404).send({
      errorMessage: "Aucun agent correspondant",
    });
  }

  const checkTypeDemande = await TypeDemandeEntity.findOne({nom: update.type_demande.toUpperCase()});

  if (!checkTypeDemande) {
    return res.status(404).send({
      errorMessage: "Aucun type demande correspondant",
    });
  }

  await DemandeEntity.findByIdAndUpdate(id, {
    nom: update.nom.toUpperCase(),
    agent: checkMatriculeAgent.matricule,
    type_demande: checkTypeDemande.nom,
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

  const checkStatut = await StatusEntity.findOne({nom: 'No-displayed'});

  await DemandeEntity.findByIdAndUpdate(id, { 
    statut_deleted: checkStatut.nom, 
    date_deleted: Date.now() 
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
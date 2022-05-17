import { Request, Response, Handler } from "express";
import mongoose from "mongoose";
import { ContratEntity } from "../entity/contrat.entity";
import { AgentEntity } from "../entity/agent.entity";
import { StatusEntity } from "../entity/status.entity";
import { TypeContratEntity } from '../entity/type_contrat.entity';
import { PosteEntity } from "../entity/poste.entity";

export const AddContrat: Handler = async (req: Request, res: Response) => {
  const {
    description,
    type_contrat,
    poste,
    salaire_base,
    volume_horaire,
    unite_horaire,
    date_debut_contrat,
    agent,
    date_fin_contrat
  } = req.body;

  if (
       typeof type_contrat === undefined || typeof type_contrat == null || !type_contrat 
    || typeof salaire_base === undefined || typeof salaire_base == null || !salaire_base
    || typeof poste === undefined || typeof poste == null || !poste
    || typeof volume_horaire === undefined || typeof volume_horaire == null || !volume_horaire
    || typeof unite_horaire === undefined || typeof unite_horaire == null || !unite_horaire
    || typeof date_debut_contrat === undefined || typeof date_debut_contrat == null || !date_debut_contrat
    || typeof date_fin_contrat === undefined || typeof date_fin_contrat == null || !date_fin_contrat
    || typeof agent === undefined || agent === null || !agent 
  ) {
    return res
      .status(400)
      .send({ errorMessage: "Veuillez remplir les champs requis" });
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

  const checkPoste = await PosteEntity.findOne({ nom: poste.toUpperCase() });

  if (!checkPoste) {
    return res.status(404).send({
      errorMessage: "Poste non correspondant",
    });
  }

  const checkTypeContrat = await TypeContratEntity.findOne({ nom: type_contrat.toUpperCase() });

  if (!checkTypeContrat) {
    return res.status(404).send({
      errorMessage: "Type contrat non correspondant",
    });
  }

  const contrat = new ContratEntity({
    description,
    salaire_base,
    volume_horaire,
    unite_horaire,
    date_debut_contrat,
    date_fin_contrat,
    type_contrat: checkTypeContrat.nom,
    poste: checkPoste.nom,
    agent: checkMatriculeAgent.matricule,
    statut_deleted: checkStatut.nom
  });

  await contrat
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

export const GetContrats: Handler = async (req: Request, res: Response) => {
  const checkStatut = await StatusEntity.findOne({ nom: "Displayed" });

  await ContratEntity.find({ statut_deleted: checkStatut.nom })
    .then((contrat) => {
      if (!contrat) {
        return res
          .status(404)
          .send({ errorMessage: "Aucun contrat trouvé" });
      }
      res.status(200).send(contrat);
    })
    .catch((error) => {
      return res.status(500).send({
        errorMessage: "Une erreur s'est produite, veuillez réessayer",
      });
    });
};

export const GetContratById: Handler = async (
  req: Request,
  res: Response
) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ errorMessage: "Id invalid" });
  }

  await ContratEntity.findById(id)
    .then((contrat) => {
      if (!contrat) {
        return res
          .status(404)
          .send({ errorMessage: "Aucun contrat trouvé" });
      }
      res.status(200).send(contrat);
    })
    .catch((error) => {
      return res.status(500).send({
        errorMessage: "Une erreur s'est produite, veuillez réessayer",
      });
    });
};

export const UpdateContrat: Handler = async (req: Request, res: Response) => {
  const id = req.params.id;
  const update = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ errorMessage: "Id Invalid" });
  }

  if (
    typeof update.type_contrat === undefined || typeof update.type_contrat == null || !update.type_contrat 
 || typeof update.salaire_base === undefined || typeof update.salaire_base == null || !update.salaire_base
 || typeof update.poste === undefined || typeof update.poste == null || !update.poste
 || typeof update.volume_horaire === undefined || typeof update.volume_horaire == null || !update.volume_horaire
 || typeof update.unite_horaire === undefined || typeof update.unite_horaire == null || !update.unite_horaire
 || typeof update.date_debut_contrat === undefined || typeof update.date_debut_contrat == null || !update.date_debut_contrat
 || typeof update.date_fin_contrat === undefined || typeof update.date_fin_contrat == null || !update.date_fin_contrat
 || typeof update.agent === undefined || update.agent === null || !update.agent 
) {
 return res
   .status(400)
   .send({ errorMessage: "Veuillez remplir les champs requis" });
}

const checkMatriculeAgent = await AgentEntity.findOne({ matricule: update.agent });

if (!checkMatriculeAgent) {
 return res.status(404).send({
   errorMessage: "Aucun agent correspondant",
 });
}

const checkPoste = await PosteEntity.findOne({ nom: update.poste.toUpperCase() });

if (!checkPoste) {
 return res.status(404).send({
   errorMessage: "Poste non correspondant",
 });
}

const checkTypeContrat = await TypeContratEntity.findOne({ nom: update.type_contrat.toUpperCase() });

if (!checkTypeContrat) {
 return res.status(404).send({
   errorMessage: "Type contrat non correspondant",
 });
}

  await ContratEntity.findByIdAndUpdate(id, {
    description: update?.description,
    salaire_base: update.salaire_base,
    volume_horaire: update.volume_horaire,
    unite_horaire: update.unite_horaire,
    date_debut_contrat: update.date_debut_contrat,
    date_fin_contrat: update.date_fin_contrat,
    type_contrat: checkTypeContrat.nom,
    poste: checkPoste.nom,
    agent: checkMatriculeAgent.matricule
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

export const DeleteContrat: Handler = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ errorMessage: "Id Invalid" });
  }

  const checkStatut = await StatusEntity.findOne({ nom: "No-displayed" });

  await ContratEntity.findByIdAndUpdate(id, {
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
import { Request, Response, Handler } from "express";
import mongoose from "mongoose";
import { FichePaieEntity } from "../entity/fiche_paie.entity";
import { AgentEntity } from "../entity/agent.entity";
import { StatusEntity } from "../entity/status.entity";

export const AddFichePaie: Handler = async (req: Request, res: Response) => {
  const {
    salaire_brut,
    salaire_net,
    cession_salaire,
    saisie_salaire,
    acompte,
    heure_supplementaire,
    remboursement,
    agent,
    prime,
    allocation_familiale,
    nombre_enfants,
    loyer,
    impot,
    cotisation_sociale,
  } = req.body;

  if (
       typeof salaire_brut === undefined || !salaire_brut 
    || typeof salaire_net === undefined || !salaire_net 
    || typeof cession_salaire === undefined || !cession_salaire 
    || typeof saisie_salaire === undefined || !saisie_salaire 
    || typeof acompte === undefined || !acompte 
    || typeof heure_supplementaire === undefined || !heure_supplementaire 
    || typeof remboursement === undefined || !remboursement 
    || typeof prime === undefined || !prime 
    || typeof allocation_familiale === undefined || allocation_familiale === null || !allocation_familiale
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

  const fichePaie = new FichePaieEntity({
    salaire_brut,
    salaire_net,
    cession_salaire,
    saisie_salaire,
    acompte,
    heure_supplementaire,
    remboursement,
    prime,
    agent: checkMatriculeAgent.matricule,
    allocation_familiale,
    nombre_enfants,
    loyer,
    impot,
    cotisation_sociale,
    statut_deleted: checkStatut.nom,
  });

  await fichePaie
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

export const GetFichePaies: Handler = async (req: Request, res: Response) => {
  const checkStatut = await StatusEntity.findOne({ nom: "Displayed" });

  await FichePaieEntity.find({ statut_deleted: checkStatut.nom })
    .then((fichePaie) => {
      if (!fichePaie) {
        return res
          .status(404)
          .send({ errorMessage: "Aucune fiche de paie trouvée" });
      }
      res.status(200).send(fichePaie);
    })
    .catch((error) => {
      return res.status(500).send({
        errorMessage: "Une erreur s'est produite, veuillez réessayer",
      });
    });
};

export const GetFichePaieById: Handler = async (
  req: Request,
  res: Response
) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ errorMessage: "Id invalid" });
  }

  await FichePaieEntity.findById(id)
    .then((fichePaie) => {
      if (!fichePaie) {
        return res
          .status(404)
          .send({ errorMessage: "Aucune fiche de paie trouvée" });
      }
      res.status(200).send(fichePaie);
    })
    .catch((error) => {
      return res.status(500).send({
        errorMessage: "Une erreur s'est produite, veuillez réessayer",
      });
    });
};

export const UpdateFichePaie: Handler = async (req: Request, res: Response) => {
  const id = req.params.id;
  const update = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ errorMessage: "Id Invalid" });
  }

  if (
    typeof update.salaire_brut === undefined ||
    !update.salaire_brut ||
    typeof update.agent === undefined ||
    update.agent === null ||
    !update.agent ||
    typeof update.salaire_net === undefined ||
    !update.salaire_net ||
    typeof update.cession_salaire === undefined ||
    !update.cession_salaire ||
    typeof update.saisie_salaire === undefined ||
    !update.saisie_salaire ||
    typeof update.acompte === undefined ||
    !update.acompte ||
    typeof update.heure_supplementaire === undefined ||
    !update.heure_supplementaire ||
    typeof update.remboursement === undefined ||
    !update.remboursement ||
    typeof update.prime === undefined ||
    !update.prime ||
    typeof update.allocation_familiale === undefined ||
    update.allocation_familiale === null ||
    !update.allocation_familiale
  ) {
    return res
      .status(400)
      .send({ errorMessage: "Veuillez remplir les champ requis" });
  }

  const checkMatriculeAgent = await AgentEntity.findOne({ matricule: update.agent });

  if (!checkMatriculeAgent) {
    return res.status(404).send({
      errorMessage: "Aucun agent correspondant",
    });
  }

  await FichePaieEntity.findByIdAndUpdate(id, {
    salaire_brut: update.salaire_brut,
    salaire_net: update.salaire_net,
    cession_salaire: update.cession_salaire,
    saisie_salaire: update.saisie_salaire,
    acompte: update.acompte,
    heure_supplementaire: update.heure_supplementaire,
    remboursement: update.remboursement,
    prime: update.prime,
    agent: checkMatriculeAgent.matricule,
    allocation_familiale: update.allocation_familiale,
    nombre_enfants: update.nombre_enfants,
    loyer: update.loyer,
    impot: update.impot,
    cotisation_sociale: update.cotisation_sociale
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

export const DeleteFichePaie: Handler = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ errorMessage: "Id Invalid" });
  }

  const checkStatut = await StatusEntity.findOne({ nom: "No-displayed" });

  await FichePaieEntity.findByIdAndUpdate(id, {
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
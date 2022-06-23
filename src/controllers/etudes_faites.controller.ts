import { Request, Response, Handler } from "express";
import mongoose from "mongoose";
import { EtudeFaitesEntity } from "../entity/etude_faites.entity";
import { StatusEntity } from "../entity/status.entity";

export const AddEtudeFaites: Handler = async (req: Request, res: Response) => {
  const { annee_debut, annee_fin, etablissement, filiale, diplome_obtenu } = req.body;

  if (
    typeof annee_debut === undefined ||
    annee_debut === null ||
    !annee_debut ||
     typeof annee_fin === undefined ||
    annee_fin === null ||
    !annee_fin ||
    typeof etablissement === undefined ||
    etablissement === null ||
    !etablissement ||
    typeof filiale === undefined ||
    filiale === null ||
    !filiale ||
    typeof diplome_obtenu === undefined ||
    diplome_obtenu === null ||
    !diplome_obtenu
  ) {
    return res
      .status(400)
      .send({ errorMessage: "Veuillez remplir les champ requis" });
  }

  const etudeFaites = new EtudeFaitesEntity({
    annee_debut: annee_debut, 
    annee_fin: annee_fin, 
    etablissement, 
    filiale, 
    diplome_obtenu, 
  });

  await etudeFaites
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

export const GetEtudeFaites: Handler = async (req: Request, res: Response) => {

  await EtudeFaitesEntity.find()
    .then((etudeFaites) => {
      if (!etudeFaites) {
        return res.status(404).send({ errorMessage: "Aucune étude faites trouvé" });
      }
      res.status(200).send(etudeFaites);
    })
    .catch((error) => {
      return res.status(500).send({
        errorMessage: "Une erreur s'est produite, veuillez réessayer",
      });
    });
};

export const GetEtudeFaitesById: Handler = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ errorMessage: "Id invalid" });
  }

  await EtudeFaitesEntity.findById(id)
    .then((etudeFaites) => {
      if (!etudeFaites) {
        return res.status(404).send({ errorMessage: "Aucune étude faites trouvée" });
      }
      res.status(200).send(etudeFaites);
    })
    .catch((error) => {
      return res.status(500).send({
        errorMessage: "Une erreur s'est produite, veuillez réessayer",
      });
    });
};

export const UpdateEtudeFaites: Handler = async (req: Request, res: Response) => {
  const id = req.params.id;
  const update = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .send({ errorMessage: "Id Invalid" });
  }

  if (
    typeof update.annee_debut === undefined ||
    update.annee_debut === null ||
    !update.annee_debut ||
     typeof update.annee_fin === undefined ||
    update.annee_fin === null ||
    !update.annee_fin ||
    typeof update.etablissement === undefined ||
    update.etablissement === null ||
    !update.etablissement ||
    typeof update.filiale === undefined ||
    update.filiale === null ||
    !update.filiale ||
    typeof update.diplome_obtenu === undefined ||
    update.diplome_obtenu === null ||
    !update.diplome_obtenu
  ) {
    return res
      .status(400)
      .send({ errorMessage: "Veuillez remplir les champ requis" });
  }

  await EtudeFaitesEntity.findByIdAndUpdate(id, {
    annee_debut: new Date(update.annee_debut).getFullYear(), 
    annee_fin: new Date(update.annee_fin).getFullYear(), 
    etablissement: update.etablissement, 
    filiale: update.filiale, 
    diplome_obtenu: update.diplome_obtenu
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

export const DeleteEtudeFaites: Handler = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .send({ errorMessage: "Id Invalid" });
  }

  await EtudeFaitesEntity.findByIdAndRemove(id)
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
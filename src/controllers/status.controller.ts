import { Request, Response, Handler } from "express";
import mongoose from "mongoose";
import { StatusEntity } from "../entity/status.entity";

export const AddStatut: Handler = async (req: Request, res: Response) => {
  const { statut, description } = req.body;

  if (typeof statut === undefined || statut === null || !statut) {
    return res
      .status(400)
      .send({ errorMessage: "Veuillez remplir les champ requis" });
  }

  let nom = statut.slice(1);

  nom = nom.toLowerCase();

  nom = statut.charAt(0).toUpperCase() + statut.slice(1).toLowerCase();

  const checkStatutExist = await StatusEntity.findOne({ nom });

  if (!checkStatutExist) {
    const myStatut = new StatusEntity({
      nom,
      description,
    });

    await myStatut
      .save()
      .then((result) => {
        res.status(200).send({ data: result, message: "Success" });
      })
      .catch((error) => {
        console.log("error: ", error);
        return res.status(500).send({
          errorMessage: "Une erreur s'est produite, veuillez réessayer",
        });
      });
  } else {
    return res
      .status(406)
      .send({ errorMessage: "Ce status existe déjà!" });
  }
};

export const GetStatuts: Handler = async (req: Request, res: Response) => {
  
  await StatusEntity.find()
    .then((statut) => {
      if (!statut) {
        return res.status(404).send({ errorMessage: "Aucun statut trouvé" });
      }
      res.status(200).send(statut);
    })
    .catch((error) => {
      console.log("error: ", error);
      return res.status(500).send({
        errorMessage: "Une erreur s'est produite, veuillez réessayer",
      });
    });
};

export const GetStatutById: Handler = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ errorMessage: "ID Invalide" });
  }

  await StatusEntity.findById(id)
    .then((statut) => {
      if (!statut) {
        return res.status(404).send({ errorMessage: "Aucun statut trouvé" });
      }
      res.status(200).send(statut);
    })
    .catch((error) => {
      console.log("error: ", error);
      return res.status(500).send({
        errorMessage: "Une erreur s'est produite, veuillez réessayer",
      });
    });
};

export const UpdateStatut: Handler = async (req: Request, res: Response) => {
  const id = req.params.id;
  const update = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .send({ errorMessage: "Catégorie non correspondante" });
  }

  if (
    typeof update.statut === undefined ||
    update.statut === null ||
    !update.statut
  ) {
    return res
      .status(400)
      .send({ errorMessage: "Veuillez remplir le champ requis" });
  }

  let nom = update.statut.slice(1);

  nom = nom.toLowerCase();

  nom =
    update.statut.charAt(0).toUpperCase() +
    update.statut.slice(1).toLowerCase();

  update.statut = nom;

  await StatusEntity.findByIdAndUpdate(id, {
    nom: update.statut,
    description: update.description,
  })
    .then((result) => {
      if (!result) {
        return res
          .status(400)
          .send({ errorMessage: "Mise à jour non aboutie" });
      }
      return res.status(200).send({ message: "Mise à jour effectuée" });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).send({
        errorMessage: "Une erreur s'est produite lors de la mise à jour ",
      });
    });
};
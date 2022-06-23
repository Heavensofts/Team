import { Request, Response, Handler } from "express";
import mongoose from "mongoose";
import { EtatCivilEntity } from "../entity/etat_civil.entity";
import { StatusEntity } from "../entity/status.entity";

export const AddEtatCivil: Handler = async (req: Request, res: Response) => {
  const { nom, description } = req.body;

  if (typeof nom === undefined || nom === null || !nom) {
    return res
      .status(400)
      .send({ errorMessage: "Veuillez remplir les champ requis" });
  }

  const checEtatCivilExist = await EtatCivilEntity.findOne({
    nom: nom.toUpperCase(),
  });

  if (!checEtatCivilExist) {
    const etatCivil = new EtatCivilEntity({
      nom: nom.toUpperCase(),
      description
    });

    await etatCivil
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
    return res.status(406).send({ errorMessage: "Ce etat-civil a déjà été enregistré!" });
  }
};

export const GetEtatCivils: Handler = async (req: Request, res: Response) => {


  await EtatCivilEntity.find()
    .then((etat_civil) => {
      if (!etat_civil) {
        return res.status(404).send({ errorMessage: "Aucun état-civil trouvé" });
      }
      res.status(200).send(etat_civil);
    })
    .catch((error) => {
      return res.status(500).send({
        errorMessage: "Une erreur s'est produite, veuillez réessayer",
      });
    });
};

export const GetEtatCivilById: Handler = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ errorMessage: "Id invalid" });
  }

  await EtatCivilEntity.findById(id)
    .then((etatCivil) => {
      if (!etatCivil) {
        return res.status(404).send({ errorMessage: "Aucun etat civil trouvé" });
      }
      res.status(200).send(etatCivil);
    })
    .catch((error) => {
      return res.status(500).send({
        errorMessage: "Une erreur s'est produite, veuillez réessayer",
      });
    });
};

export const UpdateEtatCivil: Handler = async (req: Request, res: Response) => {
  const id = req.params.id;
  const update = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .send({ errorMessage: "Id Invalid" });
  }

  if (
    typeof update.nom.toUpperCase() === undefined ||
    update.nom.toUpperCase() === null ||
    !update.nom.toUpperCase()
  ) {
    return res
      .status(400)
      .send({ errorMessage: "Veuillez remplir le champ requis" });
  }

  await EtatCivilEntity.findByIdAndUpdate(id, {
    nom: update.nom.toUpperCase(),
    description: update?.description,
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

export const DeleteEtatCivil: Handler = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .send({ errorMessage: "Id Invalid" });
  }

  await EtatCivilEntity.findByIdAndRemove(id)
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
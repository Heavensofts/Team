import { Request, Response, Handler } from "express";
import mongoose from "mongoose";
import { TypeTacheEntity } from "../entity/type_tache.entity";
import { StatusEntity } from "../entity/status.entity";

export const AddTypeTache: Handler = async (req: Request, res: Response) => {
  const { nom, description } = req.body;

  if (typeof nom === undefined || nom === null || !nom) {
    return res
      .status(400)
      .send({ errorMessage: "Veuillez remplir les champ requis" });
  }

  const checTypeTacheExist = await TypeTacheEntity.findOne({
    nom: nom.toUpperCase(),
  });

  if (!checTypeTacheExist) {
    const typeTache = new TypeTacheEntity({
      nom: nom.toUpperCase(),
      description,
    });

    await typeTache
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
    return res.status(406).send({ errorMessage: "Ce type tache a déjà été enregistré!" });
  }
};

export const GetTypeTaches: Handler = async (req: Request, res: Response) => {

  const checkStatut = await StatusEntity.findOne({nom: 'Displayed'});

  await TypeTacheEntity.find({statut_deleted: checkStatut.nom})
    .then((typeTache) => {
      if (!typeTache) {
        return res.status(404).send({ errorMessage: "Aucun type tache trouvé" });
      }
      res.status(200).send(typeTache);
    })
    .catch((error) => {
      return res.status(500).send({
        errorMessage: "Une erreur s'est produite, veuillez réessayer",
      });
    });
};

export const GetTypeTacheById: Handler = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ errorMessage: "Id invalid" });
  }

  await TypeTacheEntity.findById(id)
    .then((typeTache) => {
      if (!typeTache) {
        return res.status(404).send({ errorMessage: "Aucun etat civil trouvé" });
      }
      res.status(200).send(typeTache);
    })
    .catch((error) => {
      return res.status(500).send({
        errorMessage: "Une erreur s'est produite, veuillez réessayer",
      });
    });
};

export const UpdateTypeTache: Handler = async (req: Request, res: Response) => {
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

  await TypeTacheEntity.findByIdAndUpdate(id, {
    nom: update.nom.toUpperCase(),
    description: update.description,
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

export const DeleteTypeTache: Handler = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .send({ errorMessage: "Id Invalid" });
  }

  await TypeTacheEntity.findByIdAndRemove(id)
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
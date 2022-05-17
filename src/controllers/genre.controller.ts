import { Request, Response, Handler } from "express";
import mongoose from "mongoose";
import { GenreEntity } from "../entity/genre.entity";
import { StatusEntity } from "../entity/status.entity";

export const AddGenre: Handler = async (req: Request, res: Response) => {
  const { nom, description } = req.body;

  if (typeof nom === undefined || nom === null || !nom) {
    return res
      .status(400)
      .send({ errorMessage: "Veuillez remplir les champ requis" });
  }

  const checkStatut = await StatusEntity.findOne({nom: 'Displayed'});

  if (!checkStatut) {
    return res.status(404).send({
      errorMessage: "Aucun statut correspondant"
    });
  }

  const checkSexeExist = await GenreEntity.findOne({
    nom: nom.toUpperCase(),
  });

  if (!checkSexeExist) {
    const sexe = new GenreEntity({
      nom: nom.toUpperCase(),
      description,
      statut_deleted: checkStatut.nom
    });

    await sexe
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
    return res.status(406).send({ errorMessage: "Ce genre a déjà été enregistré!" });
  }
};

export const GetGenres: Handler = async (req: Request, res: Response) => {

  const checkStatut = await StatusEntity.findOne({nom: 'Displayed'});

  await GenreEntity.find({statut_deleted: checkStatut.nom})
    .then((genre) => {
      if (!genre) {
        return res.status(404).send({ errorMessage: "Aucun genre trouvé" });
      }
      res.status(200).send(genre);
    })
    .catch((error) => {
      return res.status(500).send({
        errorMessage: "Une erreur s'est produite, veuillez réessayer",
      });
    });
};

export const GetGenreById: Handler = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ errorMessage: "Id invalid" });
  }

  await GenreEntity.findById(id)
    .then((sexe) => {
      if (!sexe) {
        return res.status(404).send({ errorMessage: "Aucun genre trouvé" });
      }
      res.status(200).send(sexe);
    })
    .catch((error) => {
      return res.status(500).send({
        errorMessage: "Une erreur s'est produite, veuillez réessayer",
      });
    });
};

export const UpdateGenre: Handler = async (req: Request, res: Response) => {
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

  await GenreEntity.findByIdAndUpdate(id, {
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

export const DeleteGenre: Handler = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .send({ errorMessage: "Id Invalid" });
  }

  const checkStatut = await StatusEntity.findOne({nom: 'No-displayed'});

  await GenreEntity.findByIdAndUpdate(id, { statut_deleted: checkStatut.nom, date_deleted: Date.now() })
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
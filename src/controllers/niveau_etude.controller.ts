import { Request, Response, Handler } from "express";
import mongoose from "mongoose";
import { NiveauEtudeEntity } from "../entity/niveau_etude.entity";
import { StatusEntity } from "../entity/status.entity";

export const AddNiveauEtude: Handler = async (req: Request, res: Response) => {
  const { nom, description } = req.body;

  if (typeof nom === undefined || nom === null || !nom) {
    return res
      .status(400)
      .send({ errorMessage: "Veuillez remplir les champ requis" });
  }

  let checkStatut = await StatusEntity.findOne({ nom: "Displayed" });

  if (!checkStatut) {

    const myStatut = new StatusEntity({
      nom: 'Displayed', description: "Le statut qui rend les éléments visibles", type_statut: 0
    });

    await myStatut.save().then((result) => {
      checkStatut = result;
    }).catch((error) => {
      return res.status(500).send({
        errorMessage: "Une erreur s'est produite, veuillez réessayer",
      });
    });
  }

  let checkStatut2 = await StatusEntity.findOne({nom: 'No-displayed'});
  if(!checkStatut2){
    const myStatut = new StatusEntity({
      nom: 'No-displayed', 
      description: "Le statut qui rend les éléments invisibles", 
      type_statut: 0
    });
  
    await myStatut.save().then((result) => {
      checkStatut = result;
    }).catch((error) => {
      console.log(error.message);
      return res.status(500).send({
        errorMessage: "Une erreur s'est produite, veuillez réessayer",
      });
    });
  }

  const checkNiveauEtudeExist = await NiveauEtudeEntity.findOne({
    nom: nom.toUpperCase(),
  });

  if (!checkNiveauEtudeExist) {
    const niveauEtude = new NiveauEtudeEntity({
      nom: nom.toUpperCase(),
      description,
      statut_deleted: checkStatut.nom
    });

    await niveauEtude
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
    return res.status(406).send({ errorMessage: "Ce niveau d'étude a déjà été enregistré!" });
  }
};

export const GetNiveauEtudes: Handler = async (req: Request, res: Response) => {

  const checkStatut = await StatusEntity.findOne({nom: 'Displayed'});

  await NiveauEtudeEntity.find({statut_deleted: checkStatut.nom})
    .then((niveau_etude) => {
      if (!niveau_etude) {
        return res.status(404).send({ errorMessage: "Aucun niveau d'étude trouvé" });
      }
      res.status(200).send(niveau_etude);
    })
    .catch((error) => {
      return res.status(500).send({
        errorMessage: "Une erreur s'est produite, veuillez réessayer",
      });
    });
};

export const GetNiveauById: Handler = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ errorMessage: "Id invalid" });
  }

  await NiveauEtudeEntity.findById(id)
    .then((sexe) => {
      if (!sexe) {
        return res.status(404).send({ errorMessage: "Aucun niveau d'étude trouvé" });
      }
      res.status(200).send(sexe);
    })
    .catch((error) => {
      return res.status(500).send({
        errorMessage: "Une erreur s'est produite, veuillez réessayer",
      });
    });
};

export const UpdateNiveauEtude: Handler = async (req: Request, res: Response) => {
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

  await NiveauEtudeEntity.findByIdAndUpdate(id, {
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

export const DeleteNiveauEtude: Handler = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .send({ errorMessage: "Id Invalid" });
  }
  await NiveauEtudeEntity.findByIdAndRemove(id)
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
import { Request, Response, Handler } from "express";
import mongoose from "mongoose";
import { TypeCongeEntity } from "../entity/type_conge.entity";
import { StatusEntity } from "../entity/status.entity";

export const AddTypeConge: Handler = async (req: Request, res: Response) => {
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

  const checTypeCongeExist = await TypeCongeEntity.findOne({
    nom: nom.toUpperCase(),
  });

  if (!checTypeCongeExist) {
    const typeTache = new TypeCongeEntity({
      nom: nom.toUpperCase(),
      description,
      statut_deleted: checkStatut.nom
    });

    await typeTache
      .save()
      .then((result) => {
        res.status(200).send({ data: result, message: "Success" });
      })
      .catch((error) => {
        return res.status(500).send({
          errorMessage: "Une erreur s'est produite, veuillez réessayer",
        });
      });
  } else {
    return res.status(406).send({ errorMessage: "Ce type congé a déjà été enregistré!" });
  }
};

export const GetTypeConges: Handler = async (req: Request, res: Response) => {

  const checkStatut = await StatusEntity.findOne({nom: 'Displayed'});

  await TypeCongeEntity.find({statut_deleted: checkStatut.nom})
    .then((typeConge) => {
      if (!typeConge) {
        return res.status(404).send({ errorMessage: "Aucun type congé trouvé" });
      }
      res.status(200).send(typeConge);
    })
    .catch((error) => {
      return res.status(500).send({
        errorMessage: "Une erreur s'est produite, veuillez réessayer",
      });
    });
};

export const GetTypeCongeById: Handler = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ errorMessage: "Id invalid" });
  }

  await TypeCongeEntity.findById(id)
    .then((typeconge) => {
      if (!typeconge) {
        return res.status(404).send({ errorMessage: "Aucun type congé trouvé" });
      }
      res.status(200).send(typeconge);
    })
    .catch((error) => {
      return res.status(500).send({
        errorMessage: "Une erreur s'est produite, veuillez réessayer",
      });
    });
};

export const UpdateTypeConge: Handler = async (req: Request, res: Response) => {
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

  await TypeCongeEntity.findByIdAndUpdate(id, {
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

export const DeleteTypeConge: Handler = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .send({ errorMessage: "Id Invalid" });
  }

  await TypeCongeEntity.findByIdAndRemove(id)
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
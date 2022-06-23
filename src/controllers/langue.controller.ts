import { Request, Response, Handler } from "express";
import mongoose from "mongoose";
import { LangueEntity } from "../entity/langue.entity";

export const AddLangue: Handler = async (req: Request, res: Response) => {
  const { nom, description } = req.body;

  if (typeof nom === undefined || typeof nom == null || !nom) {
    return res
      .status(400)
      .send({ errorMessage: "Veuillez remplir les champs requis" });
  }

  const checkLangue = await LangueEntity.findOne({nom: nom.toUpperCase()});


  if(!checkLangue){

    const langue = new LangueEntity({
      nom: nom.toUpperCase(),
      description
    });
  
    await langue
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
  }else{
    return res.status(400).send({
      errorMessage: "Cette langue existe déjà!",
    });
  }

  
};

export const GetLangues: Handler = async (req: Request, res: Response) => {

  await LangueEntity.find()
    .then((langue) => {
      if (!langue) {
        return res.status(404).send({ errorMessage: "Aucune langue trouvée" });
      }
      res.status(200).send(langue);
    })
    .catch((error) => {
      return res.status(500).send({
        errorMessage: "Une erreur s'est produite, veuillez réessayer",
      });
    });
};

export const GetLangueById: Handler = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ errorMessage: "Id invalid" });
  }

  await LangueEntity.findById(id)
    .then((langue) => {
      if (!langue) {
        return res.status(404).send({ errorMessage: "Aucune langue trouvée" });
      }
      res.status(200).send(langue);
    })
    .catch((error) => {
      return res.status(500).send({
        errorMessage: "Une erreur s'est produite, veuillez réessayer",
      });
    });
};

export const UpdateLangue: Handler = async (req: Request, res: Response) => {
  const id = req.params.id;
  const update = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ errorMessage: "Id Invalid" });
  }

  if (
    typeof update.nom === undefined || typeof update.nom == null || !update.nom) {
    return res
      .status(400)
      .send({ errorMessage: "Veuillez remplir les champs requis" });
  }

  const checkLangue = await LangueEntity.findOne({nom: update.nom.toUpperCase()});

  if(!checkLangue){
    await LangueEntity.findByIdAndUpdate(id, {
      nom: update.nom,
      description: update?.description
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
  }else{
    return res.status(400).send({
      errorMessage: "Cette langue existe déjà!",
    });
  }

  
};

export const DeleteLangue: Handler = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ errorMessage: "Id Invalid" });
  }

  await LangueEntity.findByIdAndRemove(id)
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

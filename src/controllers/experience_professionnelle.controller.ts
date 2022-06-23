import { Request, Response, Handler } from "express";
import mongoose from "mongoose";
import { ExperienceProfessionnelleEntity } from "../entity/experience_professionnelle.entity";
import { StatusEntity } from "../entity/status.entity";

export const AddExperience: Handler = async (req: Request, res: Response) => {
  const { date_debut, date_fin, poste, entreprise, reference, taches } = req.body;

  if (
    typeof date_debut === undefined ||
    date_debut === null ||
    !date_debut ||
     typeof date_fin === undefined ||
    date_fin === null ||
    !date_fin ||
    typeof poste === undefined ||
    poste === null ||
    !poste ||
    typeof entreprise === undefined ||
    entreprise === null ||
    !entreprise ||
    typeof reference === undefined ||
    reference === null ||
    !reference ||
    typeof taches === undefined ||
    taches === null ||
    !taches
  ) {
    return res
      .status(400)
      .send({ errorMessage: "Veuillez remplir les champ requis" });
  }

  const experience = new ExperienceProfessionnelleEntity({
    date_debut, 
    date_fin, 
    poste, 
    entreprise, 
    reference, 
    taches,
  });

  await experience
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

export const GetExperiences: Handler = async (req: Request, res: Response) => {

  await ExperienceProfessionnelleEntity.find()
    .then((experience) => {
      if (!experience) {
        return res.status(404).send({ errorMessage: "Aucun type demande trouvé" });
      }
      res.status(200).send(experience);
    })
    .catch((error) => {
      return res.status(500).send({
        errorMessage: "Une erreur s'est produite, veuillez réessayer",
      });
    });
};

export const GetExperienceById: Handler = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ errorMessage: "Id invalid" });
  }

  await ExperienceProfessionnelleEntity.findById(id)
    .then((experience) => {
      if (!experience) {
        return res.status(404).send({ errorMessage: "Aucune expérience trouvée" });
      }
      res.status(200).send(experience);
    })
    .catch((error) => {
      return res.status(500).send({
        errorMessage: "Une erreur s'est produite, veuillez réessayer",
      });
    });
};

export const UpdateExperience: Handler = async (req: Request, res: Response) => {
  const id = req.params.id;
  const update = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .send({ errorMessage: "Id Invalid" });
  }

  if (
    typeof update.date_debut === undefined ||
    update.date_debut === null ||
    !update.date_debut ||
     typeof update.date_fin === undefined ||
    update.date_fin === null ||
    !update.date_fin ||
    typeof update.poste === undefined ||
    update.poste === null ||
    !update.poste ||
    typeof update.entreprise === undefined ||
    update.entreprise === null ||
    !update.entreprise ||
    typeof update.reference === undefined ||
    update.reference === null ||
    !update.reference ||
    typeof update.taches === undefined ||
    update.taches === null ||
    !update.taches
  ) {
    return res
      .status(400)
      .send({ errorMessage: "Veuillez remplir les champ requis" });
  }

  await ExperienceProfessionnelleEntity.findByIdAndUpdate(id, update)
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

export const DeleteExperience: Handler = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .send({ errorMessage: "Id Invalid" });
  }

  await ExperienceProfessionnelleEntity.findByIdAndRemove(id)
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
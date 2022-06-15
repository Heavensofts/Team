"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPays = exports.AddPays = void 0;
const pays_entity_1 = require("../entity/pays.entity");
const axios_1 = __importDefault(require("axios"));
const AddPays = async (req, res) => {
    try {
        let pays;
        const response = await axios_1.default.get('https://restcountries.com/v3.1/all');
        for (let i in response.data) {
            pays = new pays_entity_1.PaysEntity({
                nom: response.data[i].translations.fra.common,
                code: response.data[i].cca3
            });
            pays.save();
        }
        res.status(200).send({ message: "success" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({
            errorMessage: "Une erreur s'est produite, veuillez réessayer",
        });
    }
};
exports.AddPays = AddPays;
const GetPays = async (req, res) => {
    pays_entity_1.PaysEntity.find().sort('nom').exec((err, pays) => {
        if (err) {
            console.log("err: ", err);
            return res
                .status(500)
                .send({ errorMessage: "Une erreur s'est produite, veuillez réessayer" });
        }
        if (!pays) {
            return res
                .status(404)
                .send({ errorMessage: "Aucun pays trouvé" });
        }
        res.status(200).send(pays);
    });
};
exports.GetPays = GetPays;
/*
  .then((pays) => {
      if (!pays) {
        return res
          .status(404)
          .send({ errorMessage: "Aucun pays trouvé" });
      }
      res.status(200).send(pays);
    })
    .catch((error) => {
      return res.status(500).send({
        errorMessage: "Une erreur s'est produite, veuillez réessayer",
      });
    });


*/ 
//# sourceMappingURL=pays.controller.js.map
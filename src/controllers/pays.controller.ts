import { Request, Response, Handler } from "express";
import { PaysEntity } from "../entity/pays.entity";
import axios from 'axios';

export const AddPays: Handler = async (req: Request, res: Response) =>{

  try {
    
    let pays!: any;

    const response = await axios.get('https://restcountries.com/v3.1/all');

		for (let i in response.data) {

			pays = new PaysEntity({
				nom: response.data[i].translations.fra.common,
				code: response.data[i].cca3
			});

			pays.save();
    }

    res.status(200).send({ message: "success" });
    
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      errorMessage: "Une erreur s'est produite, veuillez réessayer",
    });
  }

}
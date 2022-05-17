import { Request, Response, Handler } from "express";
import mongoose from "mongoose";
import { AgentEntity } from "../entity/agent.entity";
import bcryptjs from "bcryptjs";
import { sign } from "jsonwebtoken";

export const Login: Handler = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (typeof email === undefined || email === null || !email
        || typeof password === undefined || password === null || !password) {
      return res
        .status(400)
        .send({ errorMessage: "Veuillez remplir le champ requis" });
    }

    const user = await AgentEntity.findOne({ email });

    if (!user) {
      return res.status(404).send({
        errorMessage: "cet email n'existe pas",
      });
    }

    if (!(await bcryptjs.compare(password, user.password))) {
      return res.status(400).send({ message: "Invalid password!" });
    }

    const token = sign(
      {
        id: user._id,
        ...user,
      },
      "secret"!
    );

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });

    res.status(200).send({
      message: "Success",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "An error occurred", erreur: error.message });
  }
};
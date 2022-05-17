import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AgentEntity } from "../entity/agent.entity";

export const AuthMiddleware = async (req: Request, res: Response, next: Function)=>{

  try {

    const jwt = req.cookies["jwt"];

    const payload: any = verify(jwt, "secret"!);

    if (!payload) {
      return res.status(401).send({ message: "Unauthenticated" });
    }

    const user:any = await AgentEntity.findOne({ _id: payload.id });

    req["user"] = user;

    next()
  } catch (error: any) {
    console.log(error)
    return res.status(401).send({ message: "token not provided"});
  }

}
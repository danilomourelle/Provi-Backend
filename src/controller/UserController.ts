import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { UserDatabase } from "../data/UserDatabase";
import { IdManager } from "../services/IdManager";
import { HashManager } from "../services/HashManager";
import { BaseDatabase } from "../data/BaseDatabase";
import { InvalidParameterError } from "../errors/InvalidParameterError";
import { TokenManager } from "../services/TokenManager";

export class UserController {

  private static UserBusiness = new UserBusiness(
    new UserDatabase(),
    new IdManager(),
    new HashManager(),
    new TokenManager()
  )

  async register(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new InvalidParameterError("Preencha todos os campos")
      }
      if (email.indexOf("@") === -1) {
        throw new InvalidParameterError("Email inválido")
      }

      const token = await UserController.UserBusiness.register(email, password);

      res.status(200).send({ token })

    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });

    } finally {
      await BaseDatabase.disconnectDB()
    }
  }
}
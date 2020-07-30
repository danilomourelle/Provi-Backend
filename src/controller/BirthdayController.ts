import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import { BirthdayBusiness } from "../business/BirthdayBusiness";
import { BirthdayDatabase } from "../data/BirthdayDatabase";
import { UserBusiness } from "../business/UserBusiness";
import { UserDatabase } from "../data/UserDatabase";
import { IdManager } from "../services/IdManager";
import { HashManager } from "../services/HashManager";
import { InvalidParameterError } from "../errors/InvalidParameterError";
import { TokenManager } from "../services/TokenManager";
import { NotFoundError } from "../errors/NotFoundError";

export class BirthdayController {
  constructor(
    private tokenManager: TokenManager
  ) { }
  private static BirthdayBusiness = new BirthdayBusiness(
    new BirthdayDatabase(),
    new IdManager()
  )

  private static UserBusiness = new UserBusiness(
    new UserDatabase(),
    new IdManager(),
    new HashManager()
  )

  async insert(req: Request, res: Response) {
    try {
      const { birthday, token } = req.body

      if (!birthday || !token) {
        throw new InvalidParameterError("Preencha todos os campos")
      }

      const userData = this.tokenManager.retrieveDataFromToken(token)

      const user = BirthdayController.UserBusiness.getUserById(userData.id)

      if (!user) {
        throw new NotFoundError("Usuário não encontrado")
      }

      // !Assumindo que data está chegando no formato YYYY-MM-DD
      await BirthdayController.BirthdayBusiness.insert(birthday, userData.id)

      res.status(200).send({ message: "OK" })

    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });

    } finally {
      await BaseDatabase.disconnectDB()
    }
  }
}
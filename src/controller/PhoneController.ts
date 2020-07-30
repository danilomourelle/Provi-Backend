import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import { PhoneBusiness } from "../business/PhoneBusiness";
import { PhoneDatabase } from "../data/PhoneDatabase";
import { UserBusiness } from "../business/UserBusiness";
import { UserDatabase } from "../data/UserDatabase";
import { IdManager } from "../services/IdManager";
import { HashManager } from "../services/HashManager";
import { InvalidParameterError } from "../errors/InvalidParameterError";
import { TokenManager } from "../services/TokenManager";
import { NotFoundError } from "../errors/NotFoundError";

export class PhoneController {
  constructor(
    private tokenManager: TokenManager
  ) { }

  private static PhoneBusiness = new PhoneBusiness(
    new PhoneDatabase(),
    new IdManager()
  )

  private static UserBusiness = new UserBusiness(
    new UserDatabase(),
    new IdManager(),
    new HashManager()
  )

  public async insert(req: Request, res: Response) {
    try {
      const {
        phone,
        token
      } = req.body

      if (!phone || !token) {
        throw new InvalidParameterError("Preencha todos os campos")
      }

      const userData = this.tokenManager.retrieveDataFromToken(token)

      const user = PhoneController.UserBusiness.getUserById(userData.id)

      if (!user) {
        throw new NotFoundError("Usuário não encontrado")
      }

      await PhoneController.PhoneBusiness.insert(
        phone,
        userData.id
      )

      res.status(200).send({ message: "OK" })

    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });

    } finally {
      await BaseDatabase.disconnectDB()
    }
  }
}
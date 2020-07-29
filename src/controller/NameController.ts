import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import { NameBusiness } from "../business/NameBusiness";
import { NameDatabase } from "../data/NameDatabase";
import { UserBusiness } from "../business/UserBusiness";
import { UserDatabase } from "../data/UserDatabase";
import { IdManager } from "../services/IdManager";
import { HashManager } from "../services/HashManager";
import { InvalidParameterError } from "../errors/InvalidParameterError";
import { TokenManager } from "../services/TokenManager";
import { NotFoundError } from "../errors/NotFoundError";

export class NameController {
  constructor(
    private tokenManager: TokenManager
  ){}

  private static NameBusiness = new NameBusiness(
    new NameDatabase(),
    new IdManager()
  )

  private static UserBusiness = new UserBusiness(
    new UserDatabase(),
    new IdManager(),
    new HashManager()
  )

  public async insert(req: Request, res: Response) {
    try {
      const {name, token} = req.body

      if(!name || !token){
        throw new InvalidParameterError("Preencha todos os campos")
      }

      const userData = this.tokenManager.retrieveDataFromToken(token)

      const user = NameController.UserBusiness.getUserById(userData.id)

      if(!user){
        throw new NotFoundError("Usuário não encontrado")
      }

      await NameController.NameBusiness.insert(name, userData.id)

      res.status(200).send({message: "OK"})

    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });

    } finally {
      await BaseDatabase.disconnectDB()
    }
  }
}
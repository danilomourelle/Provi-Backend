import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import { AddressBusiness } from "../business/AddressBusiness";
import { AddressDatabase } from "../data/AddressDatabase";
import { UserBusiness } from "../business/UserBusiness";
import { UserDatabase } from "../data/UserDatabase";
import { IdManager } from "../services/IdManager";
import { TokenManager } from "../services/TokenManager";
import { HashManager } from "../services/HashManager";
import { InvalidParameterError } from "../errors/InvalidParameterError";
import { NotFoundError } from "../errors/NotFoundError";

export class AddressController {
  constructor(
    private tokenManager: TokenManager
  ){}
  private static AddressBusiness = new AddressBusiness(
    new AddressDatabase(),
    new IdManager(),
  )

  private static UserBusiness = new UserBusiness(
    new UserDatabase(),
    new IdManager(),
    new HashManager()
  )

  public async insert(req: Request, res: Response) {
    try {
      const {
        cep,
        street,
        number,
        complement,
        city,
        state,
        token
      } = req.body

      if (!cep || !street || !number || !city || !state || !token) {
        throw new InvalidParameterError("Preencha todos os campos")
      }
      if (isNaN(number)) {
        throw new InvalidParameterError("Numero inválido")
      }

      const userData = this.tokenManager.retrieveDataFromToken(token)

      const user = AddressController.UserBusiness.getUserById(userData.id)

      if(!user){
        throw new NotFoundError("Usuário não encontrado")
      }

      await AddressController.AddressBusiness.insert(
        cep,
        street,
        Number(number),
        complement,
        city,
        state,
        userData.id
      )

      res.status(200).send({message: "OK"})

    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });

    } finally {
      await BaseDatabase.disconnectDB()
    }
  }
}
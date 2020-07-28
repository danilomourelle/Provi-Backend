import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import { CPFBusiness } from "../business/CPFBusiness";
import { CPFDatabase } from "../data/CPFDatabase";
import { UserBusiness } from "../business/UserBusiness";
import { UserDatabase } from "../data/UserDatabase";
import { IdManager } from "../services/IdManager";
import { HashManager } from "../services/HashManager";
import { InvalidParameterError } from "../errors/InvalidParameterError";
import { TokenManager } from "../services/TokenManager";
import { NotFoundError } from "../errors/NotFoundError";

export class CPFController {
  private static CPFBusiness = new CPFBusiness(
    new CPFDatabase(),
    new IdManager()
  )
  
  private static UserBusiness = new UserBusiness(
    new UserDatabase(),
    new IdManager(),
    new HashManager()
  )

  public async insert(req:Request, res:Response){
    try{
      const { cpf, token } = req.body

      if(!cpf || !token){
        throw new InvalidParameterError("Preencha todos os campos")
      }

      const userData = new TokenManager().retrieveDataFromToken(token)

      const user = CPFController.UserBusiness.getUserById(userData.id)

      if(!user){
        throw new NotFoundError("Usuário não encontrado")
      }

      await CPFController.CPFBusiness.insert(cpf, userData.id)

      res.status(200).send({message: "OK"})

    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });

    } finally {
      await BaseDatabase.disconnectDB()
    }
  }
}
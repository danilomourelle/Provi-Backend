import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import { AddressDatabase } from "../data/AddressDatabase";
import { AmountDatabase } from "../data/AmountDatabase";
import { BirthdayDatabase } from "../data/BirthdayDatabase";
import { CPFDatabase } from "../data/CPFDatabase";
import { NameDatabase } from "../data/NameDatabase";
import { PhoneDatabase } from "../data/PhoneDatabase";
import { UserDatabase } from "../data/UserDatabase";
import { AmountBusiness } from "../business/AmountBusiness";
import { StepBusiness, Steps } from "../business/StepBusiness";
import { UserBusiness } from "../business/UserBusiness";
import { IdManager } from "../services/IdManager";
import { HashManager } from "../services/HashManager";
import { TokenManager } from "../services/TokenManager";
import { InvalidParameterError } from "../errors/InvalidParameterError";
import { NotFoundError } from "../errors/NotFoundError";
import { GenericError } from "../errors/GenericError";
export class AmountController {
  constructor(
    private tokenManager: TokenManager
  ) { }
  private static AmountBusiness = new AmountBusiness(
    new AmountDatabase(),
    new IdManager()
  )

  private static UserBusiness = new UserBusiness(
    new UserDatabase(),
    new IdManager(),
    new HashManager()
  )
  
  private static StepBusiness = new StepBusiness(
    new AddressDatabase(),
    new AmountDatabase(),
    new BirthdayDatabase(),
    new CPFDatabase(),
    new NameDatabase(),
    new PhoneDatabase(),
  )

  async insert(req: Request, res: Response) {
    try {
      const { amount, token } = req.body

      if (!amount || !token) {
        throw new InvalidParameterError("Preencha todos os campos")
      }
      if (isNaN(amount)) {
        throw new InvalidParameterError("Valor solicitado inválido")
      }

      const userData = this.tokenManager.retrieveDataFromToken(token)

      const user = AmountController.UserBusiness.getUserById(userData.id)

      if (!user) {
        throw new NotFoundError("Usuário não encontrado")
      }

      const nextStep = await AmountController.StepBusiness.checkStep(Steps.AMOUNT, userData.id)

      if(!nextStep){
        throw new GenericError("Você está na etapa errada do cadastro")
      }

      await AmountController.AmountBusiness.insert(amount, userData.id)

      res.status(200).send({ message: "OK" })

    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });

    } finally {
      await BaseDatabase.disconnectDB()
    }
  }
}
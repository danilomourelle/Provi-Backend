import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import { AddressDatabase } from "../data/AddressDatabase";
import { AmountDatabase } from "../data/AmountDatabase";
import { BirthdayDatabase } from "../data/BirthdayDatabase";
import { CPFDatabase } from "../data/CPFDatabase";
import { NameDatabase } from "../data/NameDatabase";
import { PhoneDatabase } from "../data/PhoneDatabase";
import { UserDatabase } from "../data/UserDatabase";
import { AddressBusiness } from "../business/AddressBusiness";
import { StepBusiness, Steps } from "../business/StepBusiness";
import { UserBusiness } from "../business/UserBusiness";
import { IdManager } from "../services/IdManager";
import { HashManager } from "../services/HashManager";
import { TokenManager } from "../services/TokenManager";
import { InvalidParameterError } from "../errors/InvalidParameterError";
import { NotFoundError } from "../errors/NotFoundError";
import { GenericError } from "../errors/GenericError";

export class AddressController {
  constructor(
    private tokenManager: TokenManager
  ) { }

  private static AddressBusiness = new AddressBusiness(
    new AddressDatabase(),
    new IdManager(),
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

      if (!user) {
        throw new NotFoundError("Usuário não encontrado")
      }

      const nextStep = await AddressController.StepBusiness.checkStep(Steps.ADDRESS, userData.id)

      if(!nextStep){
        throw new GenericError("Você está na etapa errada do cadastro")
      }

      await AddressController.AddressBusiness.insert(
        cep,
        street,
        Number(number),
        complement,
        city,
        state,
        'userData.id'
      )

      res.status(200).send({
        message: "OK", 
        'next-end-point': nextStep
        })

    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });

    } finally {
      await BaseDatabase.disconnectDB()
    }
  }
}
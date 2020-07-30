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
import { CEPExternalAPI } from "../services/CEPExternalAPI";
import { InvalidParameterError } from "../errors/InvalidParameterError";
import { NotFoundError } from "../errors/NotFoundError";
import { GenericError } from "../errors/GenericError";

export class AddressController {
  
  private static AddressBusiness = new AddressBusiness(
    new AddressDatabase(),
    new IdManager(),
    new CEPExternalAPI()
  )

  private static UserBusiness = new UserBusiness(
    new UserDatabase(),
    new IdManager(),
    new HashManager(),
    new TokenManager()
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

      const user = await AddressController.UserBusiness.getUserById(token)

      if(!user){
        throw new NotFoundError("Usuário não encontrado")
      }

      const nextStep = await AddressController.StepBusiness.checkStep(Steps.ADDRESS, user.getId())

      if (!nextStep) {
        throw new GenericError("Você está na etapa errada do cadastro")
      }

      await AddressController.AddressBusiness.insert(
        cep,
        street,
        Number(number),
        complement,
        city,
        state,
        user.getId()
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
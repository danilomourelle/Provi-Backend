import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import { AddressDatabase } from "../data/AddressDatabase";
import { AmountDatabase } from "../data/AmountDatabase";
import { BirthdayDatabase } from "../data/BirthdayDatabase";
import { CPFDatabase } from "../data/CPFDatabase";
import { NameDatabase } from "../data/NameDatabase";
import { PhoneDatabase } from "../data/PhoneDatabase";
import { UserDatabase } from "../data/UserDatabase";
import { NameBusiness } from "../business/NameBusiness";
import { StepBusiness, Steps } from "../business/StepBusiness";
import { UserBusiness } from "../business/UserBusiness";
import { IdManager } from "../services/IdManager";
import { HashManager } from "../services/HashManager";
import { TokenManager } from "../services/TokenManager";
import { InvalidParameterError } from "../errors/InvalidParameterError";
import { NotFoundError } from "../errors/NotFoundError";
import { GenericError } from "../errors/GenericError";

export class NameController {

  private static NameBusiness = new NameBusiness(
    new NameDatabase(),
    new IdManager()
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
      const {name, token} = req.body

      if(!name || !token){
        throw new InvalidParameterError("Preencha todos os campos")
      }


      const user = await NameController.UserBusiness.getUserById(token)

      if(!user){
        throw new NotFoundError("Usuário não encontrado")
      }

      const nextStep = await NameController.StepBusiness.checkStep(Steps.AMOUNT, user.getId())

      if (!nextStep) {
        throw new GenericError("Você está na etapa errada do cadastro")
      }

      await NameController.NameBusiness.insert(name, user.getId())

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
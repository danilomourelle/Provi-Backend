import { AddressDatabase } from "../data/AddressDatabase";
import { AmountDatabase } from "../data/AmountDatabase";
import { BirthdayDatabase } from "../data/BirthdayDatabase";
import { CPFDatabase } from "../data/CPFDatabase";
import { NameDatabase } from "../data/NameDatabase";
import { PhoneDatabase } from "../data/PhoneDatabase";
import { CPF } from "../model/CPF";

export class StepBusiness {
  constructor(
    private addressDatabase: AddressDatabase,
    private amountDatabase: AmountDatabase,
    private birthdayDatabase: BirthdayDatabase,
    private cpfDatabase: CPFDatabase,
    private nameDatabase: NameDatabase,
    private phoneDatabase: PhoneDatabase,
  ) { }

  private nextStep: string = ''

  private setNextStep(nextStep: string): void {
    this.nextStep = nextStep
  }

  public async checkStep(actualStep: string, userId: string): Promise<string> {
    this.setNextStep('')

    switch (actualStep) {
      case Steps.CPF:
        this.setNextStep(Steps.NAME)
        return this.nextStep

      case Steps.NAME:
        const existingCPF = await this.cpfDatabase.getCPFByUserId(userId)
        if (existingCPF) {
          this.setNextStep(Steps.BIRTHDAY)
        }
        return this.nextStep

      case Steps.BIRTHDAY:
        const existingName = await this.nameDatabase.getNameByUserId(userId)
        if (existingName) {
          this.setNextStep(Steps.PHONE)
        }
        return this.nextStep

      case Steps.PHONE:
        const existingBirthday = await this.birthdayDatabase.getBirthdayByUserId(userId)
        if (existingBirthday) {
          this.setNextStep(Steps.ADDRESS)
        }
        return this.nextStep

      case Steps.ADDRESS:
        const existingPhone = await this.phoneDatabase.getPhoneByUserId(userId)
        if (existingPhone) {
          this.setNextStep(Steps.AMOUNT)
        }
        return this.nextStep

      case Steps.AMOUNT:
        const existingAddress = await this.addressDatabase.getAddressByUserId(userId)
        if (existingAddress) {
          this.setNextStep('Done')
        }
        return this.nextStep

      default:
        return '';
    }
  }
}

export enum Steps {
  ADDRESS = 'Address',
  AMOUNT = 'Amount',
  CPF = 'CPF',
  BIRTHDAY = 'Birthday',
  NAME = 'Name',
  PHONE = 'Phone',
}
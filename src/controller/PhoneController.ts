import { Request, Response } from "express";
import { PhoneBusiness } from "../business/PhoneBusiness";
import { PhoneDatabase } from "../data/PhoneDatabase";
import { IdManager } from "../services/IdManager";
import { BaseDatabase } from "../data/BaseDatabase";

export class PhoneController {
  private static ProductBusiness = new PhoneBusiness(
    new PhoneDatabase(),
    new IdManager()
  )
}
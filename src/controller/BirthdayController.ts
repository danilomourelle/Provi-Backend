import { Request, Response } from "express";
import { BirthdayBusiness } from "../business/BirthdayBusiness";
import { BirthdayDatabase } from "../data/BirthdayDatabase";
import { IdManager } from "../services/IdManager";
import { BaseDatabase } from "../data/BaseDatabase";

export class BirthdayController {
  private static ProductBusiness = new BirthdayBusiness(
    new BirthdayDatabase(),
    new IdManager()
  )
}
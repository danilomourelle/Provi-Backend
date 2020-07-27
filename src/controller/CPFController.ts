import { Request, Response } from "express";
import { CPFBusiness } from "../business/CPFBusiness";
import { CPFDatabase } from "../data/CPFDatabase";
import { IdManager } from "../services/IdManager";
import { BaseDatabase } from "../data/BaseDatabase";

export class CPFController {
  private static ProductBusiness = new CPFBusiness(
    new CPFDatabase(),
    new IdManager()
  )
}
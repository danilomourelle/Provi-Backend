import { Request, Response } from "express";
import { NameBusiness } from "../business/NameBusiness";
import { NameDatabase } from "../data/NameDatabase";
import { IdManager } from "../services/IdManager";
import { BaseDatabase } from "../data/BaseDatabase";

export class NameController {
  private static ProductBusiness = new NameBusiness(
    new NameDatabase(),
    new IdManager()
  )
}
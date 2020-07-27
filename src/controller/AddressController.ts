import { Request, Response } from "express";
import { AddressBusiness } from "../business/AddressBusiness";
import { AddressDatabase } from "../data/AddressDatabase";
import { IdManager } from "../services/IdManager";
import { BaseDatabase } from "../data/BaseDatabase";

export class AddressController {
  private static ProductBusiness = new AddressBusiness(
    new AddressDatabase(),
    new IdManager()
  )
}
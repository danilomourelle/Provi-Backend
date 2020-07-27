import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { UserDatabase } from "../data/UserDatabase";
import { IdManager } from "../services/IdManager";
import { BaseDatabase } from "../data/BaseDatabase";

export class UserController {
  private static ProductBusiness = new UserBusiness(
    new UserDatabase(),
    new IdManager()
  )
}
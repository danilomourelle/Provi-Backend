import { BaseDatabase } from "./BaseDatabase";
import { Address } from "../model/Address";

export class AddressDatabase extends BaseDatabase {
  public static TABLE_NAME: string = 'Address'

  private toModel(dbModel?: any): Address | undefined {
    return (
      dbModel &&
      new Address(
        dbModel.id,
        dbModel.cep,
        dbModel.street,
        Number(dbModel.number),
        dbModel.complement,
        dbModel.city,
        dbModel.state,
        dbModel.update_at,
        dbModel.user_id
      )
    )
  }

  public async create(address: Address): Promise<void> {
    await this.getConnection()
      .insert({
        id: address.getId(),
        cep: address.getCEP(),
        street: address.getStreet(),
        number: address.getNumber(),
        complement: address.getComplement(),
        city: address.getCity(),
        state: address.getState(),
        update_at: address.getUpdateAt(),
        user_id: address.getUserId()
      })
      .into(AddressDatabase.TABLE_NAME)
  }

  public async update(newDate: number, addressId: string): Promise<void> {
    await this.getConnection()
      .update({
        update_at: newDate
      })
      .into(AddressDatabase.TABLE_NAME)
      .where({ id: addressId })
  }

  public async getAddressByValue(address: Address): Promise<Address | undefined> {
    const result = await super.getConnection()
      .select("*")
      .from(AddressDatabase.TABLE_NAME)
      .where({
        cep: address.getCEP(),
        street: address.getStreet(),
        number: address.getNumber(),
        complement: address.getComplement(),
        city: address.getCity(),
        state: address.getState(),
      })

    return this.toModel(result[0])
  }

  public async getAddressByUserId(id: string): Promise<Address | undefined> {
    const result = await super.getConnection()
      .select("*")
      .from(AddressDatabase.TABLE_NAME)
      .where({ user_id: id })

    return this.toModel(result[0])
  }
}
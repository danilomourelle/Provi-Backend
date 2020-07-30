import { AddressBusiness } from "../../src/business/AddressBusiness";
import { Address } from "../../src/model/Address";

describe("Testing AddressBusiness.insert", () => {
  let addressMockDatabase = {};
  let idMockManager = {};
  let cepMockAPI = {}

  const cep = '01430-000'
  const street = "Av. Brasil"
  const number = 10
  const complement = ''
  const city = 'São Paulo'
  const state = 'SP'
  const createdAt = Date.now()
  const userId = 'userId'
  const diffUserId = 'anotherUserId'

  test("Should 'CEP e Logradouro não combinam' for cep and street not matching", async () => {
    expect.assertions(2);
    try {
      const idMockValue = 'id'
      const idSpy = jest.fn().mockReturnValue(idMockValue)
      idMockManager = {
        generateId: idSpy
      };

      const cepResponseMockValue = { logradouro: "Av Sete de Setembro" }
      const cepSpy = jest.fn().mockReturnValue(cepResponseMockValue)
      cepMockAPI = {
        checkCEP: cepSpy
      }

      const addressBusiness = new AddressBusiness(
        addressMockDatabase as any,
        idMockManager as any,
        cepMockAPI as any
      );

      await addressBusiness.insert(
        cep,
        street,
        number,
        complement,
        city,
        state,
        diffUserId
      );

    } catch (err) {
      expect(err.errorCode).toBe(422);
      expect(err.message).toBe("CEP e Logradouro não combinam");
    }
  });

  test("Should 'Endereço utilizado em outro usuário' for repeated address", async () => {
    expect.assertions(2);
    try {
      const idMockValue = 'id'
      const idSpy = jest.fn().mockReturnValue(idMockValue)
      idMockManager = {
        generateId: idSpy
      };

      const cepResponseMockValue = { logradouro: "Avenida Brasil" }
      const cepSpy = jest.fn().mockReturnValue(cepResponseMockValue)
      cepMockAPI = {
        checkCEP: cepSpy
      }

      const existingAddress = new Address(
        idMockValue,
        cep,
        street,
        number,
        complement,
        city,
        state,
        createdAt,
        userId
      )

      addressMockDatabase = {
        getAddressByValue: jest.fn((address: Address) => existingAddress)
      }

      const addressBusiness = new AddressBusiness(
        addressMockDatabase as any,
        idMockManager as any,
        cepMockAPI as any
      );

      await addressBusiness.insert(
        cep,
        street,
        number,
        complement,
        city,
        state,
        diffUserId
      );

    } catch (err) {
      expect(err.errorCode).toBe(406);
      expect(err.message).toBe("Endereço utilizado em outro usuário");
    }
  });

  test("Should call update for same userId", async () => {
    const idMockValue = 'id'
    const idSpy = jest.fn().mockReturnValue(idMockValue)
    idMockManager = {
      generateId: idSpy
    };

    const cepResponseMockValue = { logradouro: "Avenida Brasil" }
    const cepSpy = jest.fn().mockReturnValue(cepResponseMockValue)
    cepMockAPI = {
      checkCEP: cepSpy
    }

    const existingAddress = new Address(
      idMockValue,
      cep,
      street,
      number,
      complement,
      city,
      state,
      createdAt,
      userId
    )
    const updateSpy = jest.fn((number: number, addressId: string) => { })
    const createSpy = jest.fn((address: Address) => { })
    addressMockDatabase = {
      getAddressByValue: jest.fn((address: Address) => existingAddress),
      update: updateSpy,
      create: createSpy
    }

    const addressBusiness = new AddressBusiness(
      addressMockDatabase as any,
      idMockManager as any,
      cepMockAPI as any
    );

    await addressBusiness.insert(
      cep,
      street,
      number,
      complement,
      city,
      state,
      userId
    );

    expect(cepSpy).toHaveBeenCalledWith(cep)
    expect(updateSpy).toHaveBeenCalledTimes(1);
    expect(createSpy).not.toHaveBeenCalled();

  });

  test("Should call create for falsy existingAddress", async () => {
    const idMockValue = 'id'
    const idSpy = jest.fn().mockReturnValue(idMockValue)
    idMockManager = {
      generateId: idSpy
    };

    const cepResponseMockValue = { logradouro: "Avenida Brasil" }
    const cepSpy = jest.fn().mockReturnValue(cepResponseMockValue)
    cepMockAPI = {
      checkCEP: cepSpy
    }

    const updateSpy = jest.fn((number: number, addressId: string) => { })
    const createSpy = jest.fn((address: Address) => { })
    addressMockDatabase = {
      getAddressByValue: jest.fn((address: Address) => undefined),
      update: updateSpy,
      create: createSpy
    }

    const addressBusiness = new AddressBusiness(
      addressMockDatabase as any,
      idMockManager as any,
      cepMockAPI as any
    );

    await addressBusiness.insert(
      cep,
      street,
      number,
      complement,
      city,
      state,
      userId
    );

    expect(cepSpy).toHaveBeenCalledWith(cep)
    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(updateSpy).not.toHaveBeenCalled();
  });
});
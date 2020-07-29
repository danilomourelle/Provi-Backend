import { CPFBusiness } from "../../src/business/CPFBusiness";
import { CPF } from "../../src/model/CPF";

describe("Testing CPFBusiness.insert", () => {
  let cpfMockDatabase = {};
  let idMockManager = {};
  const cpf = '2002-02-20'
  const createdAt = Date.now()
  const userId = 'userId'
  const diffUserId = 'anotherUserId'

  test("Should 'CPF utilizado em outro usuário' for repeated cpf", async () => {
    expect.assertions(2);
    try {
      const idMockValue = 'id'
      const idSpy = jest.fn().mockReturnValue(idMockValue)
      idMockManager = {
        generateId: idSpy
      };

      const existingCPF = new CPF(
        idMockValue,
        cpf,
        createdAt,
        userId
      )

      cpfMockDatabase = {
        getCPFByValue: jest.fn((cpf: CPF) => existingCPF)
      }

      const cpfBusiness = new CPFBusiness(
        cpfMockDatabase as any,
        idMockManager as any,
      );

      await cpfBusiness.insert(cpf, diffUserId);

    } catch (err) {
      expect(err.errorCode).toBe(406);
      expect(err.message).toBe("CPF utilizado em outro usuário");
    }
  });

  test("Should call update for same userId", async () => {
    const idMockValue = 'id'
    const idSpy = jest.fn().mockReturnValue(idMockValue)
    idMockManager = {
      generateId: idSpy
    };

    const existingCPF = new CPF(
      idMockValue,
      cpf,
      createdAt,
      userId
    )
    const updateSpy = jest.fn((number: number, cpfId: string) => { })
    const createSpy = jest.fn((cpf: CPF) => { })
    cpfMockDatabase = {
      getCPFByValue: jest.fn((cpf: CPF) => existingCPF),
      update: updateSpy,
      create: createSpy
    }

    const cpfBusiness = new CPFBusiness(
      cpfMockDatabase as any,
      idMockManager as any,
    );

    await cpfBusiness.insert(cpf, userId);

    expect(updateSpy).toHaveBeenCalledTimes(1);
    expect(createSpy).not.toHaveBeenCalled();
  });

  test("Should call create for falsy existingCPF", async () => {
    const idMockValue = 'id'
    const idSpy = jest.fn().mockReturnValue(idMockValue)
    idMockManager = {
      generateId: idSpy
    };

    const updateSpy = jest.fn((number: number, cpfId: string) => { })
    const createSpy = jest.fn((cpf: CPF) => { })
    cpfMockDatabase = {
      getCPFByValue: jest.fn((cpf: CPF) => undefined),
      update: updateSpy,
      create: createSpy
    }

    const cpfBusiness = new CPFBusiness(
      cpfMockDatabase as any,
      idMockManager as any,
    );

    await cpfBusiness.insert(cpf, userId);

    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(updateSpy).not.toHaveBeenCalled();
  });
});
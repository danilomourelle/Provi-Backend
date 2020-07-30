import { AmountBusiness } from "../../src/business/AmountBusiness";
import { Amount } from "../../src/model/Amount";

describe("Testing AmountBusiness.insert", () => {
  let amountMockDatabase = {};
  let idMockManager = {};
  
  const amount = '300000'
  const createdAt = Date.now()
  const userId = 'userId'
  const diffUserId = 'anotherUserId'

  test("Should 'Quantidade pedida em outro usuário' for repeated amount", async () => {
    expect.assertions(2);
    try {
      const idMockValue = 'id'
      const idSpy = jest.fn().mockReturnValue(idMockValue)
      idMockManager = {
        generateId: idSpy
      };

      const existingAmount = new Amount(
        idMockValue,
        amount,
        createdAt,
        userId
      )

      amountMockDatabase = {
        getAmountByValue: jest.fn((amount: Amount) => existingAmount)
      }

      const amountBusiness = new AmountBusiness(
        amountMockDatabase as any,
        idMockManager as any,
      );

      await amountBusiness.insert(amount, diffUserId);

    } catch (err) {
      expect(err.errorCode).toBe(406);
      expect(err.message).toBe("Quantidade pedida em outro usuário");
    }
  });

  test("Should call update for same userId", async () => {
    const idMockValue = 'id'
    const idSpy = jest.fn().mockReturnValue(idMockValue)
    idMockManager = {
      generateId: idSpy
    };

    const existingAmount = new Amount(
      idMockValue,
      amount,
      createdAt,
      userId
    )
    const updateSpy = jest.fn((number: number, amountId: string) => { })
    const createSpy = jest.fn((amount: Amount) => { })
    amountMockDatabase = {
      getAmountByValue: jest.fn((amount: Amount) => existingAmount),
      update: updateSpy,
      create: createSpy
    }

    const amountBusiness = new AmountBusiness(
      amountMockDatabase as any,
      idMockManager as any,
    );

    await amountBusiness.insert(amount, userId);

    expect(updateSpy).toHaveBeenCalledTimes(1);
    expect(createSpy).not.toHaveBeenCalled();
  });

  test("Should call create for falsy existingAmount", async () => {
    const idMockValue = 'id'
    const idSpy = jest.fn().mockReturnValue(idMockValue)
    idMockManager = {
      generateId: idSpy
    };

    const updateSpy = jest.fn((number: number, amountId: string) => { })
    const createSpy = jest.fn((amount: Amount) => { })
    amountMockDatabase = {
      getAmountByValue: jest.fn((amount: Amount) => undefined),
      update: updateSpy,
      create: createSpy
    }

    const amountBusiness = new AmountBusiness(
      amountMockDatabase as any,
      idMockManager as any,
    );

    await amountBusiness.insert(amount, userId);

    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(updateSpy).not.toHaveBeenCalled();
  });
});
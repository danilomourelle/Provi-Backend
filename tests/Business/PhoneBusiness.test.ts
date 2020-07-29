import { PhoneBusiness } from "../../src/business/PhoneBusiness";
import { Phone } from "../../src/model/Phone";

describe("Testing PhoneBusiness.insert", () => {
  let phoneMockDatabase = {};
  let idMockManager = {};
  const phone = '(11) 9 8888-7777'
  const createdAt = Date.now()
  const userId = 'userId'
  const diffUserId = 'anotherUserId'

  test("Should 'Número utilizado em outro usuário' for repeated phone", async () => {
    expect.assertions(2);
    try {
      const idMockValue = 'id'
      const idSpy = jest.fn().mockReturnValue(idMockValue)
      idMockManager = {
        generateId: idSpy
      };

      const existingPhone = new Phone(
        idMockValue,
        phone,
        createdAt,
        userId
      )

      phoneMockDatabase = {
        getPhoneByValue: jest.fn((phone: Phone) => existingPhone)
      }

      const phoneBusiness = new PhoneBusiness(
        phoneMockDatabase as any,
        idMockManager as any,
      );

      await phoneBusiness.insert(phone, diffUserId);

    } catch (err) {
      expect(err.errorCode).toBe(406);
      expect(err.message).toBe("Número utilizado em outro usuário");
    }
  });

  test("Should call update for same userId", async () => {
    const idMockValue = 'id'
    const idSpy = jest.fn().mockReturnValue(idMockValue)
    idMockManager = {
      generateId: idSpy
    };

    const existingPhone = new Phone(
      idMockValue,
      phone,
      createdAt,
      userId
    )
    const updateSpy = jest.fn((number: number, phoneId: string) => { })
    const createSpy = jest.fn((phone: Phone) => { })
    phoneMockDatabase = {
      getPhoneByValue: jest.fn((phone: Phone) => existingPhone),
      update: updateSpy,
      create: createSpy
    }

    const phoneBusiness = new PhoneBusiness(
      phoneMockDatabase as any,
      idMockManager as any,
    );

    await phoneBusiness.insert(phone, userId);

    expect(updateSpy).toHaveBeenCalledTimes(1);
    expect(createSpy).not.toHaveBeenCalled();
  });

  test("Should call create for falsy existingPhone", async () => {
    const idMockValue = 'id'
    const idSpy = jest.fn().mockReturnValue(idMockValue)
    idMockManager = {
      generateId: idSpy
    };

    const updateSpy = jest.fn((number: number, phoneId: string) => { })
    const createSpy = jest.fn((phone: Phone) => { })
    phoneMockDatabase = {
      getPhoneByValue: jest.fn((phone: Phone) => undefined),
      update: updateSpy,
      create: createSpy
    }

    const phoneBusiness = new PhoneBusiness(
      phoneMockDatabase as any,
      idMockManager as any,
    );

    await phoneBusiness.insert(phone, userId);

    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(updateSpy).not.toHaveBeenCalled();
  });
});
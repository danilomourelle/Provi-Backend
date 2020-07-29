import { NameBusiness } from "../../src/business/NameBusiness";
import { Name } from "../../src/model/Name";

describe("Testing NameBusiness.insert", () => {
  let nameMockDatabase = {};
  let idMockManager = {};
  const name = "Danilo Mourelle"
  const firstName = 'Danilo'
  const lastName = 'Mourelle'
  const createdAt = Date.now()
  const userId = 'userId'
  const diffUserId = 'anotherUserId'

  test("Should 'Nome inválido' for single name", async () => {
    expect.assertions(2);
    try {
      const idMockValue = 'id'
      const idSpy = jest.fn().mockReturnValue(idMockValue)
      idMockManager = {
        generateId: idSpy
      };

      const existingName = new Name(
        idMockValue,
        firstName,
        lastName,
        createdAt,
        userId
      )

      nameMockDatabase = {
        getNameByValue: jest.fn((name: Name) => existingName)
      }

      const nameBusiness = new NameBusiness(
        nameMockDatabase as any,
        idMockManager as any,
      );

      await nameBusiness.insert("Danilo", diffUserId);

    } catch (err) {
      expect(err.errorCode).toBe(422);
      expect(err.message).toBe("Nome inválido");
    }
  });

  test("Should 'Nome utilizado em outro usuário' for repeated name", async () => {
    expect.assertions(2);
    try {
      const idMockValue = 'id'
      const idSpy = jest.fn().mockReturnValue(idMockValue)
      idMockManager = {
        generateId: idSpy
      };

      const existingName = new Name(
        idMockValue,
        firstName,
        lastName,
        createdAt,
        userId
      )

      nameMockDatabase = {
        getNameByValue: jest.fn((name: Name) => existingName)
      }

      const nameBusiness = new NameBusiness(
        nameMockDatabase as any,
        idMockManager as any,
      );

      await nameBusiness.insert(name, diffUserId);

    } catch (err) {
      expect(err.errorCode).toBe(406);
      expect(err.message).toBe("Nome utilizado em outro usuário");
    }
  });

  test("Should call update for same userId", async () => {
    const idMockValue = 'id'
    const idSpy = jest.fn().mockReturnValue(idMockValue)
    idMockManager = {
      generateId: idSpy
    };

    const existingName = new Name(
      idMockValue,
      firstName,
      lastName,
      createdAt,
      userId
    )
    const updateSpy = jest.fn((number: number, nameId: string) => { })
    const createSpy = jest.fn((name: Name) => { })
    nameMockDatabase = {
      getNameByValue: jest.fn((name: Name) => existingName),
      update: updateSpy,
      create: createSpy
    }

    const nameBusiness = new NameBusiness(
      nameMockDatabase as any,
      idMockManager as any,
    );

    await nameBusiness.insert(name, userId);

    expect(updateSpy).toHaveBeenCalledTimes(1);
    expect(createSpy).not.toHaveBeenCalled();
  });

  test("Should call create for falsy existingName", async () => {
    const idMockValue = 'id'
    const idSpy = jest.fn().mockReturnValue(idMockValue)
    idMockManager = {
      generateId: idSpy
    };

    const updateSpy = jest.fn((number: number, nameId: string) => { })
    const createSpy = jest.fn((name: Name) => { })
    nameMockDatabase = {
      getNameByValue: jest.fn((name: Name) => undefined),
      update: updateSpy,
      create: createSpy
    }

    const nameBusiness = new NameBusiness(
      nameMockDatabase as any,
      idMockManager as any,
    );

    await nameBusiness.insert(name, userId);

    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(updateSpy).not.toHaveBeenCalled();
  });
});
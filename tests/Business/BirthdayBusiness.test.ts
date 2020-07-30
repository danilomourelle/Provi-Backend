import { BirthdayBusiness } from "../../src/business/BirthdayBusiness";
import { Birthday } from "../../src/model/Birthday";

describe("Testing BirthdayBusiness.insert", () => {
  let birthdayMockDatabase = {};
  let idMockManager = {};
  
  const birthday = '2002-02-20'
  const createdAt = Date.now()
  const userId = 'userId'
  const diffUserId = 'anotherUserId'

  test("Should 'Data utilizada em outro usuário' for repeated birthday", async () => {
    expect.assertions(2);
    try {
      const idMockValue = 'id'
      const idSpy = jest.fn().mockReturnValue(idMockValue)
      idMockManager = {
        generateId: idSpy
      };

      const existingBirthday = new Birthday(
        idMockValue,
        birthday,
        createdAt,
        userId
      )

      birthdayMockDatabase = {
        getBirthdayByValue: jest.fn((birthday: Birthday) => existingBirthday)
      }

      const birthdayBusiness = new BirthdayBusiness(
        birthdayMockDatabase as any,
        idMockManager as any,
      );

      await birthdayBusiness.insert(birthday, diffUserId);

    } catch (err) {
      expect(err.errorCode).toBe(406);
      expect(err.message).toBe("Data utilizada em outro usuário");
    }
  });

  test("Should call update for same userId", async () => {
    const idMockValue = 'id'
    const idSpy = jest.fn().mockReturnValue(idMockValue)
    idMockManager = {
      generateId: idSpy
    };

    const existingBirthday = new Birthday(
      idMockValue,
      birthday,
      createdAt,
      userId
    )
    const updateSpy = jest.fn((number: number, birthdayId: string) => { })
    const createSpy = jest.fn((birthday: Birthday) => { })
    birthdayMockDatabase = {
      getBirthdayByValue: jest.fn((birthday: Birthday) => existingBirthday),
      update: updateSpy,
      create: createSpy
    }

    const birthdayBusiness = new BirthdayBusiness(
      birthdayMockDatabase as any,
      idMockManager as any,
    );

    await birthdayBusiness.insert(birthday, userId);

    expect(updateSpy).toHaveBeenCalledTimes(1);
    expect(createSpy).not.toHaveBeenCalled();
  });

  test("Should call create for falsy existingBirthday", async () => {
    const idMockValue = 'id'
    const idSpy = jest.fn().mockReturnValue(idMockValue)
    idMockManager = {
      generateId: idSpy
    };

    const updateSpy = jest.fn((number: number, birthdayId: string) => { })
    const createSpy = jest.fn((birthday: Birthday) => { })
    birthdayMockDatabase = {
      getBirthdayByValue: jest.fn((birthday: Birthday) => undefined),
      update: updateSpy,
      create: createSpy
    }

    const birthdayBusiness = new BirthdayBusiness(
      birthdayMockDatabase as any,
      idMockManager as any,
    );

    await birthdayBusiness.insert(birthday, userId);

    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(updateSpy).not.toHaveBeenCalled();
  });
});
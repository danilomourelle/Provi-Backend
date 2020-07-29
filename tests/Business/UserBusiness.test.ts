import { UserBusiness } from "../../src/business/UserBusiness";
import { User } from "../../src/model/User";

describe("Testing UserBusiness.register", () => {
  let userDatabase = {};
  let hashMockManager = {};
  let idMockManager = {};

  test("Should return 406 / 'Email já cadastrado' for user valid response", async () => {
    expect.assertions(2);
    try {
      userDatabase = {
        getUserByEmail: jest.fn(() => true)
      }

      const userBusiness = new UserBusiness(
        userDatabase as any,
        idMockManager as any,
        hashMockManager as any,
      );

      await userBusiness.register(
        "danilo@email.com",
        "123456"
      );
    } catch (err) {
      expect(err.errorCode).toBe(406);
      expect(err.message).toBe("Email já cadastrado");
    }
  });

  test("Should return the newUser in success", async () => {
    const idMockValue = 'id'
    const idSpy = jest.fn().mockReturnValue(idMockValue)
    idMockManager = {
      generateId: idSpy
    };
    const hashMockValue = 'hash'
    const hashSpy = jest.fn().mockReturnValue(hashMockValue)
    hashMockManager = {
      generateHash: hashSpy
    };
    const email = 'danilo@email.com'

    const newUser = new User(idMockValue, email, hashMockValue)

    const register = jest.fn((user: User) => { });

    userDatabase = {
      register,
      getUserByEmail: jest.fn().mockReturnValue(false)
    };

    const userBusiness = new UserBusiness(
      userDatabase as any,
      idMockManager as any,
      hashMockManager as any,
    );

    const result = await userBusiness.register(
      email,
      "123456"
    );

    expect(result).toEqual(newUser);
    expect(hashSpy).toHaveBeenCalledWith("123456");
    expect(idSpy).toHaveBeenCalledTimes(1);
    expect(register).toHaveBeenCalledWith(newUser);
  });
});

describe("Testing UserBusiness.getUserById", () => {
  let userDatabase = {};
  let hashMockManager = {};
  let idMockManager = {};

  test("Should return false when BD returns falsy value", async () => {

    userDatabase = {
      getUserById: jest.fn(() => false)
    }

    const userBusiness = new UserBusiness(
      userDatabase as any,
      idMockManager as any,
      hashMockManager as any,
    );

    await userBusiness.getUserById("id");
  });

  test("Should return the user in success", async () => {
    const idMockValue = 'id'

    const hashMockValue = 'hash'

    const email = 'danilo@email.com'

    const user = new User(idMockValue, email, hashMockValue)

    const getUserById = jest.fn((id: string) => { return user });

    userDatabase = {
      getUserById
    };

    const userBusiness = new UserBusiness(
      userDatabase as any,
      idMockManager as any,
      hashMockManager as any,
    );

    const result = await userBusiness.getUserById('id');

    expect(result).toEqual(user);
  });
});

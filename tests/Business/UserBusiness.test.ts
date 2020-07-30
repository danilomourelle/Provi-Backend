import { UserBusiness } from "../../src/business/UserBusiness";
import { User } from "../../src/model/User";

describe("Testing UserBusiness.register", () => {
  let userDatabase = {};
  let hashMockManager = {};
  let idMockManager = {};
  let tokenMockManager = {};

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
        tokenMockManager as any
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

  test("Should return the token in success", async () => {
    const registerSpy = jest.fn((user: User) => { });
    const getUserByEmailSpy = jest.fn().mockReturnValue(false)
    userDatabase = {
      register: registerSpy,
      getUserByEmail: getUserByEmailSpy
    };

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

    const tokenMockValue = 'token'
    const tokenSpy = jest.fn().mockReturnValue(tokenMockValue)
    tokenMockManager = {
      generateToken: tokenSpy
    }

    const userBusiness = new UserBusiness(
      userDatabase as any,
      idMockManager as any,
      hashMockManager as any,
      tokenMockManager as any
    );

    const result = await userBusiness.register(
      'danilo@email.com',
      "123456"
    );

    expect(result).toEqual(tokenMockValue);
    expect(hashSpy).toHaveBeenCalledWith("123456");
    expect(idSpy).toHaveBeenCalledTimes(1);
    expect(tokenSpy).toHaveBeenCalledWith({
      id: idMockValue,
      email: 'danilo@email.com'
    });
  });
});


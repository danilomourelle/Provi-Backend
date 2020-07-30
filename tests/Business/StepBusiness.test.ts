import { StepBusiness, Steps } from "../../src/business/StepBusiness";
import { Birthday } from "../../src/model/Birthday";

describe("Testing StepBusiness.checkStep", () => {
  let addressMockDataBase = {};
  let amountMockDataBase = {};
  let birthdayMockDatabase = {};
  let cpfMockDatabase = {};
  let nameMockDatabase = {};
  let phoneMockDatabase = {};

  test("Should return Steps.NAME for actualStep Steps.CPF", async () => {

    const stepBusiness = new StepBusiness(
      addressMockDataBase as any,
      amountMockDataBase as any,
      birthdayMockDatabase as any,
      cpfMockDatabase as any,
      nameMockDatabase as any,
      phoneMockDatabase as any,
    )

    const response = await stepBusiness.checkStep(Steps.CPF, "id");

    expect(response).toBe(Steps.NAME)
  });

  test("Should return Steps.BIRTHDAY for actualStep Steps.NAME", async () => {
    cpfMockDatabase = {
      getCPFByUserId: jest.fn().mockReturnValue('user')
    }

    const stepBusiness = new StepBusiness(
      addressMockDataBase as any,
      amountMockDataBase as any,
      birthdayMockDatabase as any,
      cpfMockDatabase as any,
      nameMockDatabase as any,
      phoneMockDatabase as any,
    )

    const response = await stepBusiness.checkStep(Steps.NAME, "id");

    expect(response).toBe(Steps.BIRTHDAY)
  });

  test("Should return '' if CPF info is missing", async () => {
    cpfMockDatabase = {
      getCPFByUserId: jest.fn().mockReturnValue('')
    }

    const stepBusiness = new StepBusiness(
      addressMockDataBase as any,
      amountMockDataBase as any,
      birthdayMockDatabase as any,
      cpfMockDatabase as any,
      nameMockDatabase as any,
      phoneMockDatabase as any,
    )

    const response = await stepBusiness.checkStep(Steps.NAME, "id");

    expect(response).toBe('')
  });

  test("Should return Steps.PHONE for actualStep Steps.BIRTHDAY", async () => {
    nameMockDatabase = {
      getNameByUserId: jest.fn().mockReturnValue('user')
    }

    const stepBusiness = new StepBusiness(
      addressMockDataBase as any,
      amountMockDataBase as any,
      birthdayMockDatabase as any,
      cpfMockDatabase as any,
      nameMockDatabase as any,
      phoneMockDatabase as any,
    )

    const response = await stepBusiness.checkStep(Steps.BIRTHDAY, "id");

    expect(response).toBe(Steps.PHONE)
  });

  test("Should return '' if NAME info is missing", async () => {
    nameMockDatabase = {
      getNameByUserId: jest.fn().mockReturnValue('')
    }

    const stepBusiness = new StepBusiness(
      addressMockDataBase as any,
      amountMockDataBase as any,
      birthdayMockDatabase as any,
      cpfMockDatabase as any,
      nameMockDatabase as any,
      phoneMockDatabase as any,
    )

    const response = await stepBusiness.checkStep(Steps.BIRTHDAY, "id");

    expect(response).toBe('')
  });

  test("Should return Steps.ADDRESS for actualStep Steps.PHONE", async () => {
    birthdayMockDatabase = {
      getBirthdayByUserId: jest.fn().mockReturnValue('user')
    }

    const stepBusiness = new StepBusiness(
      addressMockDataBase as any,
      amountMockDataBase as any,
      birthdayMockDatabase as any,
      cpfMockDatabase as any,
      nameMockDatabase as any,
      phoneMockDatabase as any,
    )

    const response = await stepBusiness.checkStep(Steps.PHONE, "id");

    expect(response).toBe(Steps.ADDRESS)
  });

  test("Should return '' if BIRTHDAY info is missing", async () => {
    birthdayMockDatabase = {
      getBirthdayByUserId: jest.fn().mockReturnValue('')
    }

    const stepBusiness = new StepBusiness(
      addressMockDataBase as any,
      amountMockDataBase as any,
      birthdayMockDatabase as any,
      cpfMockDatabase as any,
      nameMockDatabase as any,
      phoneMockDatabase as any,
    )

    const response = await stepBusiness.checkStep(Steps.PHONE, "id");

    expect(response).toBe('')
  });

  test("Should return Steps.AMOUNT for actualStep Steps.ADDRESS", async () => {
    phoneMockDatabase = {
      getPhoneByUserId: jest.fn().mockReturnValue('user')
    }

    const stepBusiness = new StepBusiness(
      addressMockDataBase as any,
      amountMockDataBase as any,
      birthdayMockDatabase as any,
      cpfMockDatabase as any,
      nameMockDatabase as any,
      phoneMockDatabase as any,
    )

    const response = await stepBusiness.checkStep(Steps.ADDRESS, "id");

    expect(response).toBe(Steps.AMOUNT)
  });

  test("Should return '' if PHONE info is missing", async () => {
    phoneMockDatabase = {
      getPhoneByUserId: jest.fn().mockReturnValue('')
    }

    const stepBusiness = new StepBusiness(
      addressMockDataBase as any,
      amountMockDataBase as any,
      birthdayMockDatabase as any,
      cpfMockDatabase as any,
      nameMockDatabase as any,
      phoneMockDatabase as any,
    )

    const response = await stepBusiness.checkStep(Steps.ADDRESS, "id");

    expect(response).toBe('')
  });

  test("Should return 'Done' for actualStep Steps.AMOUNT", async () => {
    addressMockDataBase = {
      getAddressByUserId: jest.fn().mockReturnValue('user')
    }

    const stepBusiness = new StepBusiness(
      addressMockDataBase as any,
      amountMockDataBase as any,
      birthdayMockDatabase as any,
      cpfMockDatabase as any,
      nameMockDatabase as any,
      phoneMockDatabase as any,
    )

    const response = await stepBusiness.checkStep(Steps.AMOUNT, "id");

    expect(response).toBe("Done")
  });

  test("Should return '' if ADDRESS info is missing", async () => {
    addressMockDataBase = {
      getAddressByUserId: jest.fn().mockReturnValue('')
    }

    const stepBusiness = new StepBusiness(
      addressMockDataBase as any,
      amountMockDataBase as any,
      birthdayMockDatabase as any,
      cpfMockDatabase as any,
      nameMockDatabase as any,
      phoneMockDatabase as any,
    )

    const response = await stepBusiness.checkStep(Steps.AMOUNT, "id");

    expect(response).toBe('')
  });
});
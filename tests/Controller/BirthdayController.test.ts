import { BirthdayController } from '../../src/controller/BirthdayController'

describe("Testing BirthdayController.insert", () => {

  const birthdayController = new BirthdayController()

  test("Should return 'Preencha todos os campos' for empty birthday", async () => {
    const mockReq: any = {
      body: {
        birthday: '',
        token: 'token'
      }
    }
    const mockRes: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await birthdayController.insert(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(422);
    expect(mockRes.send).toHaveBeenCalledWith({ message: "Preencha todos os campos" });
  });

  test("Should return 'Preencha todos os campos' for empty token", async () => {
    const mockReq: any = {
      body: {
        birthday: '1987-12-28',
        token: ''
      }
    }
    const mockRes: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await birthdayController.insert(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(422);
    expect(mockRes.send).toHaveBeenCalledWith({ message: "Preencha todos os campos" });
  });
})

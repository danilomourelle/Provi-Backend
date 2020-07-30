import { Response } from "express";
import { UserController } from '../../src/controller/UserController'

describe("Testing UserController.register", () => {
  const userController = new UserController()

  test("Should return 'Preencha todos os campos' for empty email", async () => {

    const mockReq: any = {
      body: {
        email: '',
        password: '123456'
      }
    }
    const mockRes: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await userController.register(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(422);
    expect(mockRes.send).toHaveBeenCalledWith({ message: "Preencha todos os campos" });
  });
  test("Should return 'Preencha todos os campos' for empty password", async () => {

    const mockReq: any = {
      body: {
        email: 'danilo@email.com',
        password: ''
      }
    }
    const mockRes: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await userController.register(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(422);
    expect(mockRes.send).toHaveBeenCalledWith({ message: "Preencha todos os campos" });
  });
  test("Should return 'Email inválido' for invalid email", async () => {

    const mockReq: any = {
      body: {
        email: 'emailSemArroba',
        password: '123456'
      }
    }
    const mockRes: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await userController.register(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(422);
    expect(mockRes.send).toHaveBeenCalledWith({ message: "Email inválido" });
  });
});
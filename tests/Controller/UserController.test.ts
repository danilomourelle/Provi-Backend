import { Response } from "express";
import { UserController } from '../../src/controller/UserController'

// !Para testar condição de sucesso, deve-se comentar linhas de comunicação com DB e respostas associadas no arquivo do controller (32,35,36)


describe("Testing UserController.register", () => {
  let tokenGenerator = { generateToken: jest.fn().mockReturnValue('tokenResponse') };
  
  const userController = new UserController(tokenGenerator as any)

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
  test("Should return the accessToken in success", async () => {

    const mockReq: any = {
      body: {
        email: 'danilo3@email.com',
        password: '123456'
      }
    }
    const mockRes: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await userController.register(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.send).toHaveBeenCalledWith({ token: "tokenResponse" });
  });
});
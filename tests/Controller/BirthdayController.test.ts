import { BirthdayController } from '../../src/controller/BirthdayController'

// !Para testar condição de sucesso, deve-se comentar linhas de comunicação com DB e respostas associadas no arquivo do controller (38 a 45)

describe("Testing BirthdayController.insert", () => {
  let tokenGenerator = { retrieveDataFromToken: jest.fn().mockReturnValue('tokenResponse') };
  const birthdayController = new BirthdayController(tokenGenerator as any)

  test("Should return 'Preencha todos os campos' for empty birthday", async () => {
    const mockReq: any = {
      body: {
        birthday:'',
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
        birthday:'1987-12-28',
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

  test("Should return the 'message:OK' in success", async () => {
    const mockReq: any = {
      body: {
        birthday:'1987-12-28',
        token: 'token'
      }
    }
    const mockRes: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await birthdayController.insert(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.send).toHaveBeenCalledWith({ message: "OK" });
  });
})

import { PhoneController } from '../../src/controller/PhoneController'

// !Para testar condição de sucesso, deve-se comentar linhas de comunicação com DB e respostas associadas no arquivo do controller (42 a 51)

describe("Testing PhoneController.insert", () => {
  let tokenGenerator = { retrieveDataFromToken: jest.fn().mockReturnValue('tokenResponse') };
  const phoneController = new PhoneController(tokenGenerator as any)

  test("Should return 'Preencha todos os campos' for empty phone", async () => {
    const mockReq: any = {
      body: {
        phone: '',
        token: 'token'
      }
    }
    const mockRes: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await phoneController.insert(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(422);
    expect(mockRes.send).toHaveBeenCalledWith({ message: "Preencha todos os campos" });
  });

  test("Should return 'Preencha todos os campos' for empty token", async () => {
    const mockReq: any = {
      body: {
        phone: '(11) 9 9999-8888',
        token: ''
      }
    }
    const mockRes: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await phoneController.insert(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(422);
    expect(mockRes.send).toHaveBeenCalledWith({ message: "Preencha todos os campos" });
  });

  test("Should return the 'message:OK' in success", async () => {
    const mockReq: any = {
      body: {
        phone: '(11) 9 9999-8888',
        token: 'token'
      }
    }
    const mockRes: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await phoneController.insert(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.send).toHaveBeenCalledWith({ message: "OK" });
  });
});
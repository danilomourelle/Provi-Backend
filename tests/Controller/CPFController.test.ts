import { CPFController } from '../../src/controller/CPFController'

// !Para testar condição de sucesso, deve-se comentar linhas de comunicação com DB e respostas associadas no arquivo do controller (39 a 45)

describe("Testing CPFController.insert", () => {
  let tokenGenerator = { retrieveDataFromToken: jest.fn().mockReturnValue('tokenResponse') };
  const cpfController = new CPFController(tokenGenerator as any)

  test("Should return 'Preencha todos os campos' for empty cpf", async () => {
    const mockReq: any = {
      body: {
        cpf: '',
        token: 'token'
      }
    }
    const mockRes: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await cpfController.insert(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(422);
    expect(mockRes.send).toHaveBeenCalledWith({ message: "Preencha todos os campos" });
  });

  test("Should return 'Preencha todos os campos' for empty token", async () => {
    const mockReq: any = {
      body: {
        cpf: '111.222.333-00',
        token: ''
      }
    }
    const mockRes: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await cpfController.insert(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(422);
    expect(mockRes.send).toHaveBeenCalledWith({ message: "Preencha todos os campos" });
  });

  test("Should return the 'message:OK' in success", async () => {
    const mockReq: any = {
      body: {
        cpf: '111.222.333-00',
        token: 'token'
      }
    }
    const mockRes: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await cpfController.insert(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.send).toHaveBeenCalledWith({ message: "OK" });
  });
});
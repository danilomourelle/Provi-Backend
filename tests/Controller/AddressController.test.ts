import { AddressController } from '../../src/controller/AddressController'

// !Para testar condição de sucesso, deve-se comentar linhas de comunicação com DB e respostas associadas no arquivo do controller (49 a 63)

describe("Testing AddressController.insert", () => {
  let tokenGenerator = { retrieveDataFromToken: jest.fn().mockReturnValue('tokenResponse') };
  const addressController = new AddressController(tokenGenerator as any)

  test("Should return 'Preencha todos os campos' for empty cep", async () => {
    const mockReq: any = {
      body: {
        cep: '',
        street: "Avenida Brasil",
        number: "123",
        complement: '',
        city: 'São Paulo',
        state: 'SP',
        token: 'token'
      }
    }
    const mockRes: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await addressController.insert(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(422);
    expect(mockRes.send).toHaveBeenCalledWith({ message: "Preencha todos os campos" });
  });

  test("Should return 'Preencha todos os campos' for empty street", async () => {
    const mockReq: any = {
      body: {
        cep: '111.222.333-00',
        street: "",
        number: "123",
        complement: '',
        city: 'São Paulo',
        state: 'SP',
        token: 'token'
      }
    }
    const mockRes: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await addressController.insert(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(422);
    expect(mockRes.send).toHaveBeenCalledWith({ message: "Preencha todos os campos" });
  });

  test("Should return 'Preencha todos os campos' for empty number", async () => {
    const mockReq: any = {
      body: {
        cep: '111.222.333-00',
        street: "Avenida Brasil",
        number: "",
        complement: '',
        city: 'São Paulo',
        state: 'SP',
        token: 'token'
      }
    }
    const mockRes: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await addressController.insert(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(422);
    expect(mockRes.send).toHaveBeenCalledWith({ message: "Preencha todos os campos" });
  });

  test("Should return 'Numero inválido' for invalid number", async () => {
    const mockReq: any = {
      body: {
        cep: '111.222.333-00',
        street: "Avenida Brasil",
        number: "aaa",
        complement: '',
        city: 'São Paulo',
        state: 'SP',
        token: 'token'
      }
    }
    const mockRes: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await addressController.insert(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(422);
    expect(mockRes.send).toHaveBeenCalledWith({ message: "Numero inválido" });
  });

  test("Should return 'Preencha todos os campos' for empty city", async () => {
    const mockReq: any = {
      body: {
        cep: '111.222.333-00',
        street: "Avenida Brasil",
        number: "123",
        complement: '',
        city: '',
        state: 'SP',
        token: 'token'
      }
    }
    const mockRes: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await addressController.insert(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(422);
    expect(mockRes.send).toHaveBeenCalledWith({ message: "Preencha todos os campos" });
  });

  test("Should return 'Preencha todos os campos' for empty state", async () => {
    const mockReq: any = {
      body: {
        cep: '111.222.333-00',
        street: "Avenida Brasil",
        number: "123",
        complement: '',
        city: 'São Paulo',
        state: '',
        token: 'token'
      }
    }
    const mockRes: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await addressController.insert(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(422);
    expect(mockRes.send).toHaveBeenCalledWith({ message: "Preencha todos os campos" });
  });

  test("Should return 'Preencha todos os campos' for empty token", async () => {
    const mockReq: any = {
      body: {
        cep: '111.222.333-00',
        street: "Avenida Brasil",
        number: "123",
        complement: '',
        city: 'São Paulo',
        state: 'SP',
        token: ''
      }
    }
    const mockRes: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await addressController.insert(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(422);
    expect(mockRes.send).toHaveBeenCalledWith({ message: "Preencha todos os campos" });
  });

  test("Should return the accessToken in success", async () => {
    const mockReq: any = {
      body: {
        cep: '111.222.333-00',
        street: "Avenida Brasil",
        number: "123",
        complement: '',
        city: 'São Paulo',
        state: 'SP',
        token: 'token'
      }
    }
    const mockRes: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await addressController.insert(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.send).toHaveBeenCalledWith({ message: "OK" });
  });
});
import { AddressController } from '../../src/controller/AddressController'

describe("Testing AddressController.insert", () => {
  const addressController = new AddressController()

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
        cep: '00000-00',
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
        cep: '00000-00',
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
        cep: '00000-00',
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
        cep: '00000-00',
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
        cep: '00000-00',
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
        cep: '00000-00',
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
});
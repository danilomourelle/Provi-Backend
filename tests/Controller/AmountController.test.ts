import { AmountController } from '../../src/controller/AmountController'

describe("Testing AmountController.insert", () => {

  const amountController = new AmountController()

  test("Should return 'Preencha todos os campos' for empty amount", async () => {
    const mockReq: any = {
      body: {
        amount: '',
        token: 'token'
      }
    }
    const mockRes: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await amountController.insert(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(422);
    expect(mockRes.send).toHaveBeenCalledWith({ message: "Preencha todos os campos" });
  });

  test("Should return 'Preencha todos os campos' for empty token", async () => {
    const mockReq: any = {
      body: {
        amount: '156.88',
        token: ''
      }
    }
    const mockRes: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await amountController.insert(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(422);
    expect(mockRes.send).toHaveBeenCalledWith({ message: "Preencha todos os campos" });
  });

  test("Should return 'Valor solicitado inválido' for empty amount NaN", async () => {
    const mockReq: any = {
      body: {
        amount: 'abc',
        token: 'token'
      }
    }
    const mockRes: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    }

    await amountController.insert(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(422);
    expect(mockRes.send).toHaveBeenCalledWith({ message: "Valor solicitado inválido" });
  });
})

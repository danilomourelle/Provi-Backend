import axios from 'axios'

export class CEPExternalAPI {
  private baseUrl: string = 'https://viacep.com.br/ws/'

  public async checkCEP(cep: string): Promise<ServerData> {
    try {
      const response = await axios.get<ServerData>(`${this.baseUrl}${cep}/json`)

      return response.data
    }
    finally {

    }
  }
}

interface ServerData {
  cep: string,
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
  unidade: string
  ibge: string
  gia: string
}
import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

interface ViaCepResponse {
  erro?: boolean;
  gia?: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
}

@Injectable()
export class CepService {
  constructor(private httpService: HttpService) {}

  async getAddress(cep: string) {
    try {
      const url = `https://viacep.com.br/ws/${cep}/json/`;

      const response = (await firstValueFrom(this.httpService.get(url))) as {
        data: ViaCepResponse;
      };

      const data: ViaCepResponse = response.data;

      if (!data || data.erro) {
        throw new NotFoundException(`CEP ${cep} não encontrado`);
      }

      return {
        number: data.gia ?? null,
        street: data.logradouro,
        neighborhood: data.bairro,
        city: data.localidade,
        state: data.uf,
      };
    } catch (error: unknown) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new NotFoundException(`Erro ao consultar CEP ${cep}`);
    }
  }
}

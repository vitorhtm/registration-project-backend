import { HttpService } from '@nestjs/axios';
import { Get, Injectable, NotFoundException, Post, Put } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CepService {
    constructor(private httpService: HttpService) { }

    async getAddress(cep: string) {
        try {
          const url = `https://viacep.com.br/ws/${cep}/json/`;
          const response = await firstValueFrom(this.httpService.get(url));
          const data = response.data;
    
          if (!data || data.erro) {
            throw new NotFoundException(`CEP ${cep} não encontrado`);
          }
          console.log(data)
    
          return {
            number: data.gia,
            street: data.logradouro,
            neighborhood: data.bairro,
            city: data.localidade,
            state: data.uf,
          };
        } catch (error) {
          throw new NotFoundException(`Erro ao consultar CEP ${cep}`);
        }
      }

}

import { cpf, cnpj } from 'cpf-cnpj-validator';
import { IsNotEmpty, Matches, Validate } from 'class-validator';

export class UpdateDocumentDto {
  @IsNotEmpty({ message: 'CPF ou CNPJ é obrigatório' })
  @Matches(/^\d+$/, { message: 'CPF ou CNPJ deve conter apenas números' })
  @Validate((value: string) => cpf.isValid(value) || cnpj.isValid(value), {
    message: 'CPF ou CNPJ inválido',
  })
  document: string;
}

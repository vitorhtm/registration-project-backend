import { IsNotEmpty, Matches } from 'class-validator';

export class UpdateDocumentDto {
  @IsNotEmpty({ message: 'CPF ou CNPJ é obrigatório' })
  // Regex simples para aceitar números (pode melhorar depois)
  @Matches(/^\d+$/, { message: 'CPF ou CNPJ deve conter apenas números' })
  document: string;
}

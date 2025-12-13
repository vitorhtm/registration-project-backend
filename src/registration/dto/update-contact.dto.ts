import { IsNotEmpty, Matches } from 'class-validator';

export class UpdateContactDto {
  @IsNotEmpty({ message: 'Telefone é obrigatório' })
  // Exemplo para celular brasileiro
  @Matches(/^\d{10,11}$/, { message: 'Telefone inválido' })
  phone: string;
}

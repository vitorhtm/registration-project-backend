import { IsNotEmpty, IsEmail } from 'class-validator';

export class FinishRegistrationDto {
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  name: string;

  @IsNotEmpty({ message: 'Email é obrigatório' })
  @IsEmail({}, { message: 'Email inválido' })
  email: string;

  @IsNotEmpty({ message: 'CPF ou CNPJ é obrigatório' })
  cpfOrCnpj: string;

  @IsNotEmpty({ message: 'Telefone é obrigatório' })
  phone: string;

  @IsNotEmpty({ message: 'CEP é obrigatório' })
  cep: string;

  @IsNotEmpty({ message: 'Número é obrigatório' })
  number: string;

  @IsNotEmpty({ message: 'Rua é obrigatória' })
  street: string;

  @IsNotEmpty({ message: 'Bairro é obrigatório' })
  neighborhood: string;

  @IsNotEmpty({ message: 'Cidade é obrigatória' })
  city: string;

  @IsNotEmpty({ message: 'Estado é obrigatório' })
  state: string;
}

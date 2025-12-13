import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateAddressDto {
  @IsNotEmpty({ message: 'CEP é obrigatório' })
  cep: string;

  @IsNotEmpty({ message: 'Rua é obrigatória' })
  street: string;

  @IsNotEmpty({ message: 'Bairro é obrigatório' })
  neighborhood: string;

  @IsNotEmpty({ message: 'Cidade é obrigatória' })
  city: string;

  @IsNotEmpty({ message: 'Estado é obrigatório' })
  state: string;

  @IsNotEmpty({ message: 'Número é obrigatório' })
  number: string;

  @IsOptional()
  complement?: string;
}

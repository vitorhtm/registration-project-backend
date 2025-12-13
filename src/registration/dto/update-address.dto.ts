import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateAddressDto {
  @IsNotEmpty({ message: 'CEP é obrigatório' })
  cep: string;

  @IsOptional()
  number: string;

  @IsOptional()
  complement?: string;

  @IsOptional()
  street?: string;

  @IsOptional()
  neighborhood?: string;

  @IsOptional()
  city?: string;

  @IsOptional()
  state?: string;
}

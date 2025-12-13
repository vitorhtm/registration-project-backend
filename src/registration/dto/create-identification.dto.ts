import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateIdentificationDto {
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  name: string;

  @IsEmail({}, { message: 'E-mail è obrigatório' })
  email: string;
}
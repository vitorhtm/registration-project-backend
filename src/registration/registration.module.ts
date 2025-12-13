import { Module } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { RegistrationController } from './registration.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Registration } from './entities/registration.entity';
import { CepModule } from 'src/cep/ceo.module';


// forFeature faz o Nest conhecer e disponibilizar o Repository dessa entidade para uso no módulo
// repositório nesse contexto é um CRUD sem sql
@Module({
  imports: [
    TypeOrmModule.forFeature([Registration]), CepModule],
  controllers: [RegistrationController],
  providers: [RegistrationService],
})
export class RegistrationModule {}

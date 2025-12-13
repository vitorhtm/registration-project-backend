import { Module } from '@nestjs/common';
import { CepService } from './cep.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [CepService],
  exports: [CepService],
})
export class CepModule {}

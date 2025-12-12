import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegistrationModule } from './registration/registration.module';

@Module({
  imports: [
    // forRoot é para avisar o nest para inicializar o typeorm com essa configuração e torne-o disponivel para toda a
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'registration_db',
      autoLoadEntities: true,  // Carrega entidades automaticamente
      synchronize: true,       // Gera tabelas automaticamente (somente DEV)
    }),
    RegistrationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

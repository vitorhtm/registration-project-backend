import { Injectable, NotFoundException, Post, Put } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Registration } from './entities/registration.entity';
import { IsNull, Repository } from 'typeorm';
import { CreateIdentificationDto } from './dto/create-identification.dto';

@Injectable()
export class RegistrationService {
  constructor(
    @InjectRepository(Registration)
    private repo: Repository<Registration>
  ) { }

  // salva o registro
  async createRegistration(registration: CreateIdentificationDto) {

    const existing = await this.repo.findOne({
      where: { email: registration.email, finishedAt:  IsNull() }
    });

    if (existing) {
      Object.assign(existing, registration, { updatedAt: new Date() });
      return await this.repo.save(existing);
    } else {

      // descobri que @BeforeInsert() não é chamado em objetos literais.
      const entity = this.repo.create({
        ...registration,
        startedAt: new Date(),
        updatedAt: new Date(),
        finishedAt: null
      });
      return await this.repo.save(entity);
    }

  }

  async updateRegistration(id: string, dto: Partial<Registration>) {
    const registration = await this.repo.findOne({ where: { id } })

    if (!registration) {
      throw new NotFoundException('Registro não encontrado');
    }

    Object.assign(registration, dto, { updatedAt: new Date() });

    return await this.repo.save(registration);
  }


}

import { BadRequestException, Injectable, NotFoundException, Post, Put } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Registration } from './entities/registration.entity';
import { IsNull, Repository } from 'typeorm';
import { CreateIdentificationDto } from './dto/create-identification.dto';
import { CepService } from 'src/cep/cep.service';
import { UpdateAddressDto } from './dto/update-address.dto';
import { FinishRegistrationDto } from './dto/finished-registration.dto';
import { validate } from 'class-validator';

@Injectable()
export class RegistrationService {
  constructor(
    @InjectRepository(Registration)
    private repo: Repository<Registration>,
    private cepService: CepService
  ) { }

  // salva o registro
  async createRegistration(registration: CreateIdentificationDto) {

    const existing = await this.repo.findOne({
      where: { email: registration.email, finishedAt: IsNull() }
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

  async updateAddress(id: string, dto: UpdateAddressDto) {
    const dadosCep = await this.cepService.getAddress(dto.cep);

    dto.street = dadosCep.street;
    dto.neighborhood = dadosCep.neighborhood;
    dto.city = dadosCep.city;
    dto.state = dadosCep.state;

    return await this.updateRegistration(id, dto);
  }

  async validateFinish(registration: Registration) {
    const dto = Object.assign(new FinishRegistrationDto(), registration);
    const errors = await validate(dto);

    if (errors.length > 0) {
      const messages = errors
        .map(err => err.constraints ? Object.values(err.constraints) : [])
        .flat();

      throw new BadRequestException(messages);
    }
  }

  async finishRegistration(id: string) {

    const registration = await this.repo.findOne({ where: { id } });

    if (!registration) throw new NotFoundException('Registro não encontrado');

    await this.validateFinish(registration);

    registration.finishedAt = new Date();
    return await this.repo.save(registration);
  }


}

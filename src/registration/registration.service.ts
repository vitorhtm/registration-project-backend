import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Registration } from './entities/registration.entity';
import { CreateIdentificationDto } from './dto/create-identification.dto';
import { CepService } from '../cep/cep.service';
import { UpdateAddressDto } from './dto/update-address.dto';
import { FinishRegistrationDto } from './dto/finished-registration.dto';
import { validate } from 'class-validator';

@Injectable()
export class RegistrationService {
  constructor(
    @InjectRepository(Registration)
    private repo: Repository<Registration>,
    private cepService: CepService,
  ) {}

  // Cria ou atualiza rascunho com base no email
  async createRegistration(registration: CreateIdentificationDto) {
    // procura rascunho existente
    const existing = await this.repo.findOne({
      where: { email: registration.email, finishedAt: IsNull() },
    });

    if (existing) {
      Object.assign(existing, registration, { updatedAt: new Date() });
      return await this.repo.save(existing);
    } else {
      const entity = this.repo.create({
        ...registration,
        draftId: Math.random().toString(36).substring(2, 12), // id de rascunho
        startedAt: new Date(),
        updatedAt: new Date(),
        finishedAt: null,
      });
      return await this.repo.save(entity);
    }
  }

  async updateRegistration(id: string, dto: Partial<Registration>) {
    const registration = await this.repo.findOne({ where: { id } });

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
        .map((err) => (err.constraints ? Object.values(err.constraints) : []))
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

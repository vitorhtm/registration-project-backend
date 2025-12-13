import { Test, TestingModule } from '@nestjs/testing';
import { RegistrationController } from './registration.controller';
import { RegistrationService } from './registration.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Registration } from './entities/registration.entity';
import { CepService } from '../cep/cep.service';
import { BadRequestException } from '@nestjs/common';

describe('RegistrationController', () => {
  let controller: RegistrationController;
  let service: RegistrationService;

  const mockRepository = {
    findOne: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
  };

  const mockCepService = {
    getAddress: jest.fn(),
  };

  const mockService = {
    createRegistration: jest.fn(),
    updateRegistration: jest.fn(),
    updateAddress: jest.fn(),
    finishRegistration: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegistrationController],
      providers: [
        RegistrationService,
        { provide: getRepositoryToken(Registration), useValue: mockRepository },
        { provide: CepService, useValue: mockCepService },
      ],
    })
      .overrideProvider(RegistrationService)
      .useValue(mockService)
      .compile();

    controller = module.get<RegistrationController>(RegistrationController);
    service = module.get<RegistrationService>(RegistrationService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('deve chamar createRegistration do service', async () => {
    mockService.createRegistration.mockResolvedValue({ id: 'test-id' });

    const result = await controller.create({ name: 'Vitor', email: 'vitor@test.com' });
    expect(result.id).toBe('test-id');
    expect(mockService.createRegistration).toHaveBeenCalled();
  });

  it('deve finalizar um registro corretamente', async () => {
    const mockRegistration = {
      id: 'test-id',
      name: 'Vitor',
      email: 'vitor@test.com',
      cpfOrCnpj: '12345678900',
      phone: '11999999999',
      cep: '12345678',
      number: '100',
      street: 'Rua Teste',
      neighborhood: 'Bairro Teste',
      city: 'Cidade Teste',
      state: 'SP',
      startedAt: new Date(),
      updatedAt: new Date(),
      finishedAt: null,
    };

    mockService.finishRegistration.mockResolvedValue(mockRegistration);

    const result = await controller.finish('test-id');

    expect(result.registration.finishedAt).toBeNull(); // mock mantém null
    expect(result.message).toBe('Cadastro finalizado com sucesso');
    expect(mockService.finishRegistration).toHaveBeenCalledWith('test-id');
  });

  it('deve lançar BadRequestException se finish falhar', async () => {
    mockService.finishRegistration.mockRejectedValue(new BadRequestException('Erro'));

    await expect(controller.finish('invalid-id')).rejects.toThrow(BadRequestException);
  });
});

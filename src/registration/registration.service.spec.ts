import { Test, TestingModule } from '@nestjs/testing';
import { RegistrationService } from './registration.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Registration } from './entities/registration.entity';
import { CepService } from '../cep/cep.service';

describe('RegistrationService', () => {
  let service: RegistrationService;

  const mockRepository = {
    findOne: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
  };

  const mockCepService = {
    getAddress: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegistrationService,
        { provide: getRepositoryToken(Registration), useValue: mockRepository },
        { provide: CepService, useValue: mockCepService },
      ],
    }).compile();

    service = module.get<RegistrationService>(RegistrationService);
    jest.clearAllMocks();
  });

  it('deve criar um novo registro caso não exista', async () => {
    mockRepository.findOne.mockResolvedValue(null);

    mockRepository.create.mockImplementation(
      (dto: Partial<Registration>) => dto as Registration,
    );

    mockRepository.save.mockImplementation(
      (entity) =>
        ({
          ...entity,
          id: 'test-id-123',
        }) as Registration,
    );

    const result = await service.createRegistration({
      name: 'Vitor',
      email: 'vitor@test.com',
    });

    expect(result.id).toBe('test-id-123');
    expect(result.name).toBe('Vitor');
    expect(mockRepository.save).toHaveBeenCalledTimes(1);
  });

  it('deve atualizar um registro existente', async () => {
    const existing: Registration = {
      id: 'abc',
      name: 'Vitor',
      email: 'vitor@test.com',
      updatedAt: new Date(),
      startedAt: new Date(),
      finishedAt: null,
    } as Registration;

    mockRepository.findOne.mockResolvedValue(existing);

    mockRepository.save.mockImplementation((entity) => entity as Registration);

    const result = await service.createRegistration({
      name: 'Vitor Updated',
      email: 'vitor@test.com',
    });

    expect(result.name).toBe('Vitor Updated');
    expect(mockRepository.save).toHaveBeenCalledTimes(1);
  });
});

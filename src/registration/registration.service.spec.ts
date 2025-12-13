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
    getAddressFromCep: jest.fn(),
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

    // Limpa os mocks antes de cada teste
    jest.clearAllMocks();
  });

  it('deve criar um novo registro caso não exista', async () => {
    mockRepository.findOne.mockResolvedValue(null);
    mockRepository.create.mockImplementation(dto => dto); // retorna o dto literal
    mockRepository.save.mockImplementation(reg => ({ id: 'test-id-123', ...reg }));

    const result = await service.createRegistration({
      name: 'Vitor',
      email: 'vitor@test.com',
    });

    expect(result.id).toBeDefined();
    expect(result.name).toBe('Vitor');
    expect(mockRepository.save).toHaveBeenCalled();
  });

  it('deve atualizar um registro existente', async () => {
    const existing = { id: 'abc', name: 'Vitor', email: 'vitor@test.com', updatedAt: new Date() };
    mockRepository.findOne.mockResolvedValue(existing);
    mockRepository.save.mockImplementation(reg => ({ ...reg }));

    const result = await service.createRegistration({
      name: 'Vitor Updated',
      email: 'vitor@test.com',
    });

    expect(result.name).toBe('Vitor Updated');
    expect(mockRepository.save).toHaveBeenCalled();
  });
});

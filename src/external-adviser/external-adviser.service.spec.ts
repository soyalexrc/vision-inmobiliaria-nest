import { Test, TestingModule } from '@nestjs/testing';
import { ExternalAdviserService } from './external-adviser.service';

describe('ExternalAdviserService', () => {
  let service: ExternalAdviserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExternalAdviserService],
    }).compile();

    service = module.get<ExternalAdviserService>(ExternalAdviserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

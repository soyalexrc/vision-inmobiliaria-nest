import { Test, TestingModule } from '@nestjs/testing';
import { AllyService } from './ally.service';

describe('AllyService', () => {
  let service: AllyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AllyService],
    }).compile();

    service = module.get<AllyService>(AllyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

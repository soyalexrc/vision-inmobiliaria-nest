import { Test, TestingModule } from '@nestjs/testing';
import { AllyController } from './ally.controller';
import { AllyService } from './ally.service';

describe('AllyController', () => {
  let controller: AllyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AllyController],
      providers: [AllyService],
    }).compile();

    controller = module.get<AllyController>(AllyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

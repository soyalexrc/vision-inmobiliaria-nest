import { Test, TestingModule } from '@nestjs/testing';
import { ExternalAdviserController } from './external-adviser.controller';
import { ExternalAdviserService } from './external-adviser.service';

describe('ExternalAdviserController', () => {
  let controller: ExternalAdviserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExternalAdviserController],
      providers: [ExternalAdviserService],
    }).compile();

    controller = module.get<ExternalAdviserController>(ExternalAdviserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

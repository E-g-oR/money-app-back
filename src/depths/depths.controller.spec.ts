import { Test, TestingModule } from '@nestjs/testing';
import { DepthsController } from './depths.controller';
import { DepthsService } from './depths.service';

describe('DepthsController', () => {
  let controller: DepthsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DepthsController],
      providers: [DepthsService],
    }).compile();

    controller = module.get<DepthsController>(DepthsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

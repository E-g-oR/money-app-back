import { Test, TestingModule } from '@nestjs/testing';
import { DepthsService } from './depths.service';

describe('DepthsService', () => {
  let service: DepthsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DepthsService],
    }).compile();

    service = module.get<DepthsService>(DepthsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

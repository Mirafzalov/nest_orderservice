import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
// import { Product } from '../db/entities/product.entity';
import { ProductService } from './product.service';

describe('ProductController', () => {
  let controller: ProductController;

  const mockProductRepository = {
    findOne: jest.fn(),
    findAll: jest.fn()
    // save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: mockProductRepository
        }
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

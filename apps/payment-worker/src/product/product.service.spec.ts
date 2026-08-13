import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../../../order_service/src/product/product.service';
import { Product } from '../db/entities/product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ProductService', () => {
  let service: ProductService;

    const mockProductRepository = {
    findOne: jest.fn(),
    find: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService, 
        {
          provide: getRepositoryToken(Product),
          useValue: mockProductRepository 
        }
      ]
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Order } from '../db/entities/order.entity';

describe('OrderService', () => {
  let service: OrderService;

  const mockOrderRepository = {
    findOne: jest.fn(),
    find: jest.fn()
    // save: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderService, 
        {
          provide: getRepositoryToken(Order),
          useValue: mockOrderRepository
        }
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

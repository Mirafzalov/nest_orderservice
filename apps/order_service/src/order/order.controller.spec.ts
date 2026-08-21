import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from 'apps/payment-worker/src/order/order.service';

describe('OrderController', () => {
  let controller: OrderController;

  const mockOrderRepository = {
    findOne: jest.fn(),
    findAll: jest.fn()
  }


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: mockOrderRepository
        }
      ]
    }).compile();

    controller = module.get<OrderController>(OrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


});

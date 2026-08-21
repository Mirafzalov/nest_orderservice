import { Test, TestingModule } from '@nestjs/testing';
import { PaymentWorkerController } from './payment-worker.controller';
import { PaymentWorkerService } from './payment-worker.service';

describe('PaymentWorkerController', () => {
  let paymentWorkerController: PaymentWorkerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PaymentWorkerController],
      providers: [PaymentWorkerService],
    }).compile();

    paymentWorkerController = app.get<PaymentWorkerController>(PaymentWorkerController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(paymentWorkerController.getHello()).toBe('Hello World!');
    });
  });
});

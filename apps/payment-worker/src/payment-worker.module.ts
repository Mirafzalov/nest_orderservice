import { Module } from '@nestjs/common';
import { PaymentWorkerController } from './payment-worker.controller';
import { PaymentWorkerService } from './payment-worker.service';

@Module({
  imports: [],
  controllers: [PaymentWorkerController],
  providers: [PaymentWorkerService],
})
export class PaymentWorkerModule {}

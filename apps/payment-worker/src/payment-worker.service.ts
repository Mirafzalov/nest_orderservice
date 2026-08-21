import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentWorkerService {
  getHello(): string {
    return 'Hello World!';
  }
}

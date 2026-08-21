import { Controller, Get } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class PaymentWorkerController {

  @MessagePattern('created.order')
  handle_order(@Payload() data: any) {

    return {
      id: data.id,
      status: 'paid'
    };

  }

}
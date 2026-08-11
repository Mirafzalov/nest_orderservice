import { NestFactory } from '@nestjs/core';
import { PaymentWorkerModule } from './payment-worker.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RabbitMQService } from './rabbit/rabbitmq.service';

async function bootstrap() {
  const app = await NestFactory.create(PaymentWorkerModule);

  const rqmservice = app.get(RabbitMQService)
  
  app.connectMicroservice(rqmservice.getOptions('product_queue'))

  await app.startAllMicroservices();

  await app.listen(3001);
  console.log('Payment-worker is ready')


}
bootstrap();

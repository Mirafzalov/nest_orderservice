import { startTracing } from './tracing';
import { NestFactory } from '@nestjs/core';
import { PaymentWorkerModule } from './payment-worker.module';
import { RabbitMQService } from './rabbit/rabbitmq.service';




async function bootstrap() {

  await startTracing();

  const app = await NestFactory.create(PaymentWorkerModule);

  const rqmservice = app.get(RabbitMQService)

  app.connectMicroservice(rqmservice.getOptions('auth_queue'))

  app.connectMicroservice(rqmservice.getOptions('product_queue'))

  app.connectMicroservice(rqmservice.getOptions('order_queue'))


  await app.startAllMicroservices();

  await app.listen(3000);
  console.log('Payment-worker is ready')


}
bootstrap();
import { NestFactory } from '@nestjs/core';
import { PaymentWorkerModule } from './payment-worker.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    PaymentWorkerModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://guest:guest@rabbitmq:5672'],
        queue: 'order_service_queue',
        noAck: true,     
        prefetchCount: 1,  
        queueOptions: {
          durable: true,
        },
      },
    },
  );

  await app.listen();
  console.log('Payment-worker is ready')

}
bootstrap();

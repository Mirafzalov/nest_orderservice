import { startTracing } from './tracing';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { NOTIFICATION_QUEUE } from '../contracts/notification.constants';

startTracing();


async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URI],
      queue: NOTIFICATION_QUEUE,
      queueOptions: { durable: true },
    },
  });



  app.enableShutdownHooks();
  
  await app.startAllMicroservices();

  await app.listen(3000);
  console.log('notification app islistening')
}
bootstrap();

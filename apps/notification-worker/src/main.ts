import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
// import { NotificationService } from './notification/notification.service';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {

    transport: Transport.RMQ,
    options: {
      urls: ['amqp://guest:guest@rabbitmq:5672'],
      queue: 'notification_queue',
      queueOptions: { durable: true },
    },
  });

  app.enableShutdownHooks();


  console.log('notification app islistening')
}
bootstrap();

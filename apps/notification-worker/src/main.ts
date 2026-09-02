import { startTracing } from './tracing/tracing';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NOTIFICATION_QUEUE } from '../contracts/notification.constants';
import { TracingServerRMQ } from './tracing/tracing-client-rmq';

async function bootstrap() {
  await startTracing();

  const app = await NestFactory.create(AppModule)

  app.connectMicroservice({
    strategy: new TracingServerRMQ({
      urls: ['amqp://guest:guest@rabbitmq:5672'],
      queue: NOTIFICATION_QUEUE,
      queueOptions: { durable: true },
    })
  });



  app.enableShutdownHooks();

  await app.startAllMicroservices();

  await app.listen(3000);
  console.log('notification app islistening')
}
bootstrap();

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationModule } from './notification/notification.module';
import { ConfigModule } from '@nestjs/config';
import { HealthController } from './health/health.controller';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: 'apps/notification-worker/.env',  
        }),
    NotificationModule,
    HealthModule],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}

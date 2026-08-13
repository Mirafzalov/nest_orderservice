import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { RabbitMQModule } from '../rabbit/rabbitmq.module';

@Module({
  imports: [PassportModule, JwtModule.register({
    secret: process.env.JWT_SECRET || 'default_secret',
    signOptions: { expiresIn: '2h' }
  }),

    RabbitMQModule.register({
      name: 'RABBIT_AUTH',
      queue: 'auth_queue'
    })
  ],


  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]

})

export class AuthModule { }

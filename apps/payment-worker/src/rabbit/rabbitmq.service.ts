import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RmqOptions, Transport } from '@nestjs/microservices';

@Injectable()
export class RabbitMQService {
    constructor(private readonly configService: ConfigService) { }

    getOptions(queue: string, noAck = false): RmqOptions {
        return {
            transport: Transport.RMQ,
            options: {
                urls: [this.configService.get<string>('RABBITMQ_URI')!],
                queue,
                noAck, 
                queueOptions: {
                    durable: true,
                },
            },
        };
    }
}
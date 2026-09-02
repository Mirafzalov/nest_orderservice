import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CustomStrategy, RmqOptions, Transport } from '@nestjs/microservices';
import { TracingServerRMQ } from '../tracing/tracing-server-rmq';

@Injectable()
export class RabbitMQService {
    constructor(private readonly configService: ConfigService) { }

    getOptions(queue: string, noAck = true): CustomStrategy {
        return {
            strategy: new TracingServerRMQ({
                urls: [process.env.RABBITMQ_URL || 'amqp://guest:guest@rabbitmq:5672'],
                queue,
                noAck,
                queueOptions: {
                    durable: true,
                },
            }),
        };
    }
}
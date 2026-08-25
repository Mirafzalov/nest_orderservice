import { DynamicModule, Global, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";



@Module({})
export class RabbitMQModule {
    static register({ name, queue }: { name: string, queue: string }): DynamicModule {
        return {
            module: RabbitMQModule,
            imports: [
                ClientsModule.registerAsync([
                    {
                        name,
                        imports: [ConfigModule],
                        useFactory: (configService: ConfigService) => ({
                            transport: Transport.RMQ,
                            options: {
                                urls: [configService.get<string>('RABBITMQ_URI')!],
                                queue: queue,
                                queueOptions: { durable: true },
                                autoDelete: false,
                                // noAck: true
                            },
                            replyQueueOptions: {
                                autoDelete: true,
                                exclusive: true,
                            },

                        }),
                        inject: [ConfigService],
                    },
                ]),
            ],
            exports: [ClientsModule],
        };
    }
}
import { DynamicModule, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TracingClientRMQ } from "../tracing/tracing-client-rmq";

@Module({})
export class RabbitMQModule {
    static register({ name, queue }: { name: string; queue: string }): DynamicModule {
        const rmqClientProvider = {
            provide: name,
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => {
                return new TracingClientRMQ({
                    urls: [configService.get<string>('RABBITMQ_URI')!],
                    queue: queue,
                    queueOptions: { durable: true },
                });
            },
            inject: [ConfigService],
        };

        return {
            module: RabbitMQModule,
            imports: [ConfigModule],
            providers: [rmqClientProvider],
            exports: [name], 
        };
    }
}
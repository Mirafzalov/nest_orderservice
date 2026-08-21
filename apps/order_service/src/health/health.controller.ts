import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { HealthCheck, HealthCheckService, MicroserviceHealthIndicator } from '@nestjs/terminus';

@Controller('health')
export class HealthController {
    constructor(
        private readonly microservice: MicroserviceHealthIndicator,
        private readonly health: HealthCheckService,

        private readonly configService: ConfigService
    ) { }

    @Get()
    @HealthCheck()
    check() {
        return this.health.check([
            () => this.microservice.pingCheck('rabbitmq', {
                transport: Transport.RMQ,
                options: {
                    urls: [this.configService.get<string>('RABBITMQ_URI')],
                },
            })
        ]);
    }

}





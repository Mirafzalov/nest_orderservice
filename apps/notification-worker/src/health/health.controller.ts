import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService, HttpHealthIndicator, MicroserviceHealthIndicator } from '@nestjs/terminus';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Controller('health')
export class HealthController {
    constructor(
        private readonly health: HealthCheckService,
        private readonly microservice: MicroserviceHealthIndicator,
        private readonly http: HttpHealthIndicator,
        private readonly configService: ConfigService
    ) { }

    @Get()
    @HealthCheck()
    check() {
        const token = this.configService.get<string>('BOT_TOKEN')
        return this.health.check([
            () => this.microservice.pingCheck('rabbitmq', {
                transport: Transport.RMQ,
                options: {
                    urls: [this.configService.get<string>('RABBITMQ_URI')]
                },
            }),
            
            () => this.http.responseCheck('telegrma_api', `https://api.telegram.org/bot${token}/getMe`,
                (res: any) => res?.data?.ok === true,
            )
        ]);
    }
}

// import { Injectable } from '@nestjs/common';
// import { HealthIndicatorService } from '@nestjs/terminus';
// import { NotificationService } from '../notification/notification.service';

// @Injectable()
// export class HealthService {
//     constructor(
//         private readonly healthIndicatorService: HealthIndicatorService,
//         private readonly notificationService: NotificationService,
//     ) { }

//     isHealthy(key: string) {
//         const indicator = this.healthIndicatorService.check(key);
//         return this.notificationService.getConnectionStatus()
//             ? indicator.up()
//             : indicator.down({ message: 'Telegram bot not connected' });
//     }
// }

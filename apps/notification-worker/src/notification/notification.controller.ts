import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NotificationService } from './notification.service';
import { PinoLogger } from 'nestjs-pino';

@Controller()
export class NotificationController {
    constructor(
        private readonly notificationService: NotificationService,
        private readonly logger: PinoLogger
    ) { }
    

    @EventPattern('notification.status')
    sendMessage(
        @Payload() data: { notification, result },
    ) {

        this.logger.info('Sending notification to Telegram...')
        console.log('mmmmmmmmmmmmmmmmmm');
        
        let {notification, result } = data
        let text = '';

        if (notification.status == 'failed') {
            text = 'Order is failed, try again'

        } else {


            text += `
            
━━━━━━━━━━━━━━━━

🆔 №${result.id}\n
💰 <b>Total price:</b> ${result.totalPrice.toLocaleString()} UZS\n
📝 <b>Address:</b> ${result.address}\n
📅 <b>Date:</b> ${result.createdAt.slice(0, 10)}

━━━━━━━━━━━━━━━━
`
        }

        this.notificationService.sendMessage(text)

    }
}

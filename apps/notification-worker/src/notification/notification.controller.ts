import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NotificationService } from './notification.service';
import { PinoLogger } from 'nestjs-pino';
import { MESSAGE_PATTERNS } from 'contracts/message-patterns';

@Controller()
export class NotificationController {
    constructor(
        private readonly notificationService: NotificationService,
        private readonly logger: PinoLogger
    ) { }
    

    @EventPattern(MESSAGE_PATTERNS.NOTIFICATION_STATUS)
    sendMessage(
        @Payload() data: { notification, result },
    ) {
        console.log('Notification data received:');
        
        this.logger.info('Sending notification to Telegram...')
        
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

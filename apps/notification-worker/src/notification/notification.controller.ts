import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { NotificationService } from './notification.service';

@Controller()
export class NotificationController {
    constructor(
        private readonly notificationService: NotificationService
    ) { }

    @EventPattern('notification.status')
    sendMessage(
        @Payload() data: { notification, result },
        @Ctx() context: RmqContext
    ) {
        const message = context.getMessage()
        const channel = context.getChannelRef()

        channel.ack(message)

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

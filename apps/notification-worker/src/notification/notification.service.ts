import { Injectable, OnApplicationBootstrap, OnApplicationShutdown } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Bot } from 'grammy';

@Injectable()
export class NotificationService
    implements OnApplicationBootstrap, OnApplicationShutdown {
    private bot: Bot;

    constructor(private readonly configService: ConfigService) {
        const token = this.configService.get<string>('BOT_TOKEN');

        if (!token) {
            throw new Error('BOT_TOKEN is not configured');
        }

        this.bot = new Bot(token);
    }
    async onApplicationBootstrap() {
        console.log('Notification application started');
        this.bot.command('start', (ctx) => {
            console.log(ctx.chat.id)
            ctx.reply('hello')

        })

        // this.bot.api.sendPhoto(6184005806, )

        this.bot.start();
    }



    async sendMessage(text) {
        this.bot.api.sendMessage(505523351, '💰 Payment received successfully!')

        this.bot.api.sendMessage(505523351, text,
            { parse_mode: 'HTML' }
        )
    }

    



    onApplicationShutdown() {
        console.log('Notification application shutting down');

        this.bot.stop();
    }

}
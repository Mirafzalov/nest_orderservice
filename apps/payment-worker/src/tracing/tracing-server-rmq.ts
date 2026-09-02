import { ServerRMQ, CustomTransportStrategy } from '@nestjs/microservices';
import { trace } from '@opentelemetry/api';


export class TracingServerRMQ extends ServerRMQ implements CustomTransportStrategy {
    public async handleMessage(message: any, channel: any): Promise<void> {

        try {

            const rawMessage = JSON.parse(message.content.toString());

            const pattern = typeof rawMessage.pattern === 'string' ? rawMessage.pattern : JSON.stringify(rawMessage.pattern);

            const activeSpan = trace.getActiveSpan();


            if (activeSpan && pattern) {
                activeSpan.setAttribute('rpc.method', pattern);

                activeSpan.setAttribute('nestjs.pattern', pattern);

            }
        } catch {

        }

        return super.handleMessage(message, channel);
    }
}
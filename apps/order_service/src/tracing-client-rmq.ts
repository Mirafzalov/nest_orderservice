import { ClientRMQ, OutgoingEvent } from "@nestjs/microservices"
import { trace } from "@opentelemetry/api";


export class TracingClientRMQ extends ClientRMQ {
    protected publish(packet: OutgoingEvent, callback: (packet: any) => void): () => void {
        const patternStr = typeof packet.pattern === 'string'
            ? packet.pattern
            : JSON.stringify(packet.pattern);

        const activeSpan = trace.getActiveSpan();
        if (activeSpan) {
            activeSpan.setAttribute('rpc.method', patternStr);
            activeSpan.setAttribute('nestjs.pattern', patternStr);
        }



        const customPacket = packet as Record<string, any>;

        customPacket.options = customPacket.options || {};
        customPacket.options.headers = {
            ...(customPacket.options.headers || {}),
            'nestjs.pattern': patternStr,
            'rpc.method': patternStr,
        };

        return super.publish(packet, callback);
    }
}
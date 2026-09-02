import { trace } from "@opentelemetry/api";


export function setMessage(message) {
        const activeSpan = trace.getActiveSpan();

        activeSpan?.setAttribute('pino_message', message)
        // console.log(activeSpan)

        // return traceId;
    }   
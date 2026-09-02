import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { ReadableSpan, SpanExporter } from '@opentelemetry/sdk-trace-base';
import { ExportResult, ExportResultCode } from '@opentelemetry/core';
import { SpanStatusCode } from '@opentelemetry/api';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';


export const pinoWaitingRoom: string[] = [];

class CustomizedExporter implements SpanExporter {
  export(spans: ReadableSpan[], resultCallback: (result: ExportResult) => void): void {

    while (pinoWaitingRoom.length > 0) {
      const pinoMessage = pinoWaitingRoom.shift(); 
      if (pinoMessage) {
        process.stdout.write(pinoMessage);
      }
    }



    // let pattern = '';
    // for (const span of spans) {

    //   const isError = span.status.code === SpanStatusCode.ERROR;

    //   if (span.attributes['rpc.method'] != null) {
    //     pattern = span.attributes['rpc.method'] as string;
    //   }

    //   const isRequiredSpan = span.name.includes('Controller')

    //   if (!isRequiredSpan && !isError) continue;

    //   const path = (span.attributes['http.route'] ||
    //     span.attributes['http.target'] ||
    //     span.attributes['messaging.destination'] ||
    //     span.name) as string;
    //   const startTimeMs = span.startTime[0] * 1000 + span.startTime[1] / 1e6;
    //   const durationMs = span.duration[0] * 1000 + span.duration[1] / 1e6;


    //   const logData = {
    //     timestamp: new Date(startTimeMs).toISOString(),
    //     level: isError ? 'ERROR' : 'INFO',
    //     service: span.resource.attributes[ATTR_SERVICE_NAME],
    //     trace_id: span.spanContext().traceId,
    //     span_id: span.spanContext().spanId,
    //     operation: span.name,
    //     pattern: pattern,
    //     method: (span.attributes['http.method'] || span.attributes['http.request.method'] || null) as string | null,
    //     path,
    //     duration_ms: Number(durationMs.toFixed(2)),
    //     status: isError ? 'ERROR' : 'OK',
    //   };

    //   console.log(JSON.stringify(logData));
    // }

    resultCallback({ code: ExportResultCode.SUCCESS });
  }

  async shutdown(): Promise<void> { }
}

const serviceName = 'order_service';

const sdk = new NodeSDK({
  resource: resourceFromAttributes({
    [ATTR_SERVICE_NAME]: serviceName,
    'service.version': '2.0.0',
    'service.group': 'instrumentation-group',
  }),


  traceExporter: new CustomizedExporter(),
  instrumentations: [
    getNodeAutoInstrumentations({
      '@opentelemetry/instrumentation-fs': { enabled: false },
      '@opentelemetry/instrumentation-dns': { enabled: false },
      '@opentelemetry/instrumentation-net': { enabled: false },
      '@opentelemetry/instrumentation-router': { enabled: false },
      '@opentelemetry/instrumentation-amqplib': { enabled: true },
    }),
  ],
});



export const startTracing = () => {
  Promise.resolve(sdk.start())
    .then(() => console.log(`OpenTelemetry SDK started for [${serviceName}]`))
    .catch((err) => console.log('OpenTelemetry SDK initialization error:', err?.message || err));

  // const handleShutdown = (signal: string) => {
  //   sdk.shutdown()
  //     .then(() => console.log(`OpenTelemetry SDK stopped (${signal})`))
  //     .catch((err) => console.log('OpenTelemetry SDK shutdown error:', err?.message || err))
  //     .finally(() => process.exit(0));
  // };

  // process.on('SIGTERM', () => handleShutdown('SIGTERM'));
  // process.on('SIGINT', () => handleShutdown('SIGINT'));
};






























// // import { NodeSDK } from '@opentelemetry/sdk-node';
// // import { ConsoleSpanExporter, ReadableSpan, SimpleSpanProcessor, SpanExporter } from '@opentelemetry/sdk-trace-base';
// // import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
// // import { Resource, resourceFromAttributes } from '@opentelemetry/resources';
// // import { ATTR_SERVICE_NAME, ATTR_SERVICE_VERSION } from '@opentelemetry/semantic-conventions';
// // import { ExportResult, ExportResultCode } from '@opentelemetry/core';
// // import { SpanStatusCode } from '@opentelemetry/api';

// // class StrictSingleLineExporter implements SpanExporter {
// //   export(spans: ReadableSpan[], resultCallback: (result: ExportResult) => void): void {
// //     for (const span of spans) {

// //       const isError = span.status.code === SpanStatusCode.ERROR;

// //       const isTopLevelSpan = !span.parentSpanContext?.spanId;

// //       if (!isTopLevelSpan && !isError) {
// //         continue;
// //       }
// //       const startTimeMS = (span.startTime[0] * 1000) + (span.startTime[1] / 1000000);
// //       const timestamp = new Date(startTimeMS).toISOString();
// //       const duration = (span.duration[0] * 1000) + (span.duration[1] / 1000000);
// //       const service_name = span.resource.attributes['service.name'];
// //       const method = (span.attributes['http.method'] || span.attributes['http.request.method'] || null) as string | null;
// //       const path = (span.attributes['http.route'] || span.attributes['http.target'] || span.attributes['rpc.method'] || span.name) as string;

// //       const logData = {
// //         timestamp: timestamp,
// //         level: isError ? 'ERROR' : 'INFO',
// //         service: service_name,
// //         trace_id: span.spanContext().traceId,
// //         span_id: span.spanContext().spanId,
// //         operation: span.name,
// //         method: method,
// //         path: path,
// //         duration_ms: Number(duration.toFixed(2)),
// //         status: isError ? 'ERROR' : 'OK'
// //       };

// //       console.log(JSON.stringify(logData));
// //     }

// //     resultCallback({ code: ExportResultCode.SUCCESS });
// //   }

// //   async shutdown(): Promise<void> {
// //     return Promise.resolve();
// //   }
// // }  

// // const resource = resourceFromAttributes({
// //   ATTR_SERVICE_NAME: 'order_service'
// // })

// // const anotherResource = resourceFromAttributes({
// //   ATTR_SERVICE_VERSION: '2.0'
// // })

// // const mergedResource = resource.merge(anotherResource)


// // const sdk = new NodeSDK({
// // resource: resourceFromAttributes({
// //   [ATTR_SERVICE_NAME]: 'order_service',
// // }),
// //   resource: mergedResource,
// //   instrumentations: [getNodeAutoInstrumentations({
// //     '@opentelemetry/instrumentation-fs': { enabled: false },
// //     '@opentelemetry/instrumentation-dns': { enabled: false },
// //     '@opentelemetry/instrumentation-net': { enabled: false },
// //     '@opentelemetry/instrumentation-router': { enabled: false },
// //   })],
// // });



// // export const startTracing = () => {
// //   Promise.resolve(sdk.start())
// //   .then(() => console.log('OpenTelemetry started'))
// //   .catch((error) => console.log('OpenTelemetry Error:', formatErrorOneLine(error)
// // ))
// // }



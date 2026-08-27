import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { ConsoleSpanExporter, ReadableSpan, SpanExporter } from '@opentelemetry/sdk-trace-base';
import { ExportResult, ExportResultCode } from '@opentelemetry/core';
import { SpanKind, SpanStatusCode } from '@opentelemetry/api';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';

class CustomizedExporter implements SpanExporter {
  export(spans: ReadableSpan[], resultCallback: (result: ExportResult) => void): void {
    for (const span of spans) {

      const isError = span.status.code === SpanStatusCode.ERROR;

      const pattern = (
        span.attributes['rpc.method'] ||
        span.attributes['nestjs.pattern'] ||
        null
      ) as string | null;


      const isServerSpan = span.kind === SpanKind.SERVER;
      const isConsumerSpan = span.kind === SpanKind.CONSUMER;
      if (!isServerSpan && !isConsumerSpan && !isError) continue;

      const startTimeMs = span.startTime[0] * 1000 + span.startTime[1] / 1e6;
      const durationMs = span.duration[0] * 1000 + span.duration[1] / 1e6;

      const logData = {
        timestamp: new Date(startTimeMs).toISOString(),
        level: isError ? 'ERROR' : 'INFO',
        service: span.resource.attributes[ATTR_SERVICE_NAME],
        trace_id: span.spanContext().traceId,
        span_id: span.spanContext().spanId,
        queue: span.name.split(' ')[0],
        pattern,
        duration_ms: Number(durationMs.toFixed(2)),
        status: isError ? 'ERROR' : 'OK',
      };

      console.log(JSON.stringify(logData));
    }

    resultCallback({ code: ExportResultCode.SUCCESS });
  }

  async shutdown(): Promise<void> { }
}

const serviceName = 'notification-worker';

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



export const startTracing = async () => {
  Promise.resolve(await sdk.start())
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




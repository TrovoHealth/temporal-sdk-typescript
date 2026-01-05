import * as tracing from '@opentelemetry/sdk-trace-base';
import { ExportResult } from '@opentelemetry/core';
import { SerializableSpan } from './definitions';
export declare class SpanExporter implements tracing.SpanExporter {
    constructor();
    export(spans: tracing.ReadableSpan[], resultCallback: (result: ExportResult) => void): void;
    shutdown(): Promise<void>;
    makeSerializable(span: tracing.ReadableSpan): SerializableSpan;
}

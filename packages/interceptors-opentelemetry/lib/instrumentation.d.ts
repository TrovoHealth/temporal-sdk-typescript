/**
 * opentelemetry instrumentation helper functions
 * @module
 */
import * as otel from '@opentelemetry/api';
import { type Headers } from '@temporalio/common';
/** Default trace header for opentelemetry interceptors */
export declare const TRACE_HEADER = "_tracer-data";
/** As in workflow run id */
export declare const RUN_ID_ATTR_KEY = "run_id";
/** As in workflow id */
export declare const WORKFLOW_ID_ATTR_KEY = "temporalWorkflowId";
/** As in activity id */
export declare const ACTIVITY_ID_ATTR_KEY = "temporalActivityId";
/** As in update id */
export declare const UPDATE_ID_ATTR_KEY = "temporalUpdateId";
/** As in termination reason */
export declare const TERMINATE_REASON_ATTR_KEY = "temporalTerminateReason";
/** As in Nexus service */
export declare const NEXUS_SERVICE_ATTR_KEY = "temporalNexusService";
/** As in Nexus operation */
export declare const NEXUS_OPERATION_ATTR_KEY = "temporalNexusOperation";
/** As in Nexus endpoint */
export declare const NEXUS_ENDPOINT_ATTR_KEY = "temporalNexusEndpoint";
/**
 * If found, return an otel Context deserialized from the provided headers
 */
export declare function extractContextFromHeaders(headers: Headers): otel.Context | undefined;
/**
 * Given headers, return new headers with the current otel context inserted
 */
export declare function headersWithContext(headers: Headers): Headers;
export interface InstrumentOptions<T> {
    tracer: otel.Tracer;
    spanName: string;
    fn: (span: otel.Span) => Promise<T>;
    context?: otel.Context;
    acceptableErrors?: (err: unknown) => boolean;
}
export type InstrumentOptionsSync<T> = Omit<InstrumentOptions<T>, 'fn'> & {
    fn: (span: otel.Span) => T;
};
/**
 * Wraps `fn` in a span which ends when function returns or throws
 */
export declare function instrument<T>({ tracer, spanName, fn, context, acceptableErrors, }: InstrumentOptions<T>): Promise<T>;
export declare function instrumentSync<T>({ tracer, spanName, fn, context, acceptableErrors }: InstrumentOptionsSync<T>): T;

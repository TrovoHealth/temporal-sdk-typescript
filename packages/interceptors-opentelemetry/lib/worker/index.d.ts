import * as otel from '@opentelemetry/api';
import type { Resource } from '@opentelemetry/resources';
import type { SpanExporter } from '@opentelemetry/sdk-trace-base';
import type { Context as ActivityContext } from '@temporalio/activity';
import type { Next, ActivityInboundCallsInterceptor, ActivityOutboundCallsInterceptor, InjectedSink, GetLogAttributesInput, GetMetricTagsInput, ActivityExecuteInput } from '@temporalio/worker';
import { type OpenTelemetryWorkflowExporter } from '../workflow';
export interface InterceptorOptions {
    readonly tracer?: otel.Tracer;
}
/**
 * Intercepts calls to start an Activity.
 *
 * Wraps the operation in an opentelemetry Span and links it to a parent Span context if one is
 * provided in the Activity input headers.
 */
export declare class OpenTelemetryActivityInboundInterceptor implements ActivityInboundCallsInterceptor {
    protected readonly ctx: ActivityContext;
    protected readonly tracer: otel.Tracer;
    constructor(ctx: ActivityContext, options?: InterceptorOptions);
    execute(input: ActivityExecuteInput, next: Next<ActivityInboundCallsInterceptor, 'execute'>): Promise<unknown>;
}
/**
 * Intercepts calls to emit logs and metrics from an Activity.
 *
 * Attach OpenTelemetry context tracing attributes to emitted log messages and metrics, if appropriate.
 */
export declare class OpenTelemetryActivityOutboundInterceptor implements ActivityOutboundCallsInterceptor {
    protected readonly ctx: ActivityContext;
    constructor(ctx: ActivityContext);
    getLogAttributes(input: GetLogAttributesInput, next: Next<ActivityOutboundCallsInterceptor, 'getLogAttributes'>): Record<string, unknown>;
    getMetricTags(input: GetMetricTagsInput, next: Next<ActivityOutboundCallsInterceptor, 'getMetricTags'>): GetMetricTagsInput;
}
/**
 * Takes an opentelemetry SpanExporter and turns it into an injected Workflow span exporter sink
 */
export declare function makeWorkflowExporter(exporter: SpanExporter, resource: Resource): InjectedSink<OpenTelemetryWorkflowExporter>;

import './runtime';
import * as otel from '@opentelemetry/api';
import type { ActivityInput, ContinueAsNewInput, DisposeInput, GetLogAttributesInput, GetMetricTagsInput, LocalActivityInput, Next, QueryInput, SignalInput, SignalWorkflowInput, StartChildWorkflowExecutionInput, UpdateInput, WorkflowExecuteInput, WorkflowInboundCallsInterceptor, WorkflowInternalsInterceptor, WorkflowOutboundCallsInterceptor, StartNexusOperationInput, StartNexusOperationOutput } from '@temporalio/workflow';
export * from './definitions';
/**
 * Intercepts calls to run a Workflow
 *
 * Wraps the operation in an opentelemetry Span and links it to a parent Span context if one is
 * provided in the Workflow input headers.
 *
 * `@temporalio/workflow` must be provided by host package in order to function.
 */
export declare class OpenTelemetryInboundInterceptor implements WorkflowInboundCallsInterceptor {
    protected readonly tracer: otel.Tracer;
    execute(input: WorkflowExecuteInput, next: Next<WorkflowInboundCallsInterceptor, 'execute'>): Promise<unknown>;
    handleSignal(input: SignalInput, next: Next<WorkflowInboundCallsInterceptor, 'handleSignal'>): Promise<void>;
    handleUpdate(input: UpdateInput, next: Next<WorkflowInboundCallsInterceptor, 'handleUpdate'>): Promise<unknown>;
    validateUpdate(input: UpdateInput, next: Next<WorkflowInboundCallsInterceptor, 'validateUpdate'>): void;
    handleQuery(input: QueryInput, next: Next<WorkflowInboundCallsInterceptor, 'handleQuery'>): Promise<unknown>;
}
/**
 * Intercepts outbound calls to schedule an Activity
 *
 * Wraps the operation in an opentelemetry Span and passes it to the Activity via headers.
 *
 * `@temporalio/workflow` must be provided by host package in order to function.
 */
export declare class OpenTelemetryOutboundInterceptor implements WorkflowOutboundCallsInterceptor {
    protected readonly tracer: otel.Tracer;
    scheduleActivity(input: ActivityInput, next: Next<WorkflowOutboundCallsInterceptor, 'scheduleActivity'>): Promise<unknown>;
    scheduleLocalActivity(input: LocalActivityInput, next: Next<WorkflowOutboundCallsInterceptor, 'scheduleLocalActivity'>): Promise<unknown>;
    startNexusOperation(input: StartNexusOperationInput, next: Next<WorkflowOutboundCallsInterceptor, 'startNexusOperation'>): Promise<StartNexusOperationOutput>;
    startChildWorkflowExecution(input: StartChildWorkflowExecutionInput, next: Next<WorkflowOutboundCallsInterceptor, 'startChildWorkflowExecution'>): Promise<[Promise<string>, Promise<unknown>]>;
    continueAsNew(input: ContinueAsNewInput, next: Next<WorkflowOutboundCallsInterceptor, 'continueAsNew'>): Promise<never>;
    signalWorkflow(input: SignalWorkflowInput, next: Next<WorkflowOutboundCallsInterceptor, 'signalWorkflow'>): Promise<void>;
    getLogAttributes(input: GetLogAttributesInput, next: Next<WorkflowOutboundCallsInterceptor, 'getLogAttributes'>): Record<string, unknown>;
    getMetricTags(input: GetMetricTagsInput, next: Next<WorkflowOutboundCallsInterceptor, 'getMetricTags'>): GetMetricTagsInput;
}
export declare class OpenTelemetryInternalsInterceptor implements WorkflowInternalsInterceptor {
    dispose(input: DisposeInput, next: Next<WorkflowInternalsInterceptor, 'dispose'>): Promise<void>;
}

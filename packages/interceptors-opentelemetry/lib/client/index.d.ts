import * as otel from '@opentelemetry/api';
import type { Next, WorkflowSignalInput, WorkflowSignalWithStartInput, WorkflowStartInput, WorkflowStartOutput, WorkflowStartUpdateInput, WorkflowStartUpdateOutput, WorkflowStartUpdateWithStartInput, WorkflowStartUpdateWithStartOutput, WorkflowQueryInput, WorkflowTerminateInput, WorkflowCancelInput, WorkflowDescribeInput, WorkflowClientInterceptor, TerminateWorkflowExecutionResponse, RequestCancelWorkflowExecutionResponse, DescribeWorkflowExecutionResponse } from '@temporalio/client';
export interface InterceptorOptions {
    readonly tracer?: otel.Tracer;
}
/**
 * Intercepts calls to start a Workflow.
 *
 * Wraps the operation in an opentelemetry Span and passes it to the Workflow via headers.
 */
export declare class OpenTelemetryWorkflowClientInterceptor implements WorkflowClientInterceptor {
    protected readonly tracer: otel.Tracer;
    constructor(options?: InterceptorOptions);
    start(input: WorkflowStartInput, next: Next<WorkflowClientInterceptor, 'start'>): Promise<string>;
    signal(input: WorkflowSignalInput, next: Next<WorkflowClientInterceptor, 'signal'>): Promise<void>;
    startWithDetails(input: WorkflowStartInput, next: Next<WorkflowClientInterceptor, 'startWithDetails'>): Promise<WorkflowStartOutput>;
    startUpdate(input: WorkflowStartUpdateInput, next: Next<WorkflowClientInterceptor, 'startUpdate'>): Promise<WorkflowStartUpdateOutput>;
    startUpdateWithStart(input: WorkflowStartUpdateWithStartInput, next: Next<WorkflowClientInterceptor, 'startUpdateWithStart'>): Promise<WorkflowStartUpdateWithStartOutput>;
    signalWithStart(input: WorkflowSignalWithStartInput, next: Next<WorkflowClientInterceptor, 'signalWithStart'>): Promise<string>;
    query(input: WorkflowQueryInput, next: Next<WorkflowClientInterceptor, 'query'>): Promise<unknown>;
    terminate(input: WorkflowTerminateInput, next: Next<WorkflowClientInterceptor, 'terminate'>): Promise<TerminateWorkflowExecutionResponse>;
    cancel(input: WorkflowCancelInput, next: Next<WorkflowClientInterceptor, 'cancel'>): Promise<RequestCancelWorkflowExecutionResponse>;
    describe(input: WorkflowDescribeInput, next: Next<WorkflowClientInterceptor, 'describe'>): Promise<DescribeWorkflowExecutionResponse>;
}

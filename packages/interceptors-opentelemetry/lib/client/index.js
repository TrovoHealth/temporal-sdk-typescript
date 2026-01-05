"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenTelemetryWorkflowClientInterceptor = void 0;
const otel = __importStar(require("@opentelemetry/api"));
const instrumentation_1 = require("../instrumentation");
const workflow_1 = require("../workflow");
/**
 * Intercepts calls to start a Workflow.
 *
 * Wraps the operation in an opentelemetry Span and passes it to the Workflow via headers.
 */
class OpenTelemetryWorkflowClientInterceptor {
    tracer;
    constructor(options) {
        this.tracer = options?.tracer ?? otel.trace.getTracer('@temporalio/interceptor-client');
    }
    async start(input, next) {
        return await (0, instrumentation_1.instrument)({
            tracer: this.tracer,
            spanName: `${workflow_1.SpanName.WORKFLOW_START}${workflow_1.SPAN_DELIMITER}${input.workflowType}`,
            fn: async (span) => {
                const headers = (0, instrumentation_1.headersWithContext)(input.headers);
                span.setAttribute(instrumentation_1.WORKFLOW_ID_ATTR_KEY, input.options.workflowId);
                const runId = await next({ ...input, headers });
                span.setAttribute(instrumentation_1.RUN_ID_ATTR_KEY, runId);
                return runId;
            },
        });
    }
    async signal(input, next) {
        return await (0, instrumentation_1.instrument)({
            tracer: this.tracer,
            spanName: `${workflow_1.SpanName.WORKFLOW_SIGNAL}${workflow_1.SPAN_DELIMITER}${input.signalName}`,
            fn: async (span) => {
                span.setAttribute(instrumentation_1.WORKFLOW_ID_ATTR_KEY, input.workflowExecution.workflowId);
                const headers = (0, instrumentation_1.headersWithContext)(input.headers);
                await next({ ...input, headers });
            },
        });
    }
    async startWithDetails(input, next) {
        return await (0, instrumentation_1.instrument)({
            tracer: this.tracer,
            spanName: `${workflow_1.SpanName.WORKFLOW_START}${workflow_1.SPAN_DELIMITER}${input.workflowType}`,
            fn: async (span) => {
                const headers = (0, instrumentation_1.headersWithContext)(input.headers);
                span.setAttribute(instrumentation_1.WORKFLOW_ID_ATTR_KEY, input.options.workflowId);
                const output = await next({ ...input, headers });
                span.setAttribute(instrumentation_1.RUN_ID_ATTR_KEY, output.runId);
                return output;
            },
        });
    }
    async startUpdate(input, next) {
        return await (0, instrumentation_1.instrument)({
            tracer: this.tracer,
            spanName: `${workflow_1.SpanName.WORKFLOW_START_UPDATE}${workflow_1.SPAN_DELIMITER}${input.updateName}`,
            fn: async (span) => {
                span.setAttribute(instrumentation_1.WORKFLOW_ID_ATTR_KEY, input.workflowExecution.workflowId);
                if (input.options.updateId) {
                    span.setAttribute(instrumentation_1.UPDATE_ID_ATTR_KEY, input.options.updateId);
                }
                const headers = (0, instrumentation_1.headersWithContext)(input.headers);
                const output = await next({ ...input, headers });
                span.setAttribute(instrumentation_1.RUN_ID_ATTR_KEY, output.workflowRunId);
                return output;
            },
        });
    }
    async startUpdateWithStart(input, next) {
        return await (0, instrumentation_1.instrument)({
            tracer: this.tracer,
            spanName: `${workflow_1.SpanName.WORKFLOW_UPDATE_WITH_START}${workflow_1.SPAN_DELIMITER}${input.updateName}`,
            fn: async (span) => {
                span.setAttribute(instrumentation_1.WORKFLOW_ID_ATTR_KEY, input.workflowStartOptions.workflowId);
                if (input.updateOptions.updateId) {
                    span.setAttribute(instrumentation_1.UPDATE_ID_ATTR_KEY, input.updateOptions.updateId);
                }
                const workflowStartHeaders = (0, instrumentation_1.headersWithContext)(input.workflowStartHeaders);
                const updateHeaders = (0, instrumentation_1.headersWithContext)(input.updateHeaders);
                const output = await next({ ...input, workflowStartHeaders, updateHeaders });
                if (output.workflowExecution.runId) {
                    span.setAttribute(instrumentation_1.RUN_ID_ATTR_KEY, output.workflowExecution.runId);
                }
                return output;
            },
        });
    }
    async signalWithStart(input, next) {
        return await (0, instrumentation_1.instrument)({
            tracer: this.tracer,
            spanName: `${workflow_1.SpanName.WORKFLOW_SIGNAL_WITH_START}${workflow_1.SPAN_DELIMITER}${input.workflowType}`,
            fn: async (span) => {
                span.setAttribute(instrumentation_1.WORKFLOW_ID_ATTR_KEY, input.options.workflowId);
                const headers = (0, instrumentation_1.headersWithContext)(input.headers);
                const runId = await next({ ...input, headers });
                span.setAttribute(instrumentation_1.RUN_ID_ATTR_KEY, runId);
                return runId;
            },
        });
    }
    async query(input, next) {
        return await (0, instrumentation_1.instrument)({
            tracer: this.tracer,
            spanName: `${workflow_1.SpanName.WORKFLOW_QUERY}${workflow_1.SPAN_DELIMITER}${input.queryType}`,
            fn: async (span) => {
                const headers = (0, instrumentation_1.headersWithContext)(input.headers);
                span.setAttribute(instrumentation_1.WORKFLOW_ID_ATTR_KEY, input.workflowExecution.workflowId);
                if (input.workflowExecution.runId) {
                    span.setAttribute(instrumentation_1.RUN_ID_ATTR_KEY, input.workflowExecution.runId);
                }
                return await next({ ...input, headers });
            },
        });
    }
    async terminate(input, next) {
        return await (0, instrumentation_1.instrument)({
            tracer: this.tracer,
            spanName: workflow_1.SpanName.WORKFLOW_TERMINATE,
            fn: async (span) => {
                span.setAttribute(instrumentation_1.WORKFLOW_ID_ATTR_KEY, input.workflowExecution.workflowId);
                if (input.workflowExecution.runId) {
                    span.setAttribute(instrumentation_1.RUN_ID_ATTR_KEY, input.workflowExecution.runId);
                }
                if (input.reason) {
                    span.setAttribute(instrumentation_1.TERMINATE_REASON_ATTR_KEY, input.reason);
                }
                return await next(input);
            },
        });
    }
    async cancel(input, next) {
        return await (0, instrumentation_1.instrument)({
            tracer: this.tracer,
            spanName: workflow_1.SpanName.WORKFLOW_CANCEL,
            fn: async (span) => {
                span.setAttribute(instrumentation_1.WORKFLOW_ID_ATTR_KEY, input.workflowExecution.workflowId);
                if (input.workflowExecution.runId) {
                    span.setAttribute(instrumentation_1.RUN_ID_ATTR_KEY, input.workflowExecution.runId);
                }
                return await next(input);
            },
        });
    }
    async describe(input, next) {
        return await (0, instrumentation_1.instrument)({
            tracer: this.tracer,
            spanName: workflow_1.SpanName.WORKFLOW_DESCRIBE,
            fn: async (span) => {
                span.setAttribute(instrumentation_1.WORKFLOW_ID_ATTR_KEY, input.workflowExecution.workflowId);
                if (input.workflowExecution.runId) {
                    span.setAttribute(instrumentation_1.RUN_ID_ATTR_KEY, input.workflowExecution.runId);
                }
                return await next(input);
            },
        });
    }
}
exports.OpenTelemetryWorkflowClientInterceptor = OpenTelemetryWorkflowClientInterceptor;
//# sourceMappingURL=index.js.map
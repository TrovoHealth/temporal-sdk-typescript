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
exports.OpenTelemetryActivityOutboundInterceptor = exports.OpenTelemetryActivityInboundInterceptor = void 0;
exports.makeWorkflowExporter = makeWorkflowExporter;
const otel = __importStar(require("@opentelemetry/api"));
const instrumentation_1 = require("../instrumentation");
const definitions_1 = require("../workflow/definitions");
/**
 * Intercepts calls to start an Activity.
 *
 * Wraps the operation in an opentelemetry Span and links it to a parent Span context if one is
 * provided in the Activity input headers.
 */
class OpenTelemetryActivityInboundInterceptor {
    ctx;
    tracer;
    constructor(ctx, options) {
        this.ctx = ctx;
        this.tracer = options?.tracer ?? otel.trace.getTracer('@temporalio/interceptor-activity');
    }
    async execute(input, next) {
        const context = (0, instrumentation_1.extractContextFromHeaders)(input.headers);
        const spanName = `${definitions_1.SpanName.ACTIVITY_EXECUTE}${definitions_1.SPAN_DELIMITER}${this.ctx.info.activityType}`;
        return await (0, instrumentation_1.instrument)({
            tracer: this.tracer,
            spanName,
            fn: (span) => {
                span.setAttribute(instrumentation_1.WORKFLOW_ID_ATTR_KEY, this.ctx.info.workflowExecution.workflowId);
                span.setAttribute(instrumentation_1.RUN_ID_ATTR_KEY, this.ctx.info.workflowExecution.runId);
                span.setAttribute(instrumentation_1.ACTIVITY_ID_ATTR_KEY, this.ctx.info.activityId);
                return next(input);
            },
            context,
        });
    }
}
exports.OpenTelemetryActivityInboundInterceptor = OpenTelemetryActivityInboundInterceptor;
/**
 * Intercepts calls to emit logs and metrics from an Activity.
 *
 * Attach OpenTelemetry context tracing attributes to emitted log messages and metrics, if appropriate.
 */
class OpenTelemetryActivityOutboundInterceptor {
    ctx;
    constructor(ctx) {
        this.ctx = ctx;
    }
    getLogAttributes(input, next) {
        const span = otel.trace.getSpan(otel.context.active());
        const spanContext = span?.spanContext();
        if (spanContext && otel.isSpanContextValid(spanContext)) {
            return next({
                trace_id: spanContext.traceId,
                span_id: spanContext.spanId,
                trace_flags: `0${spanContext.traceFlags.toString(16)}`,
                ...input,
            });
        }
        else {
            return next(input);
        }
    }
    getMetricTags(input, next) {
        const span = otel.trace.getSpan(otel.context.active());
        const spanContext = span?.spanContext();
        if (spanContext && otel.isSpanContextValid(spanContext)) {
            return next({
                trace_id: spanContext.traceId,
                span_id: spanContext.spanId,
                trace_flags: `0${spanContext.traceFlags.toString(16)}`,
                ...input,
            });
        }
        else {
            return next(input);
        }
    }
}
exports.OpenTelemetryActivityOutboundInterceptor = OpenTelemetryActivityOutboundInterceptor;
/**
 * Takes an opentelemetry SpanExporter and turns it into an injected Workflow span exporter sink
 */
function makeWorkflowExporter(exporter, resource) {
    return {
        export: {
            fn: (info, spanData) => {
                const spans = spanData.map((serialized) => {
                    Object.assign(serialized.attributes, info);
                    // Spans are copied over from the isolate and are converted to ReadableSpan instances
                    return extractReadableSpan(serialized, resource);
                });
                // Ignore the export result for simplicity
                exporter.export(spans, () => undefined);
            },
        },
    };
}
/**
 * Deserialize a serialized span created by the Workflow isolate
 */
function extractReadableSpan(serializable, resource) {
    const { spanContext, ...rest } = serializable;
    return {
        spanContext() {
            return spanContext;
        },
        resource,
        ...rest,
    };
}
//# sourceMappingURL=index.js.map
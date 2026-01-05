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
exports.NEXUS_ENDPOINT_ATTR_KEY = exports.NEXUS_OPERATION_ATTR_KEY = exports.NEXUS_SERVICE_ATTR_KEY = exports.TERMINATE_REASON_ATTR_KEY = exports.UPDATE_ID_ATTR_KEY = exports.ACTIVITY_ID_ATTR_KEY = exports.WORKFLOW_ID_ATTR_KEY = exports.RUN_ID_ATTR_KEY = exports.TRACE_HEADER = void 0;
exports.extractContextFromHeaders = extractContextFromHeaders;
exports.headersWithContext = headersWithContext;
exports.instrument = instrument;
exports.instrumentSync = instrumentSync;
/**
 * opentelemetry instrumentation helper functions
 * @module
 */
const otel = __importStar(require("@opentelemetry/api"));
const common_1 = require("@temporalio/common");
/** Default trace header for opentelemetry interceptors */
exports.TRACE_HEADER = '_tracer-data';
/** As in workflow run id */
exports.RUN_ID_ATTR_KEY = 'run_id';
/** As in workflow id */
exports.WORKFLOW_ID_ATTR_KEY = 'temporalWorkflowId';
/** As in activity id */
exports.ACTIVITY_ID_ATTR_KEY = 'temporalActivityId';
/** As in update id */
exports.UPDATE_ID_ATTR_KEY = 'temporalUpdateId';
/** As in termination reason */
exports.TERMINATE_REASON_ATTR_KEY = 'temporalTerminateReason';
/** As in Nexus service */
exports.NEXUS_SERVICE_ATTR_KEY = 'temporalNexusService';
/** As in Nexus operation */
exports.NEXUS_OPERATION_ATTR_KEY = 'temporalNexusOperation';
/** As in Nexus endpoint */
exports.NEXUS_ENDPOINT_ATTR_KEY = 'temporalNexusEndpoint';
const payloadConverter = common_1.defaultPayloadConverter;
/**
 * If found, return an otel Context deserialized from the provided headers
 */
function extractContextFromHeaders(headers) {
    const encodedSpanContext = headers[exports.TRACE_HEADER];
    if (encodedSpanContext === undefined) {
        return undefined;
    }
    const textMap = payloadConverter.fromPayload(encodedSpanContext);
    return otel.propagation.extract(otel.context.active(), textMap, otel.defaultTextMapGetter);
}
/**
 * Given headers, return new headers with the current otel context inserted
 */
function headersWithContext(headers) {
    const carrier = {};
    otel.propagation.inject(otel.context.active(), carrier, otel.defaultTextMapSetter);
    return { ...headers, [exports.TRACE_HEADER]: payloadConverter.toPayload(carrier) };
}
async function wrapWithSpan(span, fn, acceptableErrors) {
    try {
        const ret = await fn(span);
        span.setStatus({ code: otel.SpanStatusCode.OK });
        return ret;
    }
    catch (err) {
        maybeAddErrorToSpan(err, span, acceptableErrors);
        throw err;
    }
    finally {
        span.end();
    }
}
function wrapWithSpanSync(span, fn, acceptableErrors) {
    try {
        const ret = fn(span);
        span.setStatus({ code: otel.SpanStatusCode.OK });
        return ret;
    }
    catch (err) {
        maybeAddErrorToSpan(err, span, acceptableErrors);
        throw err;
    }
    finally {
        span.end();
    }
}
function maybeAddErrorToSpan(err, span, acceptableErrors) {
    const isBenignErr = err instanceof common_1.ApplicationFailure && err.category === common_1.ApplicationFailureCategory.BENIGN;
    if (acceptableErrors === undefined || !acceptableErrors(err)) {
        const statusCode = isBenignErr ? otel.SpanStatusCode.UNSET : otel.SpanStatusCode.ERROR;
        span.setStatus({ code: statusCode, message: err.message ?? String(err) });
        span.recordException(err);
    }
    else {
        span.setStatus({ code: otel.SpanStatusCode.OK });
    }
}
/**
 * Wraps `fn` in a span which ends when function returns or throws
 */
async function instrument({ tracer, spanName, fn, context, acceptableErrors, }) {
    if (context) {
        return await otel.context.with(context, async () => {
            return await tracer.startActiveSpan(spanName, async (span) => await wrapWithSpan(span, fn, acceptableErrors));
        });
    }
    return await tracer.startActiveSpan(spanName, async (span) => await wrapWithSpan(span, fn, acceptableErrors));
}
function instrumentSync({ tracer, spanName, fn, context, acceptableErrors }) {
    if (context) {
        return otel.context.with(context, () => {
            return tracer.startActiveSpan(spanName, (span) => wrapWithSpanSync(span, fn, acceptableErrors));
        });
    }
    return tracer.startActiveSpan(spanName, (span) => wrapWithSpanSync(span, fn, acceptableErrors));
}
//# sourceMappingURL=instrumentation.js.map
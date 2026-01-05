"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpanExporter = void 0;
const core_1 = require("@opentelemetry/core");
const workflow_module_loader_1 = require("./workflow-module-loader");
const exporter = (0, workflow_module_loader_1.getWorkflowModuleIfAvailable)()?.proxySinks()?.exporter;
class SpanExporter {
    constructor() {
        (0, workflow_module_loader_1.ensureWorkflowModuleLoaded)();
    }
    export(spans, resultCallback) {
        exporter.export(spans.map((span) => this.makeSerializable(span)));
        resultCallback({ code: core_1.ExportResultCode.SUCCESS });
    }
    async shutdown() {
        // Nothing to shut down
    }
    makeSerializable(span) {
        return {
            name: span.name,
            kind: span.kind,
            spanContext: span.spanContext(),
            parentSpanId: span.parentSpanContext?.spanId,
            startTime: span.startTime,
            endTime: span.endTime,
            status: span.status,
            attributes: span.attributes,
            links: span.links,
            events: span.events,
            duration: span.duration,
            ended: span.ended,
            droppedAttributesCount: span.droppedAttributesCount,
            droppedEventsCount: span.droppedEventsCount,
            droppedLinksCount: span.droppedLinksCount,
            instrumentationScope: span.instrumentationScope,
        };
    }
}
exports.SpanExporter = SpanExporter;
//# sourceMappingURL=span-exporter.js.map
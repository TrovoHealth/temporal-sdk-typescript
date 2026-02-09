"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpanExporter = void 0;
const core_1 = require("@opentelemetry/core");
const workflow_imports_1 = require("./workflow-imports");
class SpanExporter {
    exporter;
    export(spans, resultCallback) {
        if (!this.exporter) {
            this.exporter = (0, workflow_imports_1.proxySinks)().exporter;
        }
        this.exporter.export(spans.map((span) => this.makeSerializable(span)));
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
            parentSpanContext: span.parentSpanContext,
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
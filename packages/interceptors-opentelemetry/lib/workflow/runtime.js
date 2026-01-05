"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Sets global variables required for importing opentelemetry in isolate
 * @module
 */
const workflow_module_loader_1 = require("./workflow-module-loader");
const inWorkflowContext = (0, workflow_module_loader_1.getWorkflowModuleIfAvailable)()?.inWorkflowContext;
if (inWorkflowContext?.()) {
    // Required by opentelemetry (pretend to be a browser)
    Object.assign(globalThis, {
        performance: {
            timeOrigin: Date.now(),
            now() {
                return Date.now() - this.timeOrigin;
            },
        },
        window: globalThis,
    });
}
//# sourceMappingURL=runtime.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActivator = exports.SdkFlags = exports.ContinueAsNew = exports.AsyncLocalStorage = exports.workflowInfo = exports.proxySinks = exports.inWorkflowContext = void 0;
/**
 * Real workflow imports for otel interceptors.
 * This replaces the stub via webpack alias when bundled.
 *
 * @module
 */
var workflow_1 = require("@temporalio/workflow");
Object.defineProperty(exports, "inWorkflowContext", { enumerable: true, get: function () { return workflow_1.inWorkflowContext; } });
Object.defineProperty(exports, "proxySinks", { enumerable: true, get: function () { return workflow_1.proxySinks; } });
Object.defineProperty(exports, "workflowInfo", { enumerable: true, get: function () { return workflow_1.workflowInfo; } });
Object.defineProperty(exports, "AsyncLocalStorage", { enumerable: true, get: function () { return workflow_1.AsyncLocalStorage; } });
Object.defineProperty(exports, "ContinueAsNew", { enumerable: true, get: function () { return workflow_1.ContinueAsNew; } });
var flags_1 = require("@temporalio/workflow/lib/flags");
Object.defineProperty(exports, "SdkFlags", { enumerable: true, get: function () { return flags_1.SdkFlags; } });
var global_attributes_1 = require("@temporalio/workflow/lib/global-attributes");
Object.defineProperty(exports, "getActivator", { enumerable: true, get: function () { return global_attributes_1.getActivator; } });
//# sourceMappingURL=workflow-imports-impl.js.map
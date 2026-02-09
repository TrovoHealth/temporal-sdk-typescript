"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SdkFlags = exports.proxySinks = exports.getActivator = exports.AsyncLocalStorage = exports.ContinueAsNew = exports.workflowInfo = exports.inWorkflowContext = void 0;
const common_1 = require("@temporalio/common");
// always returns false since if using this implementation, we are outside of workflow context
const inWorkflowContext = () => false;
exports.inWorkflowContext = inWorkflowContext;
// All of the following stubs will throw if used
const workflowInfo = () => {
    throw new common_1.IllegalStateError('Workflow.workflowInfo(...) may only be used from a Workflow Execution.');
};
exports.workflowInfo = workflowInfo;
exports.ContinueAsNew = class ContinueAsNew {
};
exports.AsyncLocalStorage = class AsyncLocalStorage {
};
const getActivator = () => {
    throw new common_1.IllegalStateError('Workflow uninitialized');
};
exports.getActivator = getActivator;
const proxySinks = () => {
    throw new common_1.IllegalStateError('Proxied sinks functions may only be used from a Workflow Execution.');
};
exports.proxySinks = proxySinks;
exports.SdkFlags = {};
//# sourceMappingURL=workflow-imports.js.map
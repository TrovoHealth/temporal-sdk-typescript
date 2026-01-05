"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWorkflowModule = getWorkflowModule;
exports.hasSdkFlag = hasSdkFlag;
exports.ensureWorkflowModuleLoaded = ensureWorkflowModuleLoaded;
exports.getWorkflowModuleIfAvailable = getWorkflowModuleIfAvailable;
// @temporalio/workflow is an optional peer dependency.
// It can be missing as long as the user isn't attempting to construct a workflow interceptor.
// If we start shipping ES modules alongside CJS, we will have to reconsider
// this dynamic import as `import` is async for ES modules.
let workflowModule;
let workflowModuleLoadError;
try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    workflowModule = require('@temporalio/workflow');
}
catch (err) {
    // Capture the module not found error to rethrow if the module is required
    workflowModuleLoadError = err;
}
/**
 * Returns `@temporalio/workflow` module if present.
 * Throws if the module failed to load
 */
function getWorkflowModule() {
    if (workflowModuleLoadError) {
        throw workflowModuleLoadError;
    }
    return workflowModule;
}
/**
 * Returns if an SDK flag was set
 *
 * Expects to be called only after `ensureWorkflowModuleLoaded`.
 * Will throw if `@temporalio/workflow` is not available
 */
function hasSdkFlag(flag) {
    const { SdkFlags } = require('@temporalio/workflow/lib/flags'); // eslint-disable-line @typescript-eslint/no-require-imports
    const { getActivator } = require('@temporalio/workflow/lib/global-attributes'); // eslint-disable-line @typescript-eslint/no-require-imports
    return getActivator().hasFlag(SdkFlags[flag]);
}
/**
 * Checks if the workflow module loaded successfully and throws if not.
 */
function ensureWorkflowModuleLoaded() {
    if (workflowModuleLoadError) {
        throw workflowModuleLoadError;
    }
}
/**
 * Returns the workflow module if available, or undefined if it failed to load.
 */
function getWorkflowModuleIfAvailable() {
    return workflowModule;
}
//# sourceMappingURL=workflow-module-loader.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SPAN_DELIMITER = exports.SpanName = void 0;
var SpanName;
(function (SpanName) {
    /**
     * Workflow is scheduled by a client
     */
    SpanName["WORKFLOW_START"] = "StartWorkflow";
    /**
     * Workflow is signalled
     */
    SpanName["WORKFLOW_SIGNAL"] = "SignalWorkflow";
    /**
     * Workflow is client calls signalWithStart
     */
    SpanName["WORKFLOW_SIGNAL_WITH_START"] = "SignalWithStartWorkflow";
    /**
     * Workflow is queried
     */
    SpanName["WORKFLOW_QUERY"] = "QueryWorkflow";
    /**
     * Workflow update is started by client
     */
    SpanName["WORKFLOW_START_UPDATE"] = "StartWorkflowUpdate";
    /**
     * Workflow is started with an update
     */
    SpanName["WORKFLOW_UPDATE_WITH_START"] = "UpdateWithStartWorkflow";
    /**
     * Workflow handles an incoming signal
     */
    SpanName["WORKFLOW_HANDLE_SIGNAL"] = "HandleSignal";
    /**
     * Workflow handles an incoming query
     */
    SpanName["WORKFLOW_HANDLE_QUERY"] = "HandleQuery";
    /**
     * Workflow handles an incoming update
     */
    SpanName["WORKFLOW_HANDLE_UPDATE"] = "HandleUpdate";
    /**
     * Workflow validates an incoming update
     */
    SpanName["WORKFLOW_VALIDATE_UPDATE"] = "ValidateUpdate";
    /**
     * Workflow is terminated
     */
    SpanName["WORKFLOW_TERMINATE"] = "TerminateWorkflow";
    /**
     * Workflow is cancelled
     */
    SpanName["WORKFLOW_CANCEL"] = "CancelWorkflow";
    /**
     * Workflow is described
     */
    SpanName["WORKFLOW_DESCRIBE"] = "DescribeWorkflow";
    /**
     * Workflow run is executing
     */
    SpanName["WORKFLOW_EXECUTE"] = "RunWorkflow";
    /**
     * Child Workflow is started (by parent Workflow)
     */
    SpanName["CHILD_WORKFLOW_START"] = "StartChildWorkflow";
    /**
     * Activity is scheduled by a Workflow
     */
    SpanName["ACTIVITY_START"] = "StartActivity";
    /**
     * Activity is executing
     */
    SpanName["ACTIVITY_EXECUTE"] = "RunActivity";
    /**
     * Workflow is continuing as new
     */
    SpanName["CONTINUE_AS_NEW"] = "ContinueAsNew";
    /**
     * Nexus operation is started
     */
    SpanName["NEXUS_OPERATION_START"] = "StartNexusOperation";
})(SpanName || (exports.SpanName = SpanName = {}));
exports.SPAN_DELIMITER = ':';
//# sourceMappingURL=definitions.js.map
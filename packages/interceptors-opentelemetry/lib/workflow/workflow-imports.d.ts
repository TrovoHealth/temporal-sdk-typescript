/**
 * Workflow imports stub module.
 *
 * This module provides stubs for workflow functionality needed by interceptors.
 * When bundled by the workflow bundler, this is replaced with the real
 * implementation via NormalModuleReplacementPlugin.
 *
 * @module
 */
import type { inWorkflowContext as inWorkflowContextT, workflowInfo as workflowInfoT, proxySinks as proxySinksT, AsyncLocalStorage as AsyncLocalStorageT, ContinueAsNew as ContinueAsNewT } from '@temporalio/workflow';
import type { getActivator as getActivatorT } from '@temporalio/workflow/lib/global-attributes';
import type { SdkFlags as SdkFlagsT } from '@temporalio/workflow/lib/flags';
export declare const inWorkflowContext: typeof inWorkflowContextT;
export declare const workflowInfo: typeof workflowInfoT;
export declare const ContinueAsNew: typeof ContinueAsNewT;
export declare const AsyncLocalStorage: typeof AsyncLocalStorageT;
export declare const getActivator: typeof getActivatorT;
export declare const proxySinks: typeof proxySinksT;
export declare const SdkFlags: typeof SdkFlagsT;

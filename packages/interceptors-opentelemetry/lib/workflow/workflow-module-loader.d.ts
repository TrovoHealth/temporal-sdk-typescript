/**
 * Utilities for working with a possibly missing `@temporalio/workflow` peer dependency
 * @module
 */
import type * as WorkflowModule from '@temporalio/workflow';
import type { SdkFlags as SdkFlagsT } from '@temporalio/workflow/lib/flags';
type SdkFlags = typeof SdkFlagsT;
/**
 * Returns `@temporalio/workflow` module if present.
 * Throws if the module failed to load
 */
export declare function getWorkflowModule(): typeof WorkflowModule;
/**
 * Returns if an SDK flag was set
 *
 * Expects to be called only after `ensureWorkflowModuleLoaded`.
 * Will throw if `@temporalio/workflow` is not available
 */
export declare function hasSdkFlag(flag: keyof SdkFlags): boolean;
/**
 * Checks if the workflow module loaded successfully and throws if not.
 */
export declare function ensureWorkflowModuleLoaded(): void;
/**
 * Returns the workflow module if available, or undefined if it failed to load.
 */
export declare function getWorkflowModuleIfAvailable(): typeof WorkflowModule | undefined;
export {};

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
exports.ContextManager = void 0;
const otel = __importStar(require("@opentelemetry/api"));
const workflow_module_loader_1 = require("./workflow-module-loader");
const AsyncLocalStorage = (0, workflow_module_loader_1.getWorkflowModuleIfAvailable)()?.AsyncLocalStorage;
class ContextManager {
    // If `@temporalio/workflow` is not available, ignore for now.
    // When ContextManager is constructed module resolution error will be thrown.
    storage = AsyncLocalStorage ? new AsyncLocalStorage() : undefined;
    constructor() {
        (0, workflow_module_loader_1.ensureWorkflowModuleLoaded)();
    }
    active() {
        return this.storage.getStore() || otel.ROOT_CONTEXT;
    }
    bind(context, target) {
        if (typeof target !== 'function') {
            throw new TypeError(`Only function binding is supported, got ${typeof target}`);
        }
        // Stolen from https://github.com/open-telemetry/opentelemetry-js/blob/main/packages/opentelemetry-context-async-hooks/src/AbstractAsyncHooksContextManager.ts
        const contextWrapper = (...args) => {
            return this.with(context, () => target.apply(this, args));
        };
        Object.defineProperty(contextWrapper, 'length', {
            enumerable: false,
            configurable: true,
            writable: false,
            value: target.length,
        });
        /**
         * It isn't possible to tell Typescript that contextWrapper is the same as T
         * so we forced to cast as any here.
         */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return contextWrapper;
    }
    enable() {
        return this;
    }
    disable() {
        this.storage.disable();
        return this;
    }
    with(context, fn, thisArg, ...args) {
        const cb = thisArg == null ? fn : fn.bind(thisArg);
        return this.storage.run(context, cb, ...args);
    }
}
exports.ContextManager = ContextManager;
//# sourceMappingURL=context-manager.js.map
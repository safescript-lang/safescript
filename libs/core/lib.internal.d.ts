/// <reference no-default-lib="true"/>

export interface __safescript_internals__ {
    /** SafeScript version */
    readonly __version__: 'v0.0.1-dev';
}

declare global {
    /**
     * A namespace containing all of the internal types and functions of SafeScript.
     * 
     * This isn't guaranteed to be stable and consistent, use at your own risk
    */
    export namespace __safescript_internals__ {
        /**
         * This is an internal type used only in the TypeScript definitions.
         * Since SafeScript doesn't have a `any` type, we have to use this,
         * because otherwise the TypeScript compiler will complain.
         * 
         * @unstable
         * @private
         * @internal
         */
        //deno-lint-ignore no-explicit-any
        export type __Any__ = any;
        /**
         * This is the only value that is guaranteed to be stable and consistent.
         * 
         * It is used internally to validate the version of SafeScript being used.
         * 
         * And is included in panic reports.
         * 
         * @stable
         * @private
         * @internal
        */
        export const __version__: __safescript_internals__['__version__'];
        /**
         * Used internally to signal that we started the runtime.
         * 
         * @unstable
         * @private
         * @internal
        */
        export namespace __runtime__ {
            /**
             * Starts the runtime.
             * 
             * @param {() => Void} f the function to invoke
             * @returns {Void} void
             * 
             * @unstable
             * @private
             * @internal
            */
            export function __invoke__(f: () => Void): Void;
            /**
             * Starts the runtime. 
             * 
             * @param {() => Result<Void, Error>} f the function to invoke
             * @returns {Void} void
             * 
             * @unstable
             * @private
             * @internal
            */
            export function __invoke__(f: () => Result<Void, Error>): Void;
        }
    }
}

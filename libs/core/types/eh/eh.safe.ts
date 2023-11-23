export * from './option.safe.ts';
export * from './result.safe.ts';

/** An interface to represent an exception. */
export interface Exception<Name extends string> extends Error {
    /** Cause of the exception */
    readonly cause?: unknown;
    /** Stack Trace of how we got there */
    readonly stack?: string;
    /** Name of the exception */
    readonly name: Name;
}

/**
 * A simple implementation of the exception interface.
 * 
 * @template Name The name of the exception.
 * @extends {Error} The error class.
 * @implements {Exception} The exception interface.
 */
class ExceptionImpl<const Name extends string> extends Error implements Exception<Name> {
    /** Cause of the exception */
    public override readonly cause?: unknown;
    /** Stack Trace of how we got there */
    public override readonly stack?: string;
    /** Name of the exception */
    public override readonly name: Name;
    /**
     * Creates a new exception.
     * 
     * @param {Name} name Name of the exception.
     * @param {string} message Message of the exception.
     * @constructor
    */
    public constructor(name: Name, message: string) {
        super(message);
        this.name = name;
    }
}

/**
 * An interface to represent an unwrap exception.
 * 
 * It is raised when an option is unwrapped and it is none.
 * Or when a result is unwrapped and it is an error.
*/
//deno-lint-ignore no-empty-interface
export interface UnwrapException extends Exception<'UnwrapException'> { }

//deno-lint-ignore no-namespace
export namespace UnwrapException {
    class UnwrapExceptionImpl extends ExceptionImpl<'UnwrapException'> implements UnwrapException {
        constructor(message: string) {
            super('UnwrapException', message);
        }
    }
    /**
     * Raises an unwrap exception.
     * 
     * @param {string} message The message to raise.
     * @throws {UnwrapException} The unwrap exception.
     * @returns {never} Nothing.
    */
    export function raise(message: string): never {
        throw new UnwrapExceptionImpl(message);
    }
}

/**
 * An interface to represent a panic exception.
 * 
 * It is raised when a panic is called.
*/
//deno-lint-ignore no-empty-interface
export interface Panic extends Exception<'Panic'> { }

class PanicImpl extends ExceptionImpl<'Panic'> implements Panic {
    constructor(message: string) {
        super('Panic', message);
    }
}

/**
 * Panics with the given info.
 * 
 * **Never Use This Function**.
 * 
 * If you want to have errors, please use the {@link Option} and {@link Result} types.
 * 
 * @param {any} info Any provided information.
 * @throws {Panic} The panic exception.
 * @returns {never} Nothing.
*/
//deno-lint-ignore no-explicit-any
export function panic(info: any): never {
    if (typeof info === 'string') {
        throw new PanicImpl(info);
    }
    throw info;
}

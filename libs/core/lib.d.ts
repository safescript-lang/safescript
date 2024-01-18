/// <reference no-default-lib="true"/>

export interface __safescript_internals__ {
    /** SafeScript version */
    readonly __version__: 'v0.0.1-dev';
}

declare global {

    export namespace eh {
        /**
         * The Typescript representation of SafeScript's `Result` enum.
         * It is similar to Rust's `Result` enum.
         * 
         * It has two variants, `Ok` and `Err`.
         * 
         * `Ok` is used to represent a successful value, and `Err` is used to represent an error.
        */
        export interface Result<T, E> {
            /**
             * Returns true if the result is Ok.
            */
            isOk(): boolean
    
            /**
             * Returns true if the result is Err.
            */
            isErr(): boolean
    
            /**
             * Converts from Result<T, E> to Option<T> and discarding the error, if any.
            */
            ok(): Option<T>
    
            /**
             * Converts from Result<T, E> to Option<E> and discarding the success value, if any.
            */
            err(): Option<E>
    
            /**
             * Maps a Result<T, E> to Result<U, E> by applying a function to a contained Ok value, leaving an Err value untouched.
             *
             * This function can be used to compose the results of two functions.
            */
            map<U>(op: (t: T) => U): Result<U, E>
    
            /**
             * Maps a Result<T, E> to U by applying a function to a contained Ok value, or a fallback function to a contained Err value.
             *
             * This function can be used to unpack a successful result while handling an error.
            */
            mapOrElse<U>(fallback: (e: E) => U, map: (t: T) => U): U
    
            /**
             * Maps a Result<T, E> to Result<T, F> by applying a function to a contained Err value, leaving an Ok value untouched.
             *
             * This function can be used to pass through a successful result while handling an error.
            */
            mapErr<F>(op: (e: E) => F): Result<T, F>
    
            /**
             * Returns res if the result is Ok, otherwise returns the Err value of self.
            */
            and<U>(res: Result<U, E>): Result<U, E>
    
            /**
             * Calls op if the result is Ok, otherwise returns the Err value of self.
             *
             * This function can be used for control flow based on Result values.
            */
            andThen<U>(op: (t: T) => Result<U, E>): Result<U, E>
    
            /**
             * Returns res if the result is Err, otherwise returns the Ok value of self.
            */
            or<F>(res: Result<T, F>): Result<T, F>
    
            /**
             * Calls op if the result is Err, otherwise returns the Ok value of self.
             *
             * This function can be used for control flow based on result values.
            */
            orElse<F>(op: (e: E) => Result<T, F>): Result<T, F>
    
            /**
             * Unwraps a result, yielding the content of an Ok. Else, it returns optb.
            */
            unwrapOr(optb: T): T
    
            /**
             * Unwraps a result, yielding the content of an Ok. If the value is an Err then it calls op with its value.
            */
            unwrapOrElse(op: (e: E) => T): T
    
            /**
             * Unwraps a result, yielding the content of an Ok.
             *
             * Throws Error if the value is an Err, with a error message provided by the Err's value.
            */
            unwrap(): T | never
    
            /**
             * Unwraps a result, yielding the content of an Ok.
             *
             * Throws Error if the value is an Err, with the error message being the passed message.
            */
            expect(msg: SString): T | never
    
            /**
             * Unwraps a result, yielding the content of an Err.
             *
             * Throws Error if the value is an Ok.
            */
            unwrapErr(): E | never
    
            /**
             * Unwraps a result, yielding the content of an Err.
             *
             * Throws Error if the value is an Ok, with the error message being the passed message.
            */
            expectErr(msg: SString): E | never
    
            /**
             * shortcut of unwrap, throws the error if Result is Err
            */
            get $(): T | never
        }
        export namespace Result {
            /**
             * A simple wrapper to create a new {@link Result}
             * @param {T} value successful value
             * @returns {Result<T,E>} the result
            */
            export function Ok<T, E>(value: T): Result<T, E>;
        
            /**
             * A simple wrapper to create a new {@link Result}
             * @param {E} err error value
             * @returns {Result<T,E>} the result
            */
            export function Err<T, E>(err: E): Result<T, E>;
        }
        /**
         * The Typescript representation of SafeScript's `Option` enum.
         * It is similar to Rust's `Option` enum.
         * 
         * It has two variants, `Some` and `None`.
         * 
         * `Some` is used to represent a value that is present, and `None` is used to represent a value that is absent.
        */
        export interface Option<T> {
            /**
             * Returns true if the option is a Some value.
            */
            isSome(): boolean
    
            /**
             * Returns true if the option is a None value.
            */
            isNone(): boolean
    
            /**
             * throw Error if the value is a None with a custom error message provided by msg.
            */
            expect(msg: SString): T | never
    
            /**
             * return the value v out of the Option<T> if it is Some(v).
            */
            unwrap(): T | never
    
            /**
             * Returns the contained value or a placeholder.
            */
            unwrapOr(placeholder: T): T
    
            /**
             * Returns the contained value or computes it from a placeholderFn.
            */
            unwrapOrElse(placeholderFn: () => T): T
    
            /**
             * Maps an Option<T> to Option<U> by applying a function to a contained value.
            */
            map<U>(fn: (value: T) => U): Option<U>
    
            /**
             * Applies a function to the contained value (if any), or returns the provided placeholder (if not).
            */
            mapOr<U>(placeholder: U, fn: (value: T) => U): U
    
            /**
             * Applies a function to the contained value (if any), or computes with placeholderFn (if not).
            */
            mapOrElse<U>(placeholderFn: () => U, fn: (value: T) => U): U
    
            /**
             * Transforms the Option<T> into a Result<T, E>, mapping Some(v) to Ok(v) and None to Err(err).
            */
            okOr<E>(err: E): Result<T, E>
    
            /**
             * Transforms the Option<T> into a Result<T, E>, mapping Some(v) to Ok(v) and None to Err(err()).
            */
            okOrElse<E>(err: () => E): Result<T, E>
    
            /**
             * Returns None if the option is None, otherwise returns optb.
            */
            and<U>(optb: Option<U>): Option<U>
    
            /**
             * Returns None if the option is None, otherwise calls f with the wrapped value and returns the result.
             * You can recognize it as flatMap.
            */
            andThen<U>(fn: (value: T) => Option<U>): Option<U>
    
            /**
             * Returns None if the option is None, otherwise calls {@link predicate}
             * with the wrapped value and returns:
             * 
             * - Some(v) if predicate returns true (where 'v' is the wrapped value), and
             * - None if predicate returns false.
            */
            filter(predicate: (value: T) => boolean): Option<T>
    
            /**
             * Returns the option if it contains a value, otherwise returns optb.
            */
            or(optb: Option<T>): Option<T>
    
            /**
             * Returns the option if it contains a value, otherwise calls f and returns the result.
            */
            orElse(fn: () => Option<T>): Option<T>
    
            /**
             * Returns Some if exactly one of self, optb is Some, otherwise returns None.
            */
            xor(optb: Option<T>): Option<T>
    
            /**
             * shortcut of unwrap
             * 
             * throws a {@link Error} if the value is a None
            */
            get $(): T | never
        }
        export namespace Option {
            /**
             * A simple wrapper to create an {@link Option} enum
             * @param {T | undefined} value value to use
             * @returns {Option<T>} the resulting option enum
            */
            export function Some<T>(value?: T): Option<T>;
        
            /**
             * A simple wrapper to create an epmty {@link Option} enum
             * @returns {Option<T>} the resulting option enum
            */
            export function None<T>(): Option<T>;
        }

        /**
         * Panics the program with a custom message.
         * 
         * THIS IS NEVER RECOMMENDED TO USE.
         * 
         * Prefer to use {@link Result} and {@link Option} instead.
         * 
         * @param {SString | undefined} message the message to panic with
         * @returns {never} never returns
        */
        export function panic(message?: SString): never;
    }

    export namespace fmt {
        export type Result = eh.Result<Void, Error>;
        /**
         * The Typescript representation of SafeScript's `Error` sub-trait.
         * 
         * This is only returned by the `fmt` module.
        */
        //deno-lint-ignore no-empty-interface
        export interface Error extends eh.Error {}
        export interface Debug {
            debug_fmt(f: Formatter): fmt.Result;
        }

        export interface Display extends ToString {
            fmt(f: Formatter): fmt.Result;
        }

        export interface ToString {
            to_string(): SString;
        }

        export interface Arguments extends Debug, Display {
            as_str(): Option<SString>;
        }

        /**
         * Possible alignments returned by `Formatter.align`
         * @SS_ENUM_OBJ
        */
        export namespace Alignment {
            /**
             * Indication that contents should be left-aligned.
             * @SS_ENUM_VARIANT_TYPE
            */
            export type Left = 'Left';
            /**
             * Indication that contents should be right-aligned.
             * @SS_ENUM_VARIANT_TYPE
            */
            export type Right = 'Right';
            /**
             * Indication that contents should be center-aligned.
             * @SS_ENUM_VARIANT_TYPE
            */
            export type Center = 'Center';
            /**
             * Indication that contents should be left-aligned.
             * @SS_ENUM_VARIANT_OBJ
            */
            export const Left: Left;
            /**
             * Indication that contents should be center-aligned.
             * @SS_ENUM_VARIANT_OBJ
            */
            export const Right: Right;
            /**
             * Indication that contents should be left-aligned.
             * @SS_ENUM_VARIANT_OBJ
            */
            export const Center: Center;
        }
        /**
         * Possible alignments returned by `Formatter.align`
         * @SS_ENUM_TYPE
        */
        export type Alignment = Alignment.Left | Alignment.Right | Alignment.Center;
        
        export interface DebugStruct {
            field(field: string, value: fmt.Debug): DebugStruct;
            field(field: SString, value: fmt.Debug): DebugStruct;
            field_with(f: (fmt: Formatter) => fmt.Result, field: SString, value: fmt.Debug): DebugStruct;
            field_with(f: (fmt: Formatter) => fmt.Result, field: SString, value: fmt.Debug): DebugStruct;
            finish(): fmt.Result;
            finish_non_exhaustive(): fmt.Result;
        }

        export interface DebugTuple {
            field(value: fmt.Debug): DebugTuple;
            field_with(f: (fmt: Formatter) => fmt.Result, value: fmt.Debug): DebugTuple;
            finish(): fmt.Result;
        }

        export interface DebugList {
            entry(value: fmt.Debug): DebugList;
            entry_with(f: (fmt: Formatter) => fmt.Result, value: fmt.Debug): DebugList;
            entries(entries: fmt.Debug[]): DebugList;
            entries(entries: iter.IntoIterator<fmt.Debug>): DebugList;
            finish(): fmt.Result;
        }

        export interface DebugSet {
            entry(value: fmt.Debug): DebugList;
            entry_with(f: (fmt: Formatter) => fmt.Result, value: fmt.Debug): DebugList;
            entries(entries: fmt.Debug[]): DebugList;
            entries(entries: iter.IntoIterator<fmt.Debug>): DebugList;
            finish(): fmt.Result;
        }

        export interface DebugMap {
            entry(key: fmt.Debug, value: fmt.Debug): DebugMap;
            key(key: fmt.Debug): DebugMap;
            key_with(f: (fmt: Formatter) => fmt.Result, key: fmt.Debug): DebugMap;
            value(value: fmt.Debug): DebugMap;
            value_with(f: (fmt: Formatter) => fmt.Result, value: fmt.Debug): DebugMap;
            entries(entries: fmt.Debug[]): DebugMap;
            entries(entries: iter.IntoIterator<fmt.Debug>): DebugMap;
            finish(): fmt.Result;
        }

        export interface Write {
            write_str(s: SString): fmt.Result;
            write_str(s: string): fmt.Result;
            write_char(c: Char): fmt.Result;
            write_fmt(fmt: Arguments): fmt.Result;
        }
    
        export interface Formatter extends Write {
            pad_integral(is_nonnegative: boolean, prefix: string, buf: string): fmt.Result;
            pad_integral(is_nonnegative: boolean, prefix: SString, buf: SString): fmt.Result;
            pad_integral(is_nonnegative: boolean, prefix: string, buf: SString): fmt.Result;
            pad_integral(is_nonnegative: boolean, prefix: SString, buf: string): fmt.Result;
            pad_integral(is_nonnegative: Bool, prefix: string, buf: string): fmt.Result;
            pad_integral(is_nonnegative: Bool, prefix: SString, buf: SString): fmt.Result;
            pad_integral(is_nonnegative: Bool, prefix: string, buf: SString): fmt.Result;
            pad_integral(is_nonnegative: Bool, prefix: SString, buf: string): fmt.Result;
            pad(s: string): fmt.Result;
            pad(s: SString): fmt.Result;
            write_str(s: string): fmt.Result;
            write_str(s: SString): fmt.Result;
            write_fmt(fmt: Arguments): fmt.Result;
            fill(): Char;
            align(): globalThis.eh.Option<Alignment>;
            precision(): globalThis.eh.Option<SNumber>;
            sign_plus(): Bool;
            sign_minus(): Bool;
            alternate(): Bool;
            sign_aware_zero_pad(): Bool;
            debug_struct(name: string): DebugStruct;
            debug_struct(name: SString): DebugStruct;
            debug_tuple(name: string): DebugTuple;
            debug_tuple(name: SString): DebugTuple;
            debug_list(): DebugList;
            debug_set(): DebugSet;
            debug_map(): DebugMap;
        }

        export function write(f: Formatter, fmt: string, ...args: Display[]): fmt.Result;
    }

    export namespace iter {
        export interface IntoIterator<T> {
            __todo: false
        }   
    }

    export namespace future {
        export interface Future<T> {
            poll(): Poll<T>;
        }
    
        export interface Poll<T> {
            readonly isReady: boolean;
            readonly output: T;
        }
    }

    export function format(fmt: string, ...args: fmt.Debug[]): SString;

    export interface SSON {
        parse(text: SString): HashMap<string, SString>;
        parse(text: string): HashMap<string, SString>;
        stringify(obj: object): SString;
    }

    export interface HashMap<K, V> {
        get(key: K): Option<V>;
        set(key: K, value: V): void;
        delete(key: K): void;
        clear(): void;
        has(key: K): boolean;
        size(): number;
    }

    /**
     * A typesciprt-representation of the SafeScript's `Option` enum.
     * 
     * See {@link eh.Option Option} for more information.
    */
    // deno-lint-ignore no-empty-interface
    export interface Option<T> extends eh.Option<T> {}
    /**
     * A typesciprt-representation of the SafeScript's `Result` enum.
     * 
     * See {@link eh.Result Result} for more information.
    */
    // deno-lint-ignore no-empty-interface
    export interface Result<T, E> extends eh.Result<T, E> {}
    /**
     * A typesciprt-representation of the SafeScript's `Error` trait.
     * 
     * See {@link eh.Error Error} for more information.
    */
    // deno-lint-ignore no-empty-interface
    export interface Error extends eh.Error {}

    /**
     * A simple wrapper to create an {@link Option} enum
     * @param {T | undefined} value value to use
     * @returns {Option<T>} the resulting option enum
    */
    export function Some<T>(value?: T): Option<T>;
    
    /**
     * A simple wrapper to create an epmty {@link Option} enum
     * @returns {Option<T>} the resulting option enum
    */
    export function None<T>(): Option<T>;

    /**
     * A simple wrapper to create a new {@link Result}
     * @param {T} value successful value
     * @returns {Result<T,E>} the result
    */
    export function Ok<T, E>(value: T): Result<T, E>;

    /**
     * A simple wrapper to create a new {@link Result}
     * @param {E} err error value
     * @returns {Result<T,E>} the result
    */
    export function Err<T, E>(err: E): Result<T, E>;

    /**
     * Panics the program with a custom message.
     * 
     * THIS IS NEVER RECOMMENDED TO USE.
     * 
     * Prefer to use {@link Result} and {@link Option} instead.
     * 
     * @param {SString | undefined} message the message to panic with
     * @returns {never} never returns
    */
    export function panic(message?: SString): never;

    /** The SafeScript's alternative to JSON */
    export const SSON: SSON;

    export interface SString extends fmt.Debug, fmt.Display, SafePrimitive {

    }
    export interface SNumber extends fmt.Debug, fmt.Display, SafePrimitive {

    }
    export interface Bool extends fmt.Debug, fmt.Display, SafePrimitive {
        
    }
    export interface Char extends fmt.Debug, fmt.Display, SafePrimitive {

    }
    export type Void = void;
    export const Void: Void;

    export function println(fmt: string, ...args: __safescript_internals__.__Any__[]): void;

    export function __safe__<T extends UnsafePrimitive>(value: T): UnsafeToSafePrimitiveConverterMap<T>;
}

interface SafePrimitive {
    readonly __safe__: true;
}

type UnsafePrimitive =
    string |
    number |
    boolean |
    object |
    undefined |
    null |
    symbol |
    bigint;

type UnsafeToSafePrimitiveConverterMap<T> =
    T extends string ? SString :
    T extends number ? SNumber :
    T extends boolean ? Bool :
    T extends object ? HashMap<string, SString> :
    Void;

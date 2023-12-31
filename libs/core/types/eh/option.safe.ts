import { OptionMatchPattern } from "$core/ops";
import { UnwrapException } from "$core/eh";
import { Match } from "$core/ops";

/**
 *  Optional values.
 * 
 *  Type {@link Option} represents an optional value: every {@link Option}
 *  is either {@link Option.Some Some} and contains a value, or {@link Option.None None}, and
 *  does not. {@link Option} types are very common in SafeScript code, as
 *  they have a number of uses:
 * 
 *  * Initial values
 *  * Return values for functions that are not defined
 *    over their entire input range (partial functions)
 *  * Return value for otherwise reporting simple errors, where {@link Option.None None} is
 *    returned on error
 *  * Optional struct fields
 *  * Struct fields that can be loaned or "taken"
 *  * Optional function arguments
 *  * Nullable pointers
 *  * Swapping things out of difficult situations
 * 
 *  {@link Option}s are commonly paired with pattern matching to query the presence
 *  of a value and take action, always accounting for the {@link Option.None None} case.
 * 
 * ## Example
 * 
 *  ```ts
 *  function divide(numerator: SafeNumber, denominator: SafeNumber): Option<SafeNumber> {
 *      if denominator == 0 {
 *          Option.None
 *      } else {
 *          Option.Some(numerator.div(denominator))
 *      }
 *  }
 * 
 *  // The return value of the function is an option
 *  let result = divide(2, 3);
 * 
 *  // Pattern match to retrieve the value
 *  result.match({
 *     Some: (x) => println!("Result: {x}"),
 *     None: println!("Cannot divide by 0"),
 *  });
 *  ```
*/
export interface Option<T> extends Match<OptionMatchPattern<T>> {
    /**
     * Returns true if the option is a Some value.
     * @returns {boolean} true if the option is a Some value
    */
    isSome(): boolean;
    /**
     * Returns true if the option is a None value.
     * @returns {boolean} true if the option is a None value
    */
    isNone(): boolean;
    /**
     * Returns the contained Some value.
     * @returns {T} the contained Some value
     * @throws {UnwrapException} if the value is a None with a custom message provided by msg
    */
    unwrap(): T;
    /**
     * Returns the contained Some value or a default.
     * @param {T} defaultValue the default value
     * @returns {T} the contained Some value or a default
    */
    unwrapOr(defaultValue: T): T;
    /**
     * Returns the contained Some value or computes it from a closure.
     * @param {() => T} defaultValue the closure to compute the default value
     * @returns {T} the contained Some value or computes it from a closure
    */
    unwrapOrElse(defaultValue: () => T): T;
}

//deno-lint-ignore no-namespace
export namespace Option {
    class Impl<T> implements Option<T> {
        constructor(private readonly value?: T | undefined) {}
        match(pattern: OptionMatchPattern<T>): void {
            if (this.isSome()) {
                if (pattern.Some) pattern.Some(this.value as T);
                else pattern._!(this.value);
            } else {
                if (pattern.None) pattern.None();
                else pattern._!();
            }
        }
        isSome(): boolean {
            return this.value !== undefined;
        }
        isNone(): boolean {
            return !this.isSome();
        }
        unwrap(): T | never {
            if (this.isNone()) UnwrapException.raise("Cannot unwrap a None value");
            return this.value as T;
        }
        unwrapOr(defaultValue: T): T {
            return this.isSome() ? this.value as T : defaultValue;
        }
        unwrapOrElse(defaultValue: () => T): T {
            return this.isSome() ? this.value as T : defaultValue();
        }
    }
    /**
     * Constructs a new {@link Option} with a Some value.
     * @param {T} value the value
     * @returns {Option<T>} a new {@link Option} with a Some value
     * @template T the type of the value
     */
    export function Some<T>(value: T): Option<T> {
        return new Impl(value);
    }

    /**
     * Constructs a new {@link Option} with a None value.
     * 
     * @returns {Option<T>} a new {@link Option} with a None value
     * @template T the type of the value
    */
    export function None<T>(): Option<T> { return new Impl(); }
}

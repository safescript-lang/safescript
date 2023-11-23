import { MatchPattern } from './match.safe.ts';

interface BaseOptionMatchPattern<T> extends MatchPattern {
    /**
     * The pattern for when the option contains some value.
     * 
     * @param {T} value the value contained in the option
     * @returns {void} Nothing.
    */
    Some?: (value: T) => void;
    /**
     * The pattern for when the option contains no value.
     * 
     * @returns {void} Nothing.
    */
    None?: () => void;
}

interface OptionMatchPattern1<T> extends BaseOptionMatchPattern<T> {
    Some: (value: T) => void;
    None: () => void;
}

interface OptionMatchPattern2<T> extends BaseOptionMatchPattern<T> {
    None: () => void;
    //deno-lint-ignore no-explicit-any
    _: (...args: any[]) => void;
}

interface OptionMatchPattern3<T> extends BaseOptionMatchPattern<T> {
    Some: (value: T) => void;
    //deno-lint-ignore no-explicit-any
    _: (...args: any[]) => void;
}

interface OptionMatchPattern4<T> extends BaseOptionMatchPattern<T> {
    //deno-lint-ignore no-explicit-any
    _: (...args: any[]) => void;
}

export type OptionMatchPattern<T> = OptionMatchPattern1<T> |
OptionMatchPattern2<T> | OptionMatchPattern3<T> | OptionMatchPattern4<T>;

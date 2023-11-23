import * as annot from './annotations/annotations.safe.ts'

/**
 * The addition operator `+`.
 * 
 * @template Output The output type.
 * @template Rhs The right hand side type.
*/
export interface Add<Output, Rhs> {
    /**
     * Adds the right hand side to the left hand side.
     * 
     * @param {Rhs} other The right hand side of the addition.
     * @returns {Output} The result of the addition.
    */
    add(other: Rhs): Output;
}

//deno-lint-ignore no-namespace
export namespace Add {
    /**
     * Overloads the addition operator `+` for a class.
     * 
     * Think of this as rust's `impl` keyword.
     * 
     * ### Example
     * 
     * ```typescript
     * import { Add } from "$core/ops";
     * 
     * class MyNumber implements Add<MyNumber, MyNumber> {
     *     public constructor(readonly value: number) {}
     *     {@linkcode @Add._}
     *     public add(other: MyNumber): MyNumber {
     *         return new MyNumber(this.value + other.value);
     *     }
     * }
     * ```
     * 
     * @param {Add<O,R>} t the class to overload the operator for
     * @param {'add'} p the name of the method to overload
     * @param {STPD<'add', O, R>} d the method descriptor
     * @template O Output type of the addition operation.
     * @template R Right hand side type of the addition operation.
     * @returns {void} nothing
    */
    export const _ = <O, R>(
        t: Add<O,R>, p: 'add', d: annot.STPD<'add', O, R>
    ) => annot.OperatorOverload<O, R, 'add'>('+')(t, p, d);
}

/**
 * The addition assignment operator `+=`.
 * 
 * @template Rhs The right hand side type.
*/
export interface AddAssign<Rhs> {
    /**
     * Adds the right hand side to the left hand side.
     * 
     * @param {Rhs} other The right hand side of the addition.
    */
    addAssign(other: Rhs): void;
}

//deno-lint-ignore no-namespace
export namespace AddAssign {
    /**
     * Overloads the addition Assignment operator `+=` for a class.
     * 
     * Think of this as rust's `impl` keyword.
     * 
     * ### Example
     * 
     * ```typescript
     * import { AddAssign } from "$core/ops";
     * 
     * class MyNumber implements AddAssign<MyNumber> {
     *     public constructor(value: number) {}
     *     {@linkcode @AddAssign._}
     *     public addAssign(other: MyNumber): void {
     *         return this.value += other.value;
     *     }
     * }
     * ```
     * 
     * @param {AddAssign<R>} t the class to overload the operator for
     * @param {'addAssign'} p the name of the method to overload
     * @param {STPD<'add', never, R>} d the method descriptor
     * @template R Right hand side type of the addition operation.
     * @returns {void} nothing
    */
    export const _ = <R>(
        t: AddAssign<R>, p: 'addAssign', d: annot.STPD<'addAssign', never, R>
    ) => annot.OperatorOverload<never, R, 'addAssign'>('+=')(t, p, d);
}

/**
 * The subtraction operator `-`.
 * 
 * @template Output The output type.
 * @template Rhs The right hand side type.
*/
export interface Sub<Output, Rhs> {
    /**
     * Subtracts the right hand side from the left hand side.
     * 
     * @param {Rhs} other The right hand side of the subtraction.
     * @returns {Output} The result of the subtraction.
    */
    sub(other: Rhs): Output;
}

//deno-lint-ignore no-namespace
export namespace Sub {
    /**
     * Overloads the subtraction operator `-` for a class.
     * 
     * Think of this as rust's `impl` keyword.
     * 
     * ### Example
     * 
     * ```typescript
     * import { Sub } from "$core/ops";
     * 
     * class MyNumber implements Sub<MyNumber, MyNumber> {
     *     public constructor(readonly value: number) {}
     *     {@linkcode @Sub._}
     *     public sub(other: MyNumber): MyNumber {
     *         return new MyNumber(this.value - other.value);
     *     }
     * }
     * ```
     * 
     * @param {Sub<O,R>} t the class to overload the operator for
     * @param {'sub'} p the name of the method to overload
     * @param {STPD<'sub', O, R>} d the method descriptor
     * @template O Output type of the subtraction operation.
     * @template R Right hand side type of the subtraction operation.
     * @returns {void} nothing
    */
    export const _ = <O, R>(
        t: Sub<O,R>, p: 'sub', d: annot.STPD<'sub', O, R>
    ) => annot.OperatorOverload<O, R, 'sub'>('-')(t, p, d);
}

/**
 * The subtraction assignment operator `-=`.
 * 
 * @template Rhs The right hand side type.
*/
export interface SubAssign<Rhs> {
    /**
     * Subtracts the right hand side from the left hand side.
     * 
     * @param {Rhs} other The right hand side of the subtraction.
    */
    subAssign(other: Rhs): void;
}

//deno-lint-ignore no-namespace
export namespace SubAssign {
    /**
     * Overloads the subtraction Assignment operator `-=` for a class.
     * 
     * Think of this as rust's `impl` keyword.
     * 
     * ### Example
     * 
     * ```typescript
     * import { SubAssign } from "$core/ops";
     * 
     * class MyNumber implements SubAssign<MyNumber> {
     *     public constructor(value: number) {}
     *     {@linkcode @SubAssign._}
     *     public subAssign(other: MyNumber): void {
     *         return this.value -= other.value;
     *     }
     * }
     * ```
     * 
     * @param {SubAssign<R>} t the class to overload the operator for
     * @param {'subAssign'} p the name of the method to overload
     * @param {STPD<'sub', never, R>} d the method descriptor
     * @template R Right hand side type of the subtraction operation.
     * @returns {void} nothing
    */
    export const _ = <R>(
        t: SubAssign<R>, p: 'subAssign', d: annot.STPD<'subAssign', never, R>
    ) => annot.OperatorOverload<never, R, 'subAssign'>('-=')(t, p, d);
}

/**
 * The multiplication operator `*`.
 * 
 * @template Output The output type.
 * @template Rhs The right hand side type.
*/
export interface Mul<Output, Rhs> {
    /**
     * Multiplies the left hand side by the right hand side.
     * 
     * @param {Rhs} other The right hand side of the multiplication.
     * @returns {Output} The result of the multiplication.
    */
    mul(other: Rhs): Output;
}

//deno-lint-ignore no-namespace
export namespace Mul {
    /**
     * Overloads the multiplication operator `*` for a class.
     * 
     * Think of this as rust's `impl` keyword.
     * 
     * ### Example
     * 
     * ```typescript
     * import { Mul } from "$core/ops";
     * 
     * class MyNumber implements Mul<MyNumber, MyNumber> {
     *     public constructor(readonly value: number) {}
     *     {@linkcode @Mul._}
     *     public mul(other: MyNumber): MyNumber {
     *         return new MyNumber(this.value * other.value);
     *     }
     * }
     * ```
     * 
     * @param {Mul<O,R>} t the class to overload the operator for
     * @param {'mul'} p the name of the method to overload
     * @param {STPD<'mul', O, R>} d the method descriptor
     * @template O Output type of the multiplication operation.
     * @template R Right hand side type of the multiplication operation.
     * @returns {void} nothing
    */
    export const _ = <O, R>(
        t: Mul<O,R>, p: 'mul', d: annot.STPD<'mul', O, R>
    ) => annot.OperatorOverload<O, R, 'mul'>('*')(t, p, d);
}

/**
 * The multiplication assignment operator `*=`.
 * 
 * @template Rhs The right hand side type.
*/
export interface MulAssign<Rhs> {
    /**
     * Multiplies the left hand side by the right hand side.
     * 
     * @param {Rhs} other The right hand side of the multiplication.
    */
    mulAssign(other: Rhs): void;
}

//deno-lint-ignore no-namespace
export namespace MulAssign {
    /**
     * Overloads the multiplication Assignment operator `*=` for a class.
     * 
     * Think of this as rust's `impl` keyword.
     * 
     * ### Example
     * 
     * ```typescript
     * import { MulAssign } from "$core/ops";
     * 
     * class MyNumber implements MulAssign<MyNumber> {
     *     public constructor(value: number) {}
     *     {@linkcode @MulAssign._}
     *     public mulAssign(other: MyNumber): void {
     *         return this.value *= other.value;
     *     }
     * }
     * ```
     * 
     * @param {MulAssign<R>} t the class to overload the operator for
     * @param {'mulAssign'} p the name of the method to overload
     * @param {STPD<'mul', never, R>} d the method descriptor
     * @template R Right hand side type of the multiplication operation.
     * @returns {void} nothing
    */
    export const _ = <R>(
        t: MulAssign<R>, p: 'mulAssign', d: annot.STPD<'mulAssign', never, R>
    ) => annot.OperatorOverload<never, R, 'mulAssign'>('*=')(t, p, d);
}

/**
 * The division operator `/`.
 * 
 * @template Output The output type.
 * @template Rhs The right hand side type.
*/
export interface Div<Output, Rhs> {
    /**
     * Divides the left hand side by the right hand side.
     * 
     * @param {Rhs} other The right hand side of the division.
     * @returns {Output} The result of the division.
    */
    div(other: Rhs): Output;
}

//deno-lint-ignore no-namespace
export namespace Div {
    /**
     * Overloads the division operator `/` for a class.
     * 
     * Think of this as rust's `impl` keyword.
     * 
     * ### Example
     * 
     * ```typescript
     * import { Div } from "$core/ops";
     * 
     * class MyNumber implements Div<MyNumber, MyNumber> {
     *     public constructor(readonly value: number) {}
     *     {@linkcode @Div._}
     *     public div(other: MyNumber): MyNumber {
     *         return new MyNumber(this.value / other.value);
     *     }
     * }
     * ```
     * 
     * @param {Div<O,R>} t the class to overload the operator for
     * @param {'div'} p the name of the method to overload
     * @param {STPD<'div', O, R>} d the method descriptor
     * @template O Output type of the division operation.
     * @template R Right hand side type of the division operation.
     * @returns {void} nothing
    */
    export const _ = <O, R>(
        t: Div<O,R>, p: 'div', d: annot.STPD<'div', O, R>
    ) => annot.OperatorOverload<O, R, 'div'>('/')(t, p, d);
}

/**
 * The division assignment operator `/=`.
 * 
 * @template Rhs The right hand side type.
*/
export interface DivAssign<Rhs> {
    /**
     * Divides the left hand side by the right hand side.
     * 
     * @param {Rhs} other The right hand side of the division.
    */
    divAssign(other: Rhs): void;
}

//deno-lint-ignore no-namespace
export namespace DivAssign {
    /**
     * Overloads the division Assignment operator `/=` for a class.
     * 
     * Think of this as rust's `impl` keyword.
     * 
     * ### Example
     * 
     * ```typescript
     * import { DivAssign } from "$core/ops";
     * 
     * class MyNumber implements DivAssign<MyNumber> {
     *     public constructor(value: number) {}
     *     {@linkcode @DivAssign._}
     *     public divAssign(other: MyNumber): void {
     *         return this.value /= other.value;
     *     }
     * }
     * ```
     * 
     * @param {DivAssign<R>} t the class to overload the operator for
     * @param {'divAssign'} p the name of the method to overload
     * @param {STPD<'div', never, R>} d the method descriptor
     * @template R Right hand side type of the division operation.
     * @returns {void} nothing
    */
    export const _ = <R>(
        t: DivAssign<R>, p: 'divAssign', d: annot.STPD<'divAssign', never, R>
    ) => annot.OperatorOverload<never, R, 'divAssign'>('/=')(t, p, d);
}
/**
 * The remainder operator `%`.
 * 
 * @template Output The output type.
 * @template Rhs The right hand side type.
*/
export interface Rem<Output, Rhs> {
    /**
     * Returns the remainder of the left hand side divided by the right hand side.
     * 
     * @param {Rhs} other The right hand side of the remainder.
     * @returns {Output} The remainder of the division.
    */
    rem(other: Rhs): Output;
}

//deno-lint-ignore no-namespace
export namespace Rem {
    /**
     * Overloads the remainder operator `%` for a class.
     * 
     * Think of this as rust's `impl` keyword.
     * 
     * ### Example
     * 
     * ```typescript
     * import { Rem } from "$core/ops";
     * 
     * class MyNumber implements Rem<MyNumber, MyNumber> {
     *     public constructor(readonly value: number) {}
     *     {@linkcode @Rem._}
     *     public rem(other: MyNumber): MyNumber {
     *         return new MyNumber(this.value % other.value);
     *     }
     * }
     * ```
     * 
     * @param {Rem<O,R>} t the class to overload the operator for
     * @param {'rem'} p the name of the method to overload
     * @param {STPD<'rem', O, R>} d the method descriptor
     * @template O Output type of the remainder operation.
     * @template R Right hand side type of the remainder operation.
     * @returns {void} nothing
    */
    export const _ = <O, R>(
        t: Rem<O,R>, p: 'rem', d: annot.STPD<'rem', O, R>
    ) => annot.OperatorOverload<O, R, 'rem'>('%')(t, p, d);
}

/**
 * The remainder assignment operator `%=`.
 * 
 * @template Rhs The right hand side type.
*/
export interface RemAssign<Rhs> {
    /**
     * Returns the remainder of the left hand side divided by the right hand side.
     * 
     * @param {Rhs} other The right hand side of the remainder.
    */
    remAssign(other: Rhs): void;
}

//deno-lint-ignore no-namespace
export namespace RemAssign {
    /**
     * Overloads the remainder Assignment operator `%=` for a class.
     * 
     * Think of this as rust's `impl` keyword.
     * 
     * ### Example
     * 
     * ```typescript
     * import { RemAssign } from "$core/ops";
     * 
     * class MyNumber implements RemAssign<MyNumber> {
     *     public constructor(value: number) {}
     *     {@linkcode @RemAssign._}
     *     public remAssign(other: MyNumber): void {
     *         return this.value %= other.value;
     *     }
     * }
     * ```
     * 
     * @param {RemAssign<R>} t the class to overload the operator for
     * @param {'remAssign'} p the name of the method to overload
     * @param {STPD<'rem', never, R>} d the method descriptor
     * @template R Right hand side type of the remainder operation.
     * @returns {void} nothing
    */
    export const _ = <R>(
        t: RemAssign<R>, p: 'remAssign', d: annot.STPD<'remAssign', never, R>
    ) => annot.OperatorOverload<never, R, 'remAssign'>('%=')(t, p, d);
}

/**
 * The negation operator `-`.
 * 
 * @template Output The output type.
*/
export interface Neg<Output> {
    /**
     * Returns the negation of the item.
     * 
     * @returns {Output} The negation of the item.
    */
    neg(): Output;
}

//deno-lint-ignore no-namespace
export namespace Neg {
    /**
     * Overloads the negation operator `-` for a class.
     * 
     * Think of this as rust's `impl` keyword.
     * 
     * ### Example
     * 
     * ```typescript
     * import { Neg } from "$core/ops";
     * 
     * class MyNumber implements Neg<MyNumber> {
     *     public constructor(readonly value: number) {}
     *     {@linkcode @Neg._}
     *     public neg(): MyNumber {
     *         return new MyNumber(-this.value);
     *     }
     * }
     * ```
     * 
     * @param {RemAssign<R>} t the class to overload the operator for
     * @param {'remAssign'} p the name of the method to overload
     * @param {STPD<'rem', never, R>} d the method descriptor
     * @template R Right hand side type of the remainder operation.
     * @returns {void} nothing
    */
    export const _ = <O>(
        t: Neg<O>, p: 'neg', d: annot.STPD<'neg', O, never>
    ) => annot.OperatorOverload<O, never, 'neg'>('-')(t, p, d);
}

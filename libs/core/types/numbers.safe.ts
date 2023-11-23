import * as ops from "$core/ops";

export interface SafeNumber extends Number,
    ops.Add<SafeNumber, SafeNumber>,
    ops.AddAssign<SafeNumber>,
    ops.Sub<SafeNumber, SafeNumber>,
    ops.SubAssign<SafeNumber>,
    ops.Mul<SafeNumber, SafeNumber>,
    ops.MulAssign<SafeNumber>,
    ops.Div<SafeNumber, SafeNumber>,
    ops.DivAssign<SafeNumber>,
    ops.Rem<SafeNumber, SafeNumber>,
    ops.RemAssign<SafeNumber>,
    ops.Neg<SafeNumber>
{ }

// deno-lint-ignore no-namespace
export namespace SafeNumber {
    class Impl implements SafeNumber {
        constructor(private value: number) {}
        toString(radix?: number | undefined): string {
            return this.value.toString(radix);
        }
        toFixed(fractionDigits?: number | undefined): string {
            return this.value.toFixed(fractionDigits);
        }
        toExponential(fractionDigits?: number | undefined): string {
            return this.value.toExponential(fractionDigits);
        }
        toPrecision(precision?: number | undefined): string {
            return this.value.toPrecision(precision);
        }
        valueOf(): number {
            return this.value;
        }
        toLocaleString(
            locales?: string | string[] | undefined | Intl.LocalesArgument,
            options?: Intl.NumberFormatOptions | undefined
        ): string {
            return this.value.toLocaleString(locales, options);
        }
        // @ops.Add._
        add(other: SafeNumber): SafeNumber {
            return SafeNumber.from(this.value + other.valueOf());
        }
        // @ops.AddAssign._
        addAssign(other: SafeNumber): void {
            this.value += other.valueOf();
        }
        // @ops.Sub._
        sub(other: SafeNumber): SafeNumber {
            return SafeNumber.from(this.value - other.valueOf());
        }
        // @ops.SubAssign._
        subAssign(other: SafeNumber): void {
            this.value -= other.valueOf();
        }
        // @ops.Mul._
        mul(other: SafeNumber): SafeNumber {
            return SafeNumber.from(this.value * other.valueOf());
        }
        // @ops.MulAssign._
        mulAssign(other: SafeNumber): void {
            this.value *= other.valueOf();
        }
        // @ops.Div._
        div(other: SafeNumber): SafeNumber {
            return SafeNumber.from(this.value / other.valueOf());
        }
        // @ops.DivAssign._
        divAssign(other: SafeNumber): void {
            this.value /= other.valueOf();
        }
        // @ops.Rem._
        rem(other: SafeNumber): SafeNumber {
            return SafeNumber.from(this.value % other.valueOf());
        }
        // @ops.RemAssign._
        remAssign(other: SafeNumber): void {
            this.value %= other.valueOf();
        }
        // @ops.Neg._
        neg(): SafeNumber {
            return SafeNumber.from(-this.value);
        }
    }
    export function from(value: number | SafeNumber): SafeNumber {
        return typeof value === "number" ? new Impl(value) : value;
    }
}

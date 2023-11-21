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
        add(other: SafeNumber): SafeNumber {
            return SafeNumber.from(this.value + other.valueOf());
        }
        addAssign(other: SafeNumber): void {
            this.value += other.valueOf();
        }
        sub(other: SafeNumber): SafeNumber {
            return SafeNumber.from(this.value - other.valueOf());
        }
        subAssign(other: SafeNumber): void {
            this.value -= other.valueOf();
        }
        mul(other: SafeNumber): SafeNumber {
            return SafeNumber.from(this.value * other.valueOf());
        }
        mulAssign(other: SafeNumber): void {
            this.value *= other.valueOf();
        }
        div(other: SafeNumber): SafeNumber {
            return SafeNumber.from(this.value / other.valueOf());
        }
        divAssign(other: SafeNumber): void {
            this.value /= other.valueOf();
        }
        rem(other: SafeNumber): SafeNumber {
            return SafeNumber.from(this.value % other.valueOf());
        }
        remAssign(other: SafeNumber): void {
            this.value %= other.valueOf();
        }
        neg(): SafeNumber {
            return SafeNumber.from(-this.value);
        }
    }
    export function from(value: number | SafeNumber): SafeNumber {
        return typeof value === "number" ? new Impl(value) : value;
    }
}

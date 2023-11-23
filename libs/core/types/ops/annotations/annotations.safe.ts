import * as arithmetic from '../arithmetic.safe.ts';
import { panic } from "../../eh/eh.safe.ts";

type OpName = 
    'add' | 'addAssign' |
    'sub' | 'subAssign' |
    'mul' | 'mulAssign' |
    'div' | 'divAssign' |
    'rem' | 'remAssign' |
    'neg';

type OpFromName<T extends OpName> = {
    'add': '+',
    'addAssign': '+=',
    'sub': '-',
    'subAssign': '-=',
    'mul': '*',
    'mulAssign': '*=',
    'div': '/',
    'divAssign': '/=',
    'rem': '%',
    'remAssign': '%=',
    'neg': '-'
}[T];

type OpInterface<T extends OpName, Output, Rhs> = {
    'add': arithmetic.Add<Output, Rhs>,
    'addAssign': arithmetic.AddAssign<Rhs>,
    'sub': arithmetic.Sub<Output, Rhs>,
    'subAssign': arithmetic.SubAssign<Rhs>,
    'mul': arithmetic.Mul<Output, Rhs>,
    'mulAssign': arithmetic.MulAssign<Rhs>,
    'div': arithmetic.Div<Output, Rhs>,
    'divAssign': arithmetic.DivAssign<Rhs>,
    'rem': arithmetic.Rem<Output, Rhs>,
    'remAssign': arithmetic.RemAssign<Rhs>,
    'neg': arithmetic.Neg<Output>
}[T];

type OpSignature<T extends OpName, Output, Rhs> = {
    'add': arithmetic.Add<Output, Rhs>['add'],
    'addAssign': arithmetic.AddAssign<Rhs>['addAssign'],
    'sub': arithmetic.Sub<Output, Rhs>['sub'],
    'subAssign': arithmetic.SubAssign<Rhs>['subAssign'],
    'mul': arithmetic.Mul<Output, Rhs>['mul'],
    'mulAssign': arithmetic.MulAssign<Rhs>['mulAssign'],
    'div': arithmetic.Div<Output, Rhs>['div'],
    'divAssign': arithmetic.DivAssign<Rhs>['divAssign'],
    'rem': arithmetic.Rem<Output, Rhs>['rem'],
    'remAssign': arithmetic.RemAssign<Rhs>['remAssign'],
    'neg': arithmetic.Neg<Output>['neg']
}[T];

interface OpMetadata<Op extends OpName, Output, Rhs> {
    operator: Op;
    operatorSymbol: OpFromName<Op>;
    func: OpSignature<Op, Output, Rhs>;
}

interface SafePrototype<Op extends OpName, Output, Rhs> {
    __safeMetadata?: SafeMetadata<Op, Output, Rhs>;
}

type SafeMetadata<Op extends OpName, Output, Rhs> = Record<Op, OpMetadata<Op, Output, Rhs>>;

/**
 * Strictly typed property descriptor.
 * 
 * Not to be externally used, unless you are implementing a decorator.
 * 
 * @template {OpName} Op the name of the method to overload
 * @template {any} Output the output type of the operator
 * @template {any} Rhs the right hand side type of the operator
*/
export type STPD<
    Op extends OpName, Output, Rhs
> = TypedPropertyDescriptor< OpSignature<Op, Output, Rhs> >;

/**
 * Overloads an operator for a class.
 * 
 * Think of this as rust's `impl` keyword.
 * 
 * @param {Op} operator the operator to overload
 * @returns {(target: This, propertyKey: Name, descriptor: Descriptor) => void} the method decorator
 * @template {any} Output the output type of the operator
 * @template {any} Rhs the right hand side type of the operator
 * @template {OpName} Name the name of the method to overload
 * @template {OpFromName<Name>} Op the operator symbol
 * @template {StrictlyTypedPropertyDescriptor<OpSignature<Op, Output, Rhs>>} Descriptor the method descriptor
 * @template {OpInterface<Op, Output, Rhs>} This the class to overload the operator for
*/
export function OperatorOverload<
    Output,
    Rhs,
    const Name extends OpName,
    Op extends OpFromName<Name> = OpFromName<Name>,
    const Descriptor extends STPD<Name, Output, Rhs> = STPD<Name, Output, Rhs>,
    const This extends OpInterface<Name, Output, Rhs> = OpInterface<Name, Output, Rhs>,
>(operator: Op): (target: This, propertyKey: Name, descriptor: Descriptor) => void {
    return function(target, propertyKey, descriptor) {
        try {
            const func = target[propertyKey as unknown as keyof This] || descriptor.value;
            const proto: SafePrototype<Name, Output, Rhs> = Object.getPrototypeOf(target);
            //deno-lint-ignore no-explicit-any
            const metadata: SafeMetadata<Name, Output, Rhs> = proto.__safeMetadata ?? {} as any;
            const opMetadata = metadata[propertyKey] ?? {};
            console.log(opMetadata);
            console.log(func);
            console.log(operator);
        } catch (e) {
            panic(e);
        }
    };
}

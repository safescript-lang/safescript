export * from './arithmetic.safe.ts';
export * from './match.safe.ts';

import * as arithmetic from './arithmetic.safe.ts';

type Operator = '+' | '+=' | '-' | '-=' | '*' | '*=' | '/' | '/=' | '%' | '%=' | '--';

type OpNameValidation<T extends Operator> = {
    '+': 'add',
    '+=': 'addAssign',
    '-': 'sub',
    '-=': 'subAssign',
    '*': 'mul',
    '*=': 'mulAssign',
    '/': 'div',
    '/=': 'divAssign',
    '%': 'rem',
    '%=': 'remAssign',
    '--': 'neg'
}[T];

type OpInterface<T extends Operator, Output, Rhs> = {
    '+': arithmetic.Add<Output, Rhs>,
    '+=': arithmetic.AddAssign<Rhs>,
    '-': arithmetic.Sub<Output, Rhs>,
    '-=': arithmetic.SubAssign<Rhs>,
    '*': arithmetic.Mul<Output, Rhs>,
    '*=': arithmetic.MulAssign<Rhs>,
    '/': arithmetic.Div<Output, Rhs>,
    '/=': arithmetic.DivAssign<Rhs>,
    '%': arithmetic.Rem<Output, Rhs>,
    '%=': arithmetic.RemAssign<Rhs>,
    '--': arithmetic.Neg<Output>
}[T];

type OpSignature<T extends Operator, Output, Rhs> = {
    '+': arithmetic.Add<Output, Rhs>['add']
    '+=': arithmetic.AddAssign<Rhs>['addAssign'],
    '-': arithmetic.Sub<Output, Rhs>['sub'],
    '-=': arithmetic.SubAssign<Rhs>['subAssign'],
    '*': arithmetic.Mul<Output, Rhs>['mul'],
    '*=': arithmetic.MulAssign<Rhs>['mulAssign'],
    '/': arithmetic.Div<Output, Rhs>['div'],
    '/=': arithmetic.DivAssign<Rhs>['divAssign'],
    '%': arithmetic.Rem<Output, Rhs>['rem'],
    '%=': arithmetic.RemAssign<Rhs>['remAssign'],
    '--': arithmetic.Neg<Output>['neg']
}[T];

/**
 * Overloads an operator for a class.
 * @param {Op} operator the operator to overload
 * @returns {MethodDecorator} the method decorator
 * @template {Operator} Op the operator symbol
 * @template {OpNameValidation<Op>} Name the name of the method to overload
 * @template {TypedPropertyDescriptor<OpSignature<Op, Output, Rhs>>} Descriptor the method descriptor
 * @template {OpInterface<Op, Output, Rhs>} This the class to overload the operator for
 * @template {any} Output the output type of the operator
 * @template {any} Rhs the right hand side type of the operator
*/
export function OperatorOverload<
    Op extends Operator,
    const Name extends OpNameValidation<Op>,
    const Descriptor extends TypedPropertyDescriptor<OpSignature<Op, Output, Rhs>>,
    const This extends OpInterface<Op, Output, Rhs>,
    //deno-lint-ignore no-explicit-any
    Output = any,
    //deno-lint-ignore no-explicit-any
    Rhs = any,
>(operator: Op) {
    return function(target: This, propertyKey: Name, descriptor: Descriptor) {
        console.log(`Overloading operator ${operator}`);
        console.log(target);
        console.log(propertyKey);
        console.log(descriptor);
    };
}

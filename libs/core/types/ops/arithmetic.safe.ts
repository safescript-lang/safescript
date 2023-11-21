export interface Add<Output, Rhs> {
    add(other: Rhs): Output;
}

export interface AddAssign<Rhs> {
    addAssign(other: Rhs): void;
}

export interface Sub<Output, Rhs> {
    sub(other: Rhs): Output;
}

export interface SubAssign<Rhs> {
    subAssign(other: Rhs): void;
}

export interface Mul<Output, Rhs> {
    mul(other: Rhs): Output;
}

export interface MulAssign<Rhs> {
    mulAssign(other: Rhs): void;
}

export interface Div<Output, Rhs> {
    div(other: Rhs): Output;
}

export interface DivAssign<Rhs> {
    divAssign(other: Rhs): void;
}

export interface Rem<Output, Rhs> {
    rem(other: Rhs): Output;
}

export interface RemAssign<Rhs> {
    remAssign(other: Rhs): void;
}

export interface Neg<Output> {
    neg(): Output;
}

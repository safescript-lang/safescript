export interface Result<O, E> {
}

export namespace Result {
    export function Ok<O, E>(_value: O): Result<O, E> {
        todo$();
    }
    export function err<O, E>(_error: E): Result<O, E> {
        todo$();
    }
}

function todo$(): never {
  throw new Error("Function not implemented.");
}

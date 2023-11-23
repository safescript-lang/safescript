import { Sub, Neg, OperatorOverload } from '$core/ops';

class Vector2 implements Sub<Vector2, Vector2>, Neg<Vector2> {
    constructor(private x: number, private y: number) {}

    @OperatorOverload('-')
    sub(other: Vector2): Vector2 {
        return new Vector2(this.x + other.x, this.y + other.y);
    }

    @OperatorOverload('-')
    neg(): Vector2 {
        return new Vector2(-this.x, -this.y);
    }

    [Symbol.toPrimitive](hint: "number"): number;
    [Symbol.toPrimitive](hint: "string"): string;
    [Symbol.toPrimitive](hint: any): any {
        return `Vector2{"x":"${this.x.toString()}","y":"${this.y.toString()}"]`;
    }
}

const vec1 = new Vector2(4, 2);
const vec2 = new Vector2(2, 4);

const new_vec = vec1.sub(vec2);

console.log(new_vec);

import {Add, OperatorOverload} from '$core/ops';
import { SafeNumber } from '$core';

class Vector2 implements Add<Vector2, Vector2> {
    private readonly x: SafeNumber;
    private readonly y: SafeNumber;
    public constructor(
        x: SafeNumber | number,
        y: SafeNumber | number
    ) {
        this.x = SafeNumber.from(x);
        this.y = SafeNumber.from(y);
    }
    @OperatorOverload('+')
    public add(other: Vector2): Vector2 {
        return new Vector2(this.x.add(other.x), this.y.add(other.y));
    }
}

const vec1 = new Vector2(42, 24);
const vec2 = new Vector2(42, 24);

const added_vec = vec1.add(vec2); // This gets transpiled to vec1.add(vec2)

console.log(added_vec);
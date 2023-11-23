import { Add, Sub, Neg } from "$core/ops";
import { SafeNumber } from "$core";

export class Vector2 implements
    Add<Vector2, Vector2>,
    Sub<Vector2, Vector2>,
    Neg<Vector2>
{
    private readonly x: SafeNumber;
    private readonly y: SafeNumber;
    public constructor(
        x: SafeNumber | number,
        y: SafeNumber | number
    ) {
        this.x = SafeNumber.from(x);
        this.y = SafeNumber.from(y);
    }
    @Add._
    public add(other: Vector2): Vector2 {
        return new Vector2(this.x.add(other.x), this.y.add(other.y));
    }
    @Sub._
    public sub(other: Vector2): Vector2 {
        return new Vector2(this.x.add(other.x), this.y.add(other.y));
    }
    @Neg._
    public neg(): Vector2 {
        return new Vector2(this.x.neg(), this.y.neg());
    }
}

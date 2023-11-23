import { Vector2 } from "./vec2.safe.ts";

const vec1 = new Vector2(42, 24);
const vec2 = new Vector2(42, 24);

const added_vec = vec1.add(vec2); // This gets transpiled to vec1.add(vec2)

console.log(added_vec);

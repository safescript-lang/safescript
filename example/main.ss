/// <reference no-default-lib="true"/>
/// <reference types="../libs/core/lib.d.ts" />

class Person {
    public readonly name: SString;
    public readonly age: SNumber;
    public constructor(name: SString, age: number) {
        this.name = name;
        this.age = __safe__(age);
    }
}

// class Person implements fmt.Debug, fmt.Display {
//     public readonly name: SString;
//     public readonly age: SNumber;
//     public constructor(name: SString, age: number) {
//         this.name = name;
//         this.age = __safe__(age);
//     }
//     public debug_fmt(f: fmt.Formatter): fmt.Result {
//         return f.debug_struct("Person")
//             .field("name", this.name)
//             .field("age", this.age)
//             .finish();
//     }
//     public fmt(f: fmt.Formatter): fmt.Result {
//         return fmt.write(f, "{} is {} years old", this.name, this.age);
//     }
//     public to_string(): SString {
//         return format("{}", this);
//     }
// }

function main(): Result<Void, Error> {
    const item = SSON.parse('{"name": "test"}');
    const name = item.get("name").$;

    const person = new Person(name, 10);

    println("{:?}", person);

    return Ok(Void);
}

__safescript_internals__.__runtime__.__invoke__(main);

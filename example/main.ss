class Person {
    public readonly name: string;
    public readonly age: number;
    public constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}

function main(): Result<Void, Error> {
    const item = SSON.parse('{"name": "test"}');
    const name = item.get("name").$;

    const person = new Person(name, 10);

    console.log(person);

    return Result.Ok(Void);
}

__safescript_internals__.__runtime__.__invoke__(main);

use safescript::tokens::parse;
use safescript::Result;

fn main() -> Result {
    let tokens = parse("log(\"Hello, World!\")")?;
    println!("{:?}", tokens);
    Ok(())
}

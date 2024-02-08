use safescript::{vm::Builder, Result};

fn main() -> Result {
    let mut builder = Builder::new_without_corelib();
    builder.add_native_function("log", |args| {
        println!("{:?}", args[0]);
        Ok(())
    });
    
    let mut rt = builder.build();
    rt.init();
    rt.run_string("log('Hello, world!')")?;

    Ok(())
}
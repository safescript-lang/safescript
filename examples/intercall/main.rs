fn main() {
    let mut rt = safescript::runtime::Builder::new().build();

    rt.init();

    rt.run_from_string("log('Hello, world!')")?;
    rt.run_from_file("./")
}
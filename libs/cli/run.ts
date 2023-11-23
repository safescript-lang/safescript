import build from "./build.ts";

if (!import.meta.main) {
    throw new Error("This module is only meant to be run as a script");
}

const file = (() => {
    const file_path = Deno.args[0];
    if (!file_path) {
        throw new Error("No file path provided");
    }
    return file_path;
})();

await build({
    output_file: "./target/main.js",
    input_file: file,
    force_build: true,
});

const command = new Deno.Command(Deno.execPath(), {
    args: [
        "run",
        "-A",
        "./target/main.js"
    ],
    stdin: "piped",
    stdout: "piped",
});
const child = command.spawn();
await child.status

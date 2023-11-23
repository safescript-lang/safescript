import { getBuildHash, hashesSame } from "./util/hash.ts";
import * as esbuild from "npm:esbuild";
import cache from "./util/cache.ts";

interface Config {
    input_file?: string,
    output_file?: string,
    force_build?: boolean,
}

export async function build(config: Config = {}) {
    const last_tsbuild_hash = await getBuildHash();

    const command = new Deno.Command(Deno.execPath(), {
        args: [
            "run",
            "-A",
            "npm:typescript/tsc"
        ],
        stdin: "piped",
        stdout: "piped",
    });
    const child = command.spawn();
    const status = await child.status;
    if (!status.success) {
        throw new Error("Failed to build typescript");
    }
    
    const new_tsbuild_hash = await getBuildHash();
    
    if (hashesSame(last_tsbuild_hash, new_tsbuild_hash)) {
        if (config.force_build) {
            console.log("TypeScript build hash unchanged, but force build enabled, rebuilding...");
        } else {
            console.log("TypeScript build hash unchanged, skipping build...");
            return;
        }
    } else {
        console.log("TypeScript build hash changed, rebuilding...");
    }

    if (!config.input_file) {
        console.log("No input file provided, skipping build...");
        return;
    }

    if (!config.output_file) throw new Error(
        "No output file provided, even though an input file was provided"
    );
    
    const importmap = {
        imports: {
            "$core": "../libs/core/types/core.safe.ts",
            "$core/eh": "../libs/core/types/eh/eh.safe.ts",
            "$core/ops": "../libs/core/types/ops/ops.safe.ts",
        },
    }
    
    await esbuild.build({
        entryPoints: [config.input_file],
        outfile: config.output_file,
        platform: 'browser',
        bundle: true,
        minify: false,
        format: 'cjs',
        target: ['esnext', 'es6'],
        plugins: [cache({ importmap, directory: './cache' })],
        supported: {
            'decorators': true
        },
        ignoreAnnotations: false,
    });
}

export default build;

if (import.meta.main) {
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
    });
}

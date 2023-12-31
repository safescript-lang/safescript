import * as Cache from 'https://deno.land/x/cache@0.2.13/mod.ts'
import { resolve } from 'https://deno.land/x/importmap@0.1.4/mod.ts'
import { join } from 'https://deno.land/std@0.97.0/path/mod.ts'
import { Plugin, Loader } from 'npm:esbuild'

interface Config {
    importmap: { imports: { [key: string]: string } }
    directory: string
}

export function cache({ importmap = { imports: {} }, directory }: Config): Plugin {
    Cache.configure({ directory })
    return {
        name: 'deno-cache',
        setup(build) {
            build.onResolve({ filter: /.*/ }, (args) => {
                const resolvedPath = resolve(args.path, importmap)
                if (resolvedPath.startsWith('http')) {
                    return {
                        path: resolvedPath,
                        namespace: 'deno-cache',
                    }
                }
                if (args.namespace === 'deno-cache') {
                    return {
                        path: new URL(resolvedPath, args.importer).toString(),
                        namespace: 'deno-cache',
                    }
                }
                return { path: join(args.resolveDir, resolvedPath) }
            })
            build.onLoad({ filter: /.*/, namespace: 'deno-cache' }, async (args) => {
                const file = await Cache.cache(args.path, undefined, 'deps')
                const contents = await Deno.readTextFile(file.path)
                const ext = file.meta.url.split('.').pop() as Loader
                const loader = ext.match(/"j|tsx?$/) ? ext : 'js'
                return { contents, loader }
            })
        },
    }
}

export default cache;

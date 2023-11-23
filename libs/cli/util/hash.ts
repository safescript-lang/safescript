export async function getBuildHash(): Promise<ArrayBuffer> {
    const data = await Deno.readFile('./target/.tsbuildinfo');
    return await hash(data);
}

async function hash(
    input: string | Uint8Array,
    //deno-lint-ignore no-inferrable-types
    algorithm: string = 'SHA-1'
): Promise<ArrayBuffer> {
    const data: Uint8Array = typeof input !== 'string' ? input :
        new TextEncoder().encode(input);
    return await crypto.subtle.digest(algorithm, data);
}

export function hashesSame(
    hash1: ArrayBuffer,
    hash2: ArrayBuffer
): boolean {
    const a = new Uint8Array(hash1);
    const b = new Uint8Array(hash2);
    if (a.length !== b.length) {
        return false;
    }
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

export interface Exception extends Error {
    readonly cause?: unknown;
    readonly stack?: string;
}

class ExceptionImpl extends Error implements Exception {
    public readonly cause?: unknown;
    public readonly stack?: string;
    public constructor(name: string, message: string) {
        super(message);
        this.name = name;
    }
}

export class UnwrapException extends ExceptionImpl implements Exception {
    public constructor(message: string) {
        super('UnwrapException', message);
    }
}

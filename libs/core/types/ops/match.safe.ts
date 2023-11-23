export interface Match<P extends MatchPattern> {
    match(pattern: P): void;
}

interface BaseMatchPattern {
    //deno-lint-ignore no-explicit-any
    [key: string]: ((...args: any[]) => void) | undefined;
}

export interface MatchPattern extends BaseMatchPattern {
    /**
     * The catch-all pattern.
     * 
     * This pattern is used when no other pattern matches.
     * 
     * @returns {void} Nothing.
    */
    //deno-lint-ignore no-explicit-any
    readonly _?: (...args: any[]) => void;
}

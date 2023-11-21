export interface Match<P extends MatchPattern> {
    match(pattern: P): void;
}

export interface MatchPattern {
    readonly _?: () => void;
}

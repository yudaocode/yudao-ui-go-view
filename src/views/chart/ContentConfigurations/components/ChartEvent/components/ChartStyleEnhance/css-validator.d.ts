declare module 'css-validator' {
    export function validateCSS(css: string, callback?: (isValid: boolean) => void): void;
    export function validateCSSAsync(css: string): Promise<boolean>;
}
export declare class Config {
    private m;
    constructor(configObj: {
        [key: string]: any;
    });
    get(key: string, fallback?: any): any;
    getBoolean(key: string, fallback?: boolean): boolean;
    getNumber(key: string, fallback?: number): number;
    set(key: string, value: any): void;
}

export declare function renderDatetime(template: string, value: DatetimeData, locale: LocaleData): string | undefined;
export declare function renderTextFormat(format: string, value: any, date: DatetimeData | null, locale: LocaleData): string;
export declare function dateValueRange(format: string, min: DatetimeData, max: DatetimeData): any[];
export declare function dateSortValue(year: number | undefined, month: number | undefined, day: number | undefined, hour?: number, minute?: number): number;
export declare function dateDataSortValue(data: DatetimeData): number;
export declare function daysInMonth(month: number, year: number): number;
export declare function isLeapYear(year: number): boolean;
export declare function parseDate(val: any): DatetimeData | null;
export declare function updateDate(existingData: DatetimeData, newData: any): boolean;
export declare function parseTemplate(template: string): string[];
export declare function getValueFromFormat(date: DatetimeData, format: string): any;
export declare function convertFormatToKey(format: string): string | null;
export declare function convertDataToISO(data: DatetimeData): string;
/**
 * Use to convert a string of comma separated strings or
 * an array of strings, and clean up any user input
 */
export declare function convertToArrayOfStrings(input: string | string[] | undefined | null, type: string): string[] | undefined;
/**
 * Use to convert a string of comma separated numbers or
 * an array of numbers, and clean up any user input
 */
export declare function convertToArrayOfNumbers(input: any[] | string | number, type: string): number[];
export interface DatetimeData {
    [key: string]: any;
    year?: number;
    month?: number;
    day?: number;
    hour?: number;
    minute?: number;
    second?: number;
    millisecond?: number;
    tzOffset?: number;
}
export interface LocaleData {
    monthNames?: string[];
    monthShortNames?: string[];
    dayNames?: string[];
    dayShortNames?: string[];
}

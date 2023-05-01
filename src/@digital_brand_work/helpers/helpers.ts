export const months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
]

export enum MonthEnum {
    JANUARY = 'January',
    FEBRUARY = 'February',
    MARCH = 'March',
    APRIL = 'April',
    MAY = 'May',
    JUNE = 'June',
    JULY = 'July',
    AUGUST = 'August',
    SEPTEMBER = 'September',
    OCTOBER = 'October',
    NOVEMBER = 'November',
    DECEMBER = 'December',
}

export function between(value: number, min: number, max: number) {
    return value >= min && value <= max
}

export function unfreeze<T>(data: T): T {
    return JSON.parse(JSON.stringify(data))
}

export const isArray = (data) => {
    return !!data && data.constructor === Array
}

export const isObject = (data) => {
    return !!data && data.constructor === Object
}

export const isNumeric = (num: any): boolean =>
    (typeof num === 'number' ||
        (typeof num === 'string' && num.trim() !== '')) &&
    !isNaN(num as number)

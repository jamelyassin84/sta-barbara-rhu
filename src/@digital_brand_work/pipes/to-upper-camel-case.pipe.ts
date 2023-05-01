import {Pipe, PipeTransform} from '@angular/core'
import {empty} from './is-empty.pipe'

@Pipe({name: 'to_upper_camel_case'})
export class ToUpperCamelCasePipe implements PipeTransform {
    transform(value: string): string {
        return to_upper_camel_case(value)
    }
}

export function to_upper_camel_case(value: string): string {
    // const defaultLanguage = localStorage.getItem(LocalStorageEnum.LANGUAGE)

    // const newValue = value
    //     .match(
    //         /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g,
    //     )
    //     .map((x) =>
    //         empty(defaultLanguage) || defaultLanguage === 'en'
    //             ? x
    //             : x.toUpperCase(),
    //     )

    // return newValue.join(
    //     empty(defaultLanguage) || defaultLanguage === 'en' ? ' ' : '_',
    // )
    
    return value
}

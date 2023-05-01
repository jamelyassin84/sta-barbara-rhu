import {Pipe, PipeTransform} from '@angular/core'


@Pipe({name: 'to_upper_snake_case'})
export class ToUpperSnakeCasePipe implements PipeTransform {
    transform(value: string): string {
        return to_upper_snake_case(value)
    }
}

export function to_upper_snake_case(value: string): string {
    // const defaultLanguage = localStorage.getItem(LocalStorageEnum.LANGUAGE)

    // const newValue = value
    //     .match(
    //         /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g,
    //     )
    //     .map((x) =>
    //         empty(defaultLanguage) || defaultLanguage === LanguageEnum.ENGLISH
    //             ? x
    //             : x.toUpperCase(),
    //     )

    // return newValue.join(
    //     empty(defaultLanguage) || defaultLanguage === LanguageEnum.ENGLISH
    //         ? ' '
    //         : '_',
    // )
    
    return value 
}

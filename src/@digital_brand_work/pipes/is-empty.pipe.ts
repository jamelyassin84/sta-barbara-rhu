import {Pipe, PipeTransform} from '@angular/core'

@Pipe({name: 'empty'})
export class IsEmptyPipe implements PipeTransform {
    transform(value: any): boolean {
        return empty(value)
    }
}

export function empty(value: any): boolean {
    if (
        !value ||
        value === '' ||
        value === null ||
        value === 'undefined' ||
        value === 'null'
    ) {
        return true
    }

    return false
}

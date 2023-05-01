import {Pipe, PipeTransform} from '@angular/core'

@Pipe({name: 'has_decimal'})
export class HasDecimalPipe implements PipeTransform {
    transform(value: number): boolean {
        return has_decimal(value)
    }
}

export function has_decimal(value: number): boolean {
    return value % 1 != 0
}

import {Pipe, PipeTransform} from '@angular/core'

@Pipe({name: 'is_even', pure: true})
export class IsEvenPipe implements PipeTransform {
    transform(value: number): boolean {
        return is_even(value)
    }
}

export function is_even(value: number): boolean {
    return value % 2 === 0 ? true : false
}

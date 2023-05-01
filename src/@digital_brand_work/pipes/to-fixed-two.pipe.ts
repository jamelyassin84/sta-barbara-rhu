import {Pipe, PipeTransform} from '@angular/core'

@Pipe({name: 'to_fixed_two'})
export class ToFixedTwoPipe implements PipeTransform {
    transform(value: number): string {
        return to_fixed_two(value)
    }
}

export function to_fixed_two(value: number): string {
    return (value < 10 ? '0' : '') + value
}

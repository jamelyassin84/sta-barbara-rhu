import {Pipe, PipeTransform} from '@angular/core'

@Pipe({name: 'number_to_array'})
export class NumberToArrayPipe implements PipeTransform {
    transform(value: number) {
        return number_to_array(value)
    }
}

export function number_to_array(value: number): number[] {
    const length: number[] = []

    for (let i = 1; i <= value; i++) {
        length.push(i)
    }

    return length
}

import {Pipe, PipeTransform} from '@angular/core'

@Pipe({name: 'number_to_array'})
export class NumberToArrayPipe<T> implements PipeTransform {
    transform(data: T[], reverse: boolean = false): T[] {
        return reverse_array<T>(data, reverse)
    }
}

export function reverse_array<T>(data: T[], reverse: boolean = false): T[] {
    if (!reverse) {
        return data
    }

    return data.reverse()
}

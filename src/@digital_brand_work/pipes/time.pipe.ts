import {Pipe, PipeTransform} from '@angular/core'
import {parseInt} from 'lodash'

@Pipe({
    name: 'to_time',
})
export class TimePipe implements PipeTransform {
    transform(value: string): string {
        return to_time(value)
    }
}

export function to_time(value: string): string {
    return (parseInt(value.toString().split(':')[0]) < 10 ? '0' : '') + value
}

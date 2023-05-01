import {Pipe, PipeTransform} from '@angular/core'

@Pipe({name: 'has_data'})
export class HasDataPipe implements PipeTransform {
    transform(value: any[]): boolean {
        return has_data(value)
    }
}

export function has_data(value: any[]): boolean {
    return value.length !== 0 ? true : false
}

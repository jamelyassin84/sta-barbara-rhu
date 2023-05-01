import {Pipe, PipeTransform} from '@angular/core'

@Pipe({
    name: 'limit_by',
})
export class LimitByPipe implements PipeTransform {
    transform(items: any[], limit: number): any[] {
        return items.slice(0, limit)
    }
}

export function limit_by(items: any[], limit: number): any[] {
    return items.slice(0, limit)
}

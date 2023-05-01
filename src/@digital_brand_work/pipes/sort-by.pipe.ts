import {Pipe, PipeTransform} from '@angular/core'

@Pipe({
    name: 'sort_by',
})
export class SortByPipe implements PipeTransform {
    transform(items: any[], column: any): any[] {
        return sort_by(items, column)
    }
}

export function sort_by(items: any[], column: any): any[] {
    // if (typeof column === 'string') {
    // 	return items.sort((a: any, b: any) => {
    // 		return a[column] - b[column]
    // 	})
    // }

    return items.sort((a, b) => {
        return a[column].localeCompare(b[column])
    })
}

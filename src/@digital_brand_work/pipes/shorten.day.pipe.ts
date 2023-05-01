import {Pipe, PipeTransform} from '@angular/core'

@Pipe({
    name: 'shortened',
})
export class ShortenPipe implements PipeTransform {
    transform(value: string): string {
        return shortened(value)
    }
}

export function shortened(value: string): string {
    const char = value.split('')

    return `${char[0]}${char[1]}${char[2]}`
}

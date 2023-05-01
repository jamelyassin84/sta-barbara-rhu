import {Pipe, PipeTransform} from '@angular/core'

@Pipe({name: 'to_slug'})
export class ToSlugPipe implements PipeTransform {
    transform(text: string) {
        return to_slug(text)
    }
}

export const to_slug = (text: string, separator: '-' | '_' = '-') => {
    return text
        .toString() // Cast to string
        .toLowerCase() // Convert the string to lowercase letters
        .normalize('NFD') // The normalize() method returns the Unicode Normalization Form of a given string.
        .trim() // Remove whitespace from both sides of a string
        .replace(/\s+/g, separator) // Replace spaces with -
        .replace(/[^\w\-]+/g, '') // Remove all non-word chars
        .replace(/\-\-+/g, separator) // Replace multiple - with single -
}

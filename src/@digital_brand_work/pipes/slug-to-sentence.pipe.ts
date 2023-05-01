import {Pipe, PipeTransform} from '@angular/core'

@Pipe({name: 'slug_to_sentence'})
export class SlugToSentencePipe implements PipeTransform {
    transform(slug: string) {
        return slug_to_sentence(slug)
    }
}

export const slug_to_sentence = (slug: string) => {
    return slug.split('_').join(' ').split('.').join(' ')
}

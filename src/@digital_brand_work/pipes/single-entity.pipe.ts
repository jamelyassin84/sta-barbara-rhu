import {Pipe, PipeTransform} from '@angular/core'
import {Entity} from '@digital_brand_work/models/core.model'

@Pipe({name: 'single_entity'})
export class SingleEntityPipe implements PipeTransform {
    transform<T>(model: Entity<T>): T {
        return single_entity(model)
    }
}

export function single_entity<T>(model: Entity<T>): T {
    return Object.values(model.entities)[0]
}

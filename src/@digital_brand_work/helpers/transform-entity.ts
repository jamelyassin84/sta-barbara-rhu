import {entities} from '@digital_brand_work/pipes/entity.pipe'

export class TransformEntity<T> {
    // constructor(_entity: EntityState<T>) {
    //     this.entity = _entity
    // }
    // private entity?: EntityState<T>
    // toObject(): T | null {
    //     if (!this.entity || this.entity.ids.length === 0) {
    //         return null
    //     }
    //     return this.entity.entities[this.entity.ids[0]]
    // }
    // toArray(): T[] {
    //     if (!this.entity) {
    //         return []
    //     }
    //     return entities(this.entity.entities) as T[]
    // }
}

import {entities} from '@digital_brand_work/pipes/entity.pipe'
import {LoadingStateEnum} from '@digital_brand_work/states/store/enums/loading-state.enum'
import {EntityState} from '@ngrx/entity'

export class TransformEntity<T> {
    constructor(_entity: EntityState<T>) {
        this.entity = _entity
    }
    private entity?: EntityState<T>
    toObject(): T | null {
        if (!this.entity || this.entity.ids.length === 0) {
            return null
        }
        return this.entity.entities[this.entity.ids[0]]
    }
    toArray(): T[] {
        if (!this.entity) {
            return []
        }
        return entities(this.entity.entities) as T[]
    }
}
export function toArrayEntity<State>(data: EntityState<State>): State[] {
    return new TransformEntity(data).toArray()
}

export function toObjectEntity<State>(data: EntityState<State>): State {
    return new TransformEntity(data).toObject()
}

export function asGetLoading(data: any): LoadingStateEnum {
    return data.getLoading
}

export function asLoading(data: any): LoadingStateEnum {
    return data.loading
}

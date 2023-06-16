import {
    toArrayEntity,
    toObjectEntity,
} from '@digital_brand_work/helpers/transform-entity'
import {select} from '@ngrx/store'
import {StateEnum} from 'app/app-core/store/core/state.enum'
import {Observable, map, tap} from 'rxjs'

export function State<T>(config: {
    selector: StateEnum
    type: 'object' | 'array'
    tapCallback?: (state: T) => void
}) {
    return function (target: any, propertyKey: string) {
        const {selector, type, tapCallback} = config

        Object.defineProperty(target, propertyKey, {
            get: function (): Observable<T> {
                const state$ = this._store.pipe(
                    select(selector as any),
                    map((state: any) =>
                        type === 'array'
                            ? toArrayEntity(state)
                            : toObjectEntity(state),
                    ),
                )

                if (tapCallback) {
                    return state$.pipe(tap(tapCallback))
                }

                return state$
            },
            enumerable: true,
            configurable: true,
        })
    }
}

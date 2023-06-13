import {select} from '@ngrx/store'
import {Observable} from 'rxjs'

export function StoreSelect<T>(selector: (state: any) => T) {
    return function (target: any, propertyKey: string) {
        Object.defineProperty(target, propertyKey, {
            get: function () {
                return this._store.pipe(select(selector)) as Observable<T>
            },
            enumerable: true,
            configurable: true,
        })
    }
}

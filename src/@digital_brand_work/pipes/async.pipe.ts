import {Observable} from 'rxjs'

export function async_pipe<T>(data$: Observable<T>): T {
    let data: T | undefined

    data$.subscribe((value) => (data = value))

    return data
}

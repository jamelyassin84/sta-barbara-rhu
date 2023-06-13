import {LoadingState} from '@digital_brand_work/models/core.model'
import {StoreAction} from './../../app/app-core/store/core/action.enum'
import {AppState} from './../../app/app-core/store/core/app.state'
import {Store} from '@ngrx/store'
import {catchError, EMPTY, finalize, Observable, tap} from 'rxjs'
import {Injectable} from '@angular/core'
import {LoadingTypeEnum} from '@digital_brand_work/states/store/enums/loading-type.enum'
import {LoadingStateEnum} from '@digital_brand_work/states/store/enums/loading-state.enum'

@Injectable({providedIn: 'root'})
export class StoreLoaderService {
    constructor(public _store: Store<AppState>) {}

    load(loadData: {
        state: keyof typeof StoreAction
        loading: LoadingState
    }): void {
        const {state, loading} = loadData

        /*
            Dynamically Calling State Loader 
        */
        this._store.dispatch(
            StoreAction[state as any].SYSTEM.setLoader({loading}),
        )
    }

    initializeLoader(
        state: keyof typeof StoreAction,
        type: LoadingTypeEnum,
    ): void {
        this.load({
            state: state,
            loading: {
                state: LoadingStateEnum.LOADING,
                type: type,
            },
        })
    }

    addLoadingState(
        state: keyof typeof StoreAction,
        type: LoadingTypeEnum,
    ): <T>(source: Observable<T>) => Observable<T> {
        const store = this._store

        return function <T>(source: Observable<T>): Observable<T> {
            return new Observable((subscriber) => {
                const loader = new StoreLoaderService(store)

                source
                    .pipe(
                        tap(() =>
                            loader.load({
                                state,
                                loading: {
                                    type: type,
                                    state: LoadingStateEnum.SUCCEEDED,
                                },
                            }),
                        ),
                        catchError((error) => {
                            /*
                               Dispatch to a particular store when error occured
                            */
                            store.dispatch(
                                StoreAction[state as any].SYSTEM.onError({
                                    error: error,
                                }),
                            )

                            loader.load({
                                state,
                                loading: {
                                    type: type,
                                    state: LoadingStateEnum.FAILED,
                                },
                            })
                            return EMPTY
                        }),
                        finalize(() =>
                            setTimeout(() => {
                                loader.load({
                                    state,
                                    loading: {
                                        type: type,
                                        state: LoadingStateEnum.IDLE,
                                    },
                                })
                            }, 500),
                        ),
                    )

                    .subscribe({
                        next(value) {
                            if (value !== undefined && value !== null) {
                                subscriber.next(value)
                            }
                        },
                        error(error) {
                            subscriber.error(error)
                        },
                        complete() {
                            subscriber.complete()
                        },
                    })
            })
        }
    }
}

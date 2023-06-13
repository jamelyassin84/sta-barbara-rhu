import {Injectable} from '@angular/core'
import {Action, ActionCreatorProps, Store, createReducer} from '@ngrx/store'
import {Observable} from 'rxjs'
import {baseActions} from './bases/base-actions'
import {baseReducers} from './bases/base-reducer'

@Injectable({providedIn: 'root'})
export abstract class BaseStore<TState> {
    private actions: ReturnType<typeof baseActions<TState>>
    protected abstract readonly initialState: TState
    protected reducer: (state: TState | undefined, action: Action) => TState

    protected constructor(
        protected _name: string,
        protected _store: Store<TState>,
    ) {}

    protected dispatch(action: Action): void {
        this._store.dispatch(action)
    }

    protected select<R>(selector: (state: TState) => R): Observable<R> {
        return this._store.select(selector)
    }

    protected createBaseActions<TPayload>(
        props: ActionCreatorProps<TPayload>,
    ): any {
        this.actions = baseActions<TState>(this._name)
        return this.actions
    }

    protected createBaseReducer(): any {
        return baseReducers<TState>(this.actions)
    }

    protected initialize(): void {
        this.reducer = createReducer(this.initialState)
        this.setupReducer()
    }

    protected abstract setupReducer(): void
}

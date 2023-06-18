import {switchMap, map} from 'rxjs'
import {Injectable} from '@angular/core'
import {StoreAction} from '../../core/action.enum'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {RHUUserService} from './users.service'

@Injectable({
    providedIn: 'root',
})
export class UserEffects {
    constructor(
        private _actions$: Actions,
        private _RHUUserService: RHUUserService,
    ) {}

    get$ = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreAction.USERS.load.request),
            switchMap(() =>
                this._RHUUserService.get().pipe(
                    map((response) =>
                        StoreAction.USERS.load.onSuccess({
                            users: response,
                        }),
                    ),
                ),
            ),
        ),
    )

    add$ = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreAction.USERS.upsert.request),
            switchMap((action) =>
                this._RHUUserService.add(action.user).pipe(
                    map((response) =>
                        StoreAction.USERS.upsert.onSuccess({
                            user: response,
                        }),
                    ),
                ),
            ),
        ),
    )

    remove$ = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreAction.USERS.remove.request),
            switchMap((action) =>
                this._RHUUserService.remove(action.id).pipe(
                    map((response) =>
                        StoreAction.USERS.remove.onSuccess({
                            id: response,
                        }),
                    ),
                ),
            ),
        ),
    )
}

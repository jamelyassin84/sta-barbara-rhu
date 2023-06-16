import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {switchMap, map, tap} from 'rxjs/operators'
import {StoreAction} from '../../core/action.enum'
import {AnalyticsService} from './analytics.service'

@Injectable({
    providedIn: 'root',
})
export class AnalyticsEffects {
    constructor(
        private _actions$: Actions,
        private _analyticsService: AnalyticsService,
    ) {}

    get$ = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreAction.ANALYTICS.load.request),
            switchMap(() =>
                this._analyticsService.get().pipe(
                    map((response) =>
                        StoreAction.ANALYTICS.load.onSuccess({
                            analytics: [response],
                        }),
                    ),
                ),
            ),
        ),
    )
}

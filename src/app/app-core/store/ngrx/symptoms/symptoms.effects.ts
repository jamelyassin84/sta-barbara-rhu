import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {switchMap, map} from 'rxjs/operators'
import {StoreAction} from '../../core/action.enum'
import {SymptomsService} from './symptoms.service'

@Injectable({
    providedIn: 'root',
})
export class SymptomsEffects {
    constructor(
        private _actions$: Actions,
        private _symptomsService: SymptomsService,
    ) {}

    get$ = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreAction.SYMPTOMS.load.request),
            switchMap((action) =>
                this._symptomsService.get(action.param).pipe(
                    map((response) =>
                        StoreAction.SYMPTOMS.load.onSuccess({
                            symptoms: response,
                        }),
                    ),
                ),
            ),
        ),
    )
}

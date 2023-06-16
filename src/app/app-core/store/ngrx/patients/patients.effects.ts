import {switchMap, map} from 'rxjs'
import {Injectable} from '@angular/core'
import {PatientService} from './patients.service'
import {StoreAction} from '../../core/action.enum'
import {Actions, createEffect, ofType} from '@ngrx/effects'
@Injectable({
    providedIn: 'root',
})
export class PatientEffects {
    constructor(
        private _actions$: Actions,
        private _patientService: PatientService,
    ) {}

    get$ = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreAction.PATIENTS.load.request),
            switchMap(() =>
                this._patientService.get().pipe(
                    map((response) =>
                        StoreAction.PATIENTS.load.onSuccess({
                            patients: response,
                        }),
                    ),
                ),
            ),
        ),
    )
}

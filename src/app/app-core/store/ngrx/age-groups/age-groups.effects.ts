import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {switchMap, map} from 'rxjs/operators'
import {StoreAction} from '../../core/action.enum'
import {AgeGroupService} from './age-groups.service'

@Injectable({
    providedIn: 'root',
})
export class AgeGroupEffects {
    constructor(
        private _actions$: Actions,
        private _ageGroupService: AgeGroupService,
    ) {}

    get$ = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreAction.AGE_GROUP.load.request),
            switchMap((action) =>
                this._ageGroupService.get(action.param).pipe(
                    map((response) =>
                        StoreAction.AGE_GROUP.load.onSuccess({
                            ageGroups: response,
                        }),
                    ),
                ),
            ),
        ),
    )
}

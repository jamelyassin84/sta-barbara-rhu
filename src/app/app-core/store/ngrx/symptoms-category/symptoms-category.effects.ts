import {switchMap, map} from 'rxjs'
import {Injectable} from '@angular/core'
import {StoreAction} from '../../core/action.enum'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {SymptomsCategoryService} from './symptoms-category.service'

@Injectable({
    providedIn: 'root',
})
export class SymptomsCategoryEffects {
    constructor(
        private _actions$: Actions,
        private _symptomsCategoryService: SymptomsCategoryService,
    ) {}

    get$ = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreAction.SYMPTOMS_CATEGORIES.load.request),
            switchMap(() =>
                this._symptomsCategoryService.get().pipe(
                    map((response) =>
                        StoreAction.SYMPTOMS_CATEGORIES.load.onSuccess({
                            symptomCategories: response,
                        }),
                    ),
                ),
            ),
        ),
    )

    add$ = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreAction.SYMPTOMS_CATEGORIES.upsert.request),
            switchMap((action) =>
                this._symptomsCategoryService.add(action.symptomCategory).pipe(
                    map((response) =>
                        StoreAction.SYMPTOMS_CATEGORIES.upsert.onSuccess({
                            symptomCategory: response,
                        }),
                    ),
                ),
            ),
        ),
    )

    remove$ = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreAction.SYMPTOMS_CATEGORIES.remove.request),
            switchMap((action) =>
                this._symptomsCategoryService.remove(action.id).pipe(
                    map((response) =>
                        StoreAction.SYMPTOMS_CATEGORIES.remove.onSuccess({
                            id: response,
                        }),
                    ),
                ),
            ),
        ),
    )
}

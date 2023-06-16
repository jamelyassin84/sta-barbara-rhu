import {Injectable} from '@angular/core'
import {Actions} from '@ngrx/effects'

@Injectable({
    providedIn: 'root',
})
export class AssessmentEffects {
    constructor(private _actions$: Actions) {}
}

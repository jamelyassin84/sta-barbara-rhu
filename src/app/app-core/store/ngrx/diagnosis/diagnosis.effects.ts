import {Injectable} from '@angular/core'
import {Actions} from '@ngrx/effects'

@Injectable({
    providedIn: 'root',
})
export class DiagnosisEffects {
    constructor(private _actions$: Actions) {}
}

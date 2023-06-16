import {Component} from '@angular/core'
import {ActivatedRoute} from '@angular/router'
import {StoreSelect} from '@fuse/decorators/ngrx-selector.decorator'
import {Store} from '@ngrx/store'
import {Patient} from 'app/app-core/models/patient.model'
import {StoreAction} from 'app/app-core/store/core/action.enum'
import {AppState} from 'app/app-core/store/core/app.state'
import {getPatient} from 'app/app-core/store/ngrx/patients/patients.selectors'
import {Observable, take} from 'rxjs'

@Component({
    selector: 'patient-details',
    templateUrl: './patient-details.component.html',
    styleUrls: ['./patient-details.component.scss'],
})
export class PatientDetailsComponent {
    constructor(
        private _store: Store<AppState>,
        private _route: ActivatedRoute,
    ) {}

    @StoreSelect(getPatient)
    readonly patient$: Observable<Patient>

    ngOnInit(): void {
        this._route.paramMap.pipe(take(1)).subscribe((param) => {
            const id = param.get('id')

            this._store.dispatch(StoreAction.PATIENTS.show.request({id: id}))
        })
    }
}

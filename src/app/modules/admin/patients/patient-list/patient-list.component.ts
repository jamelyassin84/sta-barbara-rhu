import {Component, Input} from '@angular/core'
import {dbwAnimations} from '@digital_brand_work/animations/animation.api'
import {StoreLoaders} from '@digital_brand_work/states/store/models/loader.model'
import {StoreSelect} from '@fuse/decorators/ngrx-selector.decorator'
import {Store} from '@ngrx/store'
import {Patient} from 'app/app-core/models/patient.model'
import {AppState} from 'app/app-core/store/core/app.state'
import {patientLoaders} from 'app/app-core/store/ngrx/patients/patients.selectors'
import {Observable} from 'rxjs'

@Component({
    selector: 'patient-list',
    templateUrl: './patient-list.component.html',
    animations: [...dbwAnimations],
})
export class PatientListComponent {
    constructor(private _store: Store<AppState>) {}

    @StoreSelect(patientLoaders)
    readonly loader$: Observable<StoreLoaders>

    @Input({required: true})
    patients: Patient[]
}

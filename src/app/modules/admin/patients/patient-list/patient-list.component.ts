import {Component, Input} from '@angular/core'
import {Store} from '@ngrx/store'
import {Patient} from 'app/app-core/models/patient.model'
import {AppState} from 'app/app-core/store/core/app.state'

@Component({
    selector: 'patient-list',
    templateUrl: './patient-list.component.html',
    styleUrls: ['./patient-list.component.scss'],
})
export class PatientListComponent {
    constructor(private _store: Store<AppState>) {}

    @Input({required: true})
    patients: Patient[]
}

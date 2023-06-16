import {Component} from '@angular/core'
import {State} from '@digital_brand_work/decorators/ngrx-state.decorator'
import {Store} from '@ngrx/store'
import {RHUEnum} from 'app/app-core/enums/rhu.enum'
import {Patient} from 'app/app-core/models/patient.model'
import {AppState} from 'app/app-core/store/core/app.state'
import {StateEnum} from 'app/app-core/store/core/state.enum'
import {Observable} from 'rxjs'

@Component({
    selector: 'patients',
    templateUrl: './patients.component.html',
    styleUrls: ['./patients.component.scss'],
})
export class PatientsComponent {
    constructor(private _store: Store<AppState>) {}

    @State({selector: StateEnum.PATIENTS, type: 'array'})
    readonly patients$: Observable<Patient[]>

    readonly RHU = Object.values(RHUEnum)

    currentRHU = this.RHU[0]

    keyword: string
}

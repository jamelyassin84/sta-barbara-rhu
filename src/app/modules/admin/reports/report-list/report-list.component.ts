import {Component, Input} from '@angular/core'
import {dbwAnimations} from '@digital_brand_work/animations/animation.api'
import {State} from '@digital_brand_work/decorators/ngrx-state.decorator'
import {StoreLoaders} from '@digital_brand_work/states/store/models/loader.model'
import {StoreSelect} from '@fuse/decorators/ngrx-selector.decorator'
import {Store} from '@ngrx/store'
import {AgeGroup} from 'app/app-core/models/age-group.model'
import {Patient} from 'app/app-core/models/patient.model'
import {AppState} from 'app/app-core/store/core/app.state'
import {StateEnum} from 'app/app-core/store/core/state.enum'
import {ageGroupLoaders} from 'app/app-core/store/ngrx/age-groups/age-groups.selectors'
import {Observable} from 'rxjs'

@Component({
    selector: 'report-list',
    templateUrl: './report-list.component.html',
    animations: [...dbwAnimations],
})
export class ReportListComponent {
    constructor(private _store: Store<AppState>) {}

    @State({selector: StateEnum.PATIENTS, type: 'array'})
    readonly patients$: Observable<Patient[]>

    @StoreSelect(ageGroupLoaders)
    readonly loader$: Observable<StoreLoaders>

    @Input({required: true})
    ageGroups: AgeGroup[]

    @Input({required: true})
    ready: boolean = false
}

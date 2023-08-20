import {Component, Input} from '@angular/core'
import {StoreSelect} from '@fuse/decorators/ngrx-selector.decorator'
import {StoreLoaders} from '@digital_brand_work/states/store/models/loader.model'
import {Observable} from 'rxjs'
import {Symptoms} from 'app/app-core/models/symptoms.model'
import {symptomsLoaders} from 'app/app-core/store/ngrx/symptoms/symptoms.selectors'
import {dbwAnimations} from '@digital_brand_work/animations/animation.api'
@Component({
    selector: 'symptoms-list',
    templateUrl: './symptoms-list.component.html',
    animations: [...dbwAnimations],
})
export class SymptomsListComponent {
    @StoreSelect(symptomsLoaders)
    readonly loader$: Observable<StoreLoaders>

    @Input({required: true})
    symptoms: Symptoms[]

    @Input({required: true})
    ready: boolean = false
}

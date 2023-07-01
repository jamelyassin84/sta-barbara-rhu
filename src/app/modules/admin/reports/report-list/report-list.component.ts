import {Component, Input} from '@angular/core'
import {dbwAnimations} from '@digital_brand_work/animations/animation.api'
import {AgeGroup} from 'app/app-core/models/age-group.model'

@Component({
    selector: 'report-list',
    templateUrl: './report-list.component.html',
    animations: [...dbwAnimations],
})
export class ReportListComponent {
    @Input({required: true})
    ageGroups: AgeGroup[]
}

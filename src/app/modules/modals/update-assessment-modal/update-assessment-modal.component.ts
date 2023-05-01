import {Component} from '@angular/core'
import {UpdateAssessmentModal} from './update-assessment-modal.service'
import {dbwAnimations} from '@digital_brand_work/animations/animation.api'

@Component({
    selector: 'update-assessment-modal',
    templateUrl: './update-assessment-modal.component.html',
    styleUrls: ['./update-assessment-modal.component.scss'],
    animations: [...dbwAnimations],
})
export class UpdateAssessmentModalComponent {
    constructor(private _updateAssessmentModal: UpdateAssessmentModal) {}

    opened$ = this._updateAssessmentModal.opened$
}

import {Component} from '@angular/core'
import {UpdateDiagnosisModal} from './update-diagnosis-modal.service'
import {dbwAnimations} from '@digital_brand_work/animations/animation.api'

@Component({
    selector: 'update-diagnosis-modal',
    templateUrl: './update-diagnosis-modal.component.html',
    styleUrls: ['./update-diagnosis-modal.component.scss'],
    animations: [...dbwAnimations],
})
export class UpdateDiagnosisModalComponent {
    constructor(private _updateDiagnosisModal: UpdateDiagnosisModal) {}

    opened$ = this._updateDiagnosisModal.opened$
}

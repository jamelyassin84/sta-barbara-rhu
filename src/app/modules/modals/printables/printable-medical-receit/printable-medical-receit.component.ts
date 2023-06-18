import {Component} from '@angular/core'
import {dbwAnimations} from '@digital_brand_work/animations/animation.api'
import {PrintableMedicalReceit} from './printable-medical-receit.service'
import dayjs from 'dayjs'

@Component({
    selector: 'printable-medical-receit',
    templateUrl: './printable-medical-receit.component.html',
    animations: [...dbwAnimations],
})
export class PrintableMedicalReceitComponent {
    constructor(private _printableMedicalReceit: PrintableMedicalReceit) {}

    appointment$ = this._printableMedicalReceit.appointment$

    today = dayjs()

    updateFormattedContent(content: any) {
        return content.replace(/\n/g, '<br>')
    }
}

import {Component} from '@angular/core'
import {dbwAnimations} from '@digital_brand_work/animations/animation.api'
import {PrintableMedicalReceit} from './printable-medical-receit.service'

@Component({
    selector: 'printable-medical-receit',
    templateUrl: './printable-medical-receit.component.html',
    animations: [...dbwAnimations],
})
export class PrintableMedicalReceitComponent {
    constructor(private _printableMedicalReceit: PrintableMedicalReceit) {}
}

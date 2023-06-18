import {Component} from '@angular/core'
import {dbwAnimations} from '@digital_brand_work/animations/animation.api'
import {PrintableMedicalCertificate} from './printable-medical-certificate.service'

@Component({
    selector: 'printable-medical-certificate',
    templateUrl: './printable-medical-certificate.component.html',
    animations: [...dbwAnimations],
})
export class PrintableMedicalCertificateComponent {
    constructor(
        private _printableMedicalCertificate: PrintableMedicalCertificate,
    ) {}
}

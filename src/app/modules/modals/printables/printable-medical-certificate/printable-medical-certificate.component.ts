import {Component} from '@angular/core'
import {dbwAnimations} from '@digital_brand_work/animations/animation.api'
import {PrintableMedicalCertificate} from './printable-medical-certificate.service'
import dayjs from 'dayjs'

@Component({
    selector: 'printable-medical-certificate',
    templateUrl: './printable-medical-certificate.component.html',
    animations: [...dbwAnimations],
})
export class PrintableMedicalCertificateComponent {
    constructor(
        private _printableMedicalCertificate: PrintableMedicalCertificate,
    ) {}

    licenseNumber: string = 'N/A'

    appointment$ = this._printableMedicalCertificate.appointment$

    today = dayjs()

    ngOnInit(): void {
        this.addLicenseNumber()
    }

    addLicenseNumber() {
        const license = prompt('Please enter your license number')

        if (license) {
            this.licenseNumber = license
        }
    }
}

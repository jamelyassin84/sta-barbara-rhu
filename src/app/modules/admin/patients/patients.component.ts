import {Component} from '@angular/core'
import {RHUEnum} from 'app/app-core/enums/rhu.enum'

@Component({
    selector: 'patients',
    templateUrl: './patients.component.html',
    styleUrls: ['./patients.component.scss'],
})
export class PatientsComponent {
    RHU = Object.values(RHUEnum)

    currentRHU = this.RHU[0]
}

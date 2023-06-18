import {Component} from '@angular/core'
import {dbwAnimations} from '@digital_brand_work/animations/animation.api'
import {PrintableMedicoLegal} from './printable-medico-legal.service'

@Component({
    selector: 'printable-medico-legal',
    templateUrl: './printable-medico-legal.component.html',
    animations: [...dbwAnimations],
})
export class PrintableMedicoLegalComponent {
    constructor(private _printableMedicoLegal: PrintableMedicoLegal) {}

    appointment$ = this._printableMedicoLegal.appointment$

    updateFormattedContent(content: any) {
        return content.replace(/\n/g, '<br>')
    }
}

import {FormGroup, ControlContainer} from '@angular/forms'
import {Component, OnInit} from '@angular/core'
import {dbwAnimations} from '@digital_brand_work/animations/animation.api'

@Component({
    templateUrl: './card-form-field.component.html',
    animations: [...dbwAnimations],
})
export class CardFormFieldComponent implements OnInit {
    public form: FormGroup

    constructor(private _controlContainer: ControlContainer) {}

    ngOnInit(): void {
        this.form = <FormGroup>this._controlContainer.control
    }
}

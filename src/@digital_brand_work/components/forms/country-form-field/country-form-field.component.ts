import {FormGroup, ControlContainer} from '@angular/forms'
import {Component, OnInit, Input} from '@angular/core'
import {countryWithISO} from '@digital_brand_work/constants/countries/country-with-iso'
import {dbwAnimations} from '@digital_brand_work/animations/animation.api'

@Component({
    selector: 'country-form-field',
    templateUrl: './country-form-field.component.html',
    animations: [...dbwAnimations],
})
export class CountryFormFieldComponent implements OnInit {
    constructor(private _controlContainer: ControlContainer) {}

    readonly COUNTRIES = countryWithISO

    @Input()
    form?: FormGroup

    @Input()
    name?: string

    @Input()
    placeholder: string = ''

    ngOnInit(): void {
        this.form = <FormGroup>this._controlContainer.control
    }

    trackByFn(index: number, item: any): any {
        return item.id || index
    }
}

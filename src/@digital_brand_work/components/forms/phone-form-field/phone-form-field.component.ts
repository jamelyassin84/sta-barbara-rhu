import {FormGroup, ControlContainer} from '@angular/forms'
import {Component, OnInit, Input} from '@angular/core'
import {countryWithISO} from '@digital_brand_work/constants/countries/country-with-iso'
import {countryWithDialCode} from '@digital_brand_work/constants/countries/country-with-dial-code'
import {dbwAnimations} from '@digital_brand_work/animations/animation.api'

@Component({
    selector: 'phone-form-field',
    templateUrl: './phone-form-field.component.html',
    animations: [...dbwAnimations],
})
export class PhoneFormFieldComponent implements OnInit {
    constructor(private _controlContainer: ControlContainer) {}

    readonly COUNTRIES = countryWithISO

    @Input()
    form?: FormGroup

    @Input()
    placeholder: string = ''

    @Input()
    name?: string

    countryISO: string = 'AE'

    ngOnInit(): void {
        this.form = <FormGroup>this._controlContainer.control

        const phone = this.form.get(this.name)?.value

        if (phone === null || !phone.toString().includes('+')) {
            this.changeFlag('United Arab Emirates')
        }
    }

    changeFlag(country: string) {
        const iso = countryWithISO.find((oldCountry) => {
            return oldCountry.name === (country as any)
        })

        if (iso) {
            this.countryISO = (iso['alpha-2'] ?? 'AE').toLocaleLowerCase()

            const country = countryWithDialCode.find(
                (country) =>
                    country.code.toLocaleLowerCase() ===
                    this.countryISO.toLocaleLowerCase(),
            )

            if (country) {
                this.form.get(this.name)?.setValue(`${country.dial_code}`)
            }
        }
    }

    trackByFn(index: number, item: any): any {
        return item.id || index
    }
}

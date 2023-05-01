import {countryWithDialCode} from './../constants/countries/country-with-dial-code'

import {Pipe, PipeTransform} from '@angular/core'

@Pipe({name: 'phone_to_country_code'})
export class PhoneToCountryCodePipe implements PipeTransform {
    transform(phone: string): string {
        return phone_to_country_code(phone)
    }
}

export function phone_to_country_code(phone: string): string {
    const country = countryWithDialCode.find((country) =>
        phone
            .toLocaleLowerCase()
            .includes(country.dial_code.toLocaleLowerCase()),
    )

    if (country) {
        return country.code.toLocaleLowerCase()
    }

    return undefined
}

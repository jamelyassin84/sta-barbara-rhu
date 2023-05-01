import {Pipe, PipeTransform} from '@angular/core'
import {countryWithISO} from '@digital_brand_work/constants/countries/country-with-iso'

@Pipe({name: 'to_alpha_3'})
export class ToAlphaThreePipe implements PipeTransform {
    transform(iso: string): string {
        return to_alpha_3(iso)
    }
}

export function to_alpha_3(iso: string): string {
    return countryWithISO.find((country) => country['alpha-2'] === iso)[
        'alpha-3'
    ]
}

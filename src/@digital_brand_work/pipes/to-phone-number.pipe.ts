import {countryWithDialCode} from '@digital_brand_work/constants/countries/country-with-dial-code'

export function to_phone_number(countryCode: string, phone: string): string {
    const dialCode = countryWithDialCode.find(
        (country) => country.code === countryCode,
    ).dial_code

    let trimmed = phone.split('')

    if (trimmed[0] === '0') {
        trimmed.shift()
    }

    return dialCode + trimmed.join('').replace(/-/g, '')
}

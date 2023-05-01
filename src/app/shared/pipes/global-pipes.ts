import {AgePipe} from '@digital_brand_work/pipes/age.pipe'
import {AppendCountryCodePipe} from '@digital_brand_work/pipes/append-country-code.pipe'
import {AppendTaxPipe} from '@digital_brand_work/pipes/append-tax.pipe'
import {DayIntervalPipe} from '@digital_brand_work/pipes/day-interval.count.pipe'
import {DeductTaxPipe} from '@digital_brand_work/pipes/deduct-tax.pipe'
import {EntitiesPipe} from '@digital_brand_work/pipes/entity.pipe'
import {IsEvenPipe} from '@digital_brand_work/pipes/even.pipe'
import {FilterByDatePipe} from '@digital_brand_work/pipes/filterBy.pipe'
import {ToTimeIntervalPipe} from '@digital_brand_work/pipes/get-times.pipe'
import {HasDataPipe} from '@digital_brand_work/pipes/has-data.pipe'
import {HasDecimalPipe} from '@digital_brand_work/pipes/has.decimal.pipe'
import {InitialsPipe} from '@digital_brand_work/pipes/initials.pipe'
import {IsEmptyPipe} from '@digital_brand_work/pipes/is-empty.pipe'
import {ItemLengthPipe} from '@digital_brand_work/pipes/item.length.pipe'
import {KeywordFilterPipe} from '@digital_brand_work/pipes/keyword.filter.pipe'
import {LimitByPipe} from '@digital_brand_work/pipes/limit-by.pipe'
import {LoopUntilPipe} from '@digital_brand_work/pipes/loop-until.pipe'
import {NumberToArrayPipe} from '@digital_brand_work/pipes/number-to-array.pipe'
import {PhoneToCountryCodePipe} from '@digital_brand_work/pipes/phone-to-country-code.pipe'
import {RemoveWhiteSpaceAndDashPipe} from '@digital_brand_work/pipes/remove-white-space-and-dash.pipe'
import {ShortenPipe} from '@digital_brand_work/pipes/shorten.day.pipe'
import {SingleEntityPipe} from '@digital_brand_work/pipes/single-entity.pipe'
import {SlugToSentencePipe} from '@digital_brand_work/pipes/slug-to-sentence.pipe'
import {SortByPipe} from '@digital_brand_work/pipes/sort-by.pipe'
import {TableFilterPipe} from '@digital_brand_work/pipes/table.filter.pipe'
import {TimePipe} from '@digital_brand_work/pipes/time.pipe'
import {ToAlphaThreePipe} from '@digital_brand_work/pipes/to-alpha-three.pipe'
import {ToCardImagePIpe} from '@digital_brand_work/pipes/to-card-image.pipe'
import {ToFixedTwoPipe} from '@digital_brand_work/pipes/to-fixed-two.pipe'
import {ToFlagPipe} from '@digital_brand_work/pipes/to-flag.pipe'
import {ToSlugPipe} from '@digital_brand_work/pipes/to-slug.pipe'
import {ToTimeAgoPipe} from '@digital_brand_work/pipes/to-time-ago.pipe'
import {ToUpperCamelCasePipe} from '@digital_brand_work/pipes/to-upper-camel-case.pipe'
import {TwentyFourToTwelveHoursPipe} from '@digital_brand_work/pipes/twenty-four-to-twelve.hours.pipe'

export const globalPipes = [
    AgePipe,
    TimePipe,
    SortByPipe,
    ToFlagPipe,
    ToSlugPipe,
    IsEvenPipe,
    ShortenPipe,
    LimitByPipe,
    IsEmptyPipe,
    HasDataPipe,
    EntitiesPipe,
    InitialsPipe,
    DeductTaxPipe,
    AppendTaxPipe,
    HasDecimalPipe,
    ItemLengthPipe,
    AppendTaxPipe,
    ToFixedTwoPipe,
    ToCardImagePIpe,
    DayIntervalPipe,
    TableFilterPipe,
    ToAlphaThreePipe,
    FilterByDatePipe,
    SingleEntityPipe,
    NumberToArrayPipe,
    KeywordFilterPipe,
    ToTimeIntervalPipe,
    SlugToSentencePipe,
    AppendCountryCodePipe,
    LoopUntilPipe,
    RemoveWhiteSpaceAndDashPipe,
    TwentyFourToTwelveHoursPipe,
    PhoneToCountryCodePipe,
    ToTimeAgoPipe,
    ToUpperCamelCasePipe,
]

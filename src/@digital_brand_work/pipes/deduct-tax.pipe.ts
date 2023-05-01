import {Pipe, PipeTransform} from '@angular/core'

@Pipe({name: 'deduct_tax', pure: true})
export class DeductTaxPipe implements PipeTransform {
    transform(price: number, tax: number = 0.05): number {
        return deduct_tax(price, tax)
    }
}

export function deduct_tax(price: number, tax: number = 0.05): number {
    if (!price) {
        return 0
    }

    return price / (1 + tax)
}

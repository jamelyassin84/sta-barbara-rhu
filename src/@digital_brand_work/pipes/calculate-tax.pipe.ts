import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'calculate_tax' })
export class CalculateTaxPipe implements PipeTransform {
    transform(price: number, tax: number = 0.05): number {
        return calculate_tax(price, tax);
    }
}

export function calculate_tax(price: number, tax: number = 0.05): number {
    return parseFloat((price * tax).toFixed(2));
}

import { Pipe, PipeTransform } from '@angular/core';
import { calculate_tax } from './calculate-tax.pipe';

@Pipe({ name: 'append_tax', pure: true })
export class AppendTaxPipe implements PipeTransform {
    transform(value: number): number {
        return append_tax(value);
    }
}

export function append_tax(value: number): number {
    return calculate_tax(value) + value;
}

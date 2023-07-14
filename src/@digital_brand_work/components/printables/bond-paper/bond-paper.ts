import {Component, Input} from '@angular/core'

@Component({
    selector: 'bond-paper',
    templateUrl: './bond-paper.html',
})
export class BondPaperComponent {
    @Input({required: true})
    size: 'A4' | 'long' | 'short' | 'half-short' | 'quarter-short'

    @Input()
    template: any

    getPaperClass(): any {
        return {
            'bg-red-200': ![
                'A4',
                'long',
                'short',
                'half-short',
                'quarter-short',
            ].includes(this.size),
        }
    }
}

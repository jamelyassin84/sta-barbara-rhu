import {Component, Input} from '@angular/core'

@Component({
    selector: 'bond-paper',
    template: `
        <div
            style="font-family: Inter !important;"
            class="bg-white drop-shadow-2xl border  w-[21.59cm] h-[27.94cm] scale-[0.74] origin-top overflow-hidden print:w-full print:h-full print:shadow-none print:drop-shadow-none'"
        >
            <div [ngTemplateOutlet]="template"></div>
        </div>
    `,
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

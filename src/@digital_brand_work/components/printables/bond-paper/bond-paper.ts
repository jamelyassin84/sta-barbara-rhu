import {Component, Input} from '@angular/core'

@Component({
    selector: 'bond-paper',
    template: `
        <div
            [ngTemplateOutlet]="template"
            class="bg-white drop-shadow-2xl border  w-[21.59cm] h-[27.94cm] scale-[0.94] origin-bottom overflow-hidden'"
        ></div>
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

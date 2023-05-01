import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {dbwAnimations} from '@digital_brand_work/animations/animation.api'
import {NodePaginationMeta} from '@digital_brand_work/models/core.model'

@Component({
    selector: 'pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss'],
    animations: [...dbwAnimations],
})
export class PaginationComponent implements OnInit {
    constructor() {}

    @Output()
    onPageChange = new EventEmitter<string>()

    @Input()
    table?: NodePaginationMeta

    ngOnInit(): void {}

    trackByFn(index: number, item: any): any {
        return item.id || index
    }
}

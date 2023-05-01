import {Injectable} from '@angular/core'
import {NodePaginationMeta} from '@digital_brand_work/models/core.model'
import {BehaviorSubject} from 'rxjs'

@Injectable({providedIn: 'root'})
export class PaginationService {
    constructor() {}

    pagination$: BehaviorSubject<NodePaginationMeta | null> =
        new BehaviorSubject(null)
}

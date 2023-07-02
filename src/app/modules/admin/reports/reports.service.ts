import {Injectable} from '@angular/core'
import {BehaviorSubject} from 'rxjs'

@Injectable({providedIn: 'root'})
export class ReportService {
    filter$ = new BehaviorSubject<boolean>(true)
}

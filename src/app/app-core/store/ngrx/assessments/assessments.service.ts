import {Injectable} from '@angular/core'
import {Observable, map, tap} from 'rxjs'
import {Loader} from '@fuse/decorators/loader.decorator'
import {LoadingTypeEnum} from '@digital_brand_work/states/store/enums/loading-type.enum'
import {Assessment} from 'app/app-core/models/assessment.model'
import {Appointment} from 'app/app-core/models/appointment.model'
import {Store} from '@ngrx/store'
import {AppState} from '../../core/app.state'
import {StoreLoaderService} from '@digital_brand_work/services/store-loader.service'
import {StateEnum} from '../../core/state.enum'
import {State} from '@digital_brand_work/decorators/ngrx-state.decorator'

@Injectable({providedIn: 'root'})
export class AssessmentService {
    constructor(
        private _store: Store<AppState>,
        private _storeLoaderService: StoreLoaderService,
    ) {}

    @State({selector: StateEnum.APPOINTMENTS, type: 'array'})
    appointments$: Observable<Appointment[]>

    @Loader({state: 'ASSESSMENTS', loading: LoadingTypeEnum.GET})
    get(appointment: Appointment): Observable<Assessment> {
        return this.appointments$.pipe(
            map(
                (appointments) =>
                    appointments.find((a) => a.id === appointment.id)
                        .assessment,
            ),
        )
    }

    upsert(
        appointment: Appointment,
        assessment: Assessment,
    ): Observable<Assessment> {
        return this.appointments$.pipe(
            map(
                (appointments) =>
                    appointments.find((a) => a.id === appointment.id)
                        .assessment,
            ),
        )
    }
}

import {Injectable} from '@angular/core'
import {Observable, map, tap} from 'rxjs'
import {Loader} from '@fuse/decorators/loader.decorator'
import {LoadingTypeEnum} from '@digital_brand_work/states/store/enums/loading-type.enum'
import {Appointment} from 'app/app-core/models/appointment.model'
import {appointmentBaseSelectors} from '../appointments/appointments.selectors'
import {StoreSelect} from '@fuse/decorators/ngrx-selector.decorator'
import {Store} from '@ngrx/store'
import {AppState} from '../../core/app.state'
import {StoreLoaderService} from '@digital_brand_work/services/store-loader.service'
import {Diagnosis} from 'app/app-core/models/diagnosis.model'

@Injectable({providedIn: 'root'})
export class DiagnosisService {
    constructor(
        private _store: Store<AppState>,
        private _storeLoaderService: StoreLoaderService,
    ) {}

    @StoreSelect(appointmentBaseSelectors.selectAll)
    appointments$: Observable<Appointment[]>

    @Loader({state: 'ASSESSMENTS', loading: LoadingTypeEnum.GET})
    get(appointment: Appointment): Observable<Diagnosis> {
        return this.appointments$.pipe(
            map(
                (appointments) =>
                    appointments.find((a) => a.id === appointment.id).diagnosis,
            ),
        )
    }
}

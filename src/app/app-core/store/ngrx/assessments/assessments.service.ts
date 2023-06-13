import {Injectable} from '@angular/core'
import {AngularFirestore} from '@angular/fire/compat/firestore'
import {Observable, map, tap} from 'rxjs'
import {Patient} from 'app/app-core/models/patient.model'
import {Loader} from '@fuse/decorators/loader.decorator'
import {LoadingTypeEnum} from '@digital_brand_work/states/store/enums/loading-type.enum'
import {Assessment} from 'app/app-core/models/assessment.model'
import {Appointment} from 'app/app-core/models/appointment.model'
import {appointmentBaseSelectors} from '../appointments/appointments.selectors'
import {StoreSelect} from '@fuse/decorators/ngrx-selector.decorator'
import {Store} from '@ngrx/store'
import {AppState} from '../../core/app.state'
import {StoreLoaderService} from '@digital_brand_work/services/store-loader.service'

@Injectable({providedIn: 'root'})
export class AssessmentService {
    constructor(
        private _store: Store<AppState>,
        private _storeLoaderService: StoreLoaderService,
    ) {}

    @StoreSelect(appointmentBaseSelectors.selectAll)
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
}

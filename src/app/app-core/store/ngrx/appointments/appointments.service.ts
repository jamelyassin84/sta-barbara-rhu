import {Injectable} from '@angular/core'
import {Store} from '@ngrx/store'
import {Observable, map, tap} from 'rxjs'
import {AppState} from '../../core/app.state'
import {StoreSelect} from '@fuse/decorators/ngrx-selector.decorator'
import {patientsBaseSelectors} from '../patients/patients.selectors'
import {Patient} from 'app/app-core/models/patient.model'
import {StoreAction} from '../../core/action.enum'
import {Appointment} from 'app/app-core/models/appointment.model'
import dayjs from 'dayjs'
import {LoadingTypeEnum} from '@digital_brand_work/states/store/enums/loading-type.enum'
import {Loader} from '@fuse/decorators/loader.decorator'
import {StoreLoaderService} from '@digital_brand_work/services/store-loader.service'

@Injectable({providedIn: 'root'})
export class AssessmentService {
    constructor(
        private _store: Store<AppState>,
        private _storeLoaderService: StoreLoaderService,
    ) {}

    @StoreSelect(patientsBaseSelectors.selectAll)
    patients$: Observable<Patient[]>

    @Loader({state: 'APPOINTMENTS', loading: LoadingTypeEnum.GET})
    get(isToday: boolean = false): Observable<Appointment[]> {
        const today = dayjs().startOf('day')
        return this.patients$.pipe(
            tap((patients: Patient[]) => {
                if (patients.length) {
                    this._store.dispatch(StoreAction.PATIENTS.load.request())
                }
            }),
            map((patients) =>
                patients.reduce((acc, p) => {
                    return acc.concat(
                        p.appointments.filter(
                            (appointment) =>
                                dayjs(appointment.date).format('MM-DD-YY') ===
                                    today.format('MM-DD-YY') && isToday,
                        ),
                    )
                }, []),
            ),
        )
    }
}

import {Injectable} from '@angular/core'
import {AngularFirestore} from '@angular/fire/compat/firestore'
import {Store} from '@ngrx/store'
import {Observable, combineLatest, map, tap} from 'rxjs'
import {AppState} from '../../core/app.state'
import {Analytics} from 'app/app-core/models/analytics.model'
import {StoreSelect} from '@fuse/decorators/ngrx-selector.decorator'
import {patientsBaseSelectors} from '../patients/patients.selectors'
import {Patient} from 'app/app-core/models/patient.model'
import {StoreAction} from '../../core/action.enum'
import {appointmentBaseSelectors} from '../appointments/appointments.selectors'
import {Appointment} from 'app/app-core/models/appointment.model'
import {LoadingTypeEnum} from '@digital_brand_work/states/store/enums/loading-type.enum'
import {Loader} from '@fuse/decorators/loader.decorator'
import {StoreLoaderService} from '@digital_brand_work/services/store-loader.service'
import {empty} from '@digital_brand_work/pipes/is-empty.pipe'
import dayjs from 'dayjs'

@Injectable({providedIn: 'root'})
export class AnalyticsService {
    constructor(
        private _store: Store<AppState>,
        private _storeLoaderService: StoreLoaderService,
    ) {}

    @StoreSelect(patientsBaseSelectors.selectAll)
    patients$: Observable<Patient[]>

    @StoreSelect(appointmentBaseSelectors.selectAll)
    appointments$: Observable<Appointment[]>

    @Loader({state: 'ANALYTICS', loading: LoadingTypeEnum.GET})
    get(): Observable<Analytics> {
        const today = dayjs().startOf('day')

        return combineLatest([this.patients$, this.appointments$]).pipe(
            tap((results) => {
                const [patients, appointments] = results

                if (patients.length) {
                    this._store.dispatch(StoreAction.PATIENTS.load.request())
                }

                if (appointments.length) {
                    this._store.dispatch(
                        StoreAction.APPOINTMENTS.load.request(),
                    )
                }
            }),

            map((results) => {
                const [patients, appointments] = results

                return {
                    totalPatients: patients.length,
                    totalAppointments: appointments.length,
                    totalDiagnosis: appointments.reduce(
                        (acc, a) => acc + (empty(a.diagnosis) ? 0 : 1),
                        0,
                    ),
                    appointmentsToday: appointments.filter(
                        (appointment) =>
                            dayjs(appointment.date).format('MM-DD-YY') ===
                            today.format('MM-DD-YY'),
                    ).length,
                    diagnosisToday: appointments
                        .filter(
                            (appointment) =>
                                dayjs(appointment.date).format('MM-DD-YY') ===
                                today.format('MM-DD-YY'),
                        )
                        .reduce(
                            (acc, a) => acc + (empty(a.diagnosis) ? 0 : 1),
                            0,
                        ),
                }
            }),
        )
    }
}

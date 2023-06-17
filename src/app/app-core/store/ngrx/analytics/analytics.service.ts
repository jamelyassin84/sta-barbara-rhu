import {Injectable} from '@angular/core'
import {Store} from '@ngrx/store'
import {
    Observable,
    combineLatest,
    distinctUntilChanged,
    map,
    of,
    skip,
    switchMap,
    take,
    tap,
} from 'rxjs'
import {AppState} from '../../core/app.state'
import {Analytics} from 'app/app-core/models/analytics.model'
import {Patient} from 'app/app-core/models/patient.model'
import {StoreAction} from '../../core/action.enum'
import {Appointment} from 'app/app-core/models/appointment.model'
import {LoadingTypeEnum} from '@digital_brand_work/states/store/enums/loading-type.enum'
import {Loader} from '@fuse/decorators/loader.decorator'
import {StoreLoaderService} from '@digital_brand_work/services/store-loader.service'
import {empty} from '@digital_brand_work/pipes/is-empty.pipe'
import dayjs from 'dayjs'
import {StateEnum} from '../../core/state.enum'
import {State} from '@digital_brand_work/decorators/ngrx-state.decorator'
import * as uuid from 'uuid'

@Injectable({providedIn: 'root'})
export class AnalyticsService {
    constructor(
        private _store: Store<AppState>,
        private _storeLoaderService: StoreLoaderService,
    ) {}

    @State({selector: StateEnum.PATIENTS, type: 'array'})
    patients$: Observable<Patient[]>

    @Loader({state: 'ANALYTICS', loading: LoadingTypeEnum.GET})
    get(): Observable<Analytics> {
        const today = dayjs().startOf('day')

        return combineLatest([this.patients$, this.getAppointments()]).pipe(
            take(4),
            skip(3),
            distinctUntilChanged(),
            tap((results) => {
                const [patients, appointments] = results

                if (patients.length) {
                    this._store.dispatch(StoreAction.PATIENTS.load.request())
                }

                if (appointments.length) {
                    this._store.dispatch(
                        StoreAction.APPOINTMENTS.load.request({isToday: false}),
                    )
                }
            }),

            map((results) => {
                const [patients, appointments] = results

                const analytics = {
                    id: uuid.v4(),
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

                return analytics
            }),
        )
    }

    private getAppointments(): Observable<Appointment[]> {
        return this.patients$.pipe(
            take(1),
            map((patients: Patient[]) => {
                const filteredAppointments = patients.reduce(
                    (acc: Appointment[], patient: Patient) => {
                        return acc.concat(
                            ...patient.appointments.map((a) => ({
                                ...a,
                                patient: patient,
                            })),
                        )
                    },
                    [],
                )
                return filteredAppointments
            }),
        )
    }
}

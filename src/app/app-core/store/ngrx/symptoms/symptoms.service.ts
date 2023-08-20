import {Injectable} from '@angular/core'
import {Store} from '@ngrx/store'
import {Observable, combineLatest, map} from 'rxjs'
import {AppState} from '../../core/app.state'
import {LoadingTypeEnum} from '@digital_brand_work/states/store/enums/loading-type.enum'
import {Loader} from '@fuse/decorators/loader.decorator'
import {StoreLoaderService} from '@digital_brand_work/services/store-loader.service'
import {State} from '@digital_brand_work/decorators/ngrx-state.decorator'
import {StateEnum} from '../../core/state.enum'
import {Appointment} from 'app/app-core/models/appointment.model'
import {SymptomsParams} from 'app/app-core/api/params/symptoms-params'
import {Symptoms} from 'app/app-core/models/symptoms.model'
import dayjs from 'dayjs'
import {AngularFirestore} from '@angular/fire/compat/firestore'
import {SymptomsCategory} from 'app/app-core/models/symptoms-category.model'
import {CollectionEnum} from 'app/app-core/enums/collection.enum'
import * as uuid from 'uuid'

@Injectable({providedIn: 'root'})
export class SymptomsService {
    constructor(
        private _store: Store<AppState>,
        private _fireStore: AngularFirestore,
        private _storeLoaderService: StoreLoaderService,
    ) {}

    @State({selector: StateEnum.APPOINTMENTS, type: 'array'})
    appointment$: Observable<Appointment[]>

    @Loader({state: 'SYMPTOMS', loading: LoadingTypeEnum.GET})
    get(params: SymptomsParams): Observable<Symptoms[]> {
        return combineLatest([
            this.appointment$,
            this._fireStore
                .collection<SymptomsCategory>(
                    CollectionEnum.SYMPTOMS_CATEGORIES,
                )
                .valueChanges({idField: 'id'}),
        ]).pipe(
            map(([appointments, symptomsCategories]) => {
                const filteredAppointments = this.getFilteredAppointments(
                    appointments,
                    params,
                )

                let symptoms: Symptoms[] = []

                symptomsCategories.forEach((category) => {
                    symptoms.push({name: category.name, count: 0})
                })

                filteredAppointments.forEach((appointment) => {
                    if (appointment.assessment.symptomsCategory) {
                        const index = filteredAppointments.findIndex(
                            (a) =>
                                a.assessment.symptomsCategory ===
                                appointment.assessment.symptomsCategory,
                        )

                        if (index >= 0) {
                            symptoms[index].count += 1
                        }
                    }
                })

                return symptoms.map((s) => ({
                    ...s,
                    id: `symptoms-${uuid.v4()}`,
                }))
            }),
        )
    }

    private getFilteredAppointments(
        appointments: Appointment[],
        params: SymptomsParams,
    ): Appointment[] {
        return appointments.filter((appointment) => {
            const appointmentDate = dayjs(appointment.date).toDate()
            const startDate = params.startAt
                ? dayjs(params.startAt).toDate()
                : null
            const endDate = params.endAt ? dayjs(params.endAt).toDate() : null

            return appointmentDate >= startDate && appointmentDate <= endDate
        })
    }
}

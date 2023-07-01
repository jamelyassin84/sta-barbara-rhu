import {Injectable} from '@angular/core'
import {Store} from '@ngrx/store'
import {Observable, map, take} from 'rxjs'
import {AppState} from '../../core/app.state'
import {LoadingTypeEnum} from '@digital_brand_work/states/store/enums/loading-type.enum'
import {Loader} from '@fuse/decorators/loader.decorator'
import {StoreLoaderService} from '@digital_brand_work/services/store-loader.service'
import dayjs from 'dayjs'
import * as uuid from 'uuid'
import {State} from '@digital_brand_work/decorators/ngrx-state.decorator'
import {StateEnum} from '../../core/state.enum'
import {AgeGroup} from 'app/app-core/models/age-group.model'
import {AgeGroupParams} from 'app/app-core/api/params/age-group.params'
import {AgeGroupEnum} from 'app/app-core/enums/age-group.enum'
import {Appointment} from 'app/app-core/models/appointment.model'
import {age} from '@digital_brand_work/pipes/age.pipe'
import {SexEnum} from 'app/app-core/enums/sex.enum'

@Injectable({providedIn: 'root'})
export class AgeGroupService {
    constructor(
        private _store: Store<AppState>,
        private _storeLoaderService: StoreLoaderService,
    ) {}

    @State({selector: StateEnum.APPOINTMENTS, type: 'array'})
    appointment$: Observable<Appointment[]>

    @Loader({state: 'AGE_GROUP', loading: LoadingTypeEnum.GET})
    get(params: AgeGroupParams): Observable<AgeGroup[]> {
        return this.appointment$.pipe(
            take(1),
            map((appointments: Appointment[]) => {
                const filteredAppointments = this.getFilteredAppointments(
                    appointments,
                    params,
                )

                const ageGroups: AgeGroup[] = Object.values(AgeGroupEnum).map(
                    (bracket) => ({
                        id: uuid.v4(),
                        males: 0,
                        females: 0,
                        diagnosedMale: 0,
                        diagnosedFemale: 0,
                        totalPatients: 0,
                        totalDiagnosed: 0,
                        bracket: bracket,
                    }),
                )

                filteredAppointments.forEach((appointment) => {
                    const patientAge = age(appointment.patient.dob) // Assuming you have a function to calculate patient age

                    let ageGroup: AgeGroup | undefined

                    // ... switch cases to assign ageGroup ...

                    if (ageGroup) {
                        ageGroup.totalPatients++
                        if (appointment.patient.sex === SexEnum.MALE) {
                            ageGroup.males++
                        } else if (appointment.patient.sex === SexEnum.FEMALE) {
                            ageGroup.females++
                        }

                        if (appointment.diagnosis) {
                            ageGroup.totalDiagnosed++
                            if (appointment.patient.sex === SexEnum.MALE) {
                                ageGroup.diagnosedMale++
                            } else if (
                                appointment.patient.sex === SexEnum.FEMALE
                            ) {
                                ageGroup.diagnosedFemale++
                            }
                        }
                    }
                })

                const totals: AgeGroup = {
                    id: uuid.v4(),
                    males: ageGroups.reduce(
                        (sum, group) => sum + group.males,
                        0,
                    ),
                    females: ageGroups.reduce(
                        (sum, group) => sum + group.females,
                        0,
                    ),
                    diagnosedMale: ageGroups.reduce(
                        (sum, group) => sum + group.diagnosedMale,
                        0,
                    ),
                    diagnosedFemale: ageGroups.reduce(
                        (sum, group) => sum + group.diagnosedFemale,
                        0,
                    ),
                    totalPatients: ageGroups.reduce(
                        (sum, group) => sum + group.totalPatients,
                        0,
                    ),
                    totalDiagnosed: ageGroups.reduce(
                        (sum, group) => sum + group.totalDiagnosed,
                        0,
                    ),
                    bracket: 'Total' as any,
                }

                ageGroups.push(totals)

                return ageGroups
            }),
        )
    }

    private getFilteredAppointments(
        appointments: Appointment[],
        params: AgeGroupParams,
    ): Appointment[] {
        return appointments.filter((appointment) => {
            const appointmentDate = dayjs(appointment.date).toDate()
            const startDate = params.startAt
                ? dayjs(params.startAt).toDate()
                : null
            const endDate = params.endAt ? dayjs(params.endAt).toDate() : null

            if (startDate && endDate) {
                const isWithinDateRange =
                    appointmentDate >= startDate && appointmentDate <= endDate

                if (!params.keyword && !params.appointmentType) {
                    return isWithinDateRange
                }

                if (params.keyword && !params.appointmentType) {
                    const {first_name, last_name, middle_name} =
                        appointment.patient
                    const fullName = `${first_name} ${last_name} ${middle_name}`

                    const matchesKeyword = fullName
                        .toLowerCase()
                        .includes(params.keyword.toLowerCase())

                    return isWithinDateRange && matchesKeyword
                }

                if (!params.keyword && params.appointmentType) {
                    return (
                        isWithinDateRange &&
                        appointment.appointment_type === params.appointmentType
                    )
                }

                const matchesKeyword = appointment.diagnosis.diagnosis
                    .toLowerCase()
                    .includes(params.keyword.toLowerCase())

                return (
                    isWithinDateRange &&
                    matchesKeyword &&
                    appointment.appointment_type === params.appointmentType
                )
            }

            return true
        })
    }
}

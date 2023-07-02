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
import {empty} from '@digital_brand_work/pipes/is-empty.pipe'

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
                    this.getInitialAgeGroup,
                )

                filteredAppointments.forEach((appointment) =>
                    this.handleAppointmentFilter(appointment, ageGroups),
                )

                const totals: AgeGroup = this.getTotalAgeGroups(ageGroups)

                ageGroups.push(totals)

                return ageGroups
            }),
        )
    }

    private handleAppointmentFilter(
        appointment: Appointment,
        ageGroups: AgeGroup[],
    ): void {
        const patientAge = age(appointment.patient.dob)
        let index = ageGroups.findIndex((ageGroup) =>
            this.findAgeGroup(ageGroup, patientAge),
        )

        if (index >= 0) {
            ageGroups[index].totalPatients++
            if (appointment.patient.sex === SexEnum.MALE) {
                ageGroups[index].males++
            } else if (appointment.patient.sex === SexEnum.FEMALE) {
                ageGroups[index].females++
            }

            if (appointment.diagnosis) {
                ageGroups[index].totalDiagnosed++
                if (appointment.patient.sex === SexEnum.MALE) {
                    ageGroups[index].diagnosedMale++
                } else if (appointment.patient.sex === SexEnum.FEMALE) {
                    ageGroups[index].diagnosedFemale++
                }
            }
        }
    }

    private getInitialAgeGroup(bracket: AgeGroupEnum): AgeGroup {
        return {
            id: uuid.v4(),
            males: 0,
            females: 0,
            diagnosedMale: 0,
            diagnosedFemale: 0,
            totalPatients: 0,
            totalDiagnosed: 0,
            bracket: bracket,
        }
    }

    private getTotalAgeGroups(ageGroups: AgeGroup[]): AgeGroup {
        return {
            id: uuid.v4(),
            males: ageGroups.reduce((acc, group) => acc + group.males, 0),
            females: ageGroups.reduce((acc, group) => acc + group.females, 0),
            diagnosedMale: ageGroups.reduce(
                (acc, group) => acc + group.diagnosedMale,
                0,
            ),
            diagnosedFemale: ageGroups.reduce(
                (acc, group) => acc + group.diagnosedFemale,
                0,
            ),
            totalPatients: ageGroups.reduce(
                (acc, group) => acc + group.totalPatients,
                0,
            ),
            totalDiagnosed: ageGroups.reduce(
                (acc, group) => acc + group.totalDiagnosed,
                0,
            ),
            bracket: 'Total' as any,
        }
    }

    private findAgeGroup(ageGroup: AgeGroup, patientAge: number): boolean {
        const [minAge, maxAge] = ageGroup.bracket.split('-').map(Number)
        return patientAge >= minAge && patientAge <= maxAge
    }

    private getFilteredAppointments(
        appointments: Appointment[],
        params: AgeGroupParams,
    ): Appointment[] {
        console.log(params)

        return appointments.filter((appointment) => {
            const appointmentDate = dayjs(appointment.date).toDate()
            const startDate = params.startAt
                ? dayjs(params.startAt).toDate()
                : null
            const endDate = params.endAt ? dayjs(params.endAt).toDate() : null

            const isWithinDateRange =
                appointmentDate >= startDate && appointmentDate <= endDate

            if (empty(params.keyword) && !params.appointmentType) {
                return isWithinDateRange && appointment.rhu === params.rhu
            }

            if (!empty(params.keyword) && !params.appointmentType) {
                const {first_name, last_name, middle_name} = appointment.patient
                const fullName = `${first_name} ${last_name} ${middle_name}`

                const matchesKeyword = fullName
                    .toLowerCase()
                    .includes(params.keyword.toLowerCase())

                return (
                    isWithinDateRange &&
                    matchesKeyword &&
                    appointment.rhu === params.rhu
                )
            }

            if (empty(params.keyword) && params.appointmentType) {
                return (
                    isWithinDateRange &&
                    appointment.appointment_type === params.appointmentType &&
                    appointment.rhu === params.rhu
                )
            }

            const matchesKeyword = appointment.diagnosis.diagnosis
                .toLowerCase()
                .includes(params.keyword.toLowerCase())

            return (
                isWithinDateRange &&
                matchesKeyword &&
                appointment.appointment_type === params.appointmentType &&
                appointment.rhu === params.rhu
            )
        })
    }
}

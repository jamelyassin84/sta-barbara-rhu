import {Component, OnInit} from '@angular/core'
import {AngularFirestore} from '@angular/fire/compat/firestore'
import {Observable} from 'rxjs'
import {map} from 'rxjs/operators'
import dayjs from 'dayjs'
import {Patient} from 'app/app-core/models/patient.model'
import {Appointment} from 'app/app-core/models/appointment.model'

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    totalPatientsCount$: Observable<number>
    totalAppointmentsCount$: Observable<number>
    totalAppointmentsTodayCount$: Observable<number>
    diagnosisTodayCount$: Observable<number>

    todayAppointments$: Observable<Appointment[]>

    constructor(private firestore: AngularFirestore) {}

    ngOnInit() {
        this.totalPatientsCount$ = this.getTotalPatientsCount()
        this.totalAppointmentsCount$ = this.getTotalAppointmentsCount()
        this.totalAppointmentsTodayCount$ =
            this.getTotalAppointmentsTodayCount()
        this.diagnosisTodayCount$ = this.getDiagnosisTodayCount()
        this.todayAppointments$ = this.fetchAppointmentsToday()
    }

    fetchAppointmentsToday(): Observable<Appointment[]> {
        const today = dayjs().startOf('day')

        return this.firestore
            .collection<Patient>('patients')
            .valueChanges()
            .pipe(
                map((patients) => {
                    const appointmentsToday: Appointment[] = []
                    patients.forEach((patient) => {
                        if (patient.appointments) {
                            patient.appointments.forEach((appointment) => {
                                if (
                                    dayjs(appointment.date).format(
                                        'MM-DD-YY',
                                    ) === today.format('MM-DD-YY')
                                ) {
                                    appointmentsToday.push(appointment)
                                }
                            })
                        }
                    })
                    return appointmentsToday
                }),
            )
    }

    getTotalPatientsCount(): Observable<number> {
        return this.firestore
            .collection<Patient>('patients')
            .valueChanges()
            .pipe(map((patients) => patients.length))
    }

    getTotalAppointmentsCount(): Observable<number> {
        return this.firestore
            .collection<Patient>('patients')
            .valueChanges()
            .pipe(
                map((patients) => {
                    let appointmentsCount = 0
                    patients.forEach((patient) => {
                        if (patient.appointments) {
                            appointmentsCount += patient.appointments.length
                        }
                    })
                    return appointmentsCount
                }),
            )
    }

    getTotalAppointmentsTodayCount(): Observable<number> {
        return this.fetchAppointmentsToday().pipe(
            map((appointmentsToday) => appointmentsToday.length),
        )
    }

    getDiagnosisTodayCount(): Observable<number> {
        return this.fetchAppointmentsToday().pipe(
            map((appointmentsToday) => {
                let diagnosisCount = 0
                appointmentsToday.forEach((appointment) => {
                    if (appointment.diagnosis) {
                        diagnosisCount++
                    }
                })
                return diagnosisCount
            }),
        )
    }
}

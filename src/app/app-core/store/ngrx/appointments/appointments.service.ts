import {Injectable} from '@angular/core'
import {Store} from '@ngrx/store'
import {Observable, map, of, switchMap, take, tap} from 'rxjs'
import {AppState} from '../../core/app.state'
import {Patient} from 'app/app-core/models/patient.model'
import {StoreAction} from '../../core/action.enum'
import {Appointment} from 'app/app-core/models/appointment.model'
import {LoadingTypeEnum} from '@digital_brand_work/states/store/enums/loading-type.enum'
import {Loader} from '@fuse/decorators/loader.decorator'
import {StoreLoaderService} from '@digital_brand_work/services/store-loader.service'
import {FormGroup} from '@angular/forms'
import dayjs from 'dayjs'
import {timeStamps} from '@digital_brand_work/models/core.model'
import {AppointmentTypeEnum} from 'app/app-core/enums/appointment-type.enum'
import {AngularFirestore} from '@angular/fire/compat/firestore'
import {CollectionEnum} from 'app/app-core/enums/collection.enum'
import * as uuid from 'uuid'
import {State} from '@digital_brand_work/decorators/ngrx-state.decorator'
import {StateEnum} from '../../core/state.enum'
import {cloneDeep} from 'lodash'
import {unfreeze} from '@digital_brand_work/helpers/helpers'

@Injectable({providedIn: 'root'})
export class AppointmentService {
    constructor(
        private _store: Store<AppState>,
        private _fireStore: AngularFirestore,
        private _storeLoaderService: StoreLoaderService,
    ) {}

    @State({selector: StateEnum.PATIENTS, type: 'array'})
    readonly patients$: Observable<Patient[]>

    @Loader({state: 'APPOINTMENTS', loading: LoadingTypeEnum.GET})
    get(isToday: boolean = false): Observable<Appointment[]> {
        const today = dayjs().startOf('day')

        const appointments = this.patients$.pipe(
            take(1),
            switchMap((patients: Patient[]) => {
                if (patients.length) {
                    this._store.dispatch(StoreAction.PATIENTS.load.request())
                }
                return of(patients)
            }),
            map((patients: Patient[]) => {
                const filteredAppointments = patients.reduce(
                    (acc: Appointment[], patient: Patient) => {
                        const appointments = patient.appointments.filter(
                            (appointment: Appointment) =>
                                !isToday
                                    ? true
                                    : dayjs(appointment.date).format(
                                          'MM-DD-YY',
                                      ) === today.format('MM-DD-YY'),
                        )
                        return acc.concat(
                            ...appointments.map((a) => ({
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

        return appointments
    }

    @Loader({state: 'APPOINTMENTS', loading: LoadingTypeEnum.CREATE})
    upsert(form: any) {
        return this.patients$.pipe(take(1)).subscribe((patients) => {
            if (patients.length === 0) {
                return this.add(form)
            }

            const patient = patients.find(
                (p) =>
                    p.email.toLocaleLowerCase() ===
                    form.patient.email.toLocaleLowerCase(),
            )

            if (!patient) {
                return this.add(form)
            }

            return this.update(form, unfreeze(patient))
        })
    }

    @Loader({state: 'APPOINTMENTS', loading: LoadingTypeEnum.UPDATE})
    updateAppointment(appointment: Appointment): Observable<Appointment> {
        return this.patients$.pipe(
            take(1),
            map((patients) => {
                let patient = patients.find(
                    (p) => p.id === appointment.patient.id,
                )

                let patientAppointments = cloneDeep(patient.appointments)

                if (patient) {
                    let index = patientAppointments.findIndex(
                        (a) => a.id === appointment.id,
                    )

                    if (index >= 0) {
                        patientAppointments[index] = {
                            ...appointment,
                            ...timeStamps(dayjs().toJSON(), 'update'),
                        } as any
                    }

                    const payload = {
                        ...patient,
                        appointments: patientAppointments.map((a) => {
                            const newAppointment = {...a}
                            delete newAppointment.patient
                            return newAppointment
                        }),
                    }

                    this._fireStore
                        .collection(CollectionEnum.PATIENTS)
                        .doc(patient.id)
                        .update(payload)
                }

                return appointment
            }),
        )
    }

    @Loader({state: 'APPOINTMENTS', loading: LoadingTypeEnum.REMOVE})
    remove(appointment: Appointment): Observable<string> {
        return this.patients$.pipe(
            take(1),
            map((patients) => {
                let patient = patients.find(
                    (p) => p.id === appointment.patient.id,
                )

                let patientAppointments = cloneDeep(patient.appointments)

                if (patient) {
                    let index = patientAppointments.findIndex(
                        (a) => a.id === appointment.id,
                    )

                    if (index >= 0) {
                        patientAppointments.splice(index, 1)
                    }

                    const payload = {
                        ...patient,
                        appointments: patientAppointments,
                    }

                    this._fireStore
                        .collection(CollectionEnum.PATIENTS)
                        .doc(patient.id)
                        .update(payload)
                }

                return appointment.id
            }),
        )
    }

    private add(form: any): Observable<Patient> {
        const patientId = `P-${uuid.v4()}`

        const patient: Patient = {
            id: patientId,
            ...form.patient,
            dob: dayjs(form.dob).toJSON(),
            appointments: [
                {
                    id: `A-${uuid.v4()}`,
                    ...form.appointment,
                    patientId: patientId,
                    ...timeStamps(),
                    diagnosis: null,
                    assessment: null,
                    date: dayjs(form.date).toJSON(),
                    symptoms: form.appointment.symptoms,
                },
            ],
        } as any

        let payload = {...patient} as any

        if (
            form.appointment.appointment_type ===
            AppointmentTypeEnum.MEDICO_LEGAL
        ) {
            payload['medicoLegal'] = this.getMedicoLegal(form)
        }

        delete payload.diagnosis

        this._fireStore
            .collection(CollectionEnum.PATIENTS)
            .doc(patientId)
            .set(payload)

        return of(payload)
    }

    private update(form: any, patient: Patient): Observable<Patient> {
        const appointment = {
            id: `A-${uuid.v4()}`,
            ...form.appointment,
            ...timeStamps(),
            patientId: patient.id,
            diagnosis: null,
            assessment: null,
            date: dayjs(form.date).toJSON(),
            symptoms: form.appointment.symptoms,
        }

        const payload = cloneDeep(patient)

        payload.appointments.push(appointment)

        if (
            form.appointment.appointment_type ===
            AppointmentTypeEnum.MEDICO_LEGAL
        ) {
            payload['medicoLegal'] = this.getMedicoLegal(form)
        }

        payload.diagnosis = null

        this._fireStore
            .collection(CollectionEnum.PATIENTS)
            .doc(patient.id)
            .update(payload)

        return of(payload)
    }

    private getMedicoLegal(form: any) {
        return {
            ...form.medicoLegal,
            id: `ML-${uuid.v4()}`,
            timeOfIncident: dayjs(form.medicoLegal.timeOfIncident).toJSON(),
            dateOfIncident: dayjs(form.medicoLegal.dateOfIncident).toJSON(),
        }
    }
}

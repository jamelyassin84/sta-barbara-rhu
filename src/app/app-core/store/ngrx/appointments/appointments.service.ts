import {Injectable} from '@angular/core'
import {Store} from '@ngrx/store'
import {Observable, map, tap, of, switchMap} from 'rxjs'
import {AppState} from '../../core/app.state'
import {StoreSelect} from '@fuse/decorators/ngrx-selector.decorator'
import {patientsBaseSelectors} from '../patients/patients.selectors'
import {Patient} from 'app/app-core/models/patient.model'
import {StoreAction} from '../../core/action.enum'
import {Appointment} from 'app/app-core/models/appointment.model'
import {LoadingTypeEnum} from '@digital_brand_work/states/store/enums/loading-type.enum'
import {Loader} from '@fuse/decorators/loader.decorator'
import {StoreLoaderService} from '@digital_brand_work/services/store-loader.service'
import {FormGroup} from '@angular/forms'
import {uniqueId} from 'lodash'
import dayjs from 'dayjs'
import {timeStamps} from '@digital_brand_work/models/core.model'
import {AppointmentTypeEnum} from 'app/app-core/enums/appointment-type.enum'
import {AngularFirestore} from '@angular/fire/compat/firestore'
import {CollectionEnum} from 'app/app-core/enums/collection.enum'

@Injectable({providedIn: 'root'})
export class AppointmentService {
    constructor(
        private _store: Store<AppState>,
        private _fireStore: AngularFirestore,
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

    @Loader({state: 'APPOINTMENTS', loading: LoadingTypeEnum.CREATE})
    upsert(form: FormGroup): Observable<Patient> {
        return this.patients$.pipe(
            map((p) =>
                p.find((p) => p.email.toLocaleLowerCase() === form.value.email),
            ),
            switchMap((patient) => {
                if (!patient) {
                    return this.add(form)
                }

                return this.update(form, patient)
            }),
        )
    }

    private add(form: FormGroup): Observable<Patient> {
        const patientId = uniqueId('P')

        const patient: Patient = {
            id: patientId,
            ...form.value.patient,
            dob: dayjs(form.value.dob).toJSON(),
            appointments: [
                {
                    id: uniqueId('A'),
                    ...form.value.appointment,
                    patientId: patientId,
                    ...timeStamps(),
                    diagnosis: null,
                    assessment: null,
                    date: dayjs(form.value.date).toJSON(),
                },
            ],
        } as any

        let payload = {...patient} as any

        if (
            form.value.appointment.appointment_type ===
            AppointmentTypeEnum.MEDICO_LEGAL
        ) {
            payload['medicoLegal'] = this.getMedicoLegal(form)
        }

        this._fireStore
            .collection(CollectionEnum.PATIENTS)
            .doc(patientId)
            .set(payload)

        return of(payload)
    }

    private update(form: FormGroup, patient: Patient): Observable<Patient> {
        const appointment = {
            id: uniqueId('A'),
            ...form.value.appointment,
            ...timeStamps(),
            patientId: patient.id,
            diagnosis: null,
            assessment: null,
            date: dayjs(form.value.date).toJSON(),
        }

        const payload = {...patient}

        payload.appointments.push(appointment)

        if (
            form.value.appointment.appointment_type ===
            AppointmentTypeEnum.MEDICO_LEGAL
        ) {
            payload['medicoLegal'] = this.getMedicoLegal(form)
        }

        this._fireStore
            .collection(CollectionEnum.PATIENTS)
            .doc(patient.id)
            .update(payload)

        return of(payload)
    }

    private getMedicoLegal(form: FormGroup) {
        return {
            ...form.value.medicoLegal,
            timeOfIncident: dayjs(
                form.value.medicoLegal.timeOfIncident,
            ).toJSON(),
            dateOfIncident: dayjs(
                form.value.medicoLegal.dateOfIncident,
            ).toJSON(),
        }
    }
}

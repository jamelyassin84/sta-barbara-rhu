import {Injectable} from '@angular/core'
import {AngularFirestore} from '@angular/fire/compat/firestore'
import {Observable, map, of, switchMap, tap} from 'rxjs'
import {Patient} from 'app/app-core/models/patient.model'
import {Loader} from '@fuse/decorators/loader.decorator'
import {LoadingTypeEnum} from '@digital_brand_work/states/store/enums/loading-type.enum'
import {StoreLoaderService} from '@digital_brand_work/services/store-loader.service'
import {AppState} from '../../core/app.state'
import {Store} from '@ngrx/store'
import {FormGroup} from '@angular/forms'
import {StoreSelect} from '@fuse/decorators/ngrx-selector.decorator'
import {patientsBaseSelectors} from './patients.selectors'
import {uniqueId} from 'lodash'
import dayjs from 'dayjs'
import {timeStamps} from '@digital_brand_work/models/core.model'
import {AppointmentTypeEnum} from 'app/app-core/enums/appointment-type.enum'

@Injectable({providedIn: 'root'})
export class AssessmentService {
    constructor(
        private _store: Store<AppState>,
        private _fireStore: AngularFirestore,
        private _storeLoaderService: StoreLoaderService,
    ) {}

    @StoreSelect(patientsBaseSelectors.selectAll)
    patients$: Observable<Patient[]>

    @Loader({state: 'PATIENTS', loading: LoadingTypeEnum.GET})
    get(): Observable<Patient[]> {
        return this._fireStore.collection<Patient>('patients').valueChanges()
    }

    @Loader({state: 'PATIENTS', loading: LoadingTypeEnum.CREATE})
    upsert(form: FormGroup): Observable<Patient> {
        return this.patients$.pipe(
            map((p) =>
                p.find((p) => p.email.toLocaleLowerCase() === form.value.email),
            ),
            switchMap((patient) => {
                if (!patient) {
                    return this.add(form)
                }

                return this.update(form)
            }),
        )
    }

    private add(form: FormGroup): Observable<Patient> {
        const patientId = uniqueId('P')

        let medicoLegal = {}

        if (
            form.value.appointment.appointment_type ===
            AppointmentTypeEnum.MEDICO_LEGAL
        ) {
            medicoLegal = {
                ...form.value.medicoLegal,
                timeOfIncident: dayjs(
                    form.value.medicoLegal.timeOfIncident,
                ).toJSON(),
                dateOfIncident: dayjs(
                    form.value.medicoLegal.dateOfIncident,
                ).toJSON(),
            }
        }

        const patient: Patient = {
            id: patientId,
            ...form.value.patient,
            dob: dayjs(form.value.dob).toJSON(),
            appointments: [
                {
                    appointmentId: uniqueId('A'),
                    ...form.value.appointment,
                    ...timeStamps(),
                    diagnosis: null,
                    assessment: null,
                    date: dayjs(form.value.date).toJSON(),
                },
            ],
        } as any

        let payload = {...patient} as any

        if (Object.keys(medicoLegal).length !== 0) {
            payload['medicoLegal'] = medicoLegal
        }

        this._fireStore.collection('patients').doc(patientId).set(payload)

        return of(patient)
    }

    private update(form: FormGroup): Observable<Patient> {
        const patient: Patient = {} as any

        return of(patient)
    }
}

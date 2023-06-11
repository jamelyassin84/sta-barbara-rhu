import {Injectable} from '@angular/core'
import {AngularFirestore} from '@angular/fire/compat/firestore'
import {FormGroup} from '@angular/forms'
import {timeStamps} from '@digital_brand_work/models/core.model'
import {Modal} from '@digital_brand_work/services/modal.service'
import {AppointmentTypeEnum} from 'app/app-core/enums/appointment-type.enum'
import {RHUEnum} from 'app/app-core/enums/rhu.enum'
import {BehaviorSubject} from 'rxjs'

@Injectable({providedIn: 'root'})
export class AddAppointmentModal extends Modal {
    constructor(private firestore: AngularFirestore) {
        super()
    }

    appointmentType$ = new BehaviorSubject<AppointmentTypeEnum>(undefined)
    rhu$ = new BehaviorSubject<RHUEnum>(undefined)

    async save(form: FormGroup) {
        const formValue = form.value
        const patientEmail = formValue.patient.email

        const snapshot = await this.firestore
            .collection('patients', (ref) =>
                ref.where('email', '==', patientEmail),
            )
            .get()
            .toPromise()

        if (snapshot.empty) {
            this.addNewPatientAndAppointment(formValue)
        } else {
            const patient = snapshot.docs[0].data()
            this.addAppointmentToExistingPatient(patient, formValue)
        }
    }

    private addNewPatientAndAppointment(formValue: any): void {
        const patientId = `patientId${new Date().getTime()}`

        this.firestore
            .collection('patients')
            .doc(patientId)
            .set({
                id: patientId,
                ...formValue.patient,
                appointments: [
                    {
                        appointmentId: `appointmentId${new Date().getTime()}`,
                        ...formValue.appointment,
                        ...timeStamps(),
                        diagnosis: null,
                        assessment: null,
                        ...(formValue.appointment.appointment_type ===
                        'Medico Legal'
                            ? {medicoLegal: formValue.medicoLegal}
                            : {}),
                    },
                ],
                ...timeStamps(),
            })
    }

    private addAppointmentToExistingPatient(
        patient: any,
        formValue: any,
    ): void {
        const patientId = patient.id
        const appointmentId = `appointmentId${new Date().getTime()}`

        const appointment = {
            appointmentId,
            ...formValue.appointment,
            diagnosis: null,
            assessment: null,
            appointment_nature: formValue.appointment.appointment_nature,
            ...timeStamps(),
        }

        if (formValue.appointment.appointment_type === 'Medico Legal') {
            appointment['medicoLegal'] = formValue.medicoLegal
        }

        patient.appointments.push(appointment)
        this.firestore.collection('patients').doc(patientId).update(patient)
    }
}

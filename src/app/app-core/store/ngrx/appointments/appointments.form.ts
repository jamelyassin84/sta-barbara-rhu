import {Injectable} from '@angular/core'
import {FormBuilder, Validators, AbstractControl} from '@angular/forms'
import {RHUEnum} from '../../../enums/rhu.enum'
import {AppointmentTypeEnum} from '../../../enums/appointment-type.enum'
import {AppointmentNatureEnum} from '../../../enums/appointment-nature.enum'
import {SexEnum} from '../../../enums/sex.enum'

@Injectable({providedIn: 'root'})
export class AppointmentForm extends FormBuilder {
    get() {
        return this.group({
            appointment: this.group({
                status: [false],
                date: ['', Validators.required],
                rhu: [RHUEnum.RHU_1, Validators.required],
                patientId: ['', Validators.required],
                appointment_type: [
                    AppointmentTypeEnum.GENERAL,
                    Validators.required,
                ],
                appointment_nature: [
                    AppointmentNatureEnum.NEW_ADMISSION,
                    Validators.required,
                ],
                symptoms: ['', Validators.required],
            }),
            patient: this.group({
                first_name: ['', Validators.required],
                last_name: ['', Validators.required],
                middle_name: [''],
                suffix_name: [''],
                dob: ['', Validators.required],
                address: ['', Validators.required],
                email: ['', [Validators.required, Validators.email]],
                phone: ['', Validators.required],
                appointments: [[]],
                diagnosis: [[]],
                sex: [SexEnum.MALE, Validators.required],
            }),
            medicoLegal: this.group({
                incident: ['', Validators.required],
                timeOfIncident: ['', Validators.required],
                dateOfIncident: ['', Validators.required],
                placeOfIncident: ['', Validators.required],
                dateOfArrival: [''],
                bloodPressure: [''],
                injuries: [[]],
                medications: [[]],
                medicalAttendanceDays: [''],
            }),
            assessment: null,
        })
    }

    reschedule() {
        return this.group({
            date: ['', Validators.required],
        })
    }

    assessment() {
        return this.group({
            weight: [''],
            height: [''],
            body_temperature: [''],
            injuries: [''],
            blood_pressure: [''],
            chief_complaints: [''],
        })
    }

    diagnosis() {
        return this.group({
            diagnosis: [''],
            medication_or_treatment: [''],
            name_of_health_care_provider: [''],
            licenseNumber: [''],
            laboratory_findings_or_impression: [''],
            performed_laboratory_test: [''],
        })
    }
}

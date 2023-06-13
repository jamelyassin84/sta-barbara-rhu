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
                symptoms: ['', Validators.required],
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
}

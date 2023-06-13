import {Injectable} from '@angular/core'
import {FormBuilder, Validators, AbstractControl} from '@angular/forms'
import {RHUEnum} from '../../../enums/rhu.enum'
import {AppointmentTypeEnum} from '../../../enums/appointment-type.enum'
import {AppointmentNatureEnum} from '../../../enums/appointment-nature.enum'
import {SexEnum} from '../../../enums/sex.enum'
import dayjs from 'dayjs'

@Injectable({providedIn: 'root'})
export class AppointmentForm extends FormBuilder {
    get() {
        return this.group(
            {
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
            },
            {validators: this.customValidation},
        )
    }

    customValidation = (control: AbstractControl) => {
        const appointmentType = control.get(
            'appointment.appointment_type',
        )?.value
        const appointmentDate = control.get('appointment.date')?.value
        const dob = control.get('patient.dob')?.value
        const dateOfIncident = control.get('medicoLegal.dateOfIncident')?.value
        const timeOfIncident = control.get('medicoLegal.timeOfIncident')?.value

        if (appointmentType === AppointmentTypeEnum.MEDICO_LEGAL) {
            const isValidAppointment =
                this.isValidDate(appointmentDate, true) &&
                this.isValidDate(dob, true)
            const isValidIncident =
                this.isValidDate(dateOfIncident) &&
                this.isValidTime(dateOfIncident, timeOfIncident)

            if (!isValidAppointment || !isValidIncident) {
                control.get('appointment.date')?.setErrors({invalidDate: true})
                control.get('patient.dob')?.setErrors({invalidDate: true})
                control
                    .get('medicoLegal.dateOfIncident')
                    ?.setErrors({invalidDate: true})
                control
                    .get('medicoLegal.timeOfIncident')
                    ?.setErrors({invalidDate: true})
                return {invalidDate: true}
            }
        } else {
            const isValidAppointment =
                this.isValidDate(appointmentDate) && this.isValidDate(dob)

            if (!isValidAppointment) {
                control.get('appointment.date')?.setErrors({invalidDate: true})
                control.get('patient.dob')?.setErrors({invalidDate: true})
                return {invalidDate: true}
            }
        }
        return null
    }

    private isValidDate(date: string, isPast: boolean = false): boolean {
        const today = dayjs().startOf('day')
        const targetDate = dayjs(date)
        if (isPast) {
            return targetDate.isBefore(today)
        }
        return targetDate.isAfter(today)
    }

    private isValidTime(date: string, time: string): boolean {
        const now = dayjs()
        const targetDateTime = dayjs(`${date} ${time}`)
        const targetDate = targetDateTime.startOf('day')
        return (
            targetDateTime.isBefore(now) &&
            targetDate.isSame(dayjs().startOf('day'))
        )
    }
}

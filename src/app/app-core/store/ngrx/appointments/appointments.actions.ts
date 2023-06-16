import {FormGroup} from '@angular/forms'
import {SystemActions} from '@fuse/decorators/system.action.group'
import {createActionGroup, emptyProps, props} from '@ngrx/store'
import {Appointment} from 'app/app-core/models/appointment.model'

export const SYSTEM = SystemActions({name: 'Appointments System'})

export const load = createActionGroup({
    source: 'Appointment load',
    events: {
        request: props<{isToday?: boolean}>(),
        onSuccess: props<{appointments: Appointment[]}>(),
    },
})

export const upsert = createActionGroup({
    source: 'Appointment Upsert',
    events: {
        request: props<{appointmentForm: FormGroup}>(),
        onSuccess: props<{appointment: Appointment}>(),
    },
})

export const update = createActionGroup({
    source: 'Appointment Update',
    events: {
        request: props<{appointment: Appointment}>(),
        onSuccess: props<{appointment: Appointment}>(),
    },
})

export const remove = createActionGroup({
    source: 'Appointment Delete',
    events: {
        request: props<{appointment: Appointment}>(),
        onSuccess: props<{id: string}>(),
    },
})

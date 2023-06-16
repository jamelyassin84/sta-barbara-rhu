import {SystemActions} from '@fuse/decorators/system.action.group'
import {createActionGroup, emptyProps, props} from '@ngrx/store'
import {Patient} from 'app/app-core/models/patient.model'

export const SYSTEM = SystemActions({name: 'Patient System'})

export const load = createActionGroup({
    source: 'Patient load',
    events: {
        request: emptyProps(),
        onSuccess: props<{patients: Patient[]}>(),
    },
})

export const show = createActionGroup({
    source: 'Patient Update',
    events: {
        request: props<{id: string}>(),
        onSuccess: props<{patient: Patient}>(),
    },
})

export const upsert = createActionGroup({
    source: 'Patient Update',
    events: {
        request: props<{patient: Patient}>(),
        onSuccess: props<{patient: Patient}>(),
    },
})

export const remove = createActionGroup({
    source: 'Patient Delete',
    events: {
        request: props<{id: string}>(),
        onSuccess: props<{id: string}>(),
    },
})

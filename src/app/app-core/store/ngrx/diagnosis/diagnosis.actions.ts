import {SystemActions} from '@fuse/decorators/system.action.group'
import {createActionGroup, emptyProps, props} from '@ngrx/store'
import {Diagnosis} from 'app/app-core/models/diagnosis.model'

export const SYSTEM = SystemActions({name: `Diagnosis System`})

export const load = createActionGroup({
    source: `Diagnosis load`,
    events: {
        request: emptyProps(),
        onSuccess: props<{diagnosis: Diagnosis[]}>(),
    },
})

export const upsert = createActionGroup({
    source: `Diagnosis Update`,
    events: {
        request: props<{diagnosis: Diagnosis}>(),
        onSuccess: props<{diagnosis: Diagnosis}>(),
    },
})

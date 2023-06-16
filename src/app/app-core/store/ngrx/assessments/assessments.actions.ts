import {SystemActions} from '@fuse/decorators/system.action.group'
import {createActionGroup, emptyProps, props} from '@ngrx/store'
import {Assessment} from 'app/app-core/models/assessment.model'

export const SYSTEM = SystemActions({name: 'Assessment System'})

export const load = createActionGroup({
    source: 'Assessment load',
    events: {
        request: emptyProps(),
        onSuccess: props<{assessments: Assessment[]}>(),
    },
})

export const upsert = createActionGroup({
    source: 'Assessment Update',
    events: {
        request: props<{assessment: Assessment}>(),
        onSuccess: props<{assessment: Assessment}>(),
    },
})

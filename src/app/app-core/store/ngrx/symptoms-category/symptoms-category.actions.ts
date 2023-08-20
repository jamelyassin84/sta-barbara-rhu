import {SystemActions} from '@fuse/decorators/system.action.group'
import {createActionGroup, emptyProps, props} from '@ngrx/store'

import {SymptomsCategory} from 'app/app-core/models/symptoms-category.model'

export const SYSTEM = SystemActions({name: 'Symptoms Category System'})

export const load = createActionGroup({
    source: 'Symptoms Category load',
    events: {
        request: emptyProps(),
        onSuccess: props<{symptomCategories: SymptomsCategory[]}>(),
    },
})

export const upsert = createActionGroup({
    source: 'Symptoms Category Update',
    events: {
        request: props<{symptomCategory: SymptomsCategory}>(),
        onSuccess: props<{symptomCategory: SymptomsCategory}>(),
    },
})

export const remove = createActionGroup({
    source: 'Symptoms Category Delete',
    events: {
        request: props<{id: string}>(),
        onSuccess: props<{id: string}>(),
    },
})

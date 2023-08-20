import {SystemActions} from '@fuse/decorators/system.action.group'
import {createActionGroup, props} from '@ngrx/store'
import {SymptomsParams} from 'app/app-core/api/params/symptoms-params'
import {Symptoms} from 'app/app-core/models/symptoms.model'

export const SYSTEM = SystemActions({name: 'Age Symptoms System'})

export const load = createActionGroup({
    source: 'Symptoms load',
    events: {
        request: props<{param: SymptomsParams}>(),
        onSuccess: props<{symptoms: Symptoms[]}>(),
    },
})

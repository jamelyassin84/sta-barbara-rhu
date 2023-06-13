import {Alert} from '@digital_brand_work/models/core.model'
import {createAction, props} from '@ngrx/store'

export const loadAlerts = createAction(
    '[Alert/API] Load Alerts',
    props<{alerts: Alert[]}>(),
)

export const addAlert = createAction(
    '[Alert/API] Add Alert',
    props<{alert: Alert}>(),
)

export const upsertAlert = createAction(
    '[Alert/API] Upsert Alert',
    props<{alert: Alert}>(),
)

export const addAlerts = createAction(
    '[Alert/API] Add Alerts',
    props<{alerts: Alert[]}>(),
)

export const upsertAlerts = createAction(
    '[Alert/API] Upsert Alerts',
    props<{alerts: Alert[]}>(),
)

export const deleteAlert = createAction(
    '[Alert/API] Delete Alert',
    props<{id: string}>(),
)

export const deleteAlerts = createAction(
    '[Alert/API] Delete Alerts',
    props<{ids: string[]}>(),
)

export const clearAlerts = createAction('[Alert/API] Clear Alerts')

import {createReducer, on} from '@ngrx/store'
import {EntityState, EntityAdapter, createEntityAdapter} from '@ngrx/entity'
import * as AlertActions from './alert.actions'
import {Alert} from '@digital_brand_work/models/core.model'

export const alertsFeatureKey = 'alerts'

export interface AlertState extends EntityState<Alert> {}

export const adapter: EntityAdapter<Alert> = createEntityAdapter<Alert>()

export const initialState: AlertState = adapter.getInitialState({})

export const alertReducer = createReducer(
    initialState,
    on(AlertActions.addAlert, (state, action) =>
        adapter.addOne(action.alert, state),
    ),

    on(AlertActions.upsertAlert, (state, action) =>
        adapter.upsertOne(action.alert, state),
    ),

    on(AlertActions.addAlerts, (state, action) =>
        adapter.addMany(action.alerts, state),
    ),

    on(AlertActions.upsertAlerts, (state, action) =>
        adapter.upsertMany(action.alerts, state),
    ),

    on(AlertActions.deleteAlert, (state, action) =>
        adapter.removeOne(action.id, state),
    ),

    on(AlertActions.deleteAlerts, (state, action) =>
        adapter.removeMany(action.ids, state),
    ),

    on(AlertActions.loadAlerts, (state, action) =>
        adapter.setAll(action.alerts, state),
    ),

    on(AlertActions.clearAlerts, (state) => adapter.removeAll(state)),
)

export const {selectIds, selectEntities, selectAll, selectTotal} =
    adapter.getSelectors()

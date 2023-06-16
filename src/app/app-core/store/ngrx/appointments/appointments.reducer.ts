import {STORE_LOADERS} from '@digital_brand_work/states/store/helpers/store-loaders'
import {StoreLoaders} from '@digital_brand_work/states/store/models/loader.model'
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity'
import {createReducer, on} from '@ngrx/store'
import {Appointment} from 'app/app-core/models/appointment.model'
import {StoreAction} from 'app/app-core/store/core/action.enum'

export const appointmentAdapter: EntityAdapter<Appointment> =
    createEntityAdapter<Appointment>()

export interface AppointmentState
    extends EntityState<Appointment>,
        StoreLoaders {
    error: any
}

export const initialState: AppointmentState =
    appointmentAdapter.getInitialState({
        ...STORE_LOADERS,
        error: null,
    })

export const appointmentsReducer = createReducer(
    initialState,

    on(StoreAction.APPOINTMENTS.SYSTEM.setLoader, (state, action) => {
        return {
            ...state,
            [`${action.loading.type}Loader`]: action.loading.state,
        }
    }),

    on(StoreAction.APPOINTMENTS.SYSTEM.onError, (state, action) => {
        return {
            ...state,
            error: action.error,
        }
    }),

    on(StoreAction.APPOINTMENTS.load.onSuccess, (state, action) =>
        appointmentAdapter.setAll(action.appointments, state),
    ),

    on(StoreAction.APPOINTMENTS.update.onSuccess, (state, action) =>
        appointmentAdapter.upsertOne(action.appointment, state),
    ),

    on(StoreAction.APPOINTMENTS.upsert.onSuccess, (state, action) =>
        appointmentAdapter.upsertOne(action.appointment, state),
    ),

    on(StoreAction.APPOINTMENTS.remove.onSuccess, (state, action) =>
        appointmentAdapter.removeOne(action.id, state),
    ),
)

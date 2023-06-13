import {createSelector} from '@ngrx/store'
import {AppState} from '../../core/app.state'
import {getStoreLoaders} from '@digital_brand_work/states/store/helpers/get-store-loaders'
import {AppointmentState, appointmentAdapter} from './appointments.reducer'

const feature = (state: AppState) => state.appointments

export const appointmentLoaders = createSelector(
    feature,
    (state: AppointmentState) => getStoreLoaders(state),
)

export const appointmentBaseSelectors = appointmentAdapter.getSelectors()

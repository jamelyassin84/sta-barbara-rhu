import {createSelector} from '@ngrx/store'
import {AppState} from '../../core/app.state'
import {getStoreLoaders} from '@digital_brand_work/states/store/helpers/get-store-loaders'
import {PatientState, patientAdapter} from './patients.reducer'

const feature = (state: AppState) => state.patients

export const patientLoaders = createSelector(feature, (state: PatientState) =>
    getStoreLoaders(state),
)

export const patientsBaseSelectors = patientAdapter.getSelectors()

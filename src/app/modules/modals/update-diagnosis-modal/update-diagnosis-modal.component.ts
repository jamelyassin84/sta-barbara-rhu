import {Component} from '@angular/core'
import {UpdateDiagnosisModal} from './update-diagnosis-modal.service'
import {dbwAnimations} from '@digital_brand_work/animations/animation.api'
import {AppState} from 'app/app-core/store/core/app.state'
import {Store} from '@ngrx/store'
import {FormBuilder} from '@angular/forms'
import {AppointmentForm} from 'app/app-core/store/ngrx/appointments/appointments.form'
import {AlertService} from '@digital_brand_work/services/alert.service'
import {StoreSelect} from '@fuse/decorators/ngrx-selector.decorator'
import {appointmentLoaders} from 'app/app-core/store/ngrx/appointments/appointments.selectors'
import {StoreLoaders} from '@digital_brand_work/states/store/models/loader.model'
import {Observable, take} from 'rxjs'
import {empty} from '@digital_brand_work/pipes/is-empty.pipe'
import {Diagnosis} from 'app/app-core/models/diagnosis.model'
import {StoreAction} from 'app/app-core/store/core/action.enum'

@Component({
    selector: 'update-diagnosis-modal',
    templateUrl: './update-diagnosis-modal.component.html',
    animations: [...dbwAnimations],
})
export class UpdateDiagnosisModalComponent {
    constructor(
        private _store: Store<AppState>,
        private _formBuilder: FormBuilder,
        private _alertService: AlertService,
        private _appointmentForm: AppointmentForm,
        private _updateDiagnosisModal: UpdateDiagnosisModal,
    ) {}

    @StoreSelect(appointmentLoaders)
    readonly loader$: Observable<StoreLoaders>

    opened$ = this._updateDiagnosisModal.opened$

    form = this._appointmentForm.diagnosis()

    ngOnInit(): void {
        this._updateDiagnosisModal.appointment$
            .pipe(take(1))
            .subscribe((appointment) => {
                if (appointment && !empty(appointment.diagnosis)) {
                    this.populateDiagnosis(appointment.diagnosis)
                }
            })
    }

    populateDiagnosis(diagnosis: Diagnosis) {
        this.form = this._formBuilder.group({
            diagnosis: [diagnosis.diagnosis],
            medication_or_treatment: [diagnosis.medication_or_treatment],
            name_of_health_care_provider: [
                diagnosis.name_of_health_care_provider,
            ],
            laboratory_findings_or_impression: [
                diagnosis.laboratory_findings_or_impression,
            ],
            performed_laboratory_test: [diagnosis.performed_laboratory_test],
        })
    }

    save() {
        this._updateDiagnosisModal.appointment$
            .pipe(take(1))
            .subscribe((appointment) => {
                console.log(appointment)

                if (appointment) {
                    this._store.dispatch(
                        StoreAction.APPOINTMENTS.update.request({
                            appointment: {
                                ...appointment,
                                diagnosis: {
                                    ...this.form.value,
                                } as any,
                            },
                        }),
                    )

                    this._alertService.addAlert({
                        type: 'success',
                        title: 'Assessment Saved',
                        message: 'You have successfully updated the assessment',
                    })

                    this._updateDiagnosisModal.opened$.next(false)
                }
            })
    }
}

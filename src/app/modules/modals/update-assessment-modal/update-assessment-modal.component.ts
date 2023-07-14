import {Component} from '@angular/core'
import {UpdateAssessmentModal} from './update-assessment-modal.service'
import {dbwAnimations} from '@digital_brand_work/animations/animation.api'
import {AppState} from 'app/app-core/store/core/app.state'
import {Store} from '@ngrx/store'
import {AlertService} from '@digital_brand_work/services/alert.service'
import {AppointmentForm} from 'app/app-core/store/ngrx/appointments/appointments.form'
import {Observable, take} from 'rxjs'
import {empty} from '@digital_brand_work/pipes/is-empty.pipe'
import {Assessment} from 'app/app-core/models/assessment.model'
import {StoreAction} from 'app/app-core/store/core/action.enum'
import dayjs from 'dayjs'
import {StoreSelect} from '@fuse/decorators/ngrx-selector.decorator'
import {appointmentLoaders} from 'app/app-core/store/ngrx/appointments/appointments.selectors'
import {StoreLoaders} from '@digital_brand_work/states/store/models/loader.model'
import {FormBuilder} from '@angular/forms'
import {Appointment} from 'app/app-core/models/appointment.model'

@Component({
    selector: 'update-assessment-modal',
    templateUrl: './update-assessment-modal.component.html',
    animations: [...dbwAnimations],
})
export class UpdateAssessmentModalComponent {
    constructor(
        private _store: Store<AppState>,
        private _formBuilder: FormBuilder,
        private _alertService: AlertService,
        private _appointmentForm: AppointmentForm,
        private _updateAssessmentModal: UpdateAssessmentModal,
    ) {}

    @StoreSelect(appointmentLoaders)
    readonly loader$: Observable<StoreLoaders>

    readonly opened$ = this._updateAssessmentModal.opened$

    form = this._appointmentForm.assessment()

    appointment: Appointment

    ngOnInit(): void {
        this._updateAssessmentModal.appointment$
            .pipe(take(1))
            .subscribe((appointment) => {
                this.appointment = appointment

                if (appointment && !empty(appointment.assessment)) {
                    this.populateAssessment(appointment.assessment)
                }
            })
    }

    populateAssessment(assessment: Assessment) {
        this.form = this._formBuilder.group({
            weight: [assessment.weight],
            height: [assessment.height],
            injuries: [assessment.injuries],
            body_temperature: [assessment.body_temperature],
            blood_pressure: [assessment.blood_pressure],
            chief_complaints: [assessment.chief_complaints],
        })
    }

    save() {
        this._updateAssessmentModal.appointment$
            .pipe(take(1))
            .subscribe((appointment) => {
                if (appointment) {
                    this._store.dispatch(
                        StoreAction.APPOINTMENTS.update.request({
                            appointment: {
                                ...appointment,
                                assessment: {
                                    ...this.form.value,
                                    date: dayjs().toJSON(),
                                } as any,
                            },
                        }),
                    )

                    this._alertService.addAlert({
                        type: 'success',
                        title: 'Assessment Saved',
                        message: 'You have successfully updated the assessment',
                    })

                    this._updateAssessmentModal.opened$.next(false)
                }
            })
    }
}

import {Component} from '@angular/core'
import {AppointmentTypeEnum} from 'app/app-core/enums/appointment-type.enum'
import {RHUEnum} from 'app/app-core/enums/rhu.enum'
import * as XLSX from 'xlsx'
import * as FileSaver from 'file-saver'
import {AppState} from 'app/app-core/store/core/app.state'
import {Store} from '@ngrx/store'
import {Observable, take} from 'rxjs'
import {StateEnum} from 'app/app-core/store/core/state.enum'
import {State} from '@digital_brand_work/decorators/ngrx-state.decorator'
import {AgeGroup} from 'app/app-core/models/age-group.model'
import {StoreAction} from 'app/app-core/store/core/action.enum'
import {ReportService} from './reports.service'
import {takeUntilDestroyed} from '@angular/core/rxjs-interop'
@Component({
    selector: 'reports',
    templateUrl: './reports.component.html',
})
export class ReportsComponent {
    constructor(
        private _store: Store<AppState>,
        private _reportService: ReportService,
    ) {
        this._reportService.filter$
            .pipe(takeUntilDestroyed())
            .subscribe(() => this.filter())
    }

    @State({selector: StateEnum.AGE_GROUP, type: 'array'})
    readonly ageGroups$: Observable<AgeGroup[]>

    readonly RHU = Object.values(RHUEnum)
    readonly SERVICES = Object.values(AppointmentTypeEnum)

    currentRHU = this.RHU[0]
    currentService = undefined
    diagnosis: string = ''
    startAt: any = undefined
    endAt: any = undefined

    ngOnInit() {
        setTimeout(() => {
            this._store.dispatch(
                StoreAction.APPOINTMENTS.load.request({isToday: false}),
            )
        }, 1500)
    }

    filter(): void {
        const param = {
            keyword: this.diagnosis,
            appointmentType: this.currentService,
            startAt: this.startAt,
            endAt: this.endAt,
            rhu: this.currentRHU,
        }

        this._store.dispatch(
            StoreAction.AGE_GROUP.load.request({
                param: param,
            }),
        )
    }

    generateExcel() {
        this.ageGroups$.pipe(take(1)).subscribe((ageGroups) => {
            const worksheet: XLSX.WorkSheet =
                XLSX.utils.json_to_sheet(ageGroups)

            const workbook: XLSX.WorkBook = {
                Sheets: {data: worksheet},
                SheetNames: ['data'],
            }
            const excelBuffer: any = XLSX.write(workbook, {
                bookType: 'xlsx',
                type: 'array',
            })
            const data: Blob = new Blob([excelBuffer], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
            })
            FileSaver.saveAs(data, `generated-${Date.now().toString()}.xlsx`)
        })
    }
}

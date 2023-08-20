import {Component} from '@angular/core'
import {State} from '@digital_brand_work/decorators/ngrx-state.decorator'
import {Store} from '@ngrx/store'
import {Symptoms} from 'app/app-core/models/symptoms.model'
import {StoreAction} from 'app/app-core/store/core/action.enum'
import {AppState} from 'app/app-core/store/core/app.state'
import {StateEnum} from 'app/app-core/store/core/state.enum'
import dayjs from 'dayjs'
import {Observable, take} from 'rxjs'
import * as XLSX from 'xlsx'
import * as FileSaver from 'file-saver'

@Component({
    selector: 'symptoms',
    templateUrl: './symptoms.component.html',
})
export class SymptomsComponent {
    constructor(private _store: Store<AppState>) {}

    @State({selector: StateEnum.SYMPTOMS, type: 'array'})
    readonly symptoms$: Observable<Symptoms[]>

    startAt: any = dayjs().startOf('month').format('YYYY-MM-DD')
    endAt: any = dayjs().endOf('month').format('YYYY-MM-DD')
    ready: boolean = false

    ngOnInit() {
        setTimeout(() => {
            this._store.dispatch(
                StoreAction.APPOINTMENTS.load.request({isToday: false}),
            )
            this.ready = true

            this.filter()
        }, 1500)
    }

    filter(): void {
        const param = {
            startAt: this.startAt,
            endAt: this.endAt,
        }

        this._store.dispatch(
            StoreAction.SYMPTOMS.load.request({
                param: param,
            }),
        )
    }

    generateExcel() {
        this.symptoms$.pipe(take(1)).subscribe((symptoms) => {
            const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
                symptoms.map((s) => ({count: s.count, name: s.name})),
            )

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
            FileSaver.saveAs(
                data,
                `generated-symptoms-${Date.now().toString()}.xlsx`,
            )
        })
    }
}

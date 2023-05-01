import {empty} from '@digital_brand_work/pipes/is-empty.pipe'
import {Injectable} from '@angular/core'
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http'
import {catchError, Observable, throwError} from 'rxjs'
import {slug_to_sentence} from '@digital_brand_work/pipes/slug-to-sentence.pipe'
import {AlertService} from '@digital_brand_work/services/alert.service'
import {isArray, isObject} from '@digital_brand_work/helpers/helpers'
import {Router} from '@angular/router'

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private _alertService: AlertService, private _router: Router) {}

    excludeKeys: string[] = []

    excludedCodes: string[] = []

    excludedMessages: string[] = ['Subscription not found!']

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler,
    ): Observable<HttpEvent<any>> {
        let request = req.clone()

        return next.handle(request).pipe(
            catchError((http: HttpErrorResponse) => {
                this.handleError(http)

                return throwError(http)
            }),
        )
    }

    handleError(http: HttpErrorResponse) {
        if (http instanceof HttpErrorResponse && http.status === 401) {
            //    Logout
        }

        if (!empty(http.error.message)) {
            // if (!this.excludedMessages.includes(http.error.message)) {
            //     return this._alertService.addAlert({
            //         type: 'error',
            //         title: 'Oops',
            //         message: http.error.message,
            //     })
            // }
        }

        if (!window.navigator.onLine) {
            // return this._alertService.addAlert({
            //     type: 'error',
            //     title: 'No Internet',
            //     message: 'Seems there is a problem with your connection',
            // })
        }

        if (isArray(http.error.errors)) {
            // for (let error of http.error.errors) {
            //     this._alertService.addAlert({
            //         title: `Error!`,
            //         message: error.message,
            //         type: 'error',
            //     })
            // }

            return
        }

        if (isObject(http.error.errors)) {
            // for (let key in http.error.errors) {
            //     for (let error of http.error.errors[key]) {
            //         this._alertService.addAlert({
            //             title: `Error in ${slug_to_sentence(key)}`,
            //             message: error,
            //             type: 'error',
            //         })
            //     }
            // }

            return
        }

        if (!empty(http.error.errors)) {
            // for (const error of http.error.errors) {
            //     this._alertService.addAlert({
            //         title: `${slug_to_sentence(error.rule)}`,
            //         message: error.message,
            //         type: 'error',
            //     })
            // }
        }

        if (
            !empty(http.error.key) &&
            !this.excludeKeys.includes(http.error.key)
        ) {
            // this._alertService.addAlert({
            //     title: `${slug_to_sentence(http.error.key)}`,
            //     message: http.error.message,
            //     type: 'error',
            // })
        }

        if (!empty(http.error.code)) {
            // this._alertService.addAlert({
            //     title: `${slug_to_sentence(http.error.code)}`,
            //     message: http.error.message,
            //     type: 'error',
            // })
        }
    }
}

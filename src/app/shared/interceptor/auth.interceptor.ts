import {Injectable} from '@angular/core'
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http'
import {catchError, Observable, throwError} from 'rxjs'


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor() {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler,
    ): Observable<HttpEvent<any>> {
        let newReq = req.clone()

        return next.handle(newReq).pipe(
            catchError((error) => {
                return throwError(error)
            }),
        )
    }
}

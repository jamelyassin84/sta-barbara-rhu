import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'

@Injectable({
    providedIn: 'root',
})
export class EmailService {
    constructor(private http: HttpClient) {}

    sendEmail(mailOptions: {
        from: string
        to: string
        subject: string
        text: string
    }) {
        const url = `http://localhost:3000/send-email`
        return this.http.post(url, {...mailOptions})
    }
}

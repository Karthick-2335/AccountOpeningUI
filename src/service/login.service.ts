import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login, Validation, response } from 'src/model/login';
import { environment } from '../../environment';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly url: string = environment.baseUrl


  constructor(private http: HttpClient) { }

  loginUsers(login: Login): Observable<response> {
    return this.http.post<response>(this.url + 'login', login);
  }
  validateOtp(validate: Validation): Observable<response> {
    return this.http.post<response>(this.url + 'validate', validate)
  }
}

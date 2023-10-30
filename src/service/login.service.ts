import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login, Validation } from 'src/model/request/login';
import { apiresponse } from 'src/model/response/responseModel';
import { environment } from '../../environment';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly url: string = environment.baseUrl


  constructor(private http: HttpClient) { }

  loginUsers(login: Login): Observable<apiresponse> {
    return this.http.post<apiresponse>(this.url + 'login', login);
  }
  validateOtp(validate: Validation): Observable<apiresponse> {
    return this.http.post<apiresponse>(this.url + 'validate', validate)
  }
  resume(panNumber : string) : Observable<apiresponse> {
    return this.http.get<apiresponse>(this.url + `resume/${panNumber}`)
  }
}

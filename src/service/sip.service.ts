import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SIPBasket } from 'src/model/request/sipModel';
import { apiresponse } from 'src/model/response/responseModel';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class SipService {

  private readonly url: string = environment.baseUrl

  constructor(private http: HttpClient) { }

  getAll(refNo : string): Observable<apiresponse> {
    const token =  this.getToken();
    const head = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.get<apiresponse>(this.url + "product/"+refNo,{headers : head});
  }
  postSip(SIPBasket: SIPBasket): Observable<apiresponse> {
    const token =  this.getToken();
    const head = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<apiresponse>(this.url + "product", SIPBasket,{headers : head});
  }
  getToken(){
    return localStorage.getItem('webToken');
  }
}

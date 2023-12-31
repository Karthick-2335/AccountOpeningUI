import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiresponse } from 'src/model/response/responseModel';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  private readonly url: string = environment.baseUrl

  constructor(private http: HttpClient) { }

  getIfscDetails(ifsc: string): Observable<apiresponse> {
    const token =  this.getToken();
    const head = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.get<apiresponse>(this.url + 'bank/getIfsc/'+ifsc,{headers : head});
  }
  postBank(Bank : any) : Observable<apiresponse>{
    const token =  this.getToken();
    const head = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<apiresponse>(this.url + `bank`,Bank,{headers : head});
  }
  getBank(refNo : string) : Observable<apiresponse>{
    const token =  this.getToken();
    const head = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.get<apiresponse>(this.url + `bank/${refNo}`,{headers : head})
  }
  getToken(){
    return localStorage.getItem('webToken');
  }
}

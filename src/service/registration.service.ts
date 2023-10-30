import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment';
import { apiresponse } from 'src/model/response/responseModel';


@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private readonly url: string = environment.baseUrl

  constructor(private http: HttpClient) { }

  getAddress(pincode: string): Observable<apiresponse> {
    return this.http.get<apiresponse>(this.url + 'common/getAddressByPincode/'+pincode);
  }
  postRegistration(registration : any) : Observable<apiresponse>{
    const token =  this.getToken();
    const head = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<apiresponse>(this.url + `registration`,registration,{headers : head});
  }
  getRegistration(refNo : string) : Observable<apiresponse>{
    const token =  this.getToken();
    const head = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.get<apiresponse>(this.url + `registration/${refNo}`,{headers : head})
  }
  getToken(){
    return localStorage.getItem('webToken');
  }
}

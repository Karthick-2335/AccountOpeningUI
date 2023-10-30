import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment';
import { apiresponse } from 'src/model/response/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private readonly url: string = environment.baseUrl

  constructor(private http: HttpClient) { }

  postProfile(profile : any) : Observable<apiresponse>{
    const token =  this.getToken();
    const head = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<apiresponse>(this.url + `profile`,profile,{headers : head});
  }
  getProfile(refNo : string) : Observable<apiresponse>{
    const token =  this.getToken();
    const head = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.get<apiresponse>(this.url + `profile/${refNo}`,{headers : head})
  }
  getToken(){
    return localStorage.getItem('webToken');
  }
}

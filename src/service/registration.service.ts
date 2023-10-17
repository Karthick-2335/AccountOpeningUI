import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment';
import { response } from 'src/model/response/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private readonly url: string = environment.baseUrl


  constructor(private http: HttpClient) { }

  getAddress(pincode: string): Observable<response> {
    return this.http.get<response>(this.url + 'common/getAddressByPincode/'+pincode);
  }
}

import { Observable,Subject } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  // Observable string sources
  private emitChangeSource = new Subject<any>();
  // Observable string streams
  changeEmitted$ = this.emitChangeSource.asObservable();
  // Service message commands
  emitChange(change: any) {
   let value = sessionStorage.setItem('authenticated',change)
      this.emitChangeSource.next(value);
  }
}

import { Observable,Subject } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  private emitChangeSource = new Subject<any>();
  private stageActive = new Subject<string>();

  changeEmitted$ = this.emitChangeSource.asObservable();
  stageEmitted$ = this.stageActive.asObservable();


  emitChange(change: any) {
   let value = localStorage.setItem('authenticated',change)
      this.emitChangeSource.next(value);
  }
  stageChange(stage : string) {
    localStorage.setItem('activeStage',stage)
    this.stageActive.next(stage);
  }
}


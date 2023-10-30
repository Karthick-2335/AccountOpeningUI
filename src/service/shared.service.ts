import { Observable,Subject } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  private emitChangeSource = new Subject<any>();
  private stageActive = new Subject<string>();
  private refNochange = new Subject<string>();

  changeEmitted$ = this.emitChangeSource.asObservable();
  stageEmitted$ = this.stageActive.asObservable();
  refNoEmitted$ = this.refNochange.asObservable();



  emitChange(change: any) {
      this.emitChangeSource.next(change);
  }
  stageChange(stage : string) {
    localStorage.setItem('activeStage',stage)
    this.stageActive.next(stage);
  }
  refno(ref : string){
    this.refNochange.next(ref);
  }
}


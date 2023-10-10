import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/service/shared.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  login: boolean = false;

  constructor(private _sharedService: SharedService, private router: Router) {
    _sharedService.changeEmitted$.subscribe(text => {
      if (sessionStorage.getItem('authenticated').toString() == null ? 'false' : 'true' === 'true') {
        this.login = true;
      }
      else {
        this.router.navigateByUrl('');
      }
    });
  }
  ngOnInit(): void {
    if (sessionStorage.getItem('authenticated').toString() === null ? 'false' : 'true' === 'true') {
      this.login = true;
    }
    else {
      sessionStorage.clear();
      this.router.navigateByUrl('');
    }
  }
  logOut() {
    sessionStorage.clear();
    this.login = false;
    this.router.navigateByUrl('');
  }
}
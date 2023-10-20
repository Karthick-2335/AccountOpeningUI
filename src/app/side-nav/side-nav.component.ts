import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/service/shared.service';


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  login: boolean = false;
  referenceNumber: string = '';
  registration: boolean = false;
  profile: boolean = false;
  bank: boolean = false;
  product: boolean = false;
  document: boolean = false;
  disable : boolean = true;
  constructor(private _sharedService: SharedService, private router: Router) 
  {
    _sharedService.changeEmitted$.subscribe(text => {
      this.login = text
      if (!!sessionStorage.getItem('authenticated')) {
        this.login = true;
      }
      else {
        this.router.navigateByUrl('');
      }
    });
    _sharedService.stageEmitted$.subscribe(stage => {
      this.currentStage(stage);
    });
    this.currentStage(localStorage.getItem('activeStage')?.toString() || '');
    if (!!localStorage.getItem('RefNumber'))
      this.referenceNumber = localStorage.getItem('RefNumber') || '';
  }
  ngOnInit(): void {
    if (!!localStorage.getItem('authenticated')) {
      this.login = true;
    }
    else {
      localStorage.clear();
      this.router.navigateByUrl('');
    }
  }
  logOut() {
    this.login = false;
    this.router.navigateByUrl('');
    localStorage.clear();
  }
  navigateToRegistration() {
    this.registration = true;
    this.profile = false;
    this.bank = false;
    this.product = false;
    this.document = false;
    this.router.navigateByUrl('/registration');
  }
  navigateToProfile() {
    this.registration = false;
    this.profile = true;
    this.bank = false;
    this.product = false;
    this.document = false;
    this.router.navigateByUrl('/profile');
  }
  navigateToBank() {
    this.registration = false;
    this.profile = false;
    this.bank = true;
    this.product = false;
    this.document = false;
    this.router.navigateByUrl('/bank');
  }
  navigateToProduct() {
    this.registration = false;
    this.profile = false;
    this.bank = false;
    this.product = true;
    this.document = false;
    this.router.navigateByUrl('/product');
  }
  navigateToDocument() {
    this.registration = false;
    this.profile = false;
    this.bank = false;
    this.product = false;
    this.document = true;
    this.router.navigateByUrl('/document');
  }
  currentStage(stage: string) {
    switch (stage) {
      case "Registration":
        this.navigateToProfile();
        break;
      case "Profile":
        this.navigateToBank();
        break;
      case "Bank":
        this.navigateToProduct();
        break;
      case "Product":
        this.navigateToDocument();
        break;
      default:
        this.navigateToRegistration();
    }
  }
}

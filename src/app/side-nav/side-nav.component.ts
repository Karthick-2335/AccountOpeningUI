import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from 'src/service/registration.service';
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
  profileDisable : boolean = false;
  bankDisable : boolean = false;
  productDisable : boolean = false;
  documentDisable : boolean = false;
  constructor(private _sharedService: SharedService, private router: Router,private _registrationService : RegistrationService) 
  {
    _sharedService.refNoEmitted$.subscribe(refno => {
      this._registrationService.getRegistration(refno).subscribe(resp => {
        if(resp.success)
        {
          this.login = true;
          this.referenceNumber = resp.results[0].referenceNumber;
        }
        else
        {
          localStorage.clear();
          this.router.navigateByUrl('');
        }
      })
    });
    _sharedService.stageEmitted$.subscribe(stage => {
      this.currentStage(stage);
    });
  }
  ngOnInit(): void {
    const ref = localStorage.getItem('RefNumber');
    this._registrationService.getRegistration(ref || "").subscribe(resp => {
      if(resp.success)
      {
        this.login = true;
        this.referenceNumber = resp.results[0].referenceNumber;
      }
      else
      {
        localStorage.clear();
        this.router.navigateByUrl('');
      }
    })
    this.currentStage(localStorage.getItem('activeStage')?.toString() || '');
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
        this.profileDisable = true;
        break;
      case "Profile":
        this.navigateToBank();
        this.profileDisable = true;
        break;
      case "Bank":
        this.navigateToProduct();
        this.profileDisable = true;
        this.bankDisable = true;
        break;
      case "Product":
        this.navigateToDocument();
        this.profileDisable = true;
        this.bankDisable = true;
        this.productDisable = true;
        break;
      default:
        this.navigateToRegistration();
    }
  }
  addItem(refno : any)
  {
    console.log(refno);
    this.referenceNumber = refno;
  }
}

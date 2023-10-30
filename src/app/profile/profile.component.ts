import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from 'src/service/profile.service';
import { RegistrationService } from 'src/service/registration.service';
import { SharedService } from 'src/service/shared.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  nominee: boolean = false;
  noNominee : boolean = false;
  profileForm: any;
  salute: any[] = ['Mr', 'Mrs', 'Dr', 'Miss'];
  martial: any[] = ['Single', 'Married', 'Widow'];
  sector: any[] = ['Private', 'Government', 'Agriculture', 'Industrial'];
  income: any[] = ['1-5L', '5L-10L', '10L-50L', '50L-1CR'];
  experience: any[] = ['One', 'Two', 'Three', 'Four and above'];
  relations: any[] = ['Spouse', 'Father', 'Mother', 'Children'];
  documents: any[] = ['AadhaarCard', 'VoterId', 'Passport', 'DrivingLicense'];
  constructor(private router: Router, private fb: FormBuilder, private _sharedService: SharedService,private _profileService : ProfileService,private _registrationService : RegistrationService) {
    this.profileForm = fb.group({
      title: ['', [Validators.required]],
      name: [{value:''}, [Validators.required]],
      email: [{value:''}, [Validators.required]],
      mobileNumber: [{value:''}, [Validators.required]],
      martialStatus: ['', [Validators.required]],
      fatherName: ['', [Validators.required]],
      occupation: ['', [Validators.required]],
      annualIncome: ['', [Validators.required]],
      tradingExperience: ['', [Validators.required]],
      isNominee: ['', [Validators.required]],
      nominee: fb.group({
        nomineeFirstName: ['', [Validators.required]],
        nomineeLastName: ['', [Validators.required]],
        nomineeDateOfBirth: ['', [Validators.required]],
        nomineeRelationShip: ['', [Validators.required]],
        nomineeIdProof: ['', [Validators.required]],
        nomineeIdProofNumber: ['', [Validators.required]]
      }),
      referenceNumber : ['',[Validators.required]]
    })
  }
  ngOnInit(): void {
    const ref = localStorage.getItem('RefNumber');
    this._profileService.getProfile(ref || '').subscribe(resp => {
      if(resp.results)
      {        
        this.profileForm.disable();
        this.profileForm.patchValue({
          title : resp.results[0].title,
          name : resp.results[0].name,
          email : resp.results[0].email,
          mobileNumber : resp.results[0].mobileNumber,
          martialStatus : resp.results[0].martialStatus,
          fatherName : resp.results[0].fatherName,
          occupation : resp.results[0].occupation,
          annualIncome : resp.results[0].annualIncome,
          tradingExperience : resp.results[0].tradingExperience,
          isNominee : resp.results[0].isNominee,
          nominee : {
              nomineeFirstName : resp.results[0].nominee.nomineeFirstName === undefined ? "" : resp.results[0].nominee.nomineeFirstName,
              nomineeLastName : resp.results[0].nominee.nomineeLastName,
              nomineeDateOfBirth : resp.results[0].nominee.nomineeDateOfBirth,
              nomineeRelationShip : resp.results[0].nominee.nomineeRelationShip,
              nomineeIdProof : resp.results[0].nominee.nomineeIdProof,
              nomineeIdProofNumber : resp.results[0].nominee.nomineeIdProofNumber,
              referenceNumber : resp.results[0].nominee.referenceNumber
          }
        })
        if(resp.results[0].isNominee)
        this.nominee = true;
        else
        this.noNominee = true;
      }
      else
      {
        this._registrationService.getRegistration(ref || "").subscribe(respp => {
          if(respp.success)
          {            
            this.profileForm.patchValue({
              name : respp.results[0].fullName,
              mobileNumber : respp.results[0].mobile,
              email : respp.results[0].email
            })
          }
        })
      }
    })
  }
  get title() {
    return this.profileForm.get('title');
  }
  get name() {
    return this.profileForm.get('name');
  }
  get mobileNumber() {
    return this.profileForm.get('mobileNumber');
  }
  get martialStatus() {
    return this.profileForm.get('martialStatus');
  }
  get fatherName() {
    return this.profileForm.get('fatherName');
  }
  get occupation() {
    return this.profileForm.get('occupation');
  }
  get annualIncome() {
    return this.profileForm.get('annualIncome');
  }
  get tradingExperience() {
    return this.profileForm.get('tradingExperience');
  }
  get isNominee() {
    return this.profileForm.get('isNominee');
  }
  get nomineeFirstName() {
    return this.profileForm.get('nominee.nomineeFirstName');
  }
  get nomineeLastName() {
    return this.profileForm.get('nominee.nomineeLastName');
  }
  get nomineeDateOfBirth() {
    return this.profileForm.get('nominee.nomineeDateOfBirth');
  }
  get nomineeRelationShip() {
    return this.profileForm.get('nominee.nomineeRelationShip');
  }
  get nomineeIdProof() {
    return this.profileForm.get('nominee.nomineeIdProof');
  }
  get nomineeIdProofNumber() {
    return this.profileForm.get('nominee.nomineeIdProofNumber');
  }
  addNominee() {
    this.nominee = true;
    this.profileForm.patchValue({
      isNominee: true
    });
  }
  closeNominee() {
    this.nominee = false;
    this.profileForm.patchValue({
      isNominee: false
    });
  }
  profileSubmit() {
    this.profileForm.patchValue({
      referenceNumber : localStorage.getItem('RefNumber')
    })
    if(!this.nominee)
    {
      this.profileForm.patchValue({
        nominee : null
      })
    }
    console.log(this.profileForm.value);
    this._profileService.postProfile(this.profileForm.value).subscribe(resp => {
      if(resp.success)
      {
          this._sharedService.stageChange('Profile');
      }
      Swal.fire({
        position: 'top-end',
        icon: resp.success ? 'success' : 'error',
        title: resp.message,
        showConfirmButton: false,
        timer: 3000
      })
    })
  }
  edit()
  {
    this.profileForm.enable();
  }
}

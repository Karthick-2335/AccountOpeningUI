import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/service/shared.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  nominee: boolean = false;
  profileForm: any;
  salute: any[] = ['Mr', 'Mrs', 'Dr', 'Miss'];
  martial: any[] = ['Single', 'Married', 'Widow'];
  sector: any[] = ['Private', 'Government', 'Agriculture', 'Industrial'];
  income: any[] = ['1-5L', '5L-10L', '10L-50L', '50L-1CR'];
  experience: any[] = ['One', 'Two', 'Three', 'Four and above'];
  relations: any[] = ['Spouse', 'Father', 'Mother', 'Children'];
  documents: any[] = ['AadhaarCard', 'VoterId', 'Passport', 'DrivingLicense'];
  constructor(private router: Router, private fb: FormBuilder, private _sharedService: SharedService) {
    this.profileForm = fb.group({
      title: ['', [Validators.required]],
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required]],
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
      })
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
    console.log(this.profileForm.value);
    this._sharedService.stageChange('Profile');
  }
}

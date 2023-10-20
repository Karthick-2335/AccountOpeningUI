import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { RegistrationService } from 'src/service/registration.service';
import { address } from 'src/model/request/registration';
import { Output, EventEmitter } from '@angular/core';
import { SharedService } from 'src/service/shared.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  states: any[] = ['State'];
  cities: any[] = ['City'];
  districts: any[] = ['District'];
  registrationForm: any;
  addressDetails: address[] = [];
  isPincodeEnabled: boolean = true;
  @Output() newItemEvent = new EventEmitter<boolean>();
  constructor(private _registrationService: RegistrationService, fb: FormBuilder, private _sharedService: SharedService) {
    this.registrationForm = fb.group({
      panNumber: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      dateOfBirth: ['', [Validators.required]],
      addressLine1: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      addressLine2: ['', [Validators.required]],
      city: [{ value: '', disabled: this.isPincodeEnabled }, [Validators.required]],
      district: [{ value: '', disabled: this.isPincodeEnabled }, [Validators.required]],
      state: [{ value: '', disabled: this.isPincodeEnabled }, [Validators.required]],
      pinCode: ['', [Validators.required]]
    })
  }
  get panNumber() {
    return this.registrationForm.get('panNumber');
  }
  get dateOfBirth() {
    return this.registrationForm.get('dateOfBirth');
  }
  get addressLine1() {
    return this.registrationForm.get('addressLine1');
  }
  get addressLine2() {
    return this.registrationForm.get('addressLine2');
  }
  get city() {
    return this.registrationForm.get('city');
  }
  get district() {
    return this.registrationForm.get('district')
  }
  get state() {
    return this.registrationForm.get('state')
  }
  get pincode() {
    return this.registrationForm.get('pinCode')
  }
  pincodeChange(event: any) {
    this.cities = [];
    this.states = [];
    this.districts = [];
    let stateArray: string[] = [];
    let districtArray: string[] = []
    console.log(event.target.value);
    let pincode = event.target.value;
    this._registrationService.getAddress(pincode).subscribe(resp => {
      this.addressDetails = resp.results;
      this.addressDetails.forEach(e => { this.cities.push(e.Name.toUpperCase()) });
      this.addressDetails.forEach(e => { stateArray.push(e.State.toUpperCase()) });
      this.addressDetails.forEach(e => { districtArray.push(e.District.toUpperCase()) });
      this.states = stateArray.filter(function (item, pos) {
        return stateArray.indexOf(item) == pos;
      });
      this.districts = districtArray.filter(function (item, pos) {
        return districtArray.indexOf(item) == pos;
      });
    });
    this.registrationForm.get('state').enable();
    this.registrationForm.get('city').enable();
    this.registrationForm.get('district').enable();

  }
  registrationSubmit() {
    this._sharedService.stageChange('Registration');
  }

}

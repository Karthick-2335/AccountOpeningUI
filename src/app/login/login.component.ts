import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/service/shared.service';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/service/login.service';
import { Validation } from 'src/model/request/login';
import Swal from 'sweetalert2'
import { RegistrationService } from 'src/service/registration.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  OtpPopup: boolean = false;
  resume : boolean = false;
  authenticated: boolean = false;
  loginForm: any;
  otpForm: any;
  resumeForm : any;
  emailPattern: string = '[a-z0-9]+@[a-z]+\.[a-z]{2,3}';
  mobilePattern: string = '[0-9]'
  sex: any[] = ['Male', 'Female'];
  validateOtp: Validation = new Validation();

  constructor(private router: Router, private _sharedService: SharedService, fb: FormBuilder, private loginService: LoginService,private _registrationService : RegistrationService) {

    this.loginForm = fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      mobile: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      gender: ['', [Validators.required]]
    })
    this.otpForm = fb.group({
      otpNumber: ['', [Validators.required, Validators.maxLength(4)]]
    })
    this.resumeForm = fb.group({
      panNumber : ['',[Validators.required]]
    })
    localStorage.clear();
  }

  loginSubmit() {
    this.loginService.loginUsers(this.loginForm.value).subscribe(resp => {
      console.log(resp);
      if (resp.success) {
        this.OtpPopup = true;
        console.log(resp.success);
        
      }
      else {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: resp.message,
          showConfirmButton: false,
          timer: 3000
        })
        this.loginForm.reset();
      }
    });
  }
  OtpCancel() {
    this.OtpPopup = false;
    this.loginForm.reset();
  }
  otpValidation() {
    this.validateOtp.email = this.loginForm.value.email;
    this.validateOtp.otp = this.otpForm.value.otpNumber;
    this.loginService.validateOtp(this.validateOtp).subscribe(resp => {
      console.log(resp);

      if (resp.success) {
        localStorage.setItem('webToken', resp.results.token);
        const registrationObj = {
          fullName : this.loginForm.value.fullName,
          mobile : this.loginForm.value.mobile,
          email : this.loginForm.value.email,
          referenceNumber : resp.results.referenceNumber
        }
        console.log(registrationObj);
        
        this._registrationService.postRegistration(registrationObj).subscribe(respp => {
          if(respp.success)
          {
            this.authenticated = true
            localStorage.setItem('RefNumber',resp.results.referenceNumber);
            this._sharedService.refno(resp.results.referenceNumber);
            this.router.navigateByUrl('/registration');
          }
          else
          {
            this.OtpPopup = false;
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: resp.message,
              showConfirmButton: false,
              timer: 3000
            })
          }
        })
      }
      else {
        this.OtpPopup = false;
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: resp.message,
          showConfirmButton: false,
          timer: 3000
        })
        this.otpForm.reset();
        this.OtpPopup = true;
      }
    })

  }
  get fullName() {
    return this.loginForm.get('fullName');
  }
  get email() {
    return this.loginForm.get('email');
  }
  get mobile() {
    return this.loginForm.get('mobile');
  }
  get gender() {
    return this.loginForm.get('gender');
  }
  get otpNumber() {
    return this.loginForm.get('otpNumber');
  }
  get panNumber() {
    return this.loginForm.get('panNumber');
  }
  resumeSubmit()
  {
    console.log(this.resumeForm.value.panNumber);
    
    this.loginService.resume(this.resumeForm.value.panNumber).subscribe(resp => {
      if(resp.results != null)
      {
        console.log(resp);
        localStorage.setItem('webToken', resp.results.token);
        this.authenticated = true
        localStorage.setItem('RefNumber',resp.results.referenceNumber);
        this._sharedService.refno(resp.results.referenceNumber)
        this.router.navigateByUrl('/registration');
      }
      else
      {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: resp.message,
          showConfirmButton: false,
          timer: 3000
        })
      }
    })
  }
  resumeCancel()
  {
    this.resume = false;
  }
  resumePopup()
  {
    this.resume = true;
  }
}

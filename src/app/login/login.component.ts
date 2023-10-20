import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/service/shared.service';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/service/login.service';
import { Validation } from 'src/model/request/login';
import Swal from 'sweetalert2'

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

  constructor(private router: Router, private _sharedService: SharedService, fb: FormBuilder, private loginService: LoginService) {

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
      }
      else {
        this.OtpPopup = false;
        Swal.fire({
          title: 'Error!',
          text: resp.errorMessage,
          icon: 'error',
          confirmButtonText: 'Okay'
        });
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
        this.authenticated = true
        localStorage.setItem('authenticated', 'true')
        this._sharedService.emitChange(this.authenticated);
        this.router.navigateByUrl('/registration');
        localStorage.setItem('webToken', resp.token);
        localStorage.setItem('RefNumber',resp.referenceNumber);
      }
      else {
        this.OtpPopup = false;
        Swal.fire({
          title: 'Error!',
          text: resp.errorMessage,
          icon: 'error',
          confirmButtonText: 'Okay'
        });
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
      localStorage.setItem('webToken', '12345');
      this.authenticated = true
      localStorage.setItem('authenticated', 'true')
      this._sharedService.emitChange(this.authenticated);
      localStorage.setItem('RefNumber','test');
      this.router.navigateByUrl('/registration');
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

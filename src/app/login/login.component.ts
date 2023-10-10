import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/service/shared.service';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/service/login.service';
import { Validation } from 'src/model/login';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  OtpPopup : boolean = false;
  authenticated : String = '';
  loginForm :any;
  otpForm : any;
  emailPattern : string = '[a-z0-9]+@[a-z]+\.[a-z]{2,3}';
  mobilePattern : string = '[0-9]'
  sex:any[] = ['Male','Female'];
  validateOtp : Validation = new Validation();

  constructor(private router:Router,private _sharedService: SharedService,fb:FormBuilder,private loginService : LoginService)
  {

    this.loginForm = fb.group({
      fullName : ['',[Validators.required,Validators.minLength(3),Validators.maxLength(25)]],
      email : ['',[Validators.required,Validators.pattern(this.emailPattern)]],
      mobile : ['',[Validators.required,Validators.maxLength(10),Validators.minLength(10)]],
      gender : ['',[Validators.required]]
    })
    this.otpForm = fb.group({
      otpNumber : ['',[Validators.required,Validators.maxLength(4)]]
    })
    localStorage.clear();
  }

  loginSubmit()
  {
    this.loginService.loginUsers(this.loginForm.value).subscribe(resp => {
    console.log(resp.success);
      if(resp.success)
      {
        this.OtpPopup = true;
      }
      else
      {
        this.OtpPopup = false;
        Swal.fire({
          title: 'Error!',
          text: resp.message,
          icon: 'error',
          confirmButtonText: 'Okay'
        });
        this.loginForm.reset();
      }
    });
  }
  OtpCancel()
  {
    this.OtpPopup = false;
    this.loginForm.reset();
  }
  otpValidation()
  {
    this.validateOtp.email = this.loginForm.value.email;
    this.validateOtp.otp = this.otpForm.value.otpNumber;
    this.loginService.validateOtp(this.validateOtp).subscribe(resp => {
      console.log(resp);
      
      if(resp.success)
      {
        this.authenticated = 'true'
        localStorage.setItem('authenticated','true')
        this.router.navigateByUrl('/registration');
        this._sharedService.emitChange(this.authenticated);
        localStorage.setItem('webToken',resp.token);
      }
      else
      {        
        this.OtpPopup = false;
        Swal.fire({
          title: 'Error!',
          text: resp.message,
          icon: 'error',
          confirmButtonText: 'Okay'
        });
        this.otpForm.reset();
        this.OtpPopup = true;
      }
    })
    
  }
  get fullName()
  {
    return this.loginForm.get('fullName');
  }
  get email()
  {
    return this.loginForm.get('email');
  }
  get mobile()
  {
    return this.loginForm.get('mobile');
  }
  get gender()
  {
    return this.loginForm.get('gender');
  }
  get otpNumber()
  {
    return this.loginForm.get('otpNumber');
  }
}

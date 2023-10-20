import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BankService } from 'src/service/bank.service';
import { getIfscDetails } from 'src/model/request/bank';
import Swal from 'sweetalert2'
import { SharedService } from 'src/service/shared.service';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css']
})
export class BankComponent {

  bankType : any[] = ['Savings','Current'];
  bankForm : any;
  ifscDetails : getIfscDetails = new getIfscDetails();
  constructor(fb : FormBuilder,private bankSerive : BankService,private _sharedService: SharedService)
  {
    this.bankForm = fb.group({
      accountType : ['',[Validators.required]],
      ifscCode : ['',[Validators.required]],
      bankAddress : [{value : '',disabled:true},[Validators.required]],
      accountNumber : ['',[Validators.required]],
      confirmAccountNumber : ['',[Validators.required]]
    })
  }

  get accountType(){
    return this.bankForm.get('accountType');
  }
  get ifscCode(){
    return this.bankForm.get('ifscCode');
  }
  get bankAddress(){
    return this.bankForm.get('bankAddress');
  }
  get accountNumber(){
    return this.bankForm.get('accountNumber');
  }
  get confirmAccountNumber(){
    return this.bankForm.get('confirmAccountNumber');
  }
  bankSubmit()
  {
    console.log(this.bankForm.value);
    this._sharedService.stageChange('Bank');
  }
  ifscCodeChange(event : any)
  {
    console.log(event.target.value);
    this.bankSerive.getIfscDetails(event.target.value).subscribe(resp => {
      console.log(resp);
      if(resp.success)
      {
        this.ifscDetails = resp.results;
        this.bankForm.patchValue({
          bankAddress: this.ifscDetails.ADDRESS
        });
        this.bankForm.get('bankAddress').enable();
      }
      else
      {
        Swal.fire({
          title: 'Error!',
          text: 'We can\'t fetch the details against your IFSC. Please provide the valid IFSC',
          icon: 'error',
          confirmButtonText: 'Okay'
        });
      }
    });
  }
}

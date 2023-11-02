import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit{
  clientPhoto : boolean = false;
  clientPhotoupload : boolean = false;
  panCard : boolean = false;
  panCardUpload : boolean = false;
  bankDocument : boolean = false;
  bankDocumentUpload : boolean = false;
  aadhaarCard : boolean = false;
  aadhaarCardUpload : boolean = false;
  panurl : any;
  bankurl : any;
  aadhaarurl : any;
  ngOnInit(): void {
    this.clientPhoto = true;
  }
  uploadSelfie(){
    this.clientPhotoupload = true;
    this.clientPhoto = false;
    this.panCard = true;
  }
  uploadPan()
  {
    this.panCardUpload = true;
    this.panCard = false;
    this.bankDocument = true;
  }
  uploadBank()
  {
    this.bankDocumentUpload = true;
    this.bankDocument = false;
    this.aadhaarCard = true;
  }
  uploadDocument()
  {
    this.aadhaarCardUpload = true;
  }
  showSelfie()
  {
    this.clientPhoto = true;
    this.panCard = false;
    this.bankDocument = false;
    this.aadhaarCard = false;
  }
  showPan()
  {
    this.clientPhoto = false;
    this.panCard = true;
    this.bankDocument = false;
    this.aadhaarCard = false;
  }
  showBank()
  {
    this.clientPhoto = false;
    this.panCard = false;
    this.bankDocument = true;
    this.aadhaarCard = false;
  }
  showAadhaar()
  {
    this.clientPhoto = false;
    this.panCard = false;
    this.bankDocument = false;
    this.aadhaarCard = true;
  }
  onSelectFile(image : any)
  {
    if (image.target.files && image.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(image.target.files[0]); // read file as data url

      reader.onload = (event : any) => { // called once readAsDataURL is completed
        this.panurl = event.target.result;        
      }
    }
  }
  onSelectFile1(image : any)
  {
    if (image.target.files && image.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(image.target.files[0]); // read file as data url

      reader.onload = (event : any) => { // called once readAsDataURL is completed
        this.bankurl = event.target.result;        
      }
    }
  }
  onSelectFile2(image : any)
  {
    if (image.target.files && image.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(image.target.files[0]); // read file as data url

      reader.onload = (event : any) => { // called once readAsDataURL is completed
        this.aadhaarurl = event.target.result;        
      }
    }
  }
}

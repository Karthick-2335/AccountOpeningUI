import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  nominee:boolean = false;

  addNominee()
  {
    this.nominee = true;
  }
  closeNominee()
  {
    this.nominee = false;
  }
}

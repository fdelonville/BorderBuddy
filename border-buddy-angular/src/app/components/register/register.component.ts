import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  form: FormGroup
  constructor(){
    this.form = new FormGroup({
      'login': new FormControl(),
      'password': new FormControl(),
      'confirm': new FormControl(),
      'firstName': new FormControl(),
      'lastName': new FormControl(),
      'email': new FormControl(),
    })
  }

  onSubmit() {
    console.log('ok')
  }
}

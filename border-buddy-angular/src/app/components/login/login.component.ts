import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup
  @Output() registerClickedEmitter = new EventEmitter<null>
  constructor(){
    this.form = new FormGroup({
      'login': new FormControl('',[Validators.required,Validators.minLength(2)]),
      'password': new FormControl('',[Validators.required,Validators.minLength(2)])
    })
  }

  onSubmit() {

  }

  onClickRegister(){
    this.registerClickedEmitter.emit()
  }
}

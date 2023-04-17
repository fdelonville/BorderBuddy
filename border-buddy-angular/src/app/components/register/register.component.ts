import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RegisterService} from "../../services/register.service";
import {RegisterForm} from "../../models/register.form";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  form: FormGroup
  registerForm!: RegisterForm
  constructor(private readonly registerService: RegisterService){
    this.form = new FormGroup({
      'login': new FormControl('',[Validators.required,Validators.minLength(2)]),
      'password': new FormControl('',[Validators.required,Validators.minLength(2)]),
      'confirm': new FormControl('',[Validators.required,Validators.minLength(2)]),
      'firstName': new FormControl('',[Validators.required,Validators.minLength(2)]),
      'lastName': new FormControl('',[Validators.required,Validators.minLength(2)]),
      'email': new FormControl('',[Validators.required,Validators.email]),
    })
  }

  onSubmit() {
    if(this.form.valid){
      let tempForm = this.form.value
      this.registerForm = ({
        'login': tempForm.login,
        'password': tempForm.password,
        'firstName': tempForm.firstName,
        'lastName': tempForm.lastName,
        'email': tempForm.email,
      })
      this.registerService.register(this.registerForm).subscribe(
        {
          next: () => {
            alert('Votre compte a bien été créé')
            this.form.reset()
          }
        }
      )
    }

  }
}

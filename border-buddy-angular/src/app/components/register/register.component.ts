import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {RegisterForm} from "../../models/register.form";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  form: FormGroup
  registerForm!: RegisterForm
  errorMessage!: string
  @Output() completeEmitter = new EventEmitter<null>
  constructor(private readonly authService: AuthService){
    this.form = new FormGroup({
      'login': new FormControl('',[Validators.required,Validators.minLength(2)]),
      'password': new FormControl('',[Validators.required,Validators.minLength(4)]),
      'confirm': new FormControl('',[Validators.required,Validators.minLength(4)]),
      'firstName': new FormControl('',[Validators.required,Validators.minLength(2)]),
      'lastName': new FormControl('',[Validators.required,Validators.minLength(2)]),
      'email': new FormControl('',[Validators.required,Validators.email]),
    })
  }

  onBack(){
    this.completeEmitter.emit()
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
      this.authService.register(this.registerForm).subscribe(
        {
          next: () => {
            alert('Votre compte a bien été créé')
            this.form.reset()
            this.completeEmitter.emit()
          },
          error: () => this.errorMessage = "Erreur : le compte n'a pas pu être créé."
        }
      )
    }
    else this.errorMessage ="Tous les champs doivent être remplis. Les mots de passe doivent faire 4 caractères minimum."

  }
}

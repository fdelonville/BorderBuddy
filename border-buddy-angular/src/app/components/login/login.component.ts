import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {LoginForm} from "../../models/login.form";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup
  @Output() registerClickedEmitter = new EventEmitter<null>
  constructor(private readonly authService: AuthService, private router: Router){
    this.form = new FormGroup({
      'login': new FormControl('',[Validators.required,Validators.minLength(2)]),
      'password': new FormControl('',[Validators.required,Validators.minLength(2)])
    })
  }

  onSubmit() {
    if(this.form.valid) console.log('ok')
      let tempForm = this.form.value
      let loginForm: LoginForm =({
        'login': tempForm.login,
          'password': tempForm.password,
        }
      )
      this.authService.login(loginForm).subscribe({next: (r: any) => {
          sessionStorage.setItem('token',r.token)
          sessionStorage.setItem('roles', r.roles)
          sessionStorage.setItem('username', r.username)
          window.location.reload()
        }
      })
  }

  onClickRegister(){
    this.registerClickedEmitter.emit()
  }
}

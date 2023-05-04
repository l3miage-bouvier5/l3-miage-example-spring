import { Component } from '@angular/core';
import { MiahootUser } from '../miahoot';
import { BehaviorSubject } from 'rxjs';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ConnexionService } from '../services/connexion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-with-adresse-mail',
  templateUrl: './login-with-adresse-mail.component.html',
  styleUrls: ['./login-with-adresse-mail.component.scss']
})
export class LoginWithAdresseMailComponent {

  user !: MiahootUser;

  bsIsLoggedIn = new BehaviorSubject<boolean>(false);



  public fgLogin: FormGroup<{
    email: FormControl<string>
    password: FormControl<string>
  }>;
  public fgRegister: FormGroup<{
    email: FormControl<string>
    password: FormControl<string>
    passwordCheck : FormControl<string>
  }>;

  constructor(private connexionServ: ConnexionService,
              private fb: FormBuilder,
              private router : Router) {
      this.connexionServ.obsMiahootUser$.subscribe(
        u => {
          if( u === undefined){
          this.fgLogin.controls.email.setValue("")
          this.fgLogin.controls.password.setValue("")
        } else {
          this.fgLogin.controls.email.setValue(u.email)
        }
      }
      )



    this.fgLogin = fb.nonNullable.group({
      email: ["", Validators.required, Validators.email],
      password: [""]
    })
    this.fgRegister= fb.nonNullable.group({
      email: ["", Validators.required, Validators.email],
      password: ["", Validators.required, Validators.minLength(6)],
      passwordCheck : ["", Validators.required, Validators.minLength(6)]
    })
  }

  login() {
    this.connexionServ.loginWithAdresseMail(this.fgLogin.controls.email.value, this.fgLogin.controls.password.value)
    this.bsIsLoggedIn.next(true)
    this.router.navigateByUrl("miahootChoice")
  }

  async register(){
    await this.connexionServ.register(this.fgRegister.controls.email.value, this.fgRegister.controls.password.value)
    this.router.navigateByUrl("conceptionMiahoot")
  }

  async logout() {
    await this.connexionServ.logout()
    this.bsIsLoggedIn.next(false)
  }

}

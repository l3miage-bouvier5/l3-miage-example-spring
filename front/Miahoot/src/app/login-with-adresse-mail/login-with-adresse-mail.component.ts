import { Component } from '@angular/core';
import { MiahootUser } from '../miahoot';
import { BehaviorSubject } from 'rxjs';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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



  public fg: FormGroup<{
    email: FormControl<string>
    password: FormControl<string>
  }>;

  constructor(private connexionServ: ConnexionService,
              private fb: FormBuilder,
              private router : Router) {
      this.connexionServ.obsMiahootConcepteur$.subscribe(
        u => {
          if( u === undefined){
          this.fg.controls.email.setValue("")
          this.fg.controls.password.setValue("")
        } else {
          this.fg.controls.email.setValue(u.email)
        }
      }
      )



    this.fg = fb.nonNullable.group({
      email: [""],
      password: [""]
    })

  }

  login() {
    this.connexionServ.loginWithAdresseMail(this.fg.controls.email.value, this.fg.controls.password.value)
    this.router.navigateByUrl("")
  }

  register(){
    this.connexionServ.register(this.fg.controls.email.value, this.fg.controls.password.value)
    this.router.navigateByUrl("")
  }

  async logout() {
    await this.connexionServ.logout()
    this.bsIsLoggedIn.next(false)
  }

}

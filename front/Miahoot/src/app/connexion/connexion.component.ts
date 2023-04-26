import { Component } from '@angular/core';
import { ConnexionService } from '../services/connexion.service';
import { MiahootConcepteur, MiahootUser } from '../miahoot';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { Auth, signInAnonymously, signOut } from '@angular/fire/auth';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent {
  user !: Observable<MiahootConcepteur |undefined>;

  bsIsLoggedIn = new BehaviorSubject<boolean>(false);



  public fg: FormGroup<{
    name: FormControl<string>,
    email: FormControl<string>
    password: FormControl<string>
  }>;

  constructor(private connexionServ: ConnexionService,
              private fb: FormBuilder,
              private auth : Auth) {
      this.user = this.connexionServ.obsMiahootConcepteur$;
      this.user.subscribe(
        u => {
          if( u === undefined){
          this.fg.controls.name.setValue("")
          this.fg.controls.email.setValue("")
          this.fg.controls.password.setValue("")
        } else{
          this.fg.controls.name.setValue(u.name)
          this.fg.controls.email.setValue(u.email)
        }
      }
      )



    this.fg = fb.nonNullable.group({
      name: [""],
      email: [""],
      password: [""]
    })

  }

  login() {
    this.connexionServ.login(this.fg.controls.email.value, this.fg.controls.password.value)
  }

  register(){
    this.connexionServ.register(this.fg.controls.name.value, this.fg.controls.email.value, this.fg.controls.password.value)
  }

  async loginAnonymously() {
    await this.connexionServ.loginAnonymously()
    this.bsIsLoggedIn.next(true)
  }

  async logout() {
    await this.connexionServ.logout()
    this.bsIsLoggedIn.next(false)
  }

 
  
}

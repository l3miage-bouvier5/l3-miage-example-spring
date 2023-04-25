import { Component } from '@angular/core';
import { ConnexionService } from '../services/connexion.service';
import { MiahootUser } from '../miahoot';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent {
  user !: MiahootUser;


  public fg: FormGroup<{
    name: FormControl<string>,
    email: FormControl<string>
    password: FormControl<string>
  }>;

  constructor(private connexionServ: ConnexionService,
    private fb: FormBuilder) {
      this.connexionServ.obsMiahootConcepteur$.subscribe(
        u => {
          if( u === undefined){
          this.fg.controls.name.setValue("")
          this.fg.controls.email.setValue("")
          this.fg.controls.password.setValue("")
        } else {
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
    this.connexionServ.register(this.fg.controls.email.value, this.fg.controls.password.value)
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ParticipantService } from '../services/participant.service';
import { ConnexionService } from '../services/connexion.service';
import { MiahootUser } from '../miahoot';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent {
  miahootId :string = ""
  nom : string = ""
  outputError : string = "";

  readonly obsUser : Observable<MiahootUser |undefined>


  constructor(private router : Router,
              private ps : ParticipantService,
              private connexion: ConnexionService) { 
                this.obsUser = this.connexion.obsMiahootUser$
              }


  async enregristrerInfo(miahootId : string, nom:string){
    try {
      this.ps.enregistrerId(miahootId);
      await this.connexion.loginAnonymously(nom)
      this.ps.init()
      this.router.navigateByUrl("participer")
    } catch(e) {
      this.outputError = "La session que vous essayez de rejoindre n'est plus disponible."
    }
    
  }

  async loginGoogle() {
    this.connexion.loginGoogle()
  }

  loginWithAdresseMail() {
    this.router.navigateByUrl("loginWithAdresseMail")
  }
  

  logout(){
    this.connexion.logout()
  }

  toMesMiahoots(){
    this.router.navigateByUrl("miahootChoice")
  }

}

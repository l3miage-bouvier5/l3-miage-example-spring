import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ParticipantService } from '../services/participant.service';
import { ConnexionService } from '../services/connexion.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent {
  miahootId :string = ""
  nom : string = ""
  outputError : string = "";

  constructor(private router : Router,
              private ps : ParticipantService,
              private connexion: ConnexionService) { }


  async enregristrerInfo(miahootId : string, nom:string){
    try {
      this.ps.miahootId = miahootId
      this.ps.init()
      await this.connexion.loginAnonymously(nom)
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
  

}

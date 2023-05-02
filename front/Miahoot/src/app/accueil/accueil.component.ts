import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ParticipantService } from '../services/participant.service';
import { HttpClient } from '@angular/common/http';
import { ConnectConfig } from 'rxjs';
import { ConnexionService } from '../services/connexion.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent {
  miahootId :string = ""
  nom : string = ""

  constructor(private router : Router,
              private ps : ParticipantService,
              private http: HttpClient,
              private connexion: ConnexionService) { }


  enregristrerInfo(miahootId : string, nom:string){
    this.ps.miahootId = miahootId
    this.ps.nom = nom
    this.ps.init()
    this.ps.addParticipant()
    
    this.router.navigateByUrl("participer")
  }

  connexionAnonyme(name: string) {
    this.connexion.loginAnonymously(name);
    console.log("connexion ok");
    
  }
  

}

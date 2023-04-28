import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ParticipantService } from '../services/participant.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent {
  miahootId :string = ""
  nom : string = ""
  
  constructor(private router : Router,
              private ps : ParticipantService) { }


  enregristrerInfo(miahootId : string,nom:string){
    this.ps.miahootId = miahootId
    this.ps.nom = nom
  }
  
  toParticiper(){
    this.router.navigateByUrl("participer")
  }

  recupererInfo(){
    return this.ps.recupererInfo()
  }
}

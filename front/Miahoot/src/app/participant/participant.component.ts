import { Component } from '@angular/core';
import { ParticipantService } from '../services/participant.service';
import { QCMProjected } from '../miahoot';
import { Observable } from 'rxjs';
import { CurrentMiahootService } from '../services/current-miahoot.service';
import { signOut } from '@angular/fire/auth';
import { ConnexionService } from '../services/connexion.service';

@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.scss']
})
export class ParticipantComponent {

  obsCurrentQCM : Observable<QCMProjected | undefined>
  constructor(private ps : ParticipantService) { 
    this.obsCurrentQCM = this.ps.obsQCM
        
  }

  vote(proposition : number){
    this.ps.vote(proposition)
  }


  
}

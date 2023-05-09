import { Component } from '@angular/core';
import { ParticipantService } from '../services/participant.service';
import { QCMProjected } from '../miahoot';
import { BehaviorSubject, Observable, map, of, switchMap } from 'rxjs';
import { CurrentMiahootService } from '../services/current-miahoot.service';
import { signOut } from '@angular/fire/auth';
import { ConnexionService } from '../services/connexion.service';

@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.scss']
})
export class ParticipantComponent {

  bsVoted = new BehaviorSubject<boolean>(false);
  obsCurrentQCM : Observable<QCMProjected | undefined>
  constructor(private ps : ParticipantService) { 
    this.obsCurrentQCM = this.ps.obsState.pipe(
      map(state =>{
        if(state){
          return state.qcm
        }
        else {
          return undefined
        }
      }
        
        )
    )
        
  }

  vote(proposition : number){
    this.ps.vote(proposition)
    this.bsVoted.next(!this.bsVoted.value);
  }
}

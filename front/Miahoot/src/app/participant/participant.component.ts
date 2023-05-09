import { Component, OnDestroy } from '@angular/core';
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
export class ParticipantComponent implements OnDestroy {

  bsVoted = new BehaviorSubject<number>(-1);
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

    this.ps.bsVoted.subscribe(this.bsVoted)

  }

  ngOnDestroy(): void {
    this.ps.bsVoted.unsubscribe()
  }


  vote(proposition : number){
    this.ps.vote(proposition)
  }
}

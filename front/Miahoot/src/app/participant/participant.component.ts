import { Component, OnDestroy } from '@angular/core';
import { ParticipantService } from '../services/participant.service';
import { QCMProjected } from '../miahoot';
import { BehaviorSubject, Observable, Subscription, map, of, switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CurrentMiahootService } from '../services/current-miahoot.service';
import { ConnexionService } from '../services/connexion.service';

@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.scss']
})
export class ParticipantComponent {
  obsCurrentQCM : Observable<QCMProjected | undefined>

  constructor(public ps : ParticipantService,
              private _snackBar : MatSnackBar,
              private router : Router,
              private cs : ConnexionService) { 
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

  vote(proposition : number, answer : string){
    this.openMessage(answer)
    this.ps.vote(proposition)
  }
  openMessage(answer : string) {
    this._snackBar.open(`Vote enregistré pour ${answer}`, "OK");
  }


  toAccueil(){
    this.cs.logout()
    this.ps.supprimerParticipant()
    
    this.router.navigateByUrl("")
  }
}

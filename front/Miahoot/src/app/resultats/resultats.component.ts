import { Component } from '@angular/core';
import { CurrentMiahootService } from '../services/current-miahoot.service';
import { MiahootProjected, QCMProjected } from '../miahoot';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map, switchMap, take, tap } from 'rxjs';

@Component({
  selector: 'app-resultats',
  templateUrl: './resultats.component.html',
  styleUrls: ['./resultats.component.scss']
})
export class ResultatsComponent{
  readonly bsResultat = new BehaviorSubject<QCMProjected[]>([]);
  readonly bsJSON = new BehaviorSubject<string>("");
  readonly obsResultat : Observable<MiahootProjected|undefined>;
  readonly bsAfficherRes = new BehaviorSubject<boolean>(false);

  constructor(private ms : CurrentMiahootService) { 
    this.ms.bsResultats.subscribe(res => {
      this.bsResultat.next(res)})
    
    this.obsResultat = this.ms.obsState.pipe(
      map(state => {
        if(state){
          return state.miahoot
        }else{
          return undefined
        }
      }
      )
    )
  }

  resetResultats(){
    this.ms.supprimerMiahoot()
  }

  nbVote(QCM : QCMProjected){
    return Object.keys(QCM.votes).length
  }


  pourcentageBonneReponse(QCM : QCMProjected){
    const nbVote = this.nbVote(QCM)
    const nbBonneReponse = Object.values(QCM.votes).filter(val => val === QCM.correctanswer).length
    return nbVote === 0 ? 0 : Math.round(nbBonneReponse / nbVote * 100)
  }

  triMeilleuresReponses(QCM : QCMProjected[]) : QCMProjected[]{
    const sorted = [...QCM].sort((a, b) => this.pourcentageBonneReponse(b) - this.pourcentageBonneReponse(a))
    return sorted
  }

  async afficherJSON() {
    this.bsAfficherRes.next(!this.bsAfficherRes.value);
  }

  
}

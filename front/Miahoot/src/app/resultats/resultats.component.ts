import { Component, OnInit } from '@angular/core';
import { CurrentMiahootService } from '../services/current-miahoot.service';
import { QCMProjected } from '../miahoot';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';

@Component({
  selector: 'app-resultats',
  templateUrl: './resultats.component.html',
  styleUrls: ['./resultats.component.scss']
})
export class ResultatsComponent{
  readonly bsResultat = new BehaviorSubject<QCMProjected[]>([]);

  constructor(private ms : CurrentMiahootService) { 
    this.ms.bsResultats.subscribe(res => {
      console.log("res : ", res);
      this.bsResultat.next(res)})
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


  
}

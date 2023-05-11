import { Component, OnInit } from '@angular/core';
import { CurrentMiahootService, RESULTATS } from '../services/current-miahoot.service';
import { QCMProjected } from '../miahoot';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';

@Component({
  selector: 'app-resultats',
  templateUrl: './resultats.component.html',
  styleUrls: ['./resultats.component.scss']
})
export class ResultatsComponent{
  readonly bsResultat = new BehaviorSubject<RESULTATS[]>([]);
  readonly bsbestQuestion = new BehaviorSubject<[r: RESULTATS, nbBonneReponse: number]>([{} as RESULTATS, 0]);
  readonly bsworstQuestion = new BehaviorSubject<[r: RESULTATS, nbMauvaiseReponse: number]>([{} as RESULTATS, 0]);
  readonly percentageBest: number;
  readonly percentageWorst : number;

  constructor(private ms : CurrentMiahootService, private router : Router) { 
    this.ms.bsResultats.subscribe(this.bsResultat)

    
    console.log("mon tableau", this.bsResultat.value)
    
    const res = this.bsResultat.value.sort((r, s) => {
      const rep1 = r.qcm.correctanswer
      const rep2 = s.qcm.correctanswer
      const votes1 = Object.values(r.qcm.votes).reduce((acc, value) => value === rep1 ? acc++ : acc, 0)
      const votes2 = Object.values(s.qcm.votes).reduce((acc, value) => value === rep2 ? acc++ : acc, 0)
      return votes1 - votes2 // sorted in ascending order
    })

    console.log("res", res);
    
    const bestQuestion = res[this.bsResultat.value.length - 1]
    this.bsbestQuestion.next([bestQuestion,
      Object.values(bestQuestion.qcm.votes).reduce((acc, value) => value === bestQuestion.qcm.correctanswer ? acc++ : acc, 0)])
    const worstQuestion = res[0]
    this.bsworstQuestion.next([worstQuestion,
      Object.values(worstQuestion.qcm.votes).reduce((acc, value) => value === worstQuestion.qcm.correctanswer ? acc++ : acc, 0)])
    this.percentageBest = this.percentage(this.bsbestQuestion)
    this.percentageWorst = this.percentage(this.bsworstQuestion)
  }

  percentage(monBS: BehaviorSubject<[r: RESULTATS, n: number]>) : number {
    const denominator = monBS.value[0].nbVote;
    return denominator === 0 ? 0 : monBS.value[1] / denominator * 100;
  }

  resetResultats(){
    this.ms.supprimerMiahoot()
  }

  
}

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
  readonly bsbestQuestion = new BehaviorSubject<[r: RESULTATS,nbBonneReponse: number]>([{} as RESULTATS,0]);

  constructor(private ms : CurrentMiahootService, private router : Router) { 
    this.ms.bsResultats.subscribe(this.bsResultat)
    console.log("mon tableau", this.bsResultat.value)
    const res = this.bsResultat.value.reduce((meilleurRes, res, index) => {
      const correctAnswer = res.qcm.correctanwser
      const votesPourBonneReponse = Object.values(res.qcm.votes).reduce((acc,  value) => value === correctAnswer ? acc++ : acc, 0)
      meilleurRes = meilleurRes[0] > votesPourBonneReponse ? meilleurRes : [votesPourBonneReponse, index]
      return meilleurRes
    },[0,0])
    const bestQuestion = this.bsResultat.value[res[1]]
    this.bsbestQuestion.next([bestQuestion, res[0]])
  }


  worstQuestion() { }

  percentage() {}

  resetResultats(){
    this.bsResultat.next([])
    this.router.navigateByUrl("miahootChoice")
  }


}

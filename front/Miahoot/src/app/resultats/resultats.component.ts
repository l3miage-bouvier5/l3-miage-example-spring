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
  bsResultat = new BehaviorSubject<RESULTATS[]>([]);

  constructor(private ms : CurrentMiahootService, private router : Router) { 
    this.ms.bsResultats.subscribe(this.bsResultat)
    console.log("mon tableau", this.bsResultat.value)
  }

  // bestQuestion(): string {
  //   // i want to  the question with the most number of votes for the correct answer
  //   //  this.bsResultat.value.reduce(x, y =>
  //   //   x if x.qcm.votes[x.qcm.correctAnswer] > y.qcm.votes[y.qcm.correctAnswer] else y).qcm.question

  //   this.bsResultat.value.reduce((acc, value) => {
  //     const n = Object.entries(value.qcm.votes).filter([key, val]=> val === value.qcm.correctanwser)
    
  //     return 
  //   },0)
  // }

  worstQuestion() { }

  percentage() {}

  resetResultats(){
    this.bsResultat.next([])
    this.router.navigateByUrl("miahootChoice")
  }


}
